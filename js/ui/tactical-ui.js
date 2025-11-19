// Operation Black Dawn - Tactical UI

class TacticalUIClass {
    init() {
        EventBus.on('unitSelected', (unit) => this.onUnitSelected(unit));
        EventBus.on('turnStart', (data) => this.onTurnStart(data));
        EventBus.on('combatEnd', (data) => this.onCombatEnd(data));
        EventBus.on('tileHovered', (tile) => this.onTileHovered(tile));
    }

    onUnitSelected(unit) {
        if (unit.team === 'player') {
            document.getElementById('action-bar').classList.remove('hidden');
        } else {
            document.getElementById('action-bar').classList.add('hidden');
        }
        UIManager.updateActionBar();
        this.updateTurnOrder();
    }

    onTurnStart(data) {
        this.updateTurnOrder();
        this.updateObjectives();

        if (data.phase === 'player') {
            document.getElementById('action-bar').classList.remove('hidden');
        } else {
            document.getElementById('action-bar').classList.add('hidden');
        }
    }

    onCombatEnd(results) {
        // Show results screen
        document.getElementById('result-title').textContent = results.victory ? 'MISSION COMPLETE' : 'MISSION FAILED';
        document.getElementById('result-title').className = results.victory ? 'victory' : 'defeat';
        document.getElementById('stat-kills').textContent = results.stats.kills;
        document.getElementById('stat-losses').textContent = results.stats.soldiersLost || 0;
        document.getElementById('stat-turns').textContent = results.stats.turnsElapsed;
        document.getElementById('stat-shots').textContent = results.stats.shotsFired;

        // Show rewards
        const rewardList = document.getElementById('reward-list');
        if (rewardList) {
            rewardList.innerHTML = '';
            Object.entries(results.rewards).forEach(([resource, amount]) => {
                const div = document.createElement('div');
                div.textContent = `+${amount} ${resource}`;
                rewardList.appendChild(div);
            });
        }

        UIManager.showScreen('mission-results');

        // Handle continue
        document.getElementById('btn-continue-results')?.addEventListener('click', () => {
            MissionManager.endMission(results.victory, results.stats);
            UIManager.showScreen('strategic-view');
            UIManager.updateStrategicUI();
        }, { once: true });
    }

    onTileHovered(tile) {
        const enemy = Game.getUnitAt(tile.x, tile.y);
        const targetInfo = document.getElementById('target-info');

        if (enemy && enemy.team === 'enemy' && Game.tactical.selectedUnit) {
            targetInfo.classList.remove('hidden');
            targetInfo.querySelector('.target-name').textContent = enemy.name;

            const hitChance = CombatSystem.calculateHitChance(Game.tactical.selectedUnit, enemy);
            targetInfo.querySelector('.chance-value').textContent = `${hitChance}%`;

            const weapon = Game.tactical.selectedUnit.weapon;
            if (weapon) {
                targetInfo.querySelector('.damage-preview span').textContent =
                    `Damage: ${weapon.damage.min}-${weapon.damage.max}`;
                const critChance = CombatSystem.calculateCritChance(Game.tactical.selectedUnit, enemy);
                targetInfo.querySelector('.crit-chance span').textContent = `Crit: ${critChance}%`;
            }
        } else {
            targetInfo.classList.add('hidden');
        }
    }

    updateTurnOrder() {
        const container = document.getElementById('turn-portraits');
        if (!container) return;

        container.innerHTML = '';
        const allUnits = [...Game.tactical.units, ...Game.tactical.enemies]
            .filter(u => u.state !== GAME_CONSTANTS.STATE_DEAD);

        allUnits.forEach(unit => {
            const div = document.createElement('div');
            div.className = 'turn-portrait';
            if (unit === Game.tactical.selectedUnit) div.classList.add('active');
            if (unit.team === 'enemy') div.classList.add('enemy');
            container.appendChild(div);
        });
    }

    updateObjectives() {
        const list = document.getElementById('objective-list');
        if (!list) return;

        list.innerHTML = '';
        Game.tactical.objectives.forEach(obj => {
            const li = document.createElement('li');
            li.textContent = obj.description;
            if (obj.complete) li.classList.add('complete');
            list.appendChild(li);
        });
    }
}

// Global instance
const TacticalUI = new TacticalUIClass();
