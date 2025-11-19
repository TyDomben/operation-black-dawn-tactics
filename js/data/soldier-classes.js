// Operation Black Dawn - Soldier Classes and Abilities

const SOLDIER_CLASS_DATA = {
    // ============================================
    // ASSAULT - Close combat specialists
    // ============================================
    assault: {
        name: 'Assault',
        description: 'Close-range combat specialists who excel at breaching and room clearing.',
        icon: 'A',
        color: '#e74c3c',
        baseStats: {
            hp: 8,
            aim: 65,
            will: 45,
            dodge: 10,
            mobility: 14
        },
        statGrowth: {
            hp: 1,
            aim: 3,
            will: 3,
            dodge: 2
        },
        preferredWeapons: ['shotgun', 'smg'],
        abilities: [
            // Rank 1 (Squaddie)
            {
                rank: 1,
                choices: [
                    {
                        id: 'run_and_gun',
                        name: 'Run and Gun',
                        description: 'Take an action after dashing. 4 turn cooldown.',
                        cooldown: 4
                    }
                ]
            },
            // Rank 2 (Corporal)
            {
                rank: 2,
                choices: [
                    {
                        id: 'tactical_sense',
                        name: 'Tactical Sense',
                        description: '+5 Defense per enemy in sight (max +20).'
                    },
                    {
                        id: 'aggression',
                        name: 'Aggression',
                        description: '+10% critical chance per enemy in sight (max +30%).'
                    }
                ]
            },
            // Rank 3 (Sergeant)
            {
                rank: 3,
                choices: [
                    {
                        id: 'close_combat_specialist',
                        name: 'Close Combat Specialist',
                        description: 'Free reaction shot against enemies within 4 tiles.'
                    },
                    {
                        id: 'lightning_reflexes',
                        name: 'Lightning Reflexes',
                        description: 'First reaction fire against you always misses.'
                    }
                ]
            },
            // Rank 4 (Lieutenant)
            {
                rank: 4,
                choices: [
                    {
                        id: 'flush',
                        name: 'Flush',
                        description: 'Fire a shot that forces enemies to move. 1 action cost.',
                        actionCost: 1
                    },
                    {
                        id: 'rapid_fire',
                        name: 'Rapid Fire',
                        description: 'Fire twice at same target with -15 aim. Ends turn.',
                        aimPenalty: -15
                    }
                ]
            },
            // Rank 5 (Captain)
            {
                rank: 5,
                choices: [
                    {
                        id: 'close_encounters',
                        name: 'Close Encounters',
                        description: 'Free action after any kill at close range (4 tiles).'
                    },
                    {
                        id: 'bring_em_on',
                        name: 'Bring Em On',
                        description: '+1 damage for each enemy you can see (max +5).'
                    }
                ]
            },
            // Rank 6 (Major)
            {
                rank: 6,
                choices: [
                    {
                        id: 'extra_conditioning',
                        name: 'Extra Conditioning',
                        description: '+3 HP and +3 Will.'
                    },
                    {
                        id: 'resilience',
                        name: 'Resilience',
                        description: 'Critical hits deal normal damage against this soldier.'
                    }
                ]
            },
            // Rank 7 (Colonel)
            {
                rank: 7,
                choices: [
                    {
                        id: 'killer_instinct',
                        name: 'Killer Instinct',
                        description: '+50% critical damage when flanking.'
                    },
                    {
                        id: 'vital_point_targeting',
                        name: 'Vital Point Targeting',
                        description: '+2 damage against targets that have been autopsied.'
                    }
                ]
            }
        ]
    },

    // ============================================
    // SNIPER - Long range precision
    // ============================================
    sniper: {
        name: 'Sniper',
        description: 'Long-range marksmen who provide overwatch and eliminate high-value targets.',
        icon: 'S',
        color: '#9b59b6',
        baseStats: {
            hp: 6,
            aim: 70,
            will: 50,
            dodge: 5,
            mobility: 12
        },
        statGrowth: {
            hp: 0.5,
            aim: 4,
            will: 4,
            dodge: 1
        },
        preferredWeapons: ['sniper_rifle', 'pistol'],
        abilities: [
            {
                rank: 1,
                choices: [
                    {
                        id: 'headshot',
                        name: 'Headshot',
                        description: 'Take a high-damage shot with +30% crit chance. 3 turn cooldown.',
                        cooldown: 3,
                        critBonus: 30
                    }
                ]
            },
            {
                rank: 2,
                choices: [
                    {
                        id: 'snap_shot',
                        name: 'Snap Shot',
                        description: 'Can fire sniper rifle after moving with -20 aim penalty.',
                        aimPenalty: -20
                    },
                    {
                        id: 'squadsight',
                        name: 'Squadsight',
                        description: 'Can target enemies in squadmates line of sight at aim penalty.'
                    }
                ]
            },
            {
                rank: 3,
                choices: [
                    {
                        id: 'gunslinger',
                        name: 'Gunslinger',
                        description: '+2 damage with pistols.'
                    },
                    {
                        id: 'damn_good_ground',
                        name: 'Damn Good Ground',
                        description: '+10 aim and +10 defense when at higher elevation.'
                    }
                ]
            },
            {
                rank: 4,
                choices: [
                    {
                        id: 'disabling_shot',
                        name: 'Disabling Shot',
                        description: 'Shot that disables enemy weapons. 3 turn cooldown.',
                        cooldown: 3
                    },
                    {
                        id: 'battle_scanner',
                        name: 'Battle Scanner',
                        description: 'Throwable scanner that reveals area for 2 turns.',
                        uses: 2
                    }
                ]
            },
            {
                rank: 5,
                choices: [
                    {
                        id: 'executioner',
                        name: 'Executioner',
                        description: '+10 aim against targets with less than 50% health.'
                    },
                    {
                        id: 'opportunist',
                        name: 'Opportunist',
                        description: 'Reaction shots have no aim penalty and can crit.'
                    }
                ]
            },
            {
                rank: 6,
                choices: [
                    {
                        id: 'low_profile',
                        name: 'Low Profile',
                        description: 'Half cover counts as full cover.'
                    },
                    {
                        id: 'in_the_zone',
                        name: 'In The Zone',
                        description: 'Kills against flanked/uncovered targets cost no action.'
                    }
                ]
            },
            {
                rank: 7,
                choices: [
                    {
                        id: 'double_tap',
                        name: 'Double Tap',
                        description: 'Take two shots at same or different targets. 3 turn cooldown.',
                        cooldown: 3
                    },
                    {
                        id: 'mayhem',
                        name: 'Mayhem',
                        description: '+2 damage to suppression and reaction fire.'
                    }
                ]
            }
        ]
    },

    // ============================================
    // HEAVY - Suppression and explosives
    // ============================================
    heavy: {
        name: 'Heavy',
        description: 'Fire support specialists with heavy weapons and explosives.',
        icon: 'H',
        color: '#f39c12',
        baseStats: {
            hp: 10,
            aim: 60,
            will: 40,
            dodge: 0,
            mobility: 11
        },
        statGrowth: {
            hp: 1.5,
            aim: 2,
            will: 2,
            dodge: 0
        },
        preferredWeapons: ['lmg', 'rocket_launcher'],
        abilities: [
            {
                rank: 1,
                choices: [
                    {
                        id: 'suppression',
                        name: 'Suppression',
                        description: 'Pin down target, reducing aim by 30 and taking reaction shot if they move.',
                        actionCost: 2
                    }
                ]
            },
            {
                rank: 2,
                choices: [
                    {
                        id: 'bullet_swarm',
                        name: 'Bullet Swarm',
                        description: 'Firing does not end turn when ammo is full.'
                    },
                    {
                        id: 'holo_targeting',
                        name: 'Holo-Targeting',
                        description: 'Shooting at an enemy gives +10 aim to allies against that target.'
                    }
                ]
            },
            {
                rank: 3,
                choices: [
                    {
                        id: 'shredder_rocket',
                        name: 'Shredder Rocket',
                        description: 'Rocket that shreds armor and debuffs targets for +33% damage.',
                        uses: 1
                    },
                    {
                        id: 'suppression_2',
                        name: 'Heavy Suppression',
                        description: 'Suppression affects all enemies in a cone.'
                    }
                ]
            },
            {
                rank: 4,
                choices: [
                    {
                        id: 'heat_ammo',
                        name: 'HEAT Ammo',
                        description: '+50% damage against robotic enemies.'
                    },
                    {
                        id: 'rapid_reaction',
                        name: 'Rapid Reaction',
                        description: 'Take second reaction shot if first hits.'
                    }
                ]
            },
            {
                rank: 5,
                choices: [
                    {
                        id: 'grenadier',
                        name: 'Grenadier',
                        description: '+1 grenade and +2 grenade throw range.'
                    },
                    {
                        id: 'danger_zone',
                        name: 'Danger Zone',
                        description: '+2 tiles to rocket and suppression radius.'
                    }
                ]
            },
            {
                rank: 6,
                choices: [
                    {
                        id: 'will_to_survive',
                        name: 'Will to Survive',
                        description: 'Reduce all incoming damage by 2 when in cover.'
                    },
                    {
                        id: 'extra_munitions',
                        name: 'Extra Munitions',
                        description: '+1 rocket and +1 grenade capacity.'
                    }
                ]
            },
            {
                rank: 7,
                choices: [
                    {
                        id: 'rocketeer',
                        name: 'Rocketeer',
                        description: 'Firing rockets does not end turn.'
                    },
                    {
                        id: 'mayhem_heavy',
                        name: 'Mayhem',
                        description: '+2 damage on suppression, +4 damage on rockets.'
                    }
                ]
            }
        ]
    },

    // ============================================
    // MEDIC - Healing and support
    // ============================================
    medic: {
        name: 'Medic',
        description: 'Combat medics who keep the squad alive and provide support.',
        icon: 'M',
        color: '#2ecc71',
        baseStats: {
            hp: 7,
            aim: 60,
            will: 55,
            dodge: 5,
            mobility: 13
        },
        statGrowth: {
            hp: 0.8,
            aim: 2,
            will: 5,
            dodge: 1
        },
        preferredWeapons: ['assault_rifle', 'smg'],
        abilities: [
            {
                rank: 1,
                choices: [
                    {
                        id: 'field_medic',
                        name: 'Field Medic',
                        description: 'Heal allies for 4 HP. +1 medkit use.'
                    }
                ]
            },
            {
                rank: 2,
                choices: [
                    {
                        id: 'smoke_grenade',
                        name: 'Smoke Grenade',
                        description: 'Deploy smoke for +20 defense in area. 2 uses.'
                    },
                    {
                        id: 'covering_fire',
                        name: 'Covering Fire',
                        description: 'Reaction shots trigger on enemy attacks, not just movement.'
                    }
                ]
            },
            {
                rank: 3,
                choices: [
                    {
                        id: 'revive',
                        name: 'Revive',
                        description: 'Revive critically wounded soldiers with 33% HP.'
                    },
                    {
                        id: 'rifle_suppression',
                        name: 'Rifle Suppression',
                        description: 'Can use Suppression ability with assault rifles.'
                    }
                ]
            },
            {
                rank: 4,
                choices: [
                    {
                        id: 'field_surgeon',
                        name: 'Field Surgeon',
                        description: 'Wounded soldiers heal faster at base.'
                    },
                    {
                        id: 'sprinter',
                        name: 'Sprinter',
                        description: '+4 mobility.'
                    }
                ]
            },
            {
                rank: 5,
                choices: [
                    {
                        id: 'combat_drugs',
                        name: 'Combat Drugs',
                        description: 'Smoke grenades also grant +20 crit and +10 will.'
                    },
                    {
                        id: 'dense_smoke',
                        name: 'Dense Smoke',
                        description: 'Smoke grenades grant +40 defense instead of +20.'
                    }
                ]
            },
            {
                rank: 6,
                choices: [
                    {
                        id: 'deep_pockets',
                        name: 'Deep Pockets',
                        description: '+1 item slot.'
                    },
                    {
                        id: 'savior',
                        name: 'Savior',
                        description: 'Medkits restore +4 additional HP.'
                    }
                ]
            },
            {
                rank: 7,
                choices: [
                    {
                        id: 'restoration',
                        name: 'Restoration',
                        description: 'Medkits remove fire, poison, acid, and stun.'
                    },
                    {
                        id: 'sentinel',
                        name: 'Sentinel',
                        description: 'Take multiple reaction shots per turn.'
                    }
                ]
            }
        ]
    },

    // ============================================
    // ENGINEER - Tech and traps
    // ============================================
    engineer: {
        name: 'Engineer',
        description: 'Tech specialists who deploy turrets, hack systems, and control the battlefield.',
        icon: 'E',
        color: '#3498db',
        baseStats: {
            hp: 6,
            aim: 60,
            will: 50,
            dodge: 5,
            mobility: 12
        },
        statGrowth: {
            hp: 0.6,
            aim: 2,
            will: 4,
            dodge: 1
        },
        preferredWeapons: ['assault_rifle', 'pistol'],
        abilities: [
            {
                rank: 1,
                choices: [
                    {
                        id: 'combat_drone',
                        name: 'Combat Drone',
                        description: 'Deploy drone that attacks or heals. 3 turn duration.'
                    }
                ]
            },
            {
                rank: 2,
                choices: [
                    {
                        id: 'arc_thrower',
                        name: 'Arc Thrower',
                        description: 'Stun or capture enemies at close range.'
                    },
                    {
                        id: 'mine',
                        name: 'Proximity Mine',
                        description: 'Place proximity mine that explodes when enemies approach.'
                    }
                ]
            },
            {
                rank: 3,
                choices: [
                    {
                        id: 'haywire_protocol',
                        name: 'Haywire Protocol',
                        description: 'Hack robotic enemies to stun or take control.'
                    },
                    {
                        id: 'battle_scanner',
                        name: 'Battle Scanner',
                        description: 'Throwable scanner that reveals area for 2 turns.'
                    }
                ]
            },
            {
                rank: 4,
                choices: [
                    {
                        id: 'turret',
                        name: 'Deploy Turret',
                        description: 'Deploy stationary turret that provides cover fire. 3 turn duration.'
                    },
                    {
                        id: 'repair',
                        name: 'Repair',
                        description: 'Repair SHIVs and robotic allies.'
                    }
                ]
            },
            {
                rank: 5,
                choices: [
                    {
                        id: 'tandem_warheads',
                        name: 'Tandem Warheads',
                        description: 'Grenades do +2 damage and destroy cover more effectively.'
                    },
                    {
                        id: 'shock_troopers',
                        name: 'Shock Troopers',
                        description: 'Grenades can stun organic enemies.'
                    }
                ]
            },
            {
                rank: 6,
                choices: [
                    {
                        id: 'packmaster',
                        name: 'Packmaster',
                        description: '+1 to all item charges.'
                    },
                    {
                        id: 'drone_boost',
                        name: 'Advanced Drone',
                        description: 'Drone has +2 HP and deals +1 damage.'
                    }
                ]
            },
            {
                rank: 7,
                choices: [
                    {
                        id: 'emp_discharge',
                        name: 'EMP Discharge',
                        description: 'Drone can release EMP that disables all robots in radius.'
                    },
                    {
                        id: 'smart_macros',
                        name: 'Smart Macros',
                        description: 'Hacking does not cost an action.'
                    }
                ]
            }
        ]
    },

    // ============================================
    // SCOUT - Recon and mobility
    // ============================================
    scout: {
        name: 'Scout',
        description: 'Fast reconnaissance specialists who excel at flanking and stealth.',
        icon: 'R',
        color: '#1abc9c',
        baseStats: {
            hp: 5,
            aim: 65,
            will: 45,
            dodge: 20,
            mobility: 16
        },
        statGrowth: {
            hp: 0.5,
            aim: 3,
            will: 3,
            dodge: 3
        },
        preferredWeapons: ['smg', 'shotgun'],
        abilities: [
            {
                rank: 1,
                choices: [
                    {
                        id: 'phantom',
                        name: 'Phantom',
                        description: 'Start missions concealed and remain concealed when squad is revealed.'
                    }
                ]
            },
            {
                rank: 2,
                choices: [
                    {
                        id: 'shadow_strike',
                        name: 'Shadow Strike',
                        description: '+25 aim and +25 crit when attacking from concealment.'
                    },
                    {
                        id: 'conceal',
                        name: 'Conceal',
                        description: 'Re-enter concealment. 4 turn cooldown.',
                        cooldown: 4
                    }
                ]
            },
            {
                rank: 3,
                choices: [
                    {
                        id: 'shadowstep',
                        name: 'Shadowstep',
                        description: 'Does not trigger overwatch or reaction fire.'
                    },
                    {
                        id: 'deep_cover',
                        name: 'Deep Cover',
                        description: 'If not revealed, automatically hunker at end of turn.'
                    }
                ]
            },
            {
                rank: 4,
                choices: [
                    {
                        id: 'run_silent',
                        name: 'Run Silent',
                        description: 'Moving through enemy vision does not break concealment.'
                    },
                    {
                        id: 'blade_master',
                        name: 'Blademaster',
                        description: '+2 damage with sword and +10 aim with melee.'
                    }
                ]
            },
            {
                rank: 5,
                choices: [
                    {
                        id: 'implacable',
                        name: 'Implacable',
                        description: 'Gain a free move action after getting a kill.'
                    },
                    {
                        id: 'deep_pockets',
                        name: 'Deep Pockets',
                        description: '+1 item slot.'
                    }
                ]
            },
            {
                rank: 6,
                choices: [
                    {
                        id: 'untouchable',
                        name: 'Untouchable',
                        description: 'First attack against you each turn misses.'
                    },
                    {
                        id: 'rapid_fire',
                        name: 'Rapid Fire',
                        description: 'Fire twice at same target with -15 aim. Ends turn.'
                    }
                ]
            },
            {
                rank: 7,
                choices: [
                    {
                        id: 'reaper',
                        name: 'Reaper',
                        description: 'A devastating chain melee attack against multiple targets.'
                    },
                    {
                        id: 'serial',
                        name: 'Serial',
                        description: 'Kills refund action used. Once per mission.'
                    }
                ]
            }
        ]
    },

    // ============================================
    // PSIONIC - Mind powers
    // ============================================
    psionic: {
        name: 'Psionic',
        description: 'Soldiers who have developed powerful psychic abilities.',
        icon: 'P',
        color: '#8e44ad',
        baseStats: {
            hp: 6,
            aim: 55,
            will: 70,
            dodge: 5,
            mobility: 12
        },
        statGrowth: {
            hp: 0.5,
            aim: 1,
            will: 6,
            dodge: 1
        },
        preferredWeapons: ['assault_rifle', 'pistol'],
        abilities: [
            {
                rank: 1,
                choices: [
                    {
                        id: 'mindfray',
                        name: 'Mindfray',
                        description: 'Deal 2-4 psi damage and disorient target. No cooldown.'
                    }
                ]
            },
            {
                rank: 2,
                choices: [
                    {
                        id: 'insanity',
                        name: 'Insanity',
                        description: 'Chance to make enemy panic or berserk.'
                    },
                    {
                        id: 'psi_inspire',
                        name: 'Inspire',
                        description: 'Grant +20 will and +20 aim to ally.'
                    }
                ]
            },
            {
                rank: 3,
                choices: [
                    {
                        id: 'stasis',
                        name: 'Stasis',
                        description: 'Freeze target in time. Cannot act or be damaged. 4 turn cooldown.',
                        cooldown: 4
                    },
                    {
                        id: 'soul_steal',
                        name: 'Soul Steal',
                        description: 'Recover HP equal to psi damage dealt.'
                    }
                ]
            },
            {
                rank: 4,
                choices: [
                    {
                        id: 'fortress',
                        name: 'Fortress',
                        description: 'Immune to fire, poison, and explosion damage.'
                    },
                    {
                        id: 'sustain',
                        name: 'Sustain',
                        description: 'Once per mission, auto-stasis when taking fatal damage.'
                    }
                ]
            },
            {
                rank: 5,
                choices: [
                    {
                        id: 'soulfire',
                        name: 'Soulfire',
                        description: 'Guaranteed 5-8 psi damage that ignores armor.'
                    },
                    {
                        id: 'schism',
                        name: 'Schism',
                        description: 'Mindfray deals +2 damage and reduces will by 30.'
                    }
                ]
            },
            {
                rank: 6,
                choices: [
                    {
                        id: 'domination',
                        name: 'Domination',
                        description: 'Permanently mind control an enemy. 5 turn cooldown.',
                        cooldown: 5
                    },
                    {
                        id: 'fuse',
                        name: 'Fuse',
                        description: 'Detonate enemy explosives remotely.'
                    }
                ]
            },
            {
                rank: 7,
                choices: [
                    {
                        id: 'null_lance',
                        name: 'Null Lance',
                        description: 'Massive psi damage in a line. 4 turn cooldown.',
                        cooldown: 4
                    },
                    {
                        id: 'void_rift',
                        name: 'Void Rift',
                        description: 'Large AoE psi attack with chance to disorient. 4 turn cooldown.',
                        cooldown: 4
                    }
                ]
            }
        ]
    },

    // ============================================
    // SPECIALIST - Versatile generalist
    // ============================================
    specialist: {
        name: 'Specialist',
        description: 'Well-rounded soldiers who can adapt to any situation.',
        icon: 'X',
        color: '#7f8c8d',
        baseStats: {
            hp: 7,
            aim: 65,
            will: 50,
            dodge: 10,
            mobility: 13
        },
        statGrowth: {
            hp: 1,
            aim: 3,
            will: 3,
            dodge: 2
        },
        preferredWeapons: ['assault_rifle', 'smg', 'shotgun'],
        abilities: [
            {
                rank: 1,
                choices: [
                    {
                        id: 'combat_protocol',
                        name: 'Combat Protocol',
                        description: 'Guaranteed 2-4 damage attack. +2 uses.'
                    }
                ]
            },
            {
                rank: 2,
                choices: [
                    {
                        id: 'steadfast',
                        name: 'Steadfast',
                        description: 'Immune to panic.'
                    },
                    {
                        id: 'ready_for_anything',
                        name: 'Ready for Anything',
                        description: 'Enter overwatch after any standard shot.'
                    }
                ]
            },
            {
                rank: 3,
                choices: [
                    {
                        id: 'aid_protocol',
                        name: 'Aid Protocol',
                        description: 'Grant ally +40 defense until next turn.'
                    },
                    {
                        id: 'ever_vigilant',
                        name: 'Ever Vigilant',
                        description: 'Enter overwatch if no attacks made during turn.'
                    }
                ]
            },
            {
                rank: 4,
                choices: [
                    {
                        id: 'threat_assessment',
                        name: 'Threat Assessment',
                        description: 'Aid Protocol also grants overwatch to ally.'
                    },
                    {
                        id: 'scanning_protocol',
                        name: 'Scanning Protocol',
                        description: 'Reveal all enemies within 8 tiles. 2 uses.'
                    }
                ]
            },
            {
                rank: 5,
                choices: [
                    {
                        id: 'cool_under_pressure',
                        name: 'Cool Under Pressure',
                        description: 'Overwatch shots can crit and have no aim penalty.'
                    },
                    {
                        id: 'guardian',
                        name: 'Guardian',
                        description: 'Take multiple reaction shots per turn.'
                    }
                ]
            },
            {
                rank: 6,
                choices: [
                    {
                        id: 'capacitor_discharge',
                        name: 'Capacitor Discharge',
                        description: 'AoE attack that stuns and damages. 4 turn cooldown.',
                        cooldown: 4
                    },
                    {
                        id: 'restoration',
                        name: 'Restoration',
                        description: 'Remove all negative effects from ally.'
                    }
                ]
            },
            {
                rank: 7,
                choices: [
                    {
                        id: 'total_combat',
                        name: 'Total Combat',
                        description: '+2 damage on all attacks and abilities.'
                    },
                    {
                        id: 'saturation_fire',
                        name: 'Saturation Fire',
                        description: 'Cone attack that destroys cover and damages all. Ends turn.'
                    }
                ]
            }
        ]
    }
};

// Export
window.SOLDIER_CLASS_DATA = SOLDIER_CLASS_DATA;
