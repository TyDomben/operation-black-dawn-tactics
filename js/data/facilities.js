// Operation Black Dawn - Base Facilities

const FACILITIES_DATA = {
    // ============================================
    // CORE FACILITIES
    // ============================================
    command: {
        id: 'command',
        name: 'Command Center',
        category: 'core',
        buildable: false,
        power: 0,
        description: 'Central command and control. Cannot be removed.',
        effects: {
            description: 'Provides base operations.'
        }
    },
    power_generator: {
        id: 'power_generator',
        name: 'Power Generator',
        category: 'core',
        buildTime: 7,
        cost: { supplies: 100, money: 150 },
        power: -10, // Generates power (negative consumption)
        maxLevel: 3,
        description: 'Generates power for other facilities.',
        effects: {
            level1: 'Generates 10 power.',
            level2: 'Generates 15 power.',
            level3: 'Generates 20 power.'
        },
        adjacencyBonus: {
            type: 'power_generator',
            bonus: '+2 power per adjacent generator'
        }
    },

    // ============================================
    // SOLDIER FACILITIES
    // ============================================
    barracks: {
        id: 'barracks',
        name: 'Barracks',
        category: 'soldiers',
        buildTime: 5,
        cost: { supplies: 75, money: 100 },
        power: 1,
        maxLevel: 2,
        description: 'Houses soldiers and allows recruitment.',
        effects: {
            level1: '+4 soldier capacity.',
            level2: '+6 soldier capacity, +5% XP gain.'
        }
    },
    training_center: {
        id: 'training_center',
        name: 'Training Center',
        category: 'soldiers',
        buildTime: 10,
        cost: { supplies: 125, money: 200 },
        power: 3,
        maxLevel: 2,
        prerequisites: ['barracks'],
        description: 'Advanced training facilities for soldiers.',
        effects: {
            level1: 'Soldiers can train while not on missions.',
            level2: '+25% training speed, unlock respec ability.'
        }
    },
    infirmary: {
        id: 'infirmary',
        name: 'Infirmary',
        category: 'soldiers',
        buildTime: 5,
        cost: { supplies: 50, money: 75 },
        power: 1,
        maxLevel: 2,
        description: 'Medical facility for wounded soldiers.',
        effects: {
            level1: '-25% healing time.',
            level2: '-50% healing time, can treat critical wounds.'
        }
    },
    defense_matrix: {
        id: 'defense_matrix',
        name: 'Defense Matrix',
        category: 'soldiers',
        buildTime: 14,
        cost: { supplies: 200, money: 300 },
        power: 5,
        maxLevel: 2,
        description: 'Base defense systems.',
        effects: {
            level1: '+2 soldiers in base defense missions.',
            level2: 'Auto-turrets during base defense.'
        }
    },

    // ============================================
    // RESEARCH FACILITIES
    // ============================================
    research_lab: {
        id: 'research_lab',
        name: 'Research Lab',
        category: 'research',
        buildTime: 10,
        cost: { supplies: 125, money: 200 },
        power: 3,
        maxLevel: 3,
        description: 'Scientific research facility.',
        effects: {
            level1: '+1 research speed.',
            level2: '+2 research speed.',
            level3: '+3 research speed, can research 2 projects.'
        },
        adjacencyBonus: {
            type: 'research_lab',
            bonus: '+1 research speed per adjacent lab'
        }
    },
    proving_grounds: {
        id: 'proving_grounds',
        name: 'Proving Ground',
        category: 'research',
        buildTime: 12,
        cost: { supplies: 150, money: 250 },
        power: 3,
        maxLevel: 2,
        prerequisites: ['research_lab'],
        description: 'Experimental weapons and armor testing.',
        effects: {
            level1: 'Unlock experimental projects.',
            level2: '-25% experimental project time.'
        }
    },
    psi_lab: {
        id: 'psi_lab',
        name: 'Psi Lab',
        category: 'research',
        buildTime: 14,
        cost: { supplies: 175, money: 300, alienMaterials: 15 },
        power: 4,
        maxLevel: 2,
        prerequisites: ['research_lab'],
        requiresResearch: 'psi_research',
        description: 'Train soldiers in psionic abilities.',
        effects: {
            level1: 'Test soldiers for psi potential, train psionics.',
            level2: '+50% psi training speed.'
        }
    },

    // ============================================
    // ENGINEERING FACILITIES
    // ============================================
    engineering: {
        id: 'engineering',
        name: 'Engineering Bay',
        category: 'engineering',
        buildTime: 7,
        cost: { supplies: 100, money: 150 },
        power: 2,
        maxLevel: 3,
        description: 'Build weapons, armor, and equipment.',
        effects: {
            level1: 'Can build equipment.',
            level2: '+1 build speed.',
            level3: '+2 build speed, can build 2 items.'
        }
    },
    workshop: {
        id: 'workshop',
        name: 'Workshop',
        category: 'engineering',
        buildTime: 10,
        cost: { supplies: 125, money: 200 },
        power: 3,
        maxLevel: 2,
        prerequisites: ['engineering'],
        description: 'Advanced manufacturing workshop.',
        effects: {
            level1: '-25% build costs.',
            level2: '-50% build costs.'
        },
        adjacencyBonus: {
            type: 'workshop',
            bonus: '-10% build costs per adjacent workshop'
        }
    },
    foundry: {
        id: 'foundry',
        name: 'Foundry',
        category: 'engineering',
        buildTime: 14,
        cost: { supplies: 175, money: 300 },
        power: 4,
        maxLevel: 2,
        prerequisites: ['workshop'],
        description: 'Advanced weapon modifications.',
        effects: {
            level1: 'Unlock advanced weapon mods.',
            level2: '+1 attachment slot on all weapons.'
        }
    },

    // ============================================
    // INTELLIGENCE FACILITIES
    // ============================================
    comms: {
        id: 'comms',
        name: 'Resistance Comms',
        category: 'intel',
        buildTime: 7,
        cost: { supplies: 75, money: 125 },
        power: 2,
        maxLevel: 3,
        description: 'Expand contact with resistance cells.',
        effects: {
            level1: '+1 mission available.',
            level2: '+2 missions available.',
            level3: '+3 missions available, priority missions.'
        }
    },
    shadow_chamber: {
        id: 'shadow_chamber',
        name: 'Shadow Chamber',
        category: 'intel',
        buildTime: 14,
        cost: { supplies: 150, money: 250, alienMaterials: 20 },
        power: 3,
        maxLevel: 2,
        prerequisites: ['comms'],
        description: 'Advanced intelligence analysis.',
        effects: {
            level1: 'Preview enemy composition before missions.',
            level2: 'Unlock dark events countering.'
        }
    },

    // ============================================
    // SPECIAL FACILITIES
    // ============================================
    memorial: {
        id: 'memorial',
        name: 'Memorial',
        category: 'special',
        buildTime: 3,
        cost: { supplies: 25, money: 50 },
        power: 0,
        maxLevel: 1,
        description: 'Honor fallen soldiers.',
        effects: {
            level1: '+5 will for all soldiers.'
        }
    },
    ufo_analysis: {
        id: 'ufo_analysis',
        name: 'UFO Analysis',
        category: 'special',
        buildTime: 14,
        cost: { supplies: 200, money: 300, alienMaterials: 25 },
        power: 5,
        maxLevel: 2,
        prerequisites: ['research_lab'],
        requiresResearch: 'alien_materials',
        description: 'Analyze captured UFO components.',
        effects: {
            level1: 'Analyze UFO missions available.',
            level2: '+50% salvage from UFO missions.'
        }
    },
    armory: {
        id: 'armory',
        name: 'Advanced Armory',
        category: 'special',
        buildTime: 10,
        cost: { supplies: 125, money: 200 },
        power: 2,
        maxLevel: 2,
        prerequisites: ['engineering'],
        description: 'Advanced weapon storage and customization.',
        effects: {
            level1: '+1 utility item slot.',
            level2: 'Share weapon upgrades between soldiers.'
        }
    }
};

// Export
window.FACILITIES_DATA = FACILITIES_DATA;
