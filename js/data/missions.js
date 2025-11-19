// Operation Black Dawn - Missions Database

const STORY_MISSIONS = [
    // ============================================
    // ACT 1 - AWAKENING (Missions 1-6)
    // ============================================
    {
        id: 'mission_01_first_strike',
        name: 'First Strike',
        type: 'elimination',
        act: 1,
        difficulty: 1,
        map: 'warehouse_district',
        description: 'Eliminate a terrorist cell operating in the warehouse district.',
        briefing: 'Commander, we\'ve identified a terrorist cell preparing an attack. Your squad must neutralize all hostiles.',
        objectives: [
            { id: 'kill_all', description: 'Eliminate all enemies', type: 'elimination' }
        ],
        enemies: [
            { type: 'terrorist_militia', count: 4 },
            { type: 'terrorist_rifleman', count: 2 }
        ],
        rewards: { money: 200, supplies: 50, intel: 20 },
        unlocks: ['mission_02_supply_cache']
    },
    {
        id: 'mission_02_supply_cache',
        name: 'Supply Cache',
        type: 'supply_raid',
        act: 1,
        difficulty: 1,
        map: 'industrial_yard',
        description: 'Raid an enemy supply depot and extract resources.',
        briefing: 'Intelligence has located enemy supplies. Secure the cache before they can evacuate it.',
        objectives: [
            { id: 'secure_supplies', description: 'Secure supply crates (0/3)', type: 'interact', count: 3 },
            { id: 'extract', description: 'Extract all soldiers', type: 'extraction' }
        ],
        turnLimit: 12,
        enemies: [
            { type: 'terrorist_militia', count: 3 },
            { type: 'terrorist_rifleman', count: 3 },
            { type: 'terrorist_grenadier', count: 1 }
        ],
        rewards: { money: 150, supplies: 150, intel: 10 },
        unlocks: ['mission_03_vip_rescue']
    },
    {
        id: 'mission_03_vip_rescue',
        name: 'High Value Target',
        type: 'extraction',
        act: 1,
        difficulty: 2,
        map: 'office_building',
        description: 'Rescue a captured scientist from enemy captivity.',
        briefing: 'Dr. Chen has critical research data. Extract her before the enemy transfers her.',
        objectives: [
            { id: 'find_vip', description: 'Locate the VIP', type: 'find' },
            { id: 'extract_vip', description: 'Extract the VIP', type: 'escort' }
        ],
        turnLimit: 15,
        enemies: [
            { type: 'terrorist_rifleman', count: 4 },
            { type: 'terrorist_shotgunner', count: 2 },
            { type: 'terrorist_officer', count: 1 }
        ],
        rewards: { money: 250, intel: 50 },
        unlocks: ['mission_04_sabotage', 'research_alien_materials']
    },
    {
        id: 'mission_04_sabotage',
        name: 'Dark Signal',
        type: 'sabotage',
        act: 1,
        difficulty: 2,
        map: 'communications_facility',
        description: 'Destroy enemy communications equipment.',
        briefing: 'The enemy is coordinating attacks via this comms station. Destroy all transmitters.',
        objectives: [
            { id: 'destroy_comms', description: 'Destroy transmitters (0/4)', type: 'destroy', count: 4 },
            { id: 'extract', description: 'Extract all soldiers', type: 'extraction' }
        ],
        enemies: [
            { type: 'terrorist_rifleman', count: 5 },
            { type: 'terrorist_sniper', count: 2 },
            { type: 'terrorist_heavy', count: 1 }
        ],
        rewards: { money: 200, supplies: 75, intel: 30 },
        unlocks: ['mission_05_alien_contact']
    },
    {
        id: 'mission_05_alien_contact',
        name: 'First Contact',
        type: 'elimination',
        act: 1,
        difficulty: 3,
        map: 'crash_site',
        description: 'Investigate a crash site and engage unknown hostiles.',
        briefing: 'Something crashed outside the city. Reports of... unusual hostiles. Investigate and neutralize.',
        objectives: [
            { id: 'investigate', description: 'Investigate crash site', type: 'find' },
            { id: 'kill_all', description: 'Eliminate all hostiles', type: 'elimination' }
        ],
        enemies: [
            { type: 'alien_sectoid', count: 4 },
            { type: 'alien_floater', count: 2 }
        ],
        rewards: { money: 300, alienMaterials: 10 },
        unlocks: ['mission_06_retaliation', 'research_alien_weapons']
    },
    {
        id: 'mission_06_retaliation',
        name: 'Retaliation',
        type: 'terror',
        act: 1,
        difficulty: 3,
        map: 'city_center',
        description: 'Defend civilians from an alien terror attack.',
        briefing: 'Aliens are attacking civilians downtown! Save as many as you can while eliminating the threat.',
        objectives: [
            { id: 'save_civilians', description: 'Save civilians (0/6 minimum)', type: 'protect', count: 6, total: 12 },
            { id: 'kill_all', description: 'Eliminate all hostiles', type: 'elimination' }
        ],
        enemies: [
            { type: 'alien_sectoid', count: 3 },
            { type: 'alien_floater', count: 3 },
            { type: 'alien_chryssalid', count: 2 }
        ],
        rewards: { money: 400, supplies: 100, intel: 40 },
        unlocks: ['act_2']
    },

    // ============================================
    // ACT 2 - ESCALATION (Missions 7-13)
    // ============================================
    {
        id: 'mission_07_rogue_element',
        name: 'Rogue Element',
        type: 'elimination',
        act: 2,
        difficulty: 4,
        map: 'military_base',
        description: 'Engage rogue military forces who have allied with the aliens.',
        briefing: 'General Morrison\'s forces have gone rogue. Eliminate this threat before they can cause more damage.',
        objectives: [
            { id: 'kill_all', description: 'Eliminate all enemies', type: 'elimination' }
        ],
        enemies: [
            { type: 'rogue_trooper', count: 4 },
            { type: 'rogue_sergeant', count: 2 },
            { type: 'rogue_sniper', count: 1 },
            { type: 'rogue_heavy', count: 1 }
        ],
        rewards: { money: 350, supplies: 100, intel: 50 },
        unlocks: ['mission_08_data_heist']
    },
    {
        id: 'mission_08_data_heist',
        name: 'Data Heist',
        type: 'hack',
        act: 2,
        difficulty: 4,
        map: 'server_farm',
        description: 'Hack enemy servers to retrieve critical intelligence.',
        briefing: 'This facility contains intel on alien operations. Get our specialist in to hack the mainframe.',
        objectives: [
            { id: 'hack_server', description: 'Hack the mainframe', type: 'hack' },
            { id: 'extract', description: 'Extract all soldiers', type: 'extraction' }
        ],
        turnLimit: 14,
        enemies: [
            { type: 'rogue_trooper', count: 5 },
            { type: 'rogue_engineer', count: 2 },
            { type: 'robot_turret', count: 3 }
        ],
        rewards: { money: 300, intel: 100 },
        unlocks: ['mission_09_abduction', 'research_magnetic_weapons']
    },
    {
        id: 'mission_09_abduction',
        name: 'Abduction',
        type: 'capture',
        act: 2,
        difficulty: 5,
        map: 'alien_ship_interior',
        description: 'Capture a live alien for interrogation.',
        briefing: 'We need a live specimen to understand their plans. Use non-lethal force on at least one.',
        objectives: [
            { id: 'capture_alien', description: 'Capture an alien alive', type: 'capture' },
            { id: 'kill_rest', description: 'Eliminate remaining hostiles', type: 'elimination' }
        ],
        enemies: [
            { type: 'alien_sectoid', count: 3 },
            { type: 'alien_viper', count: 2 },
            { type: 'alien_muton', count: 2 }
        ],
        rewards: { money: 400, alienMaterials: 20 },
        unlocks: ['research_alien_biology']
    },
    {
        id: 'mission_10_defend_base',
        name: 'Base Defense',
        type: 'defend',
        act: 2,
        difficulty: 5,
        map: 'player_base',
        description: 'Defend your headquarters from an alien assault.',
        briefing: 'They\'ve found us! All hands to battle stations - defend the base at all costs!',
        objectives: [
            { id: 'survive', description: 'Survive 10 turns', type: 'defend', turns: 10 },
            { id: 'protect_core', description: 'Protect the command center', type: 'protect' }
        ],
        enemies: [
            { type: 'alien_sectoid', count: 4 },
            { type: 'alien_muton', count: 3 },
            { type: 'alien_floater', count: 3 },
            { type: 'alien_heavy_floater', count: 1 }
        ],
        reinforcements: [
            { turn: 4, enemies: [{ type: 'alien_muton', count: 2 }] },
            { turn: 7, enemies: [{ type: 'alien_chryssalid', count: 2 }] }
        ],
        rewards: { money: 500, supplies: 150 },
        unlocks: ['mission_11_convoy_ambush']
    },
    {
        id: 'mission_11_convoy_ambush',
        name: 'Highway Interdiction',
        type: 'ambush',
        act: 2,
        difficulty: 5,
        map: 'highway',
        description: 'Ambush an enemy convoy carrying alien technology.',
        briefing: 'A convoy is transporting alien artifacts. Set up an ambush and secure the cargo.',
        objectives: [
            { id: 'destroy_vehicles', description: 'Stop the convoy vehicles (0/3)', type: 'destroy', count: 3 },
            { id: 'secure_cargo', description: 'Secure the cargo', type: 'interact' }
        ],
        turnLimit: 10,
        enemies: [
            { type: 'rogue_trooper', count: 6 },
            { type: 'rogue_heavy', count: 2 },
            { type: 'robot_mec_trooper', count: 1 }
        ],
        rewards: { money: 350, alienMaterials: 25, elerium: 5 },
        unlocks: ['mission_12_psi_facility']
    },
    {
        id: 'mission_12_psi_facility',
        name: 'Mind Games',
        type: 'sabotage',
        act: 2,
        difficulty: 6,
        map: 'research_facility',
        description: 'Destroy an alien psionic research facility.',
        briefing: 'The aliens are experimenting with mind control. Destroy this facility before they perfect it.',
        objectives: [
            { id: 'destroy_equipment', description: 'Destroy psi equipment (0/3)', type: 'destroy', count: 3 },
            { id: 'rescue_prisoners', description: 'Rescue test subjects', type: 'escort', optional: true },
            { id: 'extract', description: 'Extract all soldiers', type: 'extraction' }
        ],
        enemies: [
            { type: 'alien_sectoid', count: 4 },
            { type: 'alien_sectoid_commander', count: 1 },
            { type: 'alien_muton', count: 3 },
            { type: 'robot_drone', count: 3 }
        ],
        rewards: { money: 450, alienMaterials: 30, intel: 75 },
        unlocks: ['research_psi_abilities']
    },
    {
        id: 'mission_13_assassination',
        name: 'Head of the Snake',
        type: 'assassination',
        act: 2,
        difficulty: 6,
        map: 'enemy_hq',
        description: 'Assassinate General Morrison, leader of the rogue forces.',
        briefing: 'Morrison is the key to the rogue military alliance with the aliens. Take him out.',
        objectives: [
            { id: 'kill_target', description: 'Eliminate General Morrison', type: 'assassination', target: 'boss_morrison' },
            { id: 'extract', description: 'Extract all soldiers', type: 'extraction' }
        ],
        enemies: [
            { type: 'rogue_trooper', count: 6 },
            { type: 'rogue_sergeant', count: 2 },
            { type: 'rogue_sniper', count: 2 },
            { type: 'rogue_captain', count: 1 }
        ],
        boss: {
            type: 'rogue_captain',
            name: 'General Morrison',
            hp: 15,
            abilities: ['command', 'mark_target', 'overwatch', 'tactical_retreat']
        },
        rewards: { money: 600, intel: 100 },
        unlocks: ['act_3']
    },

    // ============================================
    // ACT 3 - COUNTEROFFENSIVE (Missions 14-20)
    // ============================================
    {
        id: 'mission_14_robot_factory',
        name: 'Assembly Line',
        type: 'sabotage',
        act: 3,
        difficulty: 7,
        map: 'robot_factory',
        description: 'Destroy the robot production facility.',
        briefing: 'This factory is producing robot soldiers. Shut it down permanently.',
        objectives: [
            { id: 'destroy_core', description: 'Destroy factory core', type: 'destroy' },
            { id: 'extract', description: 'Extract all soldiers', type: 'extraction' }
        ],
        enemies: [
            { type: 'robot_drone', count: 6 },
            { type: 'robot_mec_trooper', count: 3 },
            { type: 'robot_sentinel', count: 2 },
            { type: 'robot_heavy_mec', count: 1 }
        ],
        rewards: { money: 500, supplies: 200, alienMaterials: 20 },
        unlocks: ['mission_15_alien_base']
    },
    {
        id: 'mission_15_alien_base',
        name: 'Base Assault',
        type: 'base_assault',
        act: 3,
        difficulty: 8,
        map: 'alien_base',
        description: 'Assault the alien ground base.',
        briefing: 'This is it. The main alien base on Earth. Take it down.',
        objectives: [
            { id: 'kill_all', description: 'Eliminate all hostiles', type: 'elimination' },
            { id: 'destroy_beacon', description: 'Destroy the beacon', type: 'destroy' }
        ],
        enemies: [
            { type: 'alien_sectoid', count: 4 },
            { type: 'alien_muton', count: 4 },
            { type: 'alien_muton_elite', count: 2 },
            { type: 'alien_cyberdisc', count: 1 },
            { type: 'alien_sectoid_commander', count: 1 }
        ],
        rewards: { money: 700, alienMaterials: 50, elerium: 20 },
        unlocks: ['mission_16_mothership']
    },
    {
        id: 'mission_16_mothership',
        name: 'Boarding Action',
        type: 'elimination',
        act: 3,
        difficulty: 8,
        map: 'alien_mothership',
        description: 'Board the alien mothership and disable it.',
        briefing: 'We\'re boarding the mothership. Fight through and disable their engines.',
        objectives: [
            { id: 'reach_engine', description: 'Reach the engine room', type: 'find' },
            { id: 'disable_engines', description: 'Disable the engines', type: 'interact' },
            { id: 'extract', description: 'Extract before destruction', type: 'extraction' }
        ],
        turnLimit: 20,
        enemies: [
            { type: 'alien_sectoid', count: 6 },
            { type: 'alien_viper', count: 3 },
            { type: 'alien_muton_elite', count: 3 },
            { type: 'alien_archon', count: 2 }
        ],
        rewards: { money: 800, alienMaterials: 75, elerium: 30 },
        unlocks: ['mission_17_bunker']
    },
    {
        id: 'mission_17_bunker',
        name: 'Last Stand',
        type: 'defend',
        act: 3,
        difficulty: 9,
        map: 'underground_bunker',
        description: 'Defend the civilian bunker from alien assault.',
        briefing: 'Thousands of civilians are in this bunker. Hold the line until evacuation is complete.',
        objectives: [
            { id: 'survive', description: 'Survive 15 turns', type: 'defend', turns: 15 },
            { id: 'protect_entrance', description: 'Protect bunker entrances', type: 'protect' }
        ],
        enemies: [
            { type: 'alien_sectoid', count: 6 },
            { type: 'alien_muton', count: 4 },
            { type: 'alien_chryssalid', count: 4 },
            { type: 'alien_berserker', count: 2 }
        ],
        reinforcements: [
            { turn: 5, enemies: [{ type: 'alien_floater', count: 3 }] },
            { turn: 10, enemies: [{ type: 'alien_muton_elite', count: 2 }] },
            { turn: 12, enemies: [{ type: 'alien_archon', count: 1 }] }
        ],
        rewards: { money: 600, supplies: 250 },
        unlocks: ['mission_18_psi_gate']
    },
    {
        id: 'mission_18_psi_gate',
        name: 'Gateway',
        type: 'sabotage',
        act: 3,
        difficulty: 9,
        map: 'psi_network',
        description: 'Destroy the psionic gateway device.',
        briefing: 'The aliens are opening a portal for reinforcements. Destroy it now!',
        objectives: [
            { id: 'destroy_gate', description: 'Destroy the gateway', type: 'destroy' },
            { id: 'kill_all', description: 'Eliminate all hostiles', type: 'elimination' }
        ],
        enemies: [
            { type: 'alien_sectoid_commander', count: 3 },
            { type: 'alien_archon', count: 3 },
            { type: 'alien_muton_elite', count: 4 }
        ],
        rewards: { money: 700, alienMaterials: 60, elerium: 25 },
        unlocks: ['mission_19_temple_ship']
    },
    {
        id: 'mission_19_temple_ship',
        name: 'Temple Ship',
        type: 'assassination',
        act: 3,
        difficulty: 10,
        map: 'temple_ship',
        description: 'Board the temple ship and defeat the Uber Ethereal.',
        briefing: 'The alien command ship has arrived. This is the final battle. Good luck, Commander.',
        objectives: [
            { id: 'reach_commander', description: 'Reach the command chamber', type: 'find' },
            { id: 'kill_ethereal', description: 'Defeat the Uber Ethereal', type: 'assassination', target: 'uber_ethereal' }
        ],
        enemies: [
            { type: 'alien_sectoid_commander', count: 4 },
            { type: 'alien_muton_elite', count: 6 },
            { type: 'alien_archon', count: 4 },
            { type: 'alien_sectopod', count: 2 }
        ],
        boss: {
            type: 'alien_ethereal',
            name: 'Uber Ethereal',
            hp: 35,
            armor: 3,
            psi: 150,
            abilities: ['rift', 'mind_control', 'psi_lance', 'teleport', 'dimensional_rift']
        },
        rewards: { money: 1000, alienMaterials: 100, elerium: 50 },
        unlocks: ['mission_20_finale']
    },
    {
        id: 'mission_20_finale',
        name: 'New Dawn',
        type: 'elimination',
        act: 3,
        difficulty: 10,
        map: 'city_ruins',
        isFinale: true,
        description: 'Eliminate the last alien resistance and secure Earth.',
        briefing: 'The alien leadership is broken, but pockets of resistance remain. Finish this war.',
        objectives: [
            { id: 'kill_all', description: 'Eliminate all remaining hostiles', type: 'elimination' }
        ],
        enemies: [
            { type: 'alien_sectoid', count: 4 },
            { type: 'alien_muton_elite', count: 4 },
            { type: 'alien_archon', count: 2 },
            { type: 'alien_berserker', count: 2 },
            { type: 'alien_sectopod', count: 1 }
        ],
        rewards: { money: 2000 },
        ending: 'victory'
    }
];

// Mission generator for procedural missions
const MISSION_TEMPLATES = {
    elimination: {
        objectives: [{ id: 'kill_all', description: 'Eliminate all enemies', type: 'elimination' }],
        baseReward: { money: 200, supplies: 50 }
    },
    extraction: {
        objectives: [
            { id: 'find_vip', description: 'Locate the VIP', type: 'find' },
            { id: 'extract_vip', description: 'Extract the VIP', type: 'escort' }
        ],
        turnLimit: 15,
        baseReward: { money: 250, intel: 30 }
    },
    sabotage: {
        objectives: [
            { id: 'destroy_targets', description: 'Destroy objectives', type: 'destroy', count: 3 },
            { id: 'extract', description: 'Extract all soldiers', type: 'extraction' }
        ],
        baseReward: { money: 200, supplies: 75 }
    },
    defend: {
        objectives: [
            { id: 'survive', description: 'Survive 8 turns', type: 'defend', turns: 8 }
        ],
        baseReward: { money: 300, supplies: 100 }
    },
    hack: {
        objectives: [
            { id: 'hack_target', description: 'Hack the terminal', type: 'hack' },
            { id: 'extract', description: 'Extract all soldiers', type: 'extraction' }
        ],
        turnLimit: 12,
        baseReward: { money: 200, intel: 75 }
    },
    supply_raid: {
        objectives: [
            { id: 'secure_supplies', description: 'Secure supply crates', type: 'interact', count: 3 },
            { id: 'extract', description: 'Extract all soldiers', type: 'extraction' }
        ],
        turnLimit: 10,
        baseReward: { money: 100, supplies: 200 }
    },
    terror: {
        objectives: [
            { id: 'save_civilians', description: 'Save civilians', type: 'protect', count: 6, total: 12 },
            { id: 'kill_all', description: 'Eliminate all hostiles', type: 'elimination' }
        ],
        baseReward: { money: 400, supplies: 100 }
    }
};

// Export
window.STORY_MISSIONS = STORY_MISSIONS;
window.MISSION_TEMPLATES = MISSION_TEMPLATES;
