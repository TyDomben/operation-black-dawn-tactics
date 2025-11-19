// Operation Black Dawn - Weapons Database

const WEAPONS_DATA = {
    // ============================================
    // ASSAULT RIFLES
    // ============================================
    assault_rifle_basic: {
        id: 'assault_rifle_basic',
        name: 'AR-15',
        type: 'assault_rifle',
        tier: 1,
        damage: { min: 3, max: 5 },
        critDamage: { min: 5, max: 7 },
        critChance: 10,
        range: { optimal: 12, max: 20 },
        ammo: 4,
        attachments: 1,
        description: 'Standard assault rifle. Reliable and versatile.'
    },
    assault_rifle_magnetic: {
        id: 'assault_rifle_magnetic',
        name: 'Magnetic Rifle',
        type: 'assault_rifle',
        tier: 2,
        damage: { min: 5, max: 7 },
        critDamage: { min: 8, max: 10 },
        critChance: 10,
        range: { optimal: 14, max: 22 },
        ammo: 4,
        attachments: 2,
        description: 'Magnetic accelerator rifle with increased damage.'
    },
    assault_rifle_plasma: {
        id: 'assault_rifle_plasma',
        name: 'Plasma Rifle',
        type: 'assault_rifle',
        tier: 3,
        damage: { min: 7, max: 9 },
        critDamage: { min: 11, max: 13 },
        critChance: 15,
        range: { optimal: 14, max: 22 },
        ammo: 4,
        attachments: 2,
        description: 'Advanced alien plasma weapon. Devastating damage.'
    },

    // ============================================
    // SHOTGUNS
    // ============================================
    shotgun_basic: {
        id: 'shotgun_basic',
        name: 'Pump Shotgun',
        type: 'shotgun',
        tier: 1,
        damage: { min: 4, max: 6 },
        critDamage: { min: 6, max: 9 },
        critChance: 20,
        range: { optimal: 4, max: 10 },
        ammo: 3,
        attachments: 1,
        description: 'Close-range powerhouse. +40% aim at 4 tiles or less.'
    },
    shotgun_sawed_off: {
        id: 'shotgun_sawed_off',
        name: 'Sawed-Off',
        type: 'shotgun',
        tier: 1,
        damage: { min: 5, max: 8 },
        critDamage: { min: 8, max: 12 },
        critChance: 25,
        range: { optimal: 3, max: 6 },
        ammo: 2,
        attachments: 0,
        description: 'Maximum damage at point blank. Very short range.'
    },
    shotgun_magnetic: {
        id: 'shotgun_magnetic',
        name: 'Shard Gun',
        type: 'shotgun',
        tier: 2,
        damage: { min: 6, max: 8 },
        critDamage: { min: 9, max: 12 },
        critChance: 25,
        range: { optimal: 5, max: 12 },
        ammo: 3,
        attachments: 2,
        description: 'Magnetic shotgun firing metal shards.'
    },
    shotgun_plasma: {
        id: 'shotgun_plasma',
        name: 'Storm Gun',
        type: 'shotgun',
        tier: 3,
        damage: { min: 8, max: 10 },
        critDamage: { min: 12, max: 15 },
        critChance: 30,
        range: { optimal: 5, max: 12 },
        ammo: 3,
        attachments: 2,
        description: 'Alien plasma shotgun. Lethal at close range.'
    },

    // ============================================
    // SNIPER RIFLES
    // ============================================
    sniper_basic: {
        id: 'sniper_basic',
        name: 'Bolt-Action Rifle',
        type: 'sniper_rifle',
        tier: 1,
        damage: { min: 4, max: 6 },
        critDamage: { min: 7, max: 10 },
        critChance: 25,
        range: { optimal: 20, max: 30 },
        ammo: 3,
        attachments: 2,
        description: 'Long-range precision weapon. Cannot fire after moving.'
    },
    sniper_gauss: {
        id: 'sniper_gauss',
        name: 'Gauss Long Rifle',
        type: 'sniper_rifle',
        tier: 2,
        damage: { min: 6, max: 8 },
        critDamage: { min: 10, max: 13 },
        critChance: 30,
        range: { optimal: 22, max: 35 },
        ammo: 3,
        attachments: 2,
        description: 'Magnetic sniper rifle with armor-piercing rounds.'
    },
    sniper_plasma: {
        id: 'sniper_plasma',
        name: 'Plasma Lance',
        type: 'sniper_rifle',
        tier: 3,
        damage: { min: 8, max: 10 },
        critDamage: { min: 13, max: 16 },
        critChance: 35,
        range: { optimal: 25, max: 40 },
        ammo: 3,
        attachments: 2,
        description: 'Ultimate precision weapon. Devastating crits.'
    },

    // ============================================
    // SMGS
    // ============================================
    smg_basic: {
        id: 'smg_basic',
        name: 'MP5',
        type: 'smg',
        tier: 1,
        damage: { min: 2, max: 4 },
        critDamage: { min: 4, max: 6 },
        critChance: 10,
        range: { optimal: 10, max: 15 },
        ammo: 5,
        attachments: 1,
        mobility: 1,
        description: 'Compact SMG. +1 mobility when equipped.'
    },
    smg_magnetic: {
        id: 'smg_magnetic',
        name: 'Mag SMG',
        type: 'smg',
        tier: 2,
        damage: { min: 4, max: 6 },
        critDamage: { min: 6, max: 9 },
        critChance: 15,
        range: { optimal: 12, max: 18 },
        ammo: 5,
        attachments: 2,
        mobility: 1,
        description: 'Magnetic SMG with improved damage.'
    },
    smg_plasma: {
        id: 'smg_plasma',
        name: 'Plasma Pistol Rifle',
        type: 'smg',
        tier: 3,
        damage: { min: 6, max: 8 },
        critDamage: { min: 9, max: 12 },
        critChance: 15,
        range: { optimal: 12, max: 18 },
        ammo: 5,
        attachments: 2,
        mobility: 1,
        description: 'Alien-tech compact weapon.'
    },

    // ============================================
    // LMGS
    // ============================================
    lmg_basic: {
        id: 'lmg_basic',
        name: 'M249 SAW',
        type: 'lmg',
        tier: 1,
        damage: { min: 3, max: 5 },
        critDamage: { min: 5, max: 7 },
        critChance: 5,
        range: { optimal: 12, max: 20 },
        ammo: 6,
        attachments: 1,
        mobility: -2,
        description: 'Heavy machine gun. Can suppress enemies.'
    },
    lmg_magnetic: {
        id: 'lmg_magnetic',
        name: 'Mag Cannon',
        type: 'lmg',
        tier: 2,
        damage: { min: 5, max: 7 },
        critDamage: { min: 8, max: 10 },
        critChance: 10,
        range: { optimal: 14, max: 22 },
        ammo: 6,
        attachments: 2,
        mobility: -2,
        description: 'Magnetic LMG with devastating suppression.'
    },
    lmg_plasma: {
        id: 'lmg_plasma',
        name: 'Beam Cannon',
        type: 'lmg',
        tier: 3,
        damage: { min: 7, max: 9 },
        critDamage: { min: 11, max: 13 },
        critChance: 10,
        range: { optimal: 14, max: 22 },
        ammo: 6,
        attachments: 2,
        mobility: -2,
        description: 'Alien heavy beam weapon.'
    },

    // ============================================
    // PISTOLS
    // ============================================
    pistol_basic: {
        id: 'pistol_basic',
        name: '9mm Pistol',
        type: 'pistol',
        tier: 1,
        damage: { min: 1, max: 3 },
        critDamage: { min: 3, max: 5 },
        critChance: 10,
        range: { optimal: 8, max: 15 },
        ammo: 6,
        attachments: 0,
        description: 'Sidearm. Can fire after dashing.'
    },
    pistol_magnetic: {
        id: 'pistol_magnetic',
        name: 'Mag Pistol',
        type: 'pistol',
        tier: 2,
        damage: { min: 3, max: 5 },
        critDamage: { min: 5, max: 7 },
        critChance: 15,
        range: { optimal: 10, max: 18 },
        ammo: 6,
        attachments: 1,
        description: 'Magnetic sidearm.'
    },
    pistol_plasma: {
        id: 'pistol_plasma',
        name: 'Plasma Pistol',
        type: 'pistol',
        tier: 3,
        damage: { min: 5, max: 7 },
        critDamage: { min: 8, max: 10 },
        critChance: 15,
        range: { optimal: 10, max: 18 },
        ammo: 6,
        attachments: 1,
        description: 'Alien plasma sidearm.'
    },

    // ============================================
    // ROCKET LAUNCHERS
    // ============================================
    rocket_basic: {
        id: 'rocket_basic',
        name: 'Rocket Launcher',
        type: 'rocket_launcher',
        tier: 1,
        damage: { min: 6, max: 8 },
        radius: 3,
        range: { optimal: 15, max: 20 },
        ammo: 1,
        attachments: 0,
        description: 'Explosive area damage. Destroys cover.'
    },
    rocket_shredder: {
        id: 'rocket_shredder',
        name: 'Shredder Launcher',
        type: 'rocket_launcher',
        tier: 2,
        damage: { min: 5, max: 7 },
        radius: 4,
        range: { optimal: 18, max: 25 },
        ammo: 1,
        attachments: 0,
        shred: 3,
        description: 'Shreds armor from all targets in radius.'
    },
    rocket_blaster: {
        id: 'rocket_blaster',
        name: 'Blaster Launcher',
        type: 'rocket_launcher',
        tier: 3,
        damage: { min: 8, max: 12 },
        radius: 4,
        range: { optimal: 20, max: 30 },
        ammo: 1,
        attachments: 0,
        guided: true,
        description: 'Guided alien rocket. Can curve around obstacles.'
    },

    // ============================================
    // GRENADE LAUNCHERS
    // ============================================
    grenade_launcher: {
        id: 'grenade_launcher',
        name: 'Grenade Launcher',
        type: 'grenade_launcher',
        tier: 2,
        damage: { min: 4, max: 6 },
        radius: 2,
        range: { optimal: 12, max: 18 },
        ammo: 2,
        attachments: 0,
        description: 'Launch grenades at extended range.'
    },

    // ============================================
    // MELEE WEAPONS
    // ============================================
    sword_basic: {
        id: 'sword_basic',
        name: 'Combat Knife',
        type: 'melee',
        tier: 1,
        damage: { min: 4, max: 6 },
        critDamage: { min: 7, max: 10 },
        critChance: 30,
        range: { optimal: 1, max: 1 },
        description: 'Close combat weapon. Free action after dash.'
    },
    sword_arc: {
        id: 'sword_arc',
        name: 'Arc Blade',
        type: 'melee',
        tier: 2,
        damage: { min: 6, max: 8 },
        critDamage: { min: 10, max: 13 },
        critChance: 35,
        range: { optimal: 1, max: 1 },
        stun: true,
        description: 'Electrified blade. Can stun targets.'
    },
    sword_fusion: {
        id: 'sword_fusion',
        name: 'Fusion Blade',
        type: 'melee',
        tier: 3,
        damage: { min: 8, max: 12 },
        critDamage: { min: 14, max: 18 },
        critChance: 40,
        range: { optimal: 1, max: 1 },
        armorPiercing: 3,
        description: 'Alien melee weapon. Ignores armor.'
    },

    // ============================================
    // EXPERIMENTAL WEAPONS
    // ============================================
    flamethrower: {
        id: 'flamethrower',
        name: 'Flamethrower',
        type: 'special',
        tier: 2,
        damage: { min: 4, max: 6 },
        radius: 0,
        cone: true,
        range: { optimal: 5, max: 7 },
        ammo: 2,
        attachments: 0,
        burn: 2,
        description: 'Cone attack that sets enemies on fire.'
    },
    arc_thrower: {
        id: 'arc_thrower',
        name: 'Arc Thrower',
        type: 'special',
        tier: 1,
        damage: { min: 0, max: 0 },
        range: { optimal: 2, max: 4 },
        ammo: 2,
        stun: true,
        capture: true,
        description: 'Stun enemies for capture. Higher chance on wounded.'
    },
    psi_amp: {
        id: 'psi_amp',
        name: 'Psi Amp',
        type: 'psi',
        tier: 2,
        psiBonus: 20,
        description: 'Amplifies psionic abilities.'
    },
    psi_amp_advanced: {
        id: 'psi_amp_advanced',
        name: 'Advanced Psi Amp',
        type: 'psi',
        tier: 3,
        psiBonus: 40,
        description: 'Greatly amplifies psionic abilities.'
    },

    // ============================================
    // ALIEN WEAPONS
    // ============================================
    alien_rifle: {
        id: 'alien_rifle',
        name: 'Sectoid Rifle',
        type: 'assault_rifle',
        tier: 1,
        damage: { min: 3, max: 5 },
        critDamage: { min: 6, max: 8 },
        critChance: 10,
        range: { optimal: 12, max: 20 },
        ammo: 4,
        alien: true,
        description: 'Basic alien weapon. Requires research to use.'
    },
    alien_heavy: {
        id: 'alien_heavy',
        name: 'Heavy Plasma',
        type: 'lmg',
        tier: 3,
        damage: { min: 8, max: 10 },
        critDamage: { min: 12, max: 15 },
        critChance: 10,
        range: { optimal: 14, max: 22 },
        ammo: 5,
        alien: true,
        description: 'Alien heavy weapon with incredible firepower.'
    }
};

// Weapon attachments
const WEAPON_ATTACHMENTS = {
    scope: {
        id: 'scope',
        name: 'Scope',
        aimBonus: 10,
        description: '+10 aim'
    },
    extended_mag: {
        id: 'extended_mag',
        name: 'Extended Magazine',
        ammoBonus: 2,
        description: '+2 ammo capacity'
    },
    laser_sight: {
        id: 'laser_sight',
        name: 'Laser Sight',
        critBonus: 10,
        description: '+10% critical chance'
    },
    hair_trigger: {
        id: 'hair_trigger',
        name: 'Hair Trigger',
        freeReload: true,
        description: 'Reloading is a free action'
    },
    stock: {
        id: 'stock',
        name: 'Stock',
        aimBonus: 5,
        critBonus: 5,
        description: '+5 aim, +5% crit'
    },
    suppressor: {
        id: 'suppressor',
        name: 'Suppressor',
        concealment: true,
        description: 'Kills do not break concealment'
    },
    auto_loader: {
        id: 'auto_loader',
        name: 'Auto-Loader',
        freeReload: true,
        description: 'Free reload when clip empties'
    },
    repeater: {
        id: 'repeater',
        name: 'Repeater',
        executeChance: 5,
        description: '5% chance to instantly kill'
    }
};

// Export
window.WEAPONS_DATA = WEAPONS_DATA;
window.WEAPON_ATTACHMENTS = WEAPON_ATTACHMENTS;
