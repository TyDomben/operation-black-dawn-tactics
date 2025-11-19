// Operation Black Dawn - Armor Database

const ARMOR_DATA = {
    // ============================================
    // LIGHT ARMOR
    // ============================================
    armor_kevlar: {
        id: 'armor_kevlar',
        name: 'Kevlar Vest',
        type: 'light',
        tier: 1,
        hp: 0,
        armor: 0,
        mobility: 0,
        dodge: 5,
        utility: 1,
        description: 'Basic body armor. Standard issue equipment.'
    },
    armor_light_plated: {
        id: 'armor_light_plated',
        name: 'Plated Vest',
        type: 'light',
        tier: 2,
        hp: 2,
        armor: 1,
        mobility: 0,
        dodge: 5,
        utility: 1,
        description: 'Reinforced vest with alien alloy plates.'
    },
    armor_spider: {
        id: 'armor_spider',
        name: 'Spider Suit',
        type: 'light',
        tier: 2,
        hp: 2,
        armor: 0,
        mobility: 1,
        dodge: 10,
        utility: 1,
        grapple: true,
        description: 'Lightweight suit with grappling hook.'
    },
    armor_wraith: {
        id: 'armor_wraith',
        name: 'Wraith Suit',
        type: 'light',
        tier: 3,
        hp: 4,
        armor: 0,
        mobility: 2,
        dodge: 15,
        utility: 1,
        grapple: true,
        phase: true,
        description: 'Advanced suit with phase shift ability.'
    },

    // ============================================
    // MEDIUM ARMOR
    // ============================================
    armor_carapace: {
        id: 'armor_carapace',
        name: 'Carapace Armor',
        type: 'medium',
        tier: 1,
        hp: 2,
        armor: 1,
        mobility: 0,
        dodge: 0,
        utility: 1,
        description: 'Heavier armor with better protection.'
    },
    armor_skeleton: {
        id: 'armor_skeleton',
        name: 'Skeleton Suit',
        type: 'medium',
        tier: 2,
        hp: 3,
        armor: 1,
        mobility: 1,
        dodge: 10,
        utility: 1,
        grapple: true,
        description: 'Exoskeleton suit with enhanced mobility.'
    },
    armor_predator: {
        id: 'armor_predator',
        name: 'Predator Armor',
        type: 'medium',
        tier: 2,
        hp: 4,
        armor: 1,
        mobility: 0,
        dodge: 0,
        utility: 2,
        description: 'Balanced armor with extra utility slot.'
    },
    armor_warden: {
        id: 'armor_warden',
        name: 'Warden Armor',
        type: 'medium',
        tier: 3,
        hp: 6,
        armor: 2,
        mobility: 0,
        dodge: 0,
        utility: 2,
        description: 'Advanced powered armor.'
    },

    // ============================================
    // HEAVY ARMOR
    // ============================================
    armor_titan: {
        id: 'armor_titan',
        name: 'Titan Armor',
        type: 'heavy',
        tier: 2,
        hp: 6,
        armor: 2,
        mobility: -2,
        dodge: -10,
        utility: 1,
        description: 'Maximum protection, reduced mobility.'
    },
    armor_e_x_o: {
        id: 'armor_e_x_o',
        name: 'E.X.O. Suit',
        type: 'heavy',
        tier: 2,
        hp: 5,
        armor: 1,
        mobility: -1,
        dodge: -5,
        utility: 1,
        heavyWeapon: true,
        description: 'Powered exosuit that can mount heavy weapons.'
    },
    armor_w_a_r: {
        id: 'armor_w_a_r',
        name: 'W.A.R. Suit',
        type: 'heavy',
        tier: 3,
        hp: 8,
        armor: 3,
        mobility: -1,
        dodge: -5,
        utility: 1,
        heavyWeapon: true,
        shieldWall: true,
        description: 'Ultimate powered armor with shieldwall ability.'
    },

    // ============================================
    // SPECIAL ARMOR
    // ============================================
    armor_ghost: {
        id: 'armor_ghost',
        name: 'Ghost Armor',
        type: 'special',
        tier: 2,
        hp: 3,
        armor: 0,
        mobility: 1,
        dodge: 20,
        utility: 1,
        stealth: true,
        description: 'Stealth suit with active camouflage.'
    },
    armor_archangel: {
        id: 'armor_archangel',
        name: 'Archangel Armor',
        type: 'special',
        tier: 3,
        hp: 5,
        armor: 1,
        mobility: 0,
        dodge: 0,
        utility: 1,
        flight: true,
        description: 'Powered armor with flight capability.'
    },
    armor_psi: {
        id: 'armor_psi',
        name: 'Psi Armor',
        type: 'special',
        tier: 3,
        hp: 4,
        armor: 1,
        mobility: 0,
        dodge: 0,
        utility: 1,
        willBonus: 20,
        psiBonus: 10,
        description: 'Armor that amplifies psionic abilities.'
    },
    armor_rage: {
        id: 'armor_rage',
        name: 'Berserker Armor',
        type: 'special',
        tier: 3,
        hp: 8,
        armor: 0,
        mobility: 2,
        dodge: 0,
        utility: 0,
        rage: true,
        description: 'Armor that boosts melee damage and speed.'
    }
};

// Armor upgrades/utilities
const ARMOR_UTILITIES = {
    plating: {
        id: 'plating',
        name: 'Alloy Plating',
        armor: 1,
        description: '+1 armor'
    },
    hp_boost: {
        id: 'hp_boost',
        name: 'Reinforced Plating',
        hp: 2,
        description: '+2 HP'
    },
    tac_vest: {
        id: 'tac_vest',
        name: 'Tactical Rigging',
        utility: 1,
        description: '+1 utility slot'
    },
    mobility_boost: {
        id: 'mobility_boost',
        name: 'Mobility Servo',
        mobility: 2,
        description: '+2 mobility'
    },
    hazmat: {
        id: 'hazmat',
        name: 'Hazmat Vest',
        poisonImmune: true,
        fireResist: 50,
        description: 'Immunity to poison, +50% fire resist'
    },
    stasis_vest: {
        id: 'stasis_vest',
        name: 'Stasis Vest',
        autoHeal: 2,
        description: 'Regenerate 2 HP per turn'
    }
};

// Export
window.ARMOR_DATA = ARMOR_DATA;
window.ARMOR_UTILITIES = ARMOR_UTILITIES;
