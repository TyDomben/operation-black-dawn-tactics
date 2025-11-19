// Operation Black Dawn - Combat System

class CombatSystemClass {
    constructor() {
        this.currentTurn = 0;
        this.currentPhase = 'player';
        this.activeUnitIndex = 0;
    }

    // Initialize combat for a mission
    initCombat(mission, squad, enemies, map) {
        Game.tactical.active = true;
        Game.tactical.mission = mission;
        Game.tactical.map = map;
        Game.tactical.units = squad;
        Game.tactical.enemies = enemies;
        Game.tactical.currentTurn = 1;
        Game.tactical.phase = 'player';
        Game.tactical.objectives = mission.objectives.map(obj => ({
            ...obj,
            complete: false,
            progress: 0
        }));

        // Reset stats
        Game.tactical.stats = {
            shotsFired: 0,
            shotsHit: 0,
            damageDealt: 0,
            damageTaken: 0,
            kills: 0,
            turnsElapsed: 0
        };

        // Reset unit actions
        this.resetAllUnitsActions();

        // Select first player unit
        if (squad.length > 0) {
            this.selectUnit(squad[0]);
        }

        EventBus.emit('combatStart', { mission, turn: 1 });
        this.logCombat('Mission started: ' + mission.name, 'info');
    }

    // Reset actions for all units
    resetAllUnitsActions() {
        [...Game.tactical.units, ...Game.tactical.enemies].forEach(unit => {
            unit.actionsRemaining = GAME_CONSTANTS.ACTIONS_PER_TURN;
            unit.hasMoved = false;
            unit.hasActed = false;

            // Clear suppressed state
            if (unit.state === GAME_CONSTANTS.STATE_SUPPRESSED) {
                unit.state = GAME_CONSTANTS.STATE_IDLE;
            }
        });
    }

    // Select a unit
    selectUnit(unit) {
        Game.tactical.selectedUnit = unit;
        Game.tactical.selectedAction = null;
        Game.tactical.targetingMode = false;

        // Calculate movement range
        if (unit.team === 'player') {
            unit.movementRange = Pathfinding.getMovementRange(unit, Game.tactical.map);
            unit.attackRange = LOSSystem.getAttackRange(unit, Game.tactical.map);
        }

        EventBus.emit('unitSelected', unit);
        Renderer.centerOn(unit.gridX, unit.gridY);
    }

    // Select an action
    selectAction(actionId) {
        const unit = Game.tactical.selectedUnit;
        if (!unit || unit.team !== 'player') return;

        Game.tactical.selectedAction = actionId;

        if (['shoot', 'grenade', 'ability1'].includes(actionId)) {
            Game.tactical.targetingMode = true;
        } else if (actionId === 'overwatch') {
            this.executeOverwatch(unit);
        } else if (actionId === 'reload') {
            this.executeReload(unit);
        } else if (actionId === 'hunker') {
            this.executeHunker(unit);
        }

        EventBus.emit('actionSelected', actionId);
    }

    // Execute move action
    executeMove(unit, targetX, targetY) {
        if (!unit || unit.team !== 'player') return false;

        const path = Pathfinding.findPath(
            unit.gridX, unit.gridY,
            targetX, targetY,
            Game.tactical.map
        );

        if (!path || path.length === 0) {
            this.logCombat('Invalid move target', 'error');
            return false;
        }

        const cost = path.length <= unit.getMoveRange() ? 1 : 2;
        if (unit.actionsRemaining < cost) {
            this.logCombat('Not enough actions', 'error');
            return false;
        }

        // Check overwatch triggers
        const overwatchTriggers = this.checkOverwatchTriggers(unit, path);

        // Animate movement
        this.animateMovement(unit, path, () => {
            unit.gridX = targetX;
            unit.gridY = targetY;
            unit.actionsRemaining -= cost;
            unit.hasMoved = true;

            // Trigger any overwatches
            overwatchTriggers.forEach(watcher => {
                this.triggerOverwatch(watcher, unit);
            });

            EventBus.emit('unitMoved', { unit, to: { x: targetX, y: targetY } });

            if (unit.actionsRemaining <= 0) {
                this.nextUnit();
            }
        });

        return true;
    }

    // Execute shoot action
    executeShoot(attacker, target) {
        if (!attacker || !target) return false;
        if (attacker.actionsRemaining <= 0) {
            this.logCombat('No actions remaining', 'error');
            return false;
        }

        // Calculate hit chance
        const hitChance = this.calculateHitChance(attacker, target);
        const critChance = this.calculateCritChance(attacker, target);

        // Roll to hit
        const hitRoll = Math.random() * 100;
        const hit = hitRoll < hitChance;
        const crit = hit && Math.random() * 100 < critChance;

        Game.tactical.stats.shotsFired++;

        // Animate shot
        Renderer.animateBullet(
            { x: attacker.gridX, y: attacker.gridY },
            { x: target.gridX, y: target.gridY },
            hit,
            () => {
                if (hit) {
                    const damage = this.calculateDamage(attacker, target, crit);
                    DamageSystem.applyDamage(target, damage, attacker, crit);
                    Game.tactical.stats.shotsHit++;
                    Game.tactical.stats.damageDealt += damage;

                    if (crit) {
                        this.logCombat(`${attacker.name} CRITS ${target.name} for ${damage}!`, 'crit');
                    } else {
                        this.logCombat(`${attacker.name} hits ${target.name} for ${damage}`, 'hit');
                    }
                } else {
                    this.logCombat(`${attacker.name} misses ${target.name}`, 'miss');
                }

                // Use ammo
                if (attacker.weapon) {
                    attacker.weapon.currentAmmo--;
                }

                attacker.actionsRemaining--;
                attacker.hasActed = true;

                // Clear targeting mode
                Game.tactical.targetingMode = false;
                Game.tactical.selectedAction = null;

                EventBus.emit('unitAttack', { attacker, target, hit, crit });

                if (attacker.actionsRemaining <= 0 && attacker.team === 'player') {
                    this.nextUnit();
                }
            }
        );

        return true;
    }

    // Execute overwatch
    executeOverwatch(unit) {
        if (unit.actionsRemaining < 2) {
            this.logCombat('Overwatch requires 2 actions', 'error');
            return false;
        }

        unit.state = GAME_CONSTANTS.STATE_OVERWATCH;
        unit.actionsRemaining = 0;
        Game.tactical.overwatchUnits.push(unit);

        this.logCombat(`${unit.name} enters overwatch`, 'info');
        EventBus.emit('unitOverwatch', unit);

        Game.tactical.targetingMode = false;
        Game.tactical.selectedAction = null;

        this.nextUnit();
        return true;
    }

    // Execute reload
    executeReload(unit) {
        if (!unit.weapon || unit.weapon.currentAmmo === unit.weapon.maxAmmo) {
            this.logCombat('No need to reload', 'error');
            return false;
        }

        unit.weapon.currentAmmo = unit.weapon.maxAmmo;
        unit.actionsRemaining--;

        this.logCombat(`${unit.name} reloads`, 'info');
        EventBus.emit('unitReload', unit);

        Game.tactical.selectedAction = null;

        if (unit.actionsRemaining <= 0) {
            this.nextUnit();
        }
        return true;
    }

    // Execute hunker down
    executeHunker(unit) {
        if (unit.actionsRemaining < 1) {
            this.logCombat('Not enough actions', 'error');
            return false;
        }

        unit.state = GAME_CONSTANTS.STATE_HUNKERED;
        unit.actionsRemaining = 0;

        this.logCombat(`${unit.name} hunkers down`, 'info');
        EventBus.emit('unitHunker', unit);

        Game.tactical.selectedAction = null;
        this.nextUnit();
        return true;
    }

    // Execute grenade throw
    executeGrenade(unit, targetX, targetY, grenadeType = 'frag') {
        const grenade = ITEMS_DATA[`grenade_${grenadeType}`];
        if (!grenade) return false;

        const distance = Utils.distance(unit.gridX, unit.gridY, targetX, targetY);
        if (distance > grenade.range) {
            this.logCombat('Target out of range', 'error');
            return false;
        }

        // Get targets in radius
        const tilesInRadius = Utils.getTilesInRadius(targetX, targetY, grenade.radius);

        // Animate explosion
        Renderer.animateExplosion(targetX, targetY, grenade.radius, () => {
            // Apply damage to all units in radius
            const allUnits = [...Game.tactical.units, ...Game.tactical.enemies];
            tilesInRadius.forEach(tile => {
                const target = allUnits.find(u => u.gridX === tile.x && u.gridY === tile.y);
                if (target && target.state !== GAME_CONSTANTS.STATE_DEAD) {
                    const damage = Utils.random(grenade.damage.min, grenade.damage.max);
                    DamageSystem.applyDamage(target, damage, unit, false);
                    this.logCombat(`${target.name} takes ${damage} explosive damage`, 'hit');
                }

                // Destroy cover
                CoverSystem.destroyCover(Game.tactical.map, tile.x, tile.y);
            });

            unit.actionsRemaining--;
            Game.tactical.targetingMode = false;
            Game.tactical.selectedAction = null;

            if (unit.actionsRemaining <= 0) {
                this.nextUnit();
            }
        });

        this.logCombat(`${unit.name} throws ${grenade.name}`, 'info');
        return true;
    }

    // Calculate hit chance
    calculateHitChance(attacker, target) {
        let chance = attacker.aim;

        // Range modifier
        const distance = Utils.distance(attacker.gridX, attacker.gridY, target.gridX, target.gridY);
        const weapon = attacker.weapon || { range: { optimal: 10 } };
        if (distance <= 4) {
            chance += GAME_CONSTANTS.POINT_BLANK_BONUS;
        } else if (distance > weapon.range?.optimal) {
            chance -= GAME_CONSTANTS.LONG_RANGE_PENALTY;
        }

        // Cover modifier
        const coverValue = CoverSystem.getCoverValue(target, attacker, Game.tactical.map);
        if (coverValue === GAME_CONSTANTS.COVER_HALF) {
            chance -= GAME_CONSTANTS.HALF_COVER_DEFENSE;
        } else if (coverValue === GAME_CONSTANTS.COVER_FULL) {
            chance -= GAME_CONSTANTS.FULL_COVER_DEFENSE;
        }

        // Hunker bonus
        if (target.state === GAME_CONSTANTS.STATE_HUNKERED) {
            chance -= GAME_CONSTANTS.HUNKER_BONUS;
        }

        // Height advantage
        if (attacker.height > target.height) {
            chance += GAME_CONSTANTS.HEIGHT_ADVANTAGE;
        }

        // Flanking
        if (CoverSystem.isFlanking(attacker, target, Game.tactical.map)) {
            chance += GAME_CONSTANTS.FLANK_BONUS;
        }

        // Suppression
        if (attacker.state === GAME_CONSTANTS.STATE_SUPPRESSED) {
            chance -= GAME_CONSTANTS.SUPPRESSED_AIM_PENALTY;
        }

        // Dodge
        chance -= (target.dodge || 0);

        return Utils.clamp(chance, 1, 99);
    }

    // Calculate crit chance
    calculateCritChance(attacker, target) {
        let chance = attacker.weapon?.critChance || 10;

        // Flanking bonus
        if (CoverSystem.isFlanking(attacker, target, Game.tactical.map)) {
            chance += 30;
        }

        return Utils.clamp(chance, 0, 100);
    }

    // Calculate damage
    calculateDamage(attacker, target, isCrit) {
        const weapon = attacker.weapon || { damage: { min: 2, max: 4 }, critDamage: { min: 4, max: 6 } };
        const damageRange = isCrit ? weapon.critDamage : weapon.damage;
        let damage = Utils.random(damageRange.min, damageRange.max);

        // Armor reduction
        const armor = target.armor || 0;
        damage = Math.max(1, damage - armor);

        return damage;
    }

    // Check for overwatch triggers along path
    checkOverwatchTriggers(unit, path) {
        const triggers = [];
        const enemies = unit.team === 'player' ? Game.tactical.enemies : Game.tactical.units;

        enemies.forEach(enemy => {
            if (enemy.state !== GAME_CONSTANTS.STATE_OVERWATCH) return;

            // Check if any path tile is in overwatch range
            for (const tile of path) {
                if (LOSSystem.hasLineOfSight(enemy.gridX, enemy.gridY, tile.x, tile.y, Game.tactical.map)) {
                    triggers.push(enemy);
                    break;
                }
            }
        });

        return triggers;
    }

    // Trigger overwatch shot
    triggerOverwatch(watcher, target) {
        if (watcher.state !== GAME_CONSTANTS.STATE_OVERWATCH) return;

        this.logCombat(`${watcher.name} takes overwatch shot at ${target.name}!`, 'info');

        // Overwatch shot with penalty
        const originalAim = watcher.aim;
        watcher.aim -= 15; // Overwatch penalty

        this.executeShoot(watcher, target);

        watcher.aim = originalAim;
        watcher.state = GAME_CONSTANTS.STATE_IDLE;

        // Remove from overwatch list
        const idx = Game.tactical.overwatchUnits.indexOf(watcher);
        if (idx > -1) {
            Game.tactical.overwatchUnits.splice(idx, 1);
        }
    }

    // Animate unit movement along path
    animateMovement(unit, path, callback) {
        if (path.length === 0) {
            callback();
            return;
        }

        let index = 0;
        const moveStep = () => {
            if (index >= path.length) {
                callback();
                return;
            }

            const tile = path[index];
            unit.gridX = tile.x;
            unit.gridY = tile.y;
            index++;

            setTimeout(moveStep, 100);
        };

        moveStep();
    }

    // Move to next unit
    nextUnit() {
        const units = Game.tactical.phase === 'player' ? Game.tactical.units : Game.tactical.enemies;

        // Find next unit with actions
        const nextIndex = units.findIndex(u =>
            u.state !== GAME_CONSTANTS.STATE_DEAD &&
            u.actionsRemaining > 0
        );

        if (nextIndex !== -1) {
            this.selectUnit(units[nextIndex]);
        } else {
            // End phase
            this.endPhase();
        }
    }

    // End current phase
    endPhase() {
        if (Game.tactical.phase === 'player') {
            Game.tactical.phase = 'enemy';
            this.logCombat('Enemy turn', 'info');
            AISystem.executeEnemyTurn();
        } else {
            this.endTurn();
        }
    }

    // End current turn
    endTurn() {
        Game.tactical.currentTurn++;
        Game.tactical.stats.turnsElapsed++;
        Game.tactical.phase = 'player';

        // Reset all unit actions
        this.resetAllUnitsActions();

        // Clear overwatch
        Game.tactical.overwatchUnits = [];

        // Apply status effects (burn, poison, etc.)
        this.processStatusEffects();

        // Check objectives
        this.checkObjectives();

        // Check win/loss conditions
        if (this.checkVictory()) {
            this.endCombat(true);
            return;
        }
        if (this.checkDefeat()) {
            this.endCombat(false);
            return;
        }

        EventBus.emit('turnStart', { turn: Game.tactical.currentTurn, phase: 'player' });
        this.logCombat(`Turn ${Game.tactical.currentTurn}`, 'info');

        // Select first available unit
        const firstUnit = Game.tactical.units.find(u => u.state !== GAME_CONSTANTS.STATE_DEAD);
        if (firstUnit) {
            this.selectUnit(firstUnit);
        }
    }

    // Process status effects at turn end
    processStatusEffects() {
        const allUnits = [...Game.tactical.units, ...Game.tactical.enemies];

        allUnits.forEach(unit => {
            if (unit.state === GAME_CONSTANTS.STATE_DEAD) return;

            // Process burning
            if (unit.burning > 0) {
                DamageSystem.applyDamage(unit, 2, null, false);
                unit.burning--;
                this.logCombat(`${unit.name} takes burn damage`, 'hit');
            }

            // Process poison
            if (unit.poisoned > 0) {
                DamageSystem.applyDamage(unit, 1, null, false);
                unit.poisoned--;
                this.logCombat(`${unit.name} takes poison damage`, 'hit');
            }
        });
    }

    // Check objectives
    checkObjectives() {
        Game.tactical.objectives.forEach(obj => {
            if (obj.complete) return;

            switch (obj.type) {
                case 'elimination':
                    const enemiesAlive = Game.tactical.enemies.filter(e => e.state !== GAME_CONSTANTS.STATE_DEAD).length;
                    obj.complete = enemiesAlive === 0;
                    break;
                case 'defend':
                    if (Game.tactical.currentTurn >= obj.turns) {
                        obj.complete = true;
                    }
                    break;
            }

            if (obj.complete) {
                EventBus.emit('objectiveComplete', obj);
                this.logCombat(`Objective complete: ${obj.description}`, 'info');
            }
        });
    }

    // Check victory conditions
    checkVictory() {
        return Game.tactical.objectives.every(obj => obj.complete || obj.optional);
    }

    // Check defeat conditions
    checkDefeat() {
        const soldiersAlive = Game.tactical.units.filter(s => s.state !== GAME_CONSTANTS.STATE_DEAD).length;
        return soldiersAlive === 0;
    }

    // End combat
    endCombat(victory) {
        Game.tactical.active = false;

        const results = {
            victory,
            stats: Game.tactical.stats,
            mission: Game.tactical.mission,
            soldiers: Game.tactical.units,
            enemies: Game.tactical.enemies
        };

        EventBus.emit('combatEnd', results);

        if (victory) {
            this.logCombat('MISSION COMPLETE', 'info');
        } else {
            this.logCombat('MISSION FAILED', 'info');
        }
    }

    // Add entry to combat log
    logCombat(message, type = 'info') {
        Game.tactical.combatLog.push({ message, type, turn: Game.tactical.currentTurn });
        EventBus.emit('combatLogAdd', { message, type });
    }
}

// Global instance
const CombatSystem = new CombatSystemClass();
