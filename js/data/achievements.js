// Operation Black Dawn - Achievements Database

const ACHIEVEMENTS_DATA = {
    // ============================================
    // COMBAT ACHIEVEMENTS (15)
    // ============================================
    first_blood: {
        id: 'first_blood',
        name: 'First Blood',
        description: 'Kill your first enemy.',
        category: 'combat',
        icon: 'skull',
        points: 5,
        trigger: { type: 'kills', count: 1 }
    },
    squad_wipe: {
        id: 'squad_wipe',
        name: 'Clean Sweep',
        description: 'Eliminate all enemies in a mission without taking damage.',
        category: 'combat',
        icon: 'shield',
        points: 25,
        trigger: { type: 'flawless_mission' }
    },
    headhunter: {
        id: 'headhunter',
        name: 'Headhunter',
        description: 'Get 50 critical hits.',
        category: 'combat',
        icon: 'crosshair',
        points: 15,
        trigger: { type: 'crits', count: 50 }
    },
    angel_of_death: {
        id: 'angel_of_death',
        name: 'Angel of Death',
        description: 'Kill 100 enemies.',
        category: 'combat',
        icon: 'skull',
        points: 20,
        trigger: { type: 'kills', count: 100 }
    },
    mass_extinction: {
        id: 'mass_extinction',
        name: 'Mass Extinction',
        description: 'Kill 500 enemies.',
        category: 'combat',
        icon: 'skull',
        points: 50,
        trigger: { type: 'kills', count: 500 }
    },
    overwatch_ace: {
        id: 'overwatch_ace',
        name: 'Overwatch Ace',
        description: 'Kill 25 enemies with overwatch shots.',
        category: 'combat',
        icon: 'eye',
        points: 15,
        trigger: { type: 'overwatch_kills', count: 25 }
    },
    grenadier: {
        id: 'grenadier',
        name: 'Grenadier',
        description: 'Kill 3 enemies with a single grenade.',
        category: 'combat',
        icon: 'explosion',
        points: 10,
        trigger: { type: 'grenade_multikill', count: 3 }
    },
    flanking_master: {
        id: 'flanking_master',
        name: 'Flanking Master',
        description: 'Kill 50 enemies from flanking positions.',
        category: 'combat',
        icon: 'arrows',
        points: 15,
        trigger: { type: 'flank_kills', count: 50 }
    },
    one_shot: {
        id: 'one_shot',
        name: 'One Shot, One Kill',
        description: 'Kill an enemy with a single shot doing 10+ damage.',
        category: 'combat',
        icon: 'target',
        points: 10,
        trigger: { type: 'one_shot_kill', damage: 10 }
    },
    close_quarters: {
        id: 'close_quarters',
        name: 'Close Quarters',
        description: 'Kill 25 enemies from within 4 tiles.',
        category: 'combat',
        icon: 'fist',
        points: 15,
        trigger: { type: 'close_kills', count: 25, range: 4 }
    },
    long_shot: {
        id: 'long_shot',
        name: 'Long Shot',
        description: 'Kill an enemy from 20+ tiles away.',
        category: 'combat',
        icon: 'scope',
        points: 10,
        trigger: { type: 'long_kill', range: 20 }
    },
    untouchable: {
        id: 'untouchable',
        name: 'Untouchable',
        description: 'Have a soldier dodge 5 shots in one mission.',
        category: 'combat',
        icon: 'wind',
        points: 15,
        trigger: { type: 'dodges_mission', count: 5 }
    },
    last_stand: {
        id: 'last_stand',
        name: 'Last Stand',
        description: 'Win a mission with only one soldier remaining.',
        category: 'combat',
        icon: 'person',
        points: 20,
        trigger: { type: 'solo_victory' }
    },
    full_auto: {
        id: 'full_auto',
        name: 'Full Auto',
        description: 'Fire 1000 shots total.',
        category: 'combat',
        icon: 'bullets',
        points: 20,
        trigger: { type: 'shots_fired', count: 1000 }
    },
    psi_warrior: {
        id: 'psi_warrior',
        name: 'Psi Warrior',
        description: 'Kill 25 enemies with psionic abilities.',
        category: 'combat',
        icon: 'brain',
        points: 20,
        trigger: { type: 'psi_kills', count: 25 }
    },

    // ============================================
    // MISSION ACHIEVEMENTS (12)
    // ============================================
    mission_complete: {
        id: 'mission_complete',
        name: 'Mission Complete',
        description: 'Complete your first mission.',
        category: 'mission',
        icon: 'check',
        points: 5,
        trigger: { type: 'missions_won', count: 1 }
    },
    veteran_commander: {
        id: 'veteran_commander',
        name: 'Veteran Commander',
        description: 'Complete 25 missions.',
        category: 'mission',
        icon: 'medal',
        points: 25,
        trigger: { type: 'missions_won', count: 25 }
    },
    speed_demon: {
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Complete a mission in under 5 turns.',
        category: 'mission',
        icon: 'clock',
        points: 15,
        trigger: { type: 'quick_mission', turns: 5 }
    },
    no_casualties: {
        id: 'no_casualties',
        name: 'No Casualties',
        description: 'Complete 10 missions without losing a soldier.',
        category: 'mission',
        icon: 'heart',
        points: 30,
        trigger: { type: 'no_loss_streak', count: 10 }
    },
    civilian_hero: {
        id: 'civilian_hero',
        name: 'Civilian Hero',
        description: 'Save all civilians in a terror mission.',
        category: 'mission',
        icon: 'people',
        points: 20,
        trigger: { type: 'all_civilians_saved' }
    },
    extraction_expert: {
        id: 'extraction_expert',
        name: 'Extraction Expert',
        description: 'Complete 10 extraction missions.',
        category: 'mission',
        icon: 'helicopter',
        points: 15,
        trigger: { type: 'mission_type_complete', missionType: 'extraction', count: 10 }
    },
    saboteur: {
        id: 'saboteur',
        name: 'Saboteur',
        description: 'Complete 10 sabotage missions.',
        category: 'mission',
        icon: 'bomb',
        points: 15,
        trigger: { type: 'mission_type_complete', missionType: 'sabotage', count: 10 }
    },
    base_defender: {
        id: 'base_defender',
        name: 'Base Defender',
        description: 'Successfully defend your base from attack.',
        category: 'mission',
        icon: 'fortress',
        points: 25,
        trigger: { type: 'base_defense_won' }
    },
    alien_hunter: {
        id: 'alien_hunter',
        name: 'Alien Hunter',
        description: 'Complete 5 missions against alien forces.',
        category: 'mission',
        icon: 'alien',
        points: 15,
        trigger: { type: 'faction_missions', faction: 'alien', count: 5 }
    },
    rogue_stopper: {
        id: 'rogue_stopper',
        name: 'Rogue Stopper',
        description: 'Complete 5 missions against rogue military.',
        category: 'mission',
        icon: 'badge',
        points: 15,
        trigger: { type: 'faction_missions', faction: 'rogue', count: 5 }
    },
    terror_response: {
        id: 'terror_response',
        name: 'Terror Response',
        description: 'Complete 5 terror missions.',
        category: 'mission',
        icon: 'siren',
        points: 15,
        trigger: { type: 'mission_type_complete', missionType: 'terror', count: 5 }
    },
    perfect_intel: {
        id: 'perfect_intel',
        name: 'Perfect Intel',
        description: 'Complete a hack mission without being detected.',
        category: 'mission',
        icon: 'computer',
        points: 20,
        trigger: { type: 'stealth_hack' }
    },

    // ============================================
    // SOLDIER ACHIEVEMENTS (10)
    // ============================================
    first_recruit: {
        id: 'first_recruit',
        name: 'First Recruit',
        description: 'Recruit your first soldier.',
        category: 'soldier',
        icon: 'plus',
        points: 5,
        trigger: { type: 'soldiers_recruited', count: 1 }
    },
    full_roster: {
        id: 'full_roster',
        name: 'Full Roster',
        description: 'Have 20 soldiers in your roster.',
        category: 'soldier',
        icon: 'users',
        points: 15,
        trigger: { type: 'roster_size', count: 20 }
    },
    max_rank: {
        id: 'max_rank',
        name: 'Colonel',
        description: 'Promote a soldier to maximum rank.',
        category: 'soldier',
        icon: 'star',
        points: 20,
        trigger: { type: 'max_rank' }
    },
    diverse_squad: {
        id: 'diverse_squad',
        name: 'Diverse Squad',
        description: 'Have at least one soldier of each class.',
        category: 'soldier',
        icon: 'grid',
        points: 15,
        trigger: { type: 'all_classes' }
    },
    elite_team: {
        id: 'elite_team',
        name: 'Elite Team',
        description: 'Complete a mission with all soldiers rank 5+.',
        category: 'soldier',
        icon: 'crown',
        points: 25,
        trigger: { type: 'elite_squad_mission' }
    },
    psi_operative: {
        id: 'psi_operative',
        name: 'Psi Operative',
        description: 'Train your first psionic soldier.',
        category: 'soldier',
        icon: 'mind',
        points: 20,
        trigger: { type: 'first_psionic' }
    },
    survivor: {
        id: 'survivor',
        name: 'Survivor',
        description: 'Have a soldier survive 20 missions.',
        category: 'soldier',
        icon: 'shield',
        points: 20,
        trigger: { type: 'soldier_missions', count: 20 }
    },
    bonded: {
        id: 'bonded',
        name: 'Bonded',
        description: 'Create a bond between two soldiers.',
        category: 'soldier',
        icon: 'link',
        points: 10,
        trigger: { type: 'create_bond' }
    },
    wounded_warrior: {
        id: 'wounded_warrior',
        name: 'Wounded Warrior',
        description: 'Have a soldier recover from 3 wounds.',
        category: 'soldier',
        icon: 'bandage',
        points: 15,
        trigger: { type: 'wounds_recovered', count: 3 }
    },
    class_master: {
        id: 'class_master',
        name: 'Class Master',
        description: 'Unlock all abilities for a soldier.',
        category: 'soldier',
        icon: 'book',
        points: 25,
        trigger: { type: 'all_abilities' }
    },

    // ============================================
    // BASE ACHIEVEMENTS (8)
    // ============================================
    base_builder: {
        id: 'base_builder',
        name: 'Base Builder',
        description: 'Build your first facility.',
        category: 'base',
        icon: 'hammer',
        points: 5,
        trigger: { type: 'facilities_built', count: 1 }
    },
    fully_operational: {
        id: 'fully_operational',
        name: 'Fully Operational',
        description: 'Build all facility types.',
        category: 'base',
        icon: 'building',
        points: 30,
        trigger: { type: 'all_facilities' }
    },
    power_grid: {
        id: 'power_grid',
        name: 'Power Grid',
        description: 'Build 3 power generators.',
        category: 'base',
        icon: 'lightning',
        points: 10,
        trigger: { type: 'facility_count', facility: 'generator', count: 3 }
    },
    research_hub: {
        id: 'research_hub',
        name: 'Research Hub',
        description: 'Build the advanced laboratory.',
        category: 'base',
        icon: 'flask',
        points: 15,
        trigger: { type: 'facility_built', facility: 'advanced_lab' }
    },
    defense_network: {
        id: 'defense_network',
        name: 'Defense Network',
        description: 'Build all defensive facilities.',
        category: 'base',
        icon: 'turret',
        points: 20,
        trigger: { type: 'all_defenses' }
    },
    medical_ward: {
        id: 'medical_ward',
        name: 'Medical Ward',
        description: 'Upgrade the infirmary.',
        category: 'base',
        icon: 'medical',
        points: 10,
        trigger: { type: 'facility_upgraded', facility: 'infirmary' }
    },
    training_grounds: {
        id: 'training_grounds',
        name: 'Training Grounds',
        description: 'Build the officer training school.',
        category: 'base',
        icon: 'graduate',
        points: 15,
        trigger: { type: 'facility_built', facility: 'ots' }
    },
    workshop_master: {
        id: 'workshop_master',
        name: 'Workshop Master',
        description: 'Build 2 workshops.',
        category: 'base',
        icon: 'wrench',
        points: 15,
        trigger: { type: 'facility_count', facility: 'workshop', count: 2 }
    },

    // ============================================
    // RESEARCH ACHIEVEMENTS (8)
    // ============================================
    first_discovery: {
        id: 'first_discovery',
        name: 'First Discovery',
        description: 'Complete your first research project.',
        category: 'research',
        icon: 'lightbulb',
        points: 5,
        trigger: { type: 'research_complete', count: 1 }
    },
    knowledge_seeker: {
        id: 'knowledge_seeker',
        name: 'Knowledge Seeker',
        description: 'Complete 20 research projects.',
        category: 'research',
        icon: 'book',
        points: 25,
        trigger: { type: 'research_complete', count: 20 }
    },
    plasma_unlocked: {
        id: 'plasma_unlocked',
        name: 'Plasma Unlocked',
        description: 'Research plasma weapons.',
        category: 'research',
        icon: 'fire',
        points: 20,
        trigger: { type: 'research_project', project: 'plasma_weapons' }
    },
    psi_unlocked: {
        id: 'psi_unlocked',
        name: 'Psi Unlocked',
        description: 'Research psionic abilities.',
        category: 'research',
        icon: 'brain',
        points: 20,
        trigger: { type: 'research_project', project: 'psi_research' }
    },
    autopsy_complete: {
        id: 'autopsy_complete',
        name: 'Xenobiologist',
        description: 'Complete all alien autopsies.',
        category: 'research',
        icon: 'scalpel',
        points: 25,
        trigger: { type: 'all_autopsies' }
    },
    elerium_expert: {
        id: 'elerium_expert',
        name: 'Elerium Expert',
        description: 'Research elerium properties.',
        category: 'research',
        icon: 'atom',
        points: 20,
        trigger: { type: 'research_project', project: 'elerium_research' }
    },
    armor_master: {
        id: 'armor_master',
        name: 'Armor Master',
        description: 'Research all armor types.',
        category: 'research',
        icon: 'armor',
        points: 25,
        trigger: { type: 'all_armor_research' }
    },
    weapons_master: {
        id: 'weapons_master',
        name: 'Weapons Master',
        description: 'Research all weapon types.',
        category: 'research',
        icon: 'gun',
        points: 25,
        trigger: { type: 'all_weapon_research' }
    },

    // ============================================
    // STORY ACHIEVEMENTS (7)
    // ============================================
    first_contact_complete: {
        id: 'first_contact_complete',
        name: 'First Contact',
        description: 'Complete the First Contact mission.',
        category: 'story',
        icon: 'alien',
        points: 10,
        trigger: { type: 'story_mission', mission: 'mission_05_alien_contact' }
    },
    act_1_complete: {
        id: 'act_1_complete',
        name: 'Act I Complete',
        description: 'Complete all Act 1 missions.',
        category: 'story',
        icon: 'chapter',
        points: 25,
        trigger: { type: 'act_complete', act: 1 }
    },
    act_2_complete: {
        id: 'act_2_complete',
        name: 'Act II Complete',
        description: 'Complete all Act 2 missions.',
        category: 'story',
        icon: 'chapter',
        points: 35,
        trigger: { type: 'act_complete', act: 2 }
    },
    act_3_complete: {
        id: 'act_3_complete',
        name: 'Act III Complete',
        description: 'Complete all Act 3 missions.',
        category: 'story',
        icon: 'chapter',
        points: 50,
        trigger: { type: 'act_complete', act: 3 }
    },
    morrison_defeated: {
        id: 'morrison_defeated',
        name: 'Head of the Snake',
        description: 'Defeat General Morrison.',
        category: 'story',
        icon: 'skull',
        points: 30,
        trigger: { type: 'story_mission', mission: 'mission_13_assassination' }
    },
    ethereal_defeated: {
        id: 'ethereal_defeated',
        name: 'Ethereal Slayer',
        description: 'Defeat the Uber Ethereal.',
        category: 'story',
        icon: 'crown',
        points: 50,
        trigger: { type: 'story_mission', mission: 'mission_19_temple_ship' }
    },
    new_dawn: {
        id: 'new_dawn',
        name: 'New Dawn',
        description: 'Complete the campaign and save Earth.',
        category: 'story',
        icon: 'sun',
        points: 100,
        trigger: { type: 'campaign_complete' }
    },

    // ============================================
    // SPECIAL ACHIEVEMENTS (5)
    // ============================================
    ironman: {
        id: 'ironman',
        name: 'Iron Will',
        description: 'Complete the campaign on Ironman mode.',
        category: 'special',
        icon: 'skull',
        points: 100,
        trigger: { type: 'ironman_complete' }
    },
    impossible: {
        id: 'impossible',
        name: 'Impossible',
        description: 'Complete the campaign on Impossible difficulty.',
        category: 'special',
        icon: 'fire',
        points: 100,
        trigger: { type: 'impossible_complete' }
    },
    perfectionist: {
        id: 'perfectionist',
        name: 'Perfectionist',
        description: 'Complete the campaign without losing a soldier.',
        category: 'special',
        icon: 'gem',
        points: 150,
        trigger: { type: 'no_loss_campaign' }
    },
    speed_runner: {
        id: 'speed_runner',
        name: 'Speed Runner',
        description: 'Complete the campaign in under 100 in-game days.',
        category: 'special',
        icon: 'clock',
        points: 75,
        trigger: { type: 'fast_campaign', days: 100 }
    },
    completionist: {
        id: 'completionist',
        name: 'Completionist',
        description: 'Unlock all other achievements.',
        category: 'special',
        icon: 'trophy',
        points: 200,
        trigger: { type: 'all_achievements' }
    }
};

// Export
window.ACHIEVEMENTS_DATA = ACHIEVEMENTS_DATA;
