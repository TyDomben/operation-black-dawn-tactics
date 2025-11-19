// Operation Black Dawn - Campaign Manager

class CampaignManagerClass {
    // Start new campaign
    startNewCampaign(settings) {
        Game.reset();

        // Apply settings
        Game.settings = { ...Game.settings, ...settings };

        // Initialize campaign
        Game.campaign.started = true;

        // Create starting soldiers (4-6)
        for (let i = 0; i < 4; i++) {
            const soldier = new Soldier();
            Game.addSoldier(soldier);
        }

        // Starting equipment
        Game.addItem('weapons', 'assault_rifle_basic', 4);
        Game.addItem('weapons', 'shotgun_basic', 2);
        Game.addItem('weapons', 'sniper_basic', 1);
        Game.addItem('armor', 'armor_kevlar', 6);
        Game.addItem('items', 'grenade_frag', 4);
        Game.addItem('items', 'medkit', 2);

        // Generate initial missions
        for (let i = 0; i < 2; i++) {
            const type = Utils.randomPick(['elimination', 'supply_raid', 'extraction']);
            const mission = MissionManager.generateMission(type, 1);
            if (mission) {
                Game.availableMissions.push(mission);
            }
        }

        EventBus.emit('campaignStart', { settings });
        return true;
    }

    // Continue saved campaign
    continueCampaign(slot = 0) {
        if (SaveSystem.loadGame(slot)) {
            Game.campaign.started = true;
            EventBus.emit('campaignContinue', {});
            return true;
        }
        return false;
    }

    // End campaign
    endCampaign(victory) {
        const result = {
            victory,
            stats: {
                days: Game.campaign.day,
                missions: Game.campaign.missionCount,
                kills: Game.campaign.enemiesKilled,
                losses: Game.campaign.soldiersLost
            }
        };

        EventBus.emit('campaignEnd', result);
        return result;
    }

    // Check for game over
    checkGameOver() {
        if (Game.threatLevel >= 100) {
            this.endCampaign(false);
            return true;
        }
        return false;
    }
}

// Global instance
const CampaignManager = new CampaignManagerClass();
