// Operation Black Dawn - Game Constants

const GAME_CONSTANTS = {
    // Grid settings
    TILE_SIZE: 64,
    MAP_WIDTH: 30,
    MAP_HEIGHT: 20,

    // Combat
    MAX_SQUAD_SIZE: 6,
    MIN_SQUAD_SIZE: 1,
    ACTIONS_PER_TURN: 2,

    // Cover values
    COVER_NONE: 0,
    COVER_HALF: 1,
    COVER_FULL: 2,

    // Cover bonuses
    HALF_COVER_DEFENSE: 20,
    FULL_COVER_DEFENSE: 40,
    HUNKER_BONUS: 20,
    HEIGHT_ADVANTAGE: 20,
    FLANK_BONUS: 30,

    // Combat modifiers
    BASE_HIT_CHANCE: 65,
    POINT_BLANK_BONUS: 30,
    LONG_RANGE_PENALTY: 15,
    SUPPRESSED_AIM_PENALTY: 30,

    // Morale
    BASE_WILL: 50,
    PANIC_THRESHOLD: 25,
    BERSERK_THRESHOLD: 10,

    // Movement costs
    MOVE_COST_NORMAL: 1,
    MOVE_COST_DIFFICULT: 2,
    MOVE_COST_IMPASSABLE: Infinity,

    // Damage types
    DAMAGE_KINETIC: 'kinetic',
    DAMAGE_EXPLOSIVE: 'explosive',
    DAMAGE_FIRE: 'fire',
    DAMAGE_POISON: 'poison',
    DAMAGE_PSI: 'psi',
    DAMAGE_EMP: 'emp',

    // Unit states
    STATE_IDLE: 'idle',
    STATE_MOVING: 'moving',
    STATE_SHOOTING: 'shooting',
    STATE_OVERWATCH: 'overwatch',
    STATE_HUNKERED: 'hunkered',
    STATE_SUPPRESSED: 'suppressed',
    STATE_PANICKED: 'panicked',
    STATE_BERSERK: 'berserk',
    STATE_DEAD: 'dead',
    STATE_UNCONSCIOUS: 'unconscious',

    // Soldier ranks
    RANKS: ['Rookie', 'Squaddie', 'Corporal', 'Sergeant', 'Lieutenant', 'Captain', 'Major', 'Colonel', 'Commander', 'Legend'],

    // XP requirements per level
    XP_PER_LEVEL: [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200],

    // Mission timing
    DEFAULT_TURN_LIMIT: 0, // 0 = unlimited
    EVAC_COUNTDOWN: 8,

    // AI behavior weights
    AI_AGGRESSION: {
        defensive: 0.3,
        balanced: 0.5,
        aggressive: 0.7,
        reckless: 0.9
    },

    // Destruction
    COVER_HP: {
        light: 3,
        medium: 6,
        heavy: 10
    },

    // Explosives
    GRENADE_RADIUS: 2,
    ROCKET_RADIUS: 3,

    // Line of sight
    MAX_VISION_RANGE: 25,
    CONCEALMENT_BONUS: 30
};

// Soldier classes
const SOLDIER_CLASSES = {
    ASSAULT: 'assault',
    SNIPER: 'sniper',
    HEAVY: 'heavy',
    MEDIC: 'medic',
    ENGINEER: 'engineer',
    SCOUT: 'scout',
    PSIONIC: 'psionic',
    SPECIALIST: 'specialist'
};

// Mission types
const MISSION_TYPES = {
    ELIMINATION: 'elimination',
    EXTRACTION: 'extraction',
    SABOTAGE: 'sabotage',
    DEFEND: 'defend',
    HACK: 'hack',
    ESCORT: 'escort',
    AMBUSH: 'ambush',
    STEALTH: 'stealth',
    CAPTURE: 'capture',
    BOMB_DEFUSAL: 'bomb_defusal',
    TERROR: 'terror',
    BASE_ASSAULT: 'base_assault',
    SUPPLY_RAID: 'supply_raid',
    ASSASSINATION: 'assassination',
    SURVIVAL: 'survival'
};

// Enemy factions
const ENEMY_FACTIONS = {
    TERRORIST: 'terrorist',
    ROGUE_MILITARY: 'rogue_military',
    ALIEN: 'alien',
    ROBOT: 'robot'
};

// Terrain types
const TERRAIN_TYPES = {
    FLOOR: 'floor',
    WALL: 'wall',
    COVER_LOW: 'cover_low',
    COVER_HIGH: 'cover_high',
    WATER: 'water',
    PIT: 'pit',
    LADDER: 'ladder',
    DOOR: 'door',
    WINDOW: 'window',
    DESTRUCTIBLE: 'destructible',
    EXPLOSIVE: 'explosive',
    OBJECTIVE: 'objective'
};

// Facility types
const FACILITY_TYPES = {
    EMPTY: 'empty',
    POWER: 'power',
    BARRACKS: 'barracks',
    RESEARCH_LAB: 'research_lab',
    ENGINEERING: 'engineering',
    INFIRMARY: 'infirmary',
    TRAINING: 'training',
    PSI_LAB: 'psi_lab',
    PROVING_GROUNDS: 'proving_grounds',
    COMMS: 'comms',
    WORKSHOP: 'workshop',
    DEFENSE: 'defense'
};

// Resource types
const RESOURCE_TYPES = {
    MONEY: 'money',
    INTEL: 'intel',
    SUPPLIES: 'supplies',
    ALIEN_MATERIALS: 'alien_materials',
    ELERIUM: 'elerium'
};

// Difficulty modifiers
const DIFFICULTY_MODIFIERS = {
    rookie: {
        enemyDamage: 0.8,
        enemyAim: -10,
        enemyHP: 0.8,
        playerAim: 10,
        resources: 1.5,
        xpGain: 1.2
    },
    veteran: {
        enemyDamage: 1.0,
        enemyAim: 0,
        enemyHP: 1.0,
        playerAim: 0,
        resources: 1.0,
        xpGain: 1.0
    },
    commander: {
        enemyDamage: 1.2,
        enemyAim: 10,
        enemyHP: 1.2,
        playerAim: -5,
        resources: 0.8,
        xpGain: 0.9
    },
    legendary: {
        enemyDamage: 1.5,
        enemyAim: 20,
        enemyHP: 1.5,
        playerAim: -10,
        resources: 0.6,
        xpGain: 0.8
    }
};

// Colors for rendering
const COLORS = {
    PLAYER: '#3498db',
    ENEMY: '#e74c3c',
    ALLY: '#2ecc71',
    NEUTRAL: '#95a5a6',
    SELECTED: '#f39c12',
    MOVE_RANGE: 'rgba(52, 152, 219, 0.3)',
    ATTACK_RANGE: 'rgba(231, 76, 60, 0.3)',
    COVER_HALF: '#f39c12',
    COVER_FULL: '#2ecc71',
    OVERWATCH: 'rgba(155, 89, 182, 0.4)',
    DAMAGE: '#e74c3c',
    HEAL: '#2ecc71',
    FLOOR: '#2c3e50',
    WALL: '#1a1a2e',
    GRID: 'rgba(255, 255, 255, 0.1)'
};

// Key bindings
const KEY_BINDINGS = {
    MOVE: '1',
    SHOOT: '2',
    OVERWATCH: '3',
    RELOAD: '4',
    HUNKER: '5',
    GRENADE: '6',
    ABILITY: '7',
    ITEMS: '8',
    END_TURN: 'Enter',
    CANCEL: 'Escape',
    NEXT_UNIT: 'Tab',
    ROTATE_LEFT: 'Q',
    ROTATE_RIGHT: 'E',
    ZOOM_IN: 'Z',
    ZOOM_OUT: 'X',
    CENTER: 'C'
};

// Sound effects (placeholders)
const SOUNDS = {
    SHOOT_RIFLE: 'rifle_shot',
    SHOOT_SHOTGUN: 'shotgun_shot',
    SHOOT_SNIPER: 'sniper_shot',
    SHOOT_PISTOL: 'pistol_shot',
    EXPLOSION: 'explosion',
    GRENADE_THROW: 'grenade_throw',
    RELOAD: 'reload',
    FOOTSTEP: 'footstep',
    HIT_FLESH: 'hit_flesh',
    HIT_ARMOR: 'hit_armor',
    MISS: 'miss',
    DEATH: 'death',
    ALERT: 'alert',
    OBJECTIVE: 'objective_complete',
    VICTORY: 'victory',
    DEFEAT: 'defeat'
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GAME_CONSTANTS,
        SOLDIER_CLASSES,
        MISSION_TYPES,
        ENEMY_FACTIONS,
        TERRAIN_TYPES,
        FACILITY_TYPES,
        RESOURCE_TYPES,
        DIFFICULTY_MODIFIERS,
        COLORS,
        KEY_BINDINGS,
        SOUNDS
    };
}
