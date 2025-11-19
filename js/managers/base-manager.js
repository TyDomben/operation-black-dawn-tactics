// Operation Black Dawn - Base Manager

class BaseManagerClass {
    // Build facility
    buildFacility(x, y, facilityId) {
        const facility = FACILITIES_DATA[facilityId];
        if (!facility || !facility.buildable !== false) return false;

        // Check if slot is empty
        const slot = Game.base.facilities[y]?.[x];
        if (!slot || slot.type !== FACILITY_TYPES.EMPTY) return false;

        // Check power
        if (this.getPowerAvailable() < facility.power) return false;

        // Check cost
        if (!Game.canAfford(facility.cost)) return false;

        // Spend resources
        Game.spendResources(facility.cost);

        // Start building
        Game.base.facilities[y][x] = {
            type: facilityId,
            level: 1,
            building: true,
            buildProgress: 0,
            buildTime: facility.buildTime
        };

        EventBus.emit('facilityStarted', { x, y, type: facilityId });
        return true;
    }

    // Upgrade facility
    upgradeFacility(x, y) {
        const slot = Game.base.facilities[y]?.[x];
        if (!slot || slot.building) return false;

        const facility = FACILITIES_DATA[slot.type];
        if (!facility || slot.level >= facility.maxLevel) return false;

        // Cost scales with level
        const cost = {};
        Object.entries(facility.cost).forEach(([res, amt]) => {
            cost[res] = Math.floor(amt * (slot.level + 1) * 0.5);
        });

        if (!Game.canAfford(cost)) return false;
        Game.spendResources(cost);

        slot.level++;
        EventBus.emit('facilityUpgraded', { x, y, level: slot.level });
        return true;
    }

    // Get power available
    getPowerAvailable() {
        let generated = 10; // Base power
        let consumed = 0;

        Game.base.facilities.flat().forEach(slot => {
            if (slot.building) return;
            const facility = FACILITIES_DATA[slot.type];
            if (!facility) return;

            if (facility.power < 0) {
                generated += Math.abs(facility.power) * slot.level;
            } else {
                consumed += facility.power;
            }
        });

        return generated - consumed;
    }

    // Get facility count
    getFacilityCount(facilityId) {
        return Game.base.facilities.flat().filter(s => s.type === facilityId).length;
    }

    // Get facility effects
    getFacilityEffects() {
        const effects = {
            researchSpeed: 0,
            buildSpeed: 0,
            healingSpeed: 0,
            soldierCapacity: 8,
            missionSlots: 1
        };

        Game.base.facilities.flat().forEach(slot => {
            if (slot.building || !slot.type) return;

            switch (slot.type) {
                case 'research_lab':
                    effects.researchSpeed += slot.level;
                    break;
                case 'workshop':
                    effects.buildSpeed += slot.level * 0.25;
                    break;
                case 'infirmary':
                    effects.healingSpeed += slot.level * 0.25;
                    break;
                case 'barracks':
                    effects.soldierCapacity += slot.level * 4;
                    break;
                case 'comms':
                    effects.missionSlots += slot.level;
                    break;
            }
        });

        return effects;
    }
}

// Global instance
const BaseManager = new BaseManagerClass();
