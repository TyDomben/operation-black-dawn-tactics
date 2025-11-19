// Operation Black Dawn - Achievement Manager

class AchievementManagerClass {
    constructor() {
        this.unlocked = new Set();
        this.progress = {};
    }

    init() {
        // Subscribe to events
        EventBus.on('enemyKilled', (data) => this.onEnemyKilled(data));
        EventBus.on('missionComplete', (data) => this.onMissionComplete(data));
        EventBus.on('soldierRecruited', (soldier) => this.onSoldierRecruited(soldier));
        EventBus.on('soldierPromoted', (soldier) => this.onSoldierPromoted(soldier));
        EventBus.on('facilityBuilt', (facility) => this.onFacilityBuilt(facility));
        EventBus.on('researchComplete', (project) => this.onResearchComplete(project));
        EventBus.on('shotFired', (data) => this.onShotFired(data));
        EventBus.on('bondCreated', (data) => this.onBondCreated());
        EventBus.on('campaignComplete', (data) => this.onCampaignComplete(data));
    }

    // Load progress from save
    loadProgress(data) {
        this.unlocked = new Set(data.unlocked || []);
        this.progress = data.progress || {};
    }

    // Save progress
    getSaveData() {
        return {
            unlocked: Array.from(this.unlocked),
            progress: this.progress
        };
    }

    // Initialize progress for a stat
    initProgress(stat, initial = 0) {
        if (!(stat in this.progress)) {
            this.progress[stat] = initial;
        }
    }

    // Increment progress stat
    incrementProgress(stat, amount = 1) {
        this.initProgress(stat);
        this.progress[stat] += amount;
        return this.progress[stat];
    }

    // Check and unlock achievement
    checkAchievement(id) {
        if (this.unlocked.has(id)) return false;

        const achievement = ACHIEVEMENTS_DATA[id];
        if (!achievement) return false;

        this.unlocked.add(id);
        this.showUnlockNotification(achievement);
        EventBus.emit('achievementUnlocked', achievement);

        // Check for completionist
        if (this.unlocked.size === Object.keys(ACHIEVEMENTS_DATA).length - 1) {
            this.checkAchievement('completionist');
        }

        return true;
    }

    // Show unlock notification
    showUnlockNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <div class="achievement-title">Achievement Unlocked!</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-points">+${achievement.points} points</div>
            </div>
        `;

        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }

    // Event handlers
    onEnemyKilled(data) {
        const kills = this.incrementProgress('totalKills');

        // Check kill milestones
        if (kills >= 1) this.checkAchievement('first_blood');
        if (kills >= 100) this.checkAchievement('angel_of_death');
        if (kills >= 500) this.checkAchievement('mass_extinction');

        // Critical hits
        if (data.critical) {
            const crits = this.incrementProgress('totalCrits');
            if (crits >= 50) this.checkAchievement('headhunter');
        }

        // Overwatch kills
        if (data.overwatch) {
            const owKills = this.incrementProgress('overwatchKills');
            if (owKills >= 25) this.checkAchievement('overwatch_ace');
        }

        // Flanking kills
        if (data.flanking) {
            const flankKills = this.incrementProgress('flankKills');
            if (flankKills >= 50) this.checkAchievement('flanking_master');
        }

        // Psi kills
        if (data.psionic) {
            const psiKills = this.incrementProgress('psiKills');
            if (psiKills >= 25) this.checkAchievement('psi_warrior');
        }

        // Range achievements
        if (data.range >= 20) {
            this.checkAchievement('long_shot');
        }
        if (data.range <= 4) {
            const closeKills = this.incrementProgress('closeKills');
            if (closeKills >= 25) this.checkAchievement('close_quarters');
        }

        // One shot kill
        if (data.damage >= 10 && data.oneShot) {
            this.checkAchievement('one_shot');
        }

        // Grenade multikill
        if (data.grenade && data.killCount >= 3) {
            this.checkAchievement('grenadier');
        }
    }

    onMissionComplete(data) {
        const wins = this.incrementProgress('missionsWon');

        // Mission count achievements
        if (wins >= 1) this.checkAchievement('mission_complete');
        if (wins >= 25) this.checkAchievement('veteran_commander');

        // Flawless mission
        if (data.damageTaken === 0 && data.victory) {
            this.checkAchievement('squad_wipe');
        }

        // Quick mission
        if (data.turns <= 5 && data.victory) {
            this.checkAchievement('speed_demon');
        }

        // No casualties streak
        if (data.soldiersLost === 0) {
            const streak = this.incrementProgress('noLossStreak');
            if (streak >= 10) this.checkAchievement('no_casualties');
        } else {
            this.progress.noLossStreak = 0;
        }

        // Solo victory
        if (data.survivingSoldiers === 1 && data.victory) {
            this.checkAchievement('last_stand');
        }

        // Mission type achievements
        if (data.missionType === 'extraction') {
            const count = this.incrementProgress('extractionMissions');
            if (count >= 10) this.checkAchievement('extraction_expert');
        }
        if (data.missionType === 'sabotage') {
            const count = this.incrementProgress('sabotageMissions');
            if (count >= 10) this.checkAchievement('saboteur');
        }
        if (data.missionType === 'terror') {
            const count = this.incrementProgress('terrorMissions');
            if (count >= 5) this.checkAchievement('terror_response');

            if (data.allCiviliansSaved) {
                this.checkAchievement('civilian_hero');
            }
        }
        if (data.missionType === 'defend' && data.isBaseDefense) {
            this.checkAchievement('base_defender');
        }

        // Faction missions
        if (data.faction === 'alien') {
            const count = this.incrementProgress('alienMissions');
            if (count >= 5) this.checkAchievement('alien_hunter');
        }
        if (data.faction === 'rogue') {
            const count = this.incrementProgress('rogueMissions');
            if (count >= 5) this.checkAchievement('rogue_stopper');
        }

        // Story missions
        if (data.storyMission) {
            this.checkStoryAchievement(data.missionId);
        }

        // Elite squad
        if (data.allRank5Plus) {
            this.checkAchievement('elite_team');
        }
    }

    checkStoryAchievement(missionId) {
        const storyAchievements = {
            'mission_05_alien_contact': 'first_contact_complete',
            'mission_13_assassination': 'morrison_defeated',
            'mission_19_temple_ship': 'ethereal_defeated',
            'mission_20_finale': 'new_dawn'
        };

        if (storyAchievements[missionId]) {
            this.checkAchievement(storyAchievements[missionId]);
        }

        // Check act completion
        const completedMissions = this.progress.completedStoryMissions || [];
        completedMissions.push(missionId);
        this.progress.completedStoryMissions = completedMissions;

        const act1Missions = ['mission_01', 'mission_02', 'mission_03', 'mission_04', 'mission_05', 'mission_06'];
        const act2Missions = ['mission_07', 'mission_08', 'mission_09', 'mission_10', 'mission_11', 'mission_12', 'mission_13'];
        const act3Missions = ['mission_14', 'mission_15', 'mission_16', 'mission_17', 'mission_18', 'mission_19', 'mission_20'];

        if (act1Missions.every(m => completedMissions.some(c => c.includes(m)))) {
            this.checkAchievement('act_1_complete');
        }
        if (act2Missions.every(m => completedMissions.some(c => c.includes(m)))) {
            this.checkAchievement('act_2_complete');
        }
        if (act3Missions.every(m => completedMissions.some(c => c.includes(m)))) {
            this.checkAchievement('act_3_complete');
        }
    }

    onSoldierRecruited(soldier) {
        const count = this.incrementProgress('soldiersRecruited');
        if (count >= 1) this.checkAchievement('first_recruit');

        // Check roster size
        if (Game.soldiers.length >= 20) {
            this.checkAchievement('full_roster');
        }

        // Check for all classes
        this.checkAllClasses();
    }

    onSoldierPromoted(soldier) {
        if (soldier.rank >= 6) { // Colonel
            this.checkAchievement('max_rank');
        }

        // Check for all abilities
        const classData = SOLDIER_CLASS_DATA[soldier.class];
        if (classData && soldier.abilities.length >= classData.abilities.length) {
            this.checkAchievement('class_master');
        }
    }

    checkAllClasses() {
        const classes = Object.values(SOLDIER_CLASSES);
        const hasAll = classes.every(c =>
            Game.soldiers.some(s => s.class === c)
        );
        if (hasAll) {
            this.checkAchievement('diverse_squad');
        }
    }

    onFacilityBuilt(facility) {
        const count = this.incrementProgress('facilitiesBuilt');
        if (count >= 1) this.checkAchievement('base_builder');

        // Track specific facilities
        if (!this.progress.builtFacilities) {
            this.progress.builtFacilities = [];
        }
        this.progress.builtFacilities.push(facility.type);

        // Check specific facility achievements
        const generators = this.progress.builtFacilities.filter(f => f === 'generator').length;
        if (generators >= 3) this.checkAchievement('power_grid');

        const workshops = this.progress.builtFacilities.filter(f => f === 'workshop').length;
        if (workshops >= 2) this.checkAchievement('workshop_master');

        if (facility.type === 'advanced_lab') {
            this.checkAchievement('research_hub');
        }
        if (facility.type === 'ots') {
            this.checkAchievement('training_grounds');
        }

        // Check for all facilities
        const allTypes = Object.values(FACILITY_TYPES).filter(t => t !== 'empty');
        const hasAll = allTypes.every(t => this.progress.builtFacilities.includes(t));
        if (hasAll) {
            this.checkAchievement('fully_operational');
        }
    }

    onResearchComplete(project) {
        const count = this.incrementProgress('researchComplete');
        if (count >= 1) this.checkAchievement('first_discovery');
        if (count >= 20) this.checkAchievement('knowledge_seeker');

        // Track completed research
        if (!this.progress.completedResearch) {
            this.progress.completedResearch = [];
        }
        this.progress.completedResearch.push(project.id);

        // Specific research achievements
        if (project.id === 'plasma_weapons') this.checkAchievement('plasma_unlocked');
        if (project.id === 'psi_research') this.checkAchievement('psi_unlocked');
        if (project.id === 'elerium_research') this.checkAchievement('elerium_expert');

        // Check for all autopsies
        const autopsies = Object.values(RESEARCH_DATA).filter(r => r.category === 'autopsy');
        const allAutopsies = autopsies.every(a =>
            this.progress.completedResearch.includes(a.id)
        );
        if (allAutopsies) this.checkAchievement('autopsy_complete');

        // Check for all armor research
        const armorResearch = Object.values(RESEARCH_DATA).filter(r => r.category === 'armor');
        const allArmor = armorResearch.every(r =>
            this.progress.completedResearch.includes(r.id)
        );
        if (allArmor) this.checkAchievement('armor_master');

        // Check for all weapon research
        const weaponResearch = Object.values(RESEARCH_DATA).filter(r => r.category === 'weapons');
        const allWeapons = weaponResearch.every(r =>
            this.progress.completedResearch.includes(r.id)
        );
        if (allWeapons) this.checkAchievement('weapons_master');
    }

    onShotFired(data) {
        const shots = this.incrementProgress('shotsFired');
        if (shots >= 1000) this.checkAchievement('full_auto');
    }

    onBondCreated() {
        this.checkAchievement('bonded');
    }

    onCampaignComplete(data) {
        this.checkAchievement('new_dawn');

        if (data.ironman) {
            this.checkAchievement('ironman');
        }
        if (data.difficulty === 'impossible') {
            this.checkAchievement('impossible');
        }
        if (data.soldiersLost === 0) {
            this.checkAchievement('perfectionist');
        }
        if (data.days <= 100) {
            this.checkAchievement('speed_runner');
        }
    }

    // Get total achievement points
    getTotalPoints() {
        let total = 0;
        this.unlocked.forEach(id => {
            const achievement = ACHIEVEMENTS_DATA[id];
            if (achievement) {
                total += achievement.points;
            }
        });
        return total;
    }

    // Get achievements by category
    getAchievementsByCategory(category) {
        return Object.values(ACHIEVEMENTS_DATA).filter(a => a.category === category);
    }

    // Get achievement unlock status
    isUnlocked(id) {
        return this.unlocked.has(id);
    }

    // Get progress percentage
    getProgressPercentage() {
        return (this.unlocked.size / Object.keys(ACHIEVEMENTS_DATA).length) * 100;
    }
}

// Global instance
const AchievementManager = new AchievementManagerClass();
