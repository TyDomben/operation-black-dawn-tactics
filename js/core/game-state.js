// Operation Black Dawn - Game State Management

class GameState {
    constructor() {
        this.reset();
    }

    reset() {
        // Meta
        this.initialized = false;
        this.currentScreen = 'main-menu';
        this.paused = false;
        this.gameSpeed = 1;

        // Campaign settings
        this.settings = {
            commanderName: 'Commander',
            difficulty: 'veteran',
            ironman: false,
            tutorialEnabled: true
        };

        // Campaign state
        this.campaign = {
            started: false,
            day: 1,
            month: 3,
            year: 2025,
            missionCount: 0,
            victoriesCount: 0,
            defeatsCount: 0,
            soldiersLost: 0,
            enemiesKilled: 0
        };

        // Resources
        this.resources = {
            money: 1000,
            intel: 50,
            supplies: 100,
            alienMaterials: 0,
            elerium: 0
        };

        // Threat level (0-100)
        this.threatLevel = 0;

        // Base facilities (4x4 grid)
        this.base = {
            facilities: this.initializeBase(),
            power: 10,
            powerUsed: 0
        };

        // Soldiers roster
        this.soldiers = [];

        // Available missions
        this.availableMissions = [];
        this.completedMissions = [];

        // Research
        this.research = {
            completed: [],
            inProgress: null,
            progress: 0,
            queue: []
        };

        // Armory/Inventory
        this.inventory = {
            weapons: {},
            armor: {},
            items: {}
        };

        // Tactical state
        this.tactical = {
            active: false,
            mission: null,
            map: null,
            units: [],
            enemies: [],
            currentTurn: 0,
            currentUnitIndex: 0,
            phase: 'player', // 'player', 'enemy', 'environment'
            selectedUnit: null,
            selectedAction: null,
            targetingMode: false,
            overwatchUnits: [],
            objectives: [],
            combatLog: [],
            stats: {
                shotsFired: 0,
                shotsHit: 0,
                damageDealt: 0,
                damageTaken: 0,
                kills: 0,
                turnsElapsed: 0
            }
        };

        // Statistics
        this.stats = {
            totalKills: 0,
            totalMissions: 0,
            totalShotsFired: 0,
            totalDamageDealt: 0,
            favoriteClass: null,
            longestMission: 0,
            perfectMissions: 0
        };

        // Achievement tracking
        this.achievements = {};

        // Dark events queue
        this.darkEvents = [];
    }

    initializeBase() {
        // 4x4 grid of facility slots
        const facilities = [];
        for (let y = 0; y < 4; y++) {
            const row = [];
            for (let x = 0; x < 4; x++) {
                row.push({
                    type: FACILITY_TYPES.EMPTY,
                    level: 0,
                    building: false,
                    buildProgress: 0,
                    buildTime: 0
                });
            }
            facilities.push(row);
        }
        // Start with command center in middle
        facilities[1][1] = {
            type: 'command',
            level: 1,
            building: false,
            buildProgress: 100,
            buildTime: 0
        };
        return facilities;
    }

    // Campaign time management
    advanceTime(days = 1) {
        for (let i = 0; i < days; i++) {
            this.campaign.day++;
            if (this.campaign.day > 30) {
                this.campaign.day = 1;
                this.campaign.month++;
                this.monthlyUpdate();
            }
            if (this.campaign.month > 12) {
                this.campaign.month = 1;
                this.campaign.year++;
            }
            this.dailyUpdate();
        }
    }

    dailyUpdate() {
        // Progress research
        if (this.research.inProgress) {
            this.research.progress += this.getResearchRate();
        }

        // Progress facility building
        for (let y = 0; y < this.base.facilities.length; y++) {
            for (let x = 0; x < this.base.facilities[y].length; x++) {
                const facility = this.base.facilities[y][x];
                if (facility.building) {
                    facility.buildProgress++;
                    if (facility.buildProgress >= facility.buildTime) {
                        facility.building = false;
                        EventBus.emit('facilityComplete', { x, y, type: facility.type });
                    }
                }
            }
        }

        // Heal wounded soldiers
        this.soldiers.forEach(soldier => {
            if (soldier.status === 'wounded' && soldier.healTime > 0) {
                soldier.healTime--;
                if (soldier.healTime <= 0) {
                    soldier.status = 'ready';
                    soldier.currentHP = soldier.maxHP;
                }
            }
        });

        // Generate missions
        if (Math.random() < 0.3 && this.availableMissions.length < 3) {
            this.generateMission();
        }

        // Expire missions
        this.availableMissions = this.availableMissions.filter(mission => {
            if (mission.expires) {
                mission.expiresIn--;
                if (mission.expiresIn <= 0) {
                    this.threatLevel += mission.threatOnFail || 5;
                    EventBus.emit('missionExpired', mission);
                    return false;
                }
            }
            return true;
        });
    }

    monthlyUpdate() {
        // Monthly income based on regions
        const income = this.calculateMonthlyIncome();
        this.resources.money += income;

        // Monthly supply drop
        this.resources.supplies += 50;

        // Threat decay
        this.threatLevel = Math.max(0, this.threatLevel - 5);

        EventBus.emit('monthEnd', { income, month: this.campaign.month });
    }

    calculateMonthlyIncome() {
        // Base income modified by threat level
        const baseIncome = 500;
        const threatPenalty = Math.floor(this.threatLevel * 2);
        return Math.max(100, baseIncome - threatPenalty);
    }

    getResearchRate() {
        // Base rate modified by facilities
        let rate = 1;
        // Check for research labs
        this.base.facilities.flat().forEach(f => {
            if (f.type === FACILITY_TYPES.RESEARCH_LAB) {
                rate += f.level;
            }
        });
        return rate;
    }

    getBuildRate() {
        // Base build speed modified by workshops
        let rate = 1;
        this.base.facilities.flat().forEach(f => {
            if (f.type === FACILITY_TYPES.WORKSHOP) {
                rate += 0.5 * f.level;
            }
        });
        return rate;
    }

    generateMission() {
        const missionTypes = Object.values(MISSION_TYPES);
        const type = Utils.randomPick(missionTypes);

        const mission = MissionManager.generateMission(type, this.campaign.day);
        this.availableMissions.push(mission);
        EventBus.emit('newMission', mission);
    }

    // Soldier management
    addSoldier(soldier) {
        this.soldiers.push(soldier);
        EventBus.emit('soldierAdded', soldier);
    }

    removeSoldier(soldierId) {
        const index = this.soldiers.findIndex(s => s.id === soldierId);
        if (index !== -1) {
            const soldier = this.soldiers.splice(index, 1)[0];
            EventBus.emit('soldierRemoved', soldier);
            return soldier;
        }
        return null;
    }

    getSoldierById(id) {
        return this.soldiers.find(s => s.id === id);
    }

    getAvailableSoldiers() {
        return this.soldiers.filter(s => s.status === 'ready');
    }

    // Resource management
    canAfford(costs) {
        for (const [resource, amount] of Object.entries(costs)) {
            if ((this.resources[resource] || 0) < amount) {
                return false;
            }
        }
        return true;
    }

    spendResources(costs) {
        if (!this.canAfford(costs)) return false;
        for (const [resource, amount] of Object.entries(costs)) {
            this.resources[resource] -= amount;
        }
        EventBus.emit('resourcesChanged', this.resources);
        return true;
    }

    addResources(rewards) {
        for (const [resource, amount] of Object.entries(rewards)) {
            this.resources[resource] = (this.resources[resource] || 0) + amount;
        }
        EventBus.emit('resourcesChanged', this.resources);
    }

    // Inventory management
    addItem(category, itemId, quantity = 1) {
        if (!this.inventory[category]) {
            this.inventory[category] = {};
        }
        this.inventory[category][itemId] = (this.inventory[category][itemId] || 0) + quantity;
        EventBus.emit('inventoryChanged', { category, itemId, quantity });
    }

    removeItem(category, itemId, quantity = 1) {
        if (this.inventory[category] && this.inventory[category][itemId] >= quantity) {
            this.inventory[category][itemId] -= quantity;
            if (this.inventory[category][itemId] <= 0) {
                delete this.inventory[category][itemId];
            }
            return true;
        }
        return false;
    }

    hasItem(category, itemId, quantity = 1) {
        return (this.inventory[category]?.[itemId] || 0) >= quantity;
    }

    // Current date formatted
    getFormattedDate() {
        return Utils.formatDate(this.campaign);
    }

    // Get difficulty modifiers
    getDifficultyMod() {
        return DIFFICULTY_MODIFIERS[this.settings.difficulty] || DIFFICULTY_MODIFIERS.veteran;
    }

    // Tactical helpers
    getCurrentUnit() {
        if (!this.tactical.active) return null;
        const allUnits = [...this.tactical.units, ...this.tactical.enemies];
        return allUnits[this.tactical.currentUnitIndex] || null;
    }

    getUnitAt(x, y) {
        const allUnits = [...this.tactical.units, ...this.tactical.enemies];
        return allUnits.find(u => u.gridX === x && u.gridY === y && u.state !== GAME_CONSTANTS.STATE_DEAD);
    }

    isPlayerTurn() {
        return this.tactical.phase === 'player';
    }

    // Save/Load state
    toJSON() {
        return {
            settings: this.settings,
            campaign: this.campaign,
            resources: this.resources,
            threatLevel: this.threatLevel,
            base: this.base,
            soldiers: this.soldiers.map(s => s.toJSON ? s.toJSON() : s),
            availableMissions: this.availableMissions,
            completedMissions: this.completedMissions,
            research: this.research,
            inventory: this.inventory,
            stats: this.stats,
            achievements: this.achievements,
            darkEvents: this.darkEvents
        };
    }

    fromJSON(data) {
        Object.assign(this.settings, data.settings);
        Object.assign(this.campaign, data.campaign);
        Object.assign(this.resources, data.resources);
        this.threatLevel = data.threatLevel;
        this.base = data.base;
        this.soldiers = data.soldiers.map(s => {
            const soldier = new Soldier(s);
            return soldier;
        });
        this.availableMissions = data.availableMissions;
        this.completedMissions = data.completedMissions;
        this.research = data.research;
        this.inventory = data.inventory;
        this.stats = data.stats;
        this.achievements = data.achievements;
        this.darkEvents = data.darkEvents;
    }
}

// Global game state instance
const Game = new GameState();
