// Operation Black Dawn - Morale/Will System

class MoraleSystemClass {
    // Check for panic after taking damage
    checkWillDamage(unit, damage) {
        if (unit.team !== 'player') return;

        const willDamage = Math.floor(damage * 2);
        unit.currentWill = Math.max(0, (unit.currentWill || unit.will) - willDamage);

        this.checkMoraleState(unit);
    }

    // Check morale state
    checkMoraleState(unit) {
        if (unit.currentWill <= GAME_CONSTANTS.BERSERK_THRESHOLD) {
            this.triggerBerserk(unit);
        } else if (unit.currentWill <= GAME_CONSTANTS.PANIC_THRESHOLD) {
            this.triggerPanic(unit);
        }
    }

    // Trigger panic
    triggerPanic(unit) {
        if (unit.state === GAME_CONSTANTS.STATE_PANICKED) return;
        if (unit.abilities && unit.abilities.includes('steadfast')) return;

        unit.state = GAME_CONSTANTS.STATE_PANICKED;
        unit.actionsRemaining = 0;

        CombatSystem.logCombat(`${unit.name} panics!`, 'warning');
        EventBus.emit('unitPanicked', unit);

        // Random panic action
        const actions = ['run', 'hunker', 'freeze'];
        const action = Utils.randomPick(actions);

        switch (action) {
            case 'run':
                this.panicRun(unit);
                break;
            case 'hunker':
                unit.state = GAME_CONSTANTS.STATE_HUNKERED;
                break;
        }
    }

    // Panic run to random position
    panicRun(unit) {
        const range = Pathfinding.getMovementRange(unit, Game.tactical.map);
        if (range.length > 0) {
            const pos = Utils.randomPick(range);
            unit.gridX = pos.x;
            unit.gridY = pos.y;
        }
    }

    // Trigger berserk
    triggerBerserk(unit) {
        if (unit.state === GAME_CONSTANTS.STATE_BERSERK) return;

        unit.state = GAME_CONSTANTS.STATE_BERSERK;
        CombatSystem.logCombat(`${unit.name} goes berserk!`, 'warning');
        EventBus.emit('unitBerserk', unit);

        // Attack nearest unit (friend or foe)
        const allUnits = [...Game.tactical.units, ...Game.tactical.enemies]
            .filter(u => u !== unit && u.state !== GAME_CONSTANTS.STATE_DEAD);

        if (allUnits.length > 0) {
            let nearest = allUnits[0];
            let minDist = Infinity;

            allUnits.forEach(u => {
                const dist = Utils.distance(unit.gridX, unit.gridY, u.gridX, u.gridY);
                if (dist < minDist) {
                    minDist = dist;
                    nearest = u;
                }
            });

            if (LOSSystem.canTarget(unit, nearest.gridX, nearest.gridY, Game.tactical.map)) {
                CombatSystem.executeShoot(unit, nearest);
            }
        }
    }

    // When ally dies nearby
    allyDeath(deadUnit) {
        Game.tactical.units.forEach(unit => {
            if (unit === deadUnit || unit.state === GAME_CONSTANTS.STATE_DEAD) return;

            const dist = Utils.distance(unit.gridX, unit.gridY, deadUnit.gridX, deadUnit.gridY);
            if (dist <= 10) {
                const willLoss = 10 + (deadUnit.bond === unit.id ? 20 : 0);
                unit.currentWill = Math.max(0, (unit.currentWill || unit.will) - willLoss);
                this.checkMoraleState(unit);
            }
        });
    }

    // Restore will
    restoreWill(unit, amount) {
        unit.currentWill = Math.min(unit.will, (unit.currentWill || unit.will) + amount);

        if (unit.state === GAME_CONSTANTS.STATE_PANICKED || unit.state === GAME_CONSTANTS.STATE_BERSERK) {
            if (unit.currentWill > GAME_CONSTANTS.PANIC_THRESHOLD) {
                unit.state = GAME_CONSTANTS.STATE_IDLE;
                CombatSystem.logCombat(`${unit.name} recovers composure`, 'info');
            }
        }
    }

    // Bond bonus check
    checkBondBonus(unit1, unit2) {
        if (unit1.bond === unit2.id || unit2.bond === unit1.id) {
            return {
                aimBonus: 5,
                willBonus: 10,
                description: 'Bond bonus'
            };
        }
        return null;
    }

    // Reset will at start of mission
    resetWill(unit) {
        unit.currentWill = unit.will;
    }
}

// Global instance
const MoraleSystem = new MoraleSystemClass();
