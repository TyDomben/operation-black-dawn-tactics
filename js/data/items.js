// Operation Black Dawn - Items Database

const ITEMS_DATA = {
    // ============================================
    // GRENADES
    // ============================================
    grenade_frag: {
        id: 'grenade_frag',
        name: 'Frag Grenade',
        type: 'grenade',
        damage: { min: 3, max: 5 },
        radius: 2,
        range: 10,
        uses: 1,
        description: 'Explosive grenade. Destroys cover.'
    },
    grenade_plasma: {
        id: 'grenade_plasma',
        name: 'Plasma Grenade',
        type: 'grenade',
        damage: { min: 5, max: 7 },
        radius: 2,
        range: 12,
        uses: 1,
        description: 'Alien plasma grenade. Higher damage.'
    },
    grenade_smoke: {
        id: 'grenade_smoke',
        name: 'Smoke Grenade',
        type: 'grenade',
        radius: 3,
        range: 12,
        uses: 2,
        defenseBonus: 20,
        description: 'Creates smoke that grants +20 defense.'
    },
    grenade_flashbang: {
        id: 'grenade_flashbang',
        name: 'Flashbang',
        type: 'grenade',
        radius: 3,
        range: 10,
        uses: 1,
        disorient: true,
        description: 'Disorients enemies, reducing aim and movement.'
    },
    grenade_incendiary: {
        id: 'grenade_incendiary',
        name: 'Incendiary Grenade',
        type: 'grenade',
        damage: { min: 2, max: 3 },
        radius: 2,
        range: 10,
        uses: 1,
        burn: 3,
        description: 'Sets area on fire for 3 turns.'
    },
    grenade_emp: {
        id: 'grenade_emp',
        name: 'EMP Grenade',
        type: 'grenade',
        damage: { min: 5, max: 8 },
        radius: 3,
        range: 10,
        uses: 1,
        empDamage: true,
        description: 'High damage to robots and mechs.'
    },
    grenade_gas: {
        id: 'grenade_gas',
        name: 'Gas Grenade',
        type: 'grenade',
        radius: 3,
        range: 10,
        uses: 1,
        poison: 3,
        description: 'Poisons organic enemies for 3 turns.'
    },
    grenade_acid: {
        id: 'grenade_acid',
        name: 'Acid Grenade',
        type: 'grenade',
        damage: { min: 2, max: 3 },
        radius: 2,
        range: 10,
        uses: 1,
        shred: 2,
        description: 'Shreds 2 armor from all targets.'
    },

    // ============================================
    // MEDICAL
    // ============================================
    medkit: {
        id: 'medkit',
        name: 'Medkit',
        type: 'medical',
        heal: 4,
        uses: 1,
        description: 'Heal ally for 4 HP.'
    },
    medkit_advanced: {
        id: 'medkit_advanced',
        name: 'Nanomedkit',
        type: 'medical',
        heal: 8,
        uses: 2,
        cureStatus: true,
        description: 'Heal ally for 8 HP and remove status effects.'
    },
    medkit_gremlin: {
        id: 'medkit_gremlin',
        name: 'Gremlin Heal',
        type: 'medical',
        heal: 6,
        uses: 2,
        range: 10,
        description: 'Heal at range using GREMLIN drone.'
    },
    stabilizer: {
        id: 'stabilizer',
        name: 'Stabilizer',
        type: 'medical',
        uses: 1,
        stabilize: true,
        description: 'Stabilize bleeding out allies.'
    },

    // ============================================
    // AMMUNITION
    // ============================================
    ammo_ap: {
        id: 'ammo_ap',
        name: 'AP Rounds',
        type: 'ammo',
        armorPiercing: 2,
        description: 'Ignore 2 points of armor.'
    },
    ammo_tracer: {
        id: 'ammo_tracer',
        name: 'Tracer Rounds',
        type: 'ammo',
        aimBonus: 10,
        description: '+10 aim to all shots.'
    },
    ammo_hollow: {
        id: 'ammo_hollow',
        name: 'Hollow Point',
        type: 'ammo',
        damageBonus: 1,
        description: '+1 damage against unarmored.'
    },
    ammo_incendiary: {
        id: 'ammo_incendiary',
        name: 'Dragon Rounds',
        type: 'ammo',
        burn: 2,
        description: 'Set targets on fire for 2 turns.'
    },
    ammo_venom: {
        id: 'ammo_venom',
        name: 'Venom Rounds',
        type: 'ammo',
        poison: 2,
        description: 'Poison targets for 2 turns.'
    },
    ammo_talon: {
        id: 'ammo_talon',
        name: 'Talon Rounds',
        type: 'ammo',
        critBonus: 15,
        description: '+15% critical chance.'
    },
    ammo_bluescreen: {
        id: 'ammo_bluescreen',
        name: 'Bluescreen Rounds',
        type: 'ammo',
        robotDamage: 5,
        hackBonus: 20,
        description: '+5 damage vs robots, +20 hacking.'
    },

    // ============================================
    // GADGETS
    // ============================================
    grapple: {
        id: 'grapple',
        name: 'Grappling Hook',
        type: 'gadget',
        uses: 2,
        description: 'Move to elevated positions instantly.'
    },
    scanner: {
        id: 'scanner',
        name: 'Motion Scanner',
        type: 'gadget',
        uses: 1,
        radius: 8,
        description: 'Reveal all enemies in radius for 2 turns.'
    },
    skull_jack: {
        id: 'skull_jack',
        name: 'Skulljack',
        type: 'gadget',
        uses: 1,
        melee: true,
        hack: true,
        description: 'Melee attack that hacks/stuns enemies.'
    },
    mimic_beacon: {
        id: 'mimic_beacon',
        name: 'Mimic Beacon',
        type: 'gadget',
        uses: 1,
        description: 'Creates decoy that attracts enemy fire.'
    },
    battle_scanner: {
        id: 'battle_scanner',
        name: 'Battle Scanner',
        type: 'gadget',
        uses: 2,
        radius: 6,
        thrown: true,
        description: 'Throwable scanner, reveals area for 2 turns.'
    },
    proximity_mine: {
        id: 'proximity_mine',
        name: 'Proximity Mine',
        type: 'gadget',
        damage: { min: 4, max: 6 },
        uses: 1,
        description: 'Plant mine that explodes when enemies approach.'
    },

    // ============================================
    // CONSUMABLES
    // ============================================
    stim_combat: {
        id: 'stim_combat',
        name: 'Combat Stim',
        type: 'consumable',
        uses: 1,
        aimBonus: 20,
        damageBonus: 2,
        duration: 2,
        description: '+20 aim and +2 damage for 2 turns.'
    },
    stim_reflex: {
        id: 'stim_reflex',
        name: 'Reflex Stim',
        type: 'consumable',
        uses: 1,
        dodgeBonus: 30,
        mobilityBonus: 3,
        duration: 2,
        description: '+30 dodge and +3 mobility for 2 turns.'
    },
    stim_psi: {
        id: 'stim_psi',
        name: 'Mind Shield',
        type: 'consumable',
        uses: 1,
        willBonus: 30,
        psiShield: true,
        duration: 3,
        description: 'Block psionic attacks for 3 turns.'
    },
    adrenaline: {
        id: 'adrenaline',
        name: 'Adrenaline Surge',
        type: 'consumable',
        uses: 1,
        grantAction: true,
        description: 'Grant extra action point this turn.'
    },
    suppressant: {
        id: 'suppressant',
        name: 'Stress Suppressant',
        type: 'consumable',
        uses: 1,
        willRestore: 20,
        clearPanic: true,
        description: 'Restore 20 will and clear panic.'
    },

    // ============================================
    // UTILITY
    // ============================================
    scope_tactical: {
        id: 'scope_tactical',
        name: 'Tactical Scope',
        type: 'utility',
        passive: true,
        aimBonus: 5,
        description: '+5 aim (passive)'
    },
    perception_pcs: {
        id: 'perception_pcs',
        name: 'Perception PCS',
        type: 'utility',
        passive: true,
        sightRange: 3,
        description: '+3 sight range (passive)'
    },
    speed_pcs: {
        id: 'speed_pcs',
        name: 'Speed PCS',
        type: 'utility',
        passive: true,
        mobility: 2,
        description: '+2 mobility (passive)'
    },
    dodge_pcs: {
        id: 'dodge_pcs',
        name: 'Agility PCS',
        type: 'utility',
        passive: true,
        dodge: 15,
        description: '+15 dodge (passive)'
    },
    will_pcs: {
        id: 'will_pcs',
        name: 'Focus PCS',
        type: 'utility',
        passive: true,
        will: 10,
        description: '+10 will (passive)'
    },
    hp_pcs: {
        id: 'hp_pcs',
        name: 'Conditioning PCS',
        type: 'utility',
        passive: true,
        hp: 2,
        description: '+2 HP (passive)'
    },

    // ============================================
    // ADDITIONAL GRENADES
    // ============================================
    grenade_proximity: {
        id: 'grenade_proximity',
        name: 'Proximity Grenade',
        type: 'grenade',
        damage: { min: 4, max: 6 },
        radius: 2,
        range: 8,
        uses: 1,
        triggered: true,
        description: 'Detonates when enemies approach.'
    },
    grenade_stun: {
        id: 'grenade_stun',
        name: 'Stun Grenade',
        type: 'grenade',
        radius: 3,
        range: 10,
        uses: 1,
        stun: 2,
        description: 'Stuns enemies for 2 turns.'
    },

    // ============================================
    // ADDITIONAL GADGETS
    // ============================================
    holotargeter: {
        id: 'holotargeter',
        name: 'Holotargeter',
        type: 'gadget',
        uses: 3,
        aimBonus: 15,
        markDuration: 2,
        description: 'Mark target for +15 aim to all allies for 2 turns.'
    },
    hazmat_vest: {
        id: 'hazmat_vest',
        name: 'Hazmat Vest',
        type: 'gadget',
        passive: true,
        poisonImmune: true,
        fireResist: 50,
        description: 'Immunity to poison, 50% fire resistance.'
    },
    nanoscale_vest: {
        id: 'nanoscale_vest',
        name: 'Nanoscale Vest',
        type: 'gadget',
        passive: true,
        hp: 2,
        armor: 1,
        description: '+2 HP and +1 armor.'
    },
    plated_vest: {
        id: 'plated_vest',
        name: 'Plated Vest',
        type: 'gadget',
        passive: true,
        hp: 1,
        armor: 2,
        description: '+1 HP and +2 armor.'
    },
    stasis_vest: {
        id: 'stasis_vest',
        name: 'Stasis Vest',
        type: 'gadget',
        passive: true,
        bleedImmune: true,
        autoStabilize: true,
        description: 'Immune to bleed, auto-stabilize when downed.'
    },

    // ============================================
    // ADDITIONAL CONSUMABLES
    // ============================================
    overdrive_serum: {
        id: 'overdrive_serum',
        name: 'Overdrive Serum',
        type: 'consumable',
        uses: 1,
        critBonus: 30,
        damageBonus: 3,
        duration: 1,
        recoil: 2,
        description: '+30% crit and +3 damage for 1 turn, take 2 damage after.'
    },
    regeneration_serum: {
        id: 'regeneration_serum',
        name: 'Regeneration Serum',
        type: 'consumable',
        uses: 1,
        healPerTurn: 2,
        duration: 5,
        description: 'Regenerate 2 HP per turn for 5 turns.'
    }
};

// Export
window.ITEMS_DATA = ITEMS_DATA;
