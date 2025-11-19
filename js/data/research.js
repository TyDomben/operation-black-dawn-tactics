// Operation Black Dawn - Research Projects

const RESEARCH_DATA = {
    // ============================================
    // TIER 1 - FOUNDATION
    // ============================================
    alien_materials: {
        id: 'alien_materials',
        name: 'Alien Materials',
        category: 'materials',
        tier: 1,
        time: 3,
        cost: { supplies: 50 },
        description: 'Study alien alloys to understand their properties.',
        unlocks: ['plated_armor', 'magnetic_weapons'],
        flavor: 'These materials are unlike anything on Earth - lightweight yet incredibly strong.'
    },
    alien_weapons: {
        id: 'alien_weapons',
        name: 'Alien Weaponry',
        category: 'weapons',
        tier: 1,
        time: 5,
        cost: { supplies: 75, alienMaterials: 5 },
        prerequisites: ['alien_materials'],
        description: 'Reverse-engineer alien weapon technology.',
        unlocks: ['plasma_weapons', 'beam_weapons'],
        flavor: 'Their weapons use a form of directed energy we\'ve never seen before.'
    },
    alien_biology: {
        id: 'alien_biology',
        name: 'Alien Biology',
        category: 'biology',
        tier: 1,
        time: 4,
        cost: { supplies: 50 },
        requires: 'captured_alien',
        description: 'Study alien physiology and weaknesses.',
        unlocks: ['autopsy_sectoid', 'vital_targeting'],
        flavor: 'Understanding our enemy is the first step to defeating them.'
    },

    // ============================================
    // TIER 2 - MAGNETIC WEAPONS
    // ============================================
    magnetic_weapons: {
        id: 'magnetic_weapons',
        name: 'Magnetic Weapons',
        category: 'weapons',
        tier: 2,
        time: 7,
        cost: { supplies: 100, alienMaterials: 15 },
        prerequisites: ['alien_materials'],
        description: 'Develop magnetically accelerated projectile weapons.',
        unlocks: ['magnetic_rifle', 'gauss_weapons', 'shard_gun'],
        flavor: 'Gauss technology gives us a significant upgrade over conventional firearms.'
    },
    plated_armor: {
        id: 'plated_armor',
        name: 'Plated Armor',
        category: 'armor',
        tier: 2,
        time: 5,
        cost: { supplies: 75, alienMaterials: 10 },
        prerequisites: ['alien_materials'],
        description: 'Develop improved armor using alien alloys.',
        unlocks: ['carapace_armor', 'predator_armor'],
        flavor: 'Our soldiers will be much better protected with this armor.'
    },
    advanced_medical: {
        id: 'advanced_medical',
        name: 'Advanced Medical',
        category: 'support',
        tier: 2,
        time: 4,
        cost: { supplies: 50 },
        description: 'Improve medical treatment and recovery.',
        unlocks: ['nanomedkit', 'faster_healing'],
        flavor: 'Better medical care means soldiers return to duty faster.'
    },
    modular_weapons: {
        id: 'modular_weapons',
        name: 'Modular Weapons',
        category: 'weapons',
        tier: 2,
        time: 3,
        cost: { supplies: 50 },
        description: 'Develop weapon upgrade system.',
        unlocks: ['weapon_attachments'],
        flavor: 'Customization allows each soldier to optimize their loadout.'
    },

    // ============================================
    // AUTOPSIES
    // ============================================
    autopsy_sectoid: {
        id: 'autopsy_sectoid',
        name: 'Sectoid Autopsy',
        category: 'autopsy',
        tier: 2,
        time: 3,
        cost: { supplies: 25 },
        prerequisites: ['alien_biology'],
        requires: 'sectoid_corpse',
        description: 'Autopsy a Sectoid corpse.',
        unlocks: ['psi_research'],
        bonuses: { damage_vs_sectoid: 1 },
        flavor: 'Their brain structure suggests powerful psionic capabilities.'
    },
    autopsy_muton: {
        id: 'autopsy_muton',
        name: 'Muton Autopsy',
        category: 'autopsy',
        tier: 2,
        time: 4,
        cost: { supplies: 40 },
        prerequisites: ['alien_biology'],
        requires: 'muton_corpse',
        description: 'Autopsy a Muton corpse.',
        unlocks: ['berserker_armor'],
        bonuses: { damage_vs_muton: 1 },
        flavor: 'Genetically engineered for war. Pure muscle and aggression.'
    },
    autopsy_floater: {
        id: 'autopsy_floater',
        name: 'Floater Autopsy',
        category: 'autopsy',
        tier: 2,
        time: 3,
        cost: { supplies: 30 },
        prerequisites: ['alien_biology'],
        requires: 'floater_corpse',
        description: 'Autopsy a Floater corpse.',
        unlocks: ['archangel_armor'],
        bonuses: { damage_vs_floater: 1 },
        flavor: 'The flight system is integrated directly into their body.'
    },
    autopsy_viper: {
        id: 'autopsy_viper',
        name: 'Viper Autopsy',
        category: 'autopsy',
        tier: 2,
        time: 3,
        cost: { supplies: 30 },
        prerequisites: ['alien_biology'],
        requires: 'viper_corpse',
        description: 'Autopsy a Viper corpse.',
        unlocks: ['venom_rounds'],
        bonuses: { damage_vs_viper: 1 },
        flavor: 'Their venom is incredibly potent. We can weaponize it.'
    },
    autopsy_chryssalid: {
        id: 'autopsy_chryssalid',
        name: 'Chryssalid Autopsy',
        category: 'autopsy',
        tier: 3,
        time: 5,
        cost: { supplies: 50 },
        prerequisites: ['alien_biology'],
        requires: 'chryssalid_corpse',
        description: 'Autopsy a Chryssalid corpse.',
        unlocks: ['chitin_plating'],
        bonuses: { damage_vs_chryssalid: 2 },
        flavor: 'Terrifying creatures. Their implantation process is horrific.'
    },

    // ============================================
    // TIER 3 - PLASMA WEAPONS
    // ============================================
    plasma_weapons: {
        id: 'plasma_weapons',
        name: 'Plasma Weapons',
        category: 'weapons',
        tier: 3,
        time: 10,
        cost: { supplies: 150, alienMaterials: 30, elerium: 10 },
        prerequisites: ['alien_weapons', 'magnetic_weapons'],
        description: 'Develop plasma-based weapon systems.',
        unlocks: ['plasma_rifle', 'plasma_shotgun', 'plasma_sniper'],
        flavor: 'The ultimate evolution in personal weaponry.'
    },
    powered_armor: {
        id: 'powered_armor',
        name: 'Powered Armor',
        category: 'armor',
        tier: 3,
        time: 8,
        cost: { supplies: 100, alienMaterials: 25, elerium: 5 },
        prerequisites: ['plated_armor'],
        description: 'Develop powered exoskeleton armor.',
        unlocks: ['warden_armor', 'war_suit'],
        flavor: 'Servos and myomers enhance strength and protection.'
    },
    advanced_grenades: {
        id: 'advanced_grenades',
        name: 'Advanced Grenades',
        category: 'explosives',
        tier: 3,
        time: 5,
        cost: { supplies: 75, alienMaterials: 15 },
        prerequisites: ['alien_materials'],
        description: 'Develop improved explosive ordnance.',
        unlocks: ['plasma_grenade', 'acid_bomb', 'emp_grenade'],
        flavor: 'More options for area denial and damage.'
    },
    psi_research: {
        id: 'psi_research',
        name: 'Psionic Research',
        category: 'psi',
        tier: 3,
        time: 10,
        cost: { supplies: 100, alienMaterials: 20 },
        prerequisites: ['autopsy_sectoid'],
        description: 'Research psionic abilities.',
        unlocks: ['psi_training', 'psi_amp'],
        flavor: 'Some humans may have latent psionic potential.'
    },
    experimental_armor: {
        id: 'experimental_armor',
        name: 'Experimental Armor',
        category: 'armor',
        tier: 3,
        time: 7,
        cost: { supplies: 100, alienMaterials: 20 },
        prerequisites: ['plated_armor'],
        description: 'Develop specialized armor suits.',
        unlocks: ['spider_suit', 'ghost_armor'],
        flavor: 'Different suits for different tactical roles.'
    },

    // ============================================
    // TIER 4 - ADVANCED
    // ============================================
    beam_weapons: {
        id: 'beam_weapons',
        name: 'Beam Weapons',
        category: 'weapons',
        tier: 4,
        time: 12,
        cost: { supplies: 200, alienMaterials: 40, elerium: 20 },
        prerequisites: ['plasma_weapons'],
        description: 'Develop continuous beam weapons.',
        unlocks: ['beam_cannon', 'fusion_lance'],
        flavor: 'Sustained energy beams for maximum damage.'
    },
    flight_systems: {
        id: 'flight_systems',
        name: 'Flight Systems',
        category: 'armor',
        tier: 4,
        time: 10,
        cost: { supplies: 150, alienMaterials: 35, elerium: 15 },
        prerequisites: ['autopsy_floater', 'powered_armor'],
        description: 'Develop personal flight technology.',
        unlocks: ['archangel_armor', 'wraith_suit'],
        flavor: 'Taking the fight to the skies.'
    },
    advanced_psi: {
        id: 'advanced_psi',
        name: 'Advanced Psionics',
        category: 'psi',
        tier: 4,
        time: 12,
        cost: { supplies: 150, alienMaterials: 30, elerium: 10 },
        prerequisites: ['psi_research'],
        description: 'Research advanced psionic abilities.',
        unlocks: ['domination', 'null_lance', 'void_rift'],
        flavor: 'Our psionics are becoming quite powerful.'
    },
    robotics: {
        id: 'robotics',
        name: 'Advanced Robotics',
        category: 'support',
        tier: 4,
        time: 8,
        cost: { supplies: 100, alienMaterials: 25 },
        description: 'Develop combat robotics.',
        unlocks: ['shiv', 'drone_support'],
        flavor: 'Robotic support can save soldier lives.'
    },
    blaster_launcher: {
        id: 'blaster_launcher',
        name: 'Blaster Launcher',
        category: 'weapons',
        tier: 4,
        time: 10,
        cost: { supplies: 175, alienMaterials: 35, elerium: 20 },
        prerequisites: ['plasma_weapons'],
        description: 'Develop guided rocket technology.',
        unlocks: ['blaster_launcher'],
        flavor: 'Guided rockets that can curve around obstacles.'
    },

    // ============================================
    // TIER 5 - ULTIMATE
    // ============================================
    elerium_research: {
        id: 'elerium_research',
        name: 'Elerium Studies',
        category: 'materials',
        tier: 5,
        time: 15,
        cost: { supplies: 200, alienMaterials: 50, elerium: 30 },
        prerequisites: ['plasma_weapons'],
        description: 'Deep research into elerium properties.',
        unlocks: ['fusion_weapons', 'elerium_core'],
        flavor: 'Elerium is the key to their technology.'
    },
    titan_armor: {
        id: 'titan_armor',
        name: 'Titan Armor',
        category: 'armor',
        tier: 5,
        time: 12,
        cost: { supplies: 200, alienMaterials: 60, elerium: 25 },
        prerequisites: ['powered_armor'],
        description: 'Develop ultimate heavy armor.',
        unlocks: ['titan_armor', 'war_suit'],
        flavor: 'Maximum protection for our heaviest troops.'
    },
    mind_shield: {
        id: 'mind_shield',
        name: 'Mind Shield',
        category: 'psi',
        tier: 5,
        time: 8,
        cost: { supplies: 100, alienMaterials: 30 },
        prerequisites: ['advanced_psi'],
        description: 'Develop psionic defense technology.',
        unlocks: ['mind_shield'],
        flavor: 'Protection against alien mind control.'
    },
    fusion_weapons: {
        id: 'fusion_weapons',
        name: 'Fusion Weapons',
        category: 'weapons',
        tier: 5,
        time: 15,
        cost: { supplies: 250, alienMaterials: 75, elerium: 40 },
        prerequisites: ['elerium_research', 'beam_weapons'],
        description: 'Develop fusion-powered melee weapons.',
        unlocks: ['fusion_blade'],
        flavor: 'The ultimate in close combat weaponry.'
    },
    ethereal_research: {
        id: 'ethereal_research',
        name: 'Ethereal Device',
        category: 'story',
        tier: 5,
        time: 20,
        cost: { supplies: 300, alienMaterials: 100, elerium: 50 },
        prerequisites: ['advanced_psi', 'elerium_research'],
        requires: 'ethereal_device',
        description: 'Study the alien command device.',
        unlocks: ['temple_ship_assault'],
        flavor: 'The key to ending this war.'
    },

    // ============================================
    // ADDITIONAL AUTOPSIES
    // ============================================
    autopsy_archon: {
        id: 'autopsy_archon',
        name: 'Archon Autopsy',
        category: 'autopsy',
        tier: 3,
        time: 5,
        cost: { supplies: 50 },
        prerequisites: ['alien_biology'],
        requires: 'archon_corpse',
        description: 'Autopsy an Archon corpse.',
        unlocks: ['icarus_armor'],
        bonuses: { damage_vs_archon: 2 },
        flavor: 'These beings were once something else, twisted by alien technology.'
    },
    autopsy_berserker: {
        id: 'autopsy_berserker',
        name: 'Berserker Autopsy',
        category: 'autopsy',
        tier: 3,
        time: 5,
        cost: { supplies: 50 },
        prerequisites: ['autopsy_muton'],
        requires: 'berserker_corpse',
        description: 'Autopsy a Berserker corpse.',
        unlocks: ['rage_strike'],
        bonuses: { damage_vs_berserker: 2 },
        flavor: 'Pure aggression, no self-preservation instinct whatsoever.'
    },
    autopsy_sectopod: {
        id: 'autopsy_sectopod',
        name: 'Sectopod Breakdown',
        category: 'autopsy',
        tier: 4,
        time: 8,
        cost: { supplies: 100, alienMaterials: 20 },
        prerequisites: ['robotics'],
        requires: 'sectopod_wreck',
        description: 'Analyze Sectopod components.',
        unlocks: ['heavy_mec'],
        bonuses: { damage_vs_sectopod: 3 },
        flavor: 'Incredibly advanced robotics. We can learn from this.'
    },
    autopsy_cyberdisc: {
        id: 'autopsy_cyberdisc',
        name: 'Cyberdisc Breakdown',
        category: 'autopsy',
        tier: 3,
        time: 5,
        cost: { supplies: 60 },
        prerequisites: ['robotics'],
        requires: 'cyberdisc_wreck',
        description: 'Analyze Cyberdisc systems.',
        unlocks: ['disc_grenades'],
        bonuses: { damage_vs_cyberdisc: 2 },
        flavor: 'Fascinating hover technology combined with heavy weapons.'
    },

    // ============================================
    // TIER 2 ADDITIONS
    // ============================================
    tactical_sensors: {
        id: 'tactical_sensors',
        name: 'Tactical Sensors',
        category: 'support',
        tier: 2,
        time: 4,
        cost: { supplies: 50 },
        description: 'Develop advanced targeting systems.',
        unlocks: ['scope_advanced', 'holotargeter'],
        flavor: 'Better optics mean better accuracy.'
    },
    combat_stims: {
        id: 'combat_stims',
        name: 'Combat Stimulants',
        category: 'support',
        tier: 2,
        time: 5,
        cost: { supplies: 75 },
        prerequisites: ['advanced_medical'],
        description: 'Develop combat enhancement drugs.',
        unlocks: ['combat_stim', 'overdrive_serum'],
        flavor: 'Temporary boosts can turn the tide of battle.'
    },
    improved_explosives: {
        id: 'improved_explosives',
        name: 'Improved Explosives',
        category: 'explosives',
        tier: 2,
        time: 4,
        cost: { supplies: 50 },
        description: 'Improve explosive yield and range.',
        unlocks: ['grenade_plus', 'rocket_plus'],
        flavor: 'More boom for your buck.'
    },

    // ============================================
    // TIER 3 ADDITIONS
    // ============================================
    gauss_weapons: {
        id: 'gauss_weapons',
        name: 'Gauss Weapons',
        category: 'weapons',
        tier: 3,
        time: 8,
        cost: { supplies: 125, alienMaterials: 20 },
        prerequisites: ['magnetic_weapons'],
        description: 'Develop advanced magnetic weaponry.',
        unlocks: ['gauss_rifle', 'gauss_cannon'],
        flavor: 'Hypervelocity rounds that punch through armor.'
    },
    advanced_ammo: {
        id: 'advanced_ammo',
        name: 'Advanced Ammunition',
        category: 'weapons',
        tier: 3,
        time: 6,
        cost: { supplies: 75, alienMaterials: 10 },
        prerequisites: ['alien_materials'],
        description: 'Develop specialized ammunition types.',
        unlocks: ['talon_rounds', 'bluescreen_rounds', 'ap_rounds'],
        flavor: 'The right ammo for the right target.'
    },
    stealth_systems: {
        id: 'stealth_systems',
        name: 'Stealth Systems',
        category: 'armor',
        tier: 3,
        time: 8,
        cost: { supplies: 100, alienMaterials: 20 },
        prerequisites: ['plated_armor'],
        description: 'Develop optical camouflage technology.',
        unlocks: ['ghost_suit', 'phantom_protocol'],
        flavor: 'Invisibility makes for excellent ambushes.'
    },
    heavy_weapons: {
        id: 'heavy_weapons',
        name: 'Heavy Weapons',
        category: 'weapons',
        tier: 3,
        time: 7,
        cost: { supplies: 100, alienMaterials: 15 },
        prerequisites: ['magnetic_weapons'],
        description: 'Develop heavy weapon platforms.',
        unlocks: ['heavy_cannon', 'chain_gun'],
        flavor: 'Sometimes you need more firepower.'
    },

    // ============================================
    // TIER 4 ADDITIONS
    // ============================================
    psi_amp_advanced: {
        id: 'psi_amp_advanced',
        name: 'Advanced Psi Amp',
        category: 'psi',
        tier: 4,
        time: 10,
        cost: { supplies: 125, alienMaterials: 25, elerium: 10 },
        prerequisites: ['psi_research'],
        description: 'Enhance psionic amplification technology.',
        unlocks: ['psi_amp_ii', 'psi_amp_iii'],
        flavor: 'Greater range and power for our psionics.'
    },
    mec_suits: {
        id: 'mec_suits',
        name: 'MEC Suits',
        category: 'armor',
        tier: 4,
        time: 10,
        cost: { supplies: 150, alienMaterials: 40, elerium: 10 },
        prerequisites: ['robotics', 'powered_armor'],
        description: 'Develop Mechanized Exoskeletal Cybersuit.',
        unlocks: ['mec_1', 'mec_2', 'mec_3'],
        flavor: 'Part human, part machine, all soldier.'
    },
    alien_encryption: {
        id: 'alien_encryption',
        name: 'Alien Encryption',
        category: 'support',
        tier: 4,
        time: 8,
        cost: { supplies: 100, alienMaterials: 20 },
        prerequisites: ['alien_weapons'],
        description: 'Decode alien communications.',
        unlocks: ['intel_bonus', 'early_warning'],
        flavor: 'Knowing their plans gives us the advantage.'
    },
    nano_medics: {
        id: 'nano_medics',
        name: 'Nano Medics',
        category: 'support',
        tier: 4,
        time: 7,
        cost: { supplies: 100, alienMaterials: 15 },
        prerequisites: ['advanced_medical', 'alien_biology'],
        description: 'Develop nanoscale medical robots.',
        unlocks: ['nanomedkit_ii', 'regeneration_serum'],
        flavor: 'Microscopic doctors that heal from the inside.'
    }
};

// Export
window.RESEARCH_DATA = RESEARCH_DATA;
