// Operation Black Dawn - Mission Manager

class MissionManagerClass {
    // Generate a random mission
    generateMission(type, day) {
        const template = MISSION_TEMPLATES[type];
        if (!template) return null;

        const difficulty = Math.min(10, Math.floor(day / 10) + 1);
        const mapId = this.selectMap(type);

        const mission = {
            id: Utils.generateId(),
            name: this.generateMissionName(type),
            type: type,
            difficulty: difficulty,
            map: mapId,
            description: this.generateDescription(type),
            objectives: Utils.deepClone(template.objectives),
            turnLimit: template.turnLimit || 0,
            enemies: this.generateEnemyList(difficulty, type),
            rewards: this.calculateRewards(template.baseReward, difficulty),
            expires: true,
            expiresIn: Utils.random(2, 5),
            threatOnFail: difficulty * 2
        };

        return mission;
    }

    // Generate mission name
    generateMissionName(type) {
        const prefixes = ['Operation', 'Mission', 'Task Force', 'Project'];
        const adjectives = ['Silent', 'Iron', 'Shadow', 'Thunder', 'Steel', 'Ghost', 'Crimson', 'Fallen'];
        const nouns = ['Strike', 'Dawn', 'Storm', 'Eagle', 'Viper', 'Wolf', 'Hammer', 'Shield'];

        return `${Utils.randomPick(prefixes)} ${Utils.randomPick(adjectives)} ${Utils.randomPick(nouns)}`;
    }

    // Generate description
    generateDescription(type) {
        const descriptions = {
            elimination: 'Eliminate all hostile forces in the area.',
            extraction: 'Locate and extract the VIP to safety.',
            sabotage: 'Destroy enemy equipment and installations.',
            defend: 'Hold the position against enemy assault.',
            hack: 'Infiltrate and hack enemy systems.',
            supply_raid: 'Secure enemy supplies for our forces.',
            terror: 'Respond to enemy attack and save civilians.'
        };
        return descriptions[type] || 'Complete mission objectives.';
    }

    // Select appropriate map
    selectMap(type) {
        const mapsByType = {
            elimination: ['warehouse_district', 'industrial_yard', 'forest_camp'],
            extraction: ['office_building', 'enemy_hq', 'village'],
            sabotage: ['communications_facility', 'robot_factory', 'server_farm'],
            defend: ['military_base', 'underground_bunker', 'player_base'],
            hack: ['server_farm', 'research_facility', 'office_building'],
            supply_raid: ['industrial_yard', 'warehouse_district', 'highway'],
            terror: ['city_center', 'village', 'city_ruins']
        };
        const maps = mapsByType[type] || Object.keys(MAP_DATA);
        return Utils.randomPick(maps);
    }

    // Generate enemy list based on difficulty
    generateEnemyList(difficulty, missionType) {
        const enemies = [];
        const totalEnemies = 4 + Math.floor(difficulty * 1.5);

        // Determine faction based on story progress
        let factions = ['terrorist'];
        if (difficulty >= 3) factions.push('rogue_military');
        if (difficulty >= 5) factions.push('alien');
        if (difficulty >= 7) factions.push('robot');

        const faction = Utils.randomPick(factions);

        // Get enemy types for faction
        const factionEnemies = Object.entries(ENEMIES_DATA)
            .filter(([id, data]) => data.faction === faction)
            .map(([id]) => id);

        // Distribute enemies
        let remaining = totalEnemies;

        // Add basic troops
        const basicTypes = factionEnemies.filter(id =>
            ENEMIES_DATA[id].type === 'infantry'
        );
        if (basicTypes.length > 0) {
            const basicCount = Math.ceil(remaining * 0.6);
            enemies.push({ type: Utils.randomPick(basicTypes), count: basicCount });
            remaining -= basicCount;
        }

        // Add specialists
        const specialTypes = factionEnemies.filter(id =>
            ENEMIES_DATA[id].type === 'specialist'
        );
        if (specialTypes.length > 0 && remaining > 0) {
            const specCount = Math.min(2, remaining);
            enemies.push({ type: Utils.randomPick(specialTypes), count: specCount });
            remaining -= specCount;
        }

        // Add heavies for harder missions
        if (difficulty >= 3 && remaining > 0) {
            const heavyTypes = factionEnemies.filter(id =>
                ENEMIES_DATA[id].type === 'heavy'
            );
            if (heavyTypes.length > 0) {
                enemies.push({ type: Utils.randomPick(heavyTypes), count: remaining });
            }
        }

        return enemies;
    }

    // Calculate rewards
    calculateRewards(baseReward, difficulty) {
        const multiplier = 1 + (difficulty - 1) * 0.2;
        const rewards = {};

        Object.entries(baseReward).forEach(([resource, amount]) => {
            rewards[resource] = Math.floor(amount * multiplier);
        });

        return rewards;
    }

    // Start a mission
    startMission(mission, squad) {
        // Get map data
        const mapData = MAP_DATA[mission.map];
        if (!mapData) {
            console.error('Map not found:', mission.map);
            return false;
        }

        // Create map
        const map = this.createMap(mapData);

        // Position squad
        const spawnZone = mapData.spawnZones.player;
        squad.forEach((soldier, i) => {
            soldier.gridX = spawnZone.x + (i % spawnZone.w);
            soldier.gridY = spawnZone.y + Math.floor(i / spawnZone.w);
            soldier.currentHP = soldier.maxHP;
            soldier.currentWill = soldier.will;
            soldier.actionsRemaining = GAME_CONSTANTS.ACTIONS_PER_TURN;
            soldier.state = GAME_CONSTANTS.STATE_IDLE;
        });

        // Create enemies
        const enemies = Enemy.createForMission(mission.enemies, map);

        // Initialize combat
        CombatSystem.initCombat(mission, squad, enemies, map);

        return true;
    }

    // Create map from data
    createMap(mapData) {
        const map = {
            id: mapData.id,
            width: mapData.width,
            height: mapData.height,
            tiles: [],
            spawnZones: mapData.spawnZones,

            getTile(x, y) {
                if (x < 0 || x >= this.width || y < 0 || y >= this.height) return null;
                return this.tiles[y * this.width + x];
            },

            setTile(x, y, tile) {
                if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                    this.tiles[y * this.width + x] = tile;
                }
            }
        };

        // Generate tiles
        for (let y = 0; y < mapData.height; y++) {
            for (let x = 0; x < mapData.width; x++) {
                map.tiles.push(this.generateTile(x, y, mapData));
            }
        }

        return map;
    }

    // Generate a tile
    generateTile(x, y, mapData) {
        // Border walls
        if (x === 0 || y === 0 || x === mapData.width - 1 || y === mapData.height - 1) {
            return { type: TERRAIN_TYPES.WALL };
        }

        // Random cover based on density
        const coverChance = mapData.coverDensity === 'high' ? 0.15 :
                           mapData.coverDensity === 'medium' ? 0.1 : 0.05;

        if (Math.random() < coverChance) {
            const isHigh = Math.random() < 0.4;
            return {
                type: isHigh ? TERRAIN_TYPES.COVER_HIGH : TERRAIN_TYPES.COVER_LOW,
                destructible: true,
                hp: isHigh ? GAME_CONSTANTS.COVER_HP.heavy : GAME_CONSTANTS.COVER_HP.light
            };
        }

        // Some walls
        if (Math.random() < 0.05) {
            return { type: TERRAIN_TYPES.WALL };
        }

        return { type: TERRAIN_TYPES.FLOOR };
    }

    // End mission
    endMission(victory, stats) {
        const mission = Game.tactical.mission;
        if (!mission) return;

        // Calculate results
        const results = {
            victory,
            mission,
            stats,
            rewards: victory ? mission.rewards : {},
            xpGained: stats.kills * 25,
            promotions: []
        };

        // Apply rewards
        if (victory) {
            Game.addResources(mission.rewards);

            // Mark mission complete
            Game.completedMissions.push(mission.id);

            // Remove from available
            const idx = Game.availableMissions.findIndex(m => m.id === mission.id);
            if (idx > -1) {
                Game.availableMissions.splice(idx, 1);
            }
        } else {
            // Increase threat on failure
            Game.threatLevel = Math.min(100, Game.threatLevel + 10);
        }

        // Update soldiers
        Game.tactical.units.forEach(soldier => {
            soldier.missions++;
            if (soldier.state === GAME_CONSTANTS.STATE_DEAD) {
                // Soldier died - remove from roster
                Game.removeSoldier(soldier.id);
                Game.campaign.soldiersLost++;
            } else if (soldier.currentHP < soldier.maxHP * 0.5) {
                // Wounded
                soldier.wound(Math.ceil((1 - soldier.currentHP / soldier.maxHP) * 3));
            } else {
                soldier.status = 'ready';
            }
        });

        // Update campaign stats
        Game.campaign.missionCount++;
        if (victory) {
            Game.campaign.victoriesCount++;
        } else {
            Game.campaign.defeatsCount++;
        }
        Game.campaign.enemiesKilled += stats.kills;

        return results;
    }
}

// Global instance
const MissionManager = new MissionManagerClass();
