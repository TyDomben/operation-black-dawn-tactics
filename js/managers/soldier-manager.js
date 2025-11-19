// Operation Black Dawn - Soldier Manager

class SoldierManagerClass {
    // Recruit new soldier
    recruitSoldier(soldierClass = null) {
        const cost = { money: 50, supplies: 25 };
        if (!Game.canAfford(cost)) return null;

        // Check capacity
        const capacity = BaseManager.getFacilityEffects().soldierCapacity;
        if (Game.soldiers.length >= capacity) return null;

        Game.spendResources(cost);

        const soldier = new Soldier({
            class: soldierClass || Utils.randomPick(Object.values(SOLDIER_CLASSES))
        });

        Game.addSoldier(soldier);
        return soldier;
    }

    // Dismiss soldier
    dismissSoldier(soldierId) {
        return Game.removeSoldier(soldierId);
    }

    // Train soldier (increase XP)
    trainSoldier(soldierId) {
        const soldier = Game.getSoldierById(soldierId);
        if (!soldier || soldier.status !== 'ready') return false;

        soldier.status = 'training';
        soldier.trainingTime = 3; // Days

        return true;
    }

    // Update soldier training
    updateTraining() {
        Game.soldiers.forEach(soldier => {
            if (soldier.status === 'training') {
                soldier.trainingTime--;
                if (soldier.trainingTime <= 0) {
                    soldier.status = 'ready';
                    soldier.xp += 25;
                    EventBus.emit('trainingComplete', soldier);
                }
            }
        });
    }

    // Create bond between soldiers
    createBond(soldier1Id, soldier2Id) {
        const s1 = Game.getSoldierById(soldier1Id);
        const s2 = Game.getSoldierById(soldier2Id);
        if (!s1 || !s2) return false;

        s1.bond = soldier2Id;
        s2.bond = soldier1Id;

        EventBus.emit('bondCreated', { soldier1: s1, soldier2: s2 });
        return true;
    }

    // Get soldiers by status
    getSoldiersByStatus(status) {
        return Game.soldiers.filter(s => s.status === status);
    }

    // Get soldiers by class
    getSoldiersByClass(soldierClass) {
        return Game.soldiers.filter(s => s.class === soldierClass);
    }
}

// Global instance
const SoldierManager = new SoldierManagerClass();
