// Operation Black Dawn - Soldier Class

class Soldier extends Unit {
    constructor(data = {}) {
        super(data);

        this.team = 'player';

        // Name
        if (!data.name) {
            const name = Utils.generateName();
            this.firstName = name.first;
            this.lastName = name.last;
            this.name = `${this.firstName} ${this.lastName}`;
        } else {
            this.name = data.name;
            this.firstName = data.firstName || data.name.split(' ')[0];
            this.lastName = data.lastName || data.name.split(' ')[1] || '';
        }

        this.callsign = data.callsign || Utils.generateCallsign();

        // Class and progression
        this.class = data.class || Utils.randomPick(Object.values(SOLDIER_CLASSES));
        this.level = data.level || 1;
        this.rank = data.rank || GAME_CONSTANTS.RANKS[0];
        this.xp = data.xp || 0;

        // Apply class base stats
        const classData = SOLDIER_CLASS_DATA[this.class];
        if (classData && !data.maxHP) {
            this.maxHP = classData.baseStats.hp;
            this.currentHP = this.maxHP;
            this.aim = classData.baseStats.aim;
            this.will = classData.baseStats.will;
            this.currentWill = this.will;
            this.dodge = classData.baseStats.dodge;
            this.mobility = classData.baseStats.mobility;
        }

        // Abilities (unlocked through level up)
        this.unlockedAbilities = data.unlockedAbilities || [];

        // Equipment slots
        this.primaryWeapon = data.primaryWeapon || this.getDefaultWeapon();
        this.secondaryWeapon = data.secondaryWeapon || null;
        this.armorSlot = data.armorSlot || null;
        this.utilitySlots = data.utilitySlots || [null, null];

        this.weapon = this.primaryWeapon;

        // Status
        this.status = data.status || 'ready'; // ready, wounded, training
        this.healTime = data.healTime || 0;

        // Customization
        this.appearance = data.appearance || this.generateAppearance();

        // Bonds and traits
        this.bond = data.bond || null;
        this.traits = data.traits || this.generateTraits();

        // Mission stats
        this.kills = data.kills || 0;
        this.missions = data.missions || 0;
    }

    getDefaultWeapon() {
        const classData = SOLDIER_CLASS_DATA[this.class];
        if (classData && classData.preferredWeapons.length > 0) {
            const weaponType = classData.preferredWeapons[0];
            // Find basic weapon of that type
            const weaponId = Object.keys(WEAPONS_DATA).find(id => {
                const w = WEAPONS_DATA[id];
                return w.type === weaponType && w.tier === 1;
            });
            if (weaponId) {
                return { ...WEAPONS_DATA[weaponId], currentAmmo: WEAPONS_DATA[weaponId].ammo };
            }
        }
        return {
            id: 'assault_rifle_basic',
            name: 'AR-15',
            damage: { min: 3, max: 5 },
            critDamage: { min: 5, max: 7 },
            critChance: 10,
            range: { optimal: 12, max: 20 },
            ammo: 4,
            currentAmmo: 4
        };
    }

    generateAppearance() {
        return {
            skinColor: Utils.random(1, 6),
            hairColor: Utils.random(1, 8),
            hairStyle: Utils.random(1, 10),
            faceType: Utils.random(1, 6),
            primaryColor: Utils.randomPick(['red', 'blue', 'green', 'gray', 'black']),
            secondaryColor: Utils.randomPick(['white', 'black', 'gray', 'tan'])
        };
    }

    generateTraits() {
        const possibleTraits = [
            { id: 'aggressive', name: 'Aggressive', effect: '+10% damage, -5 defense' },
            { id: 'cautious', name: 'Cautious', effect: '+10 defense, -10% damage' },
            { id: 'lucky', name: 'Lucky', effect: '+5% crit chance' },
            { id: 'steady', name: 'Steady Hands', effect: '+5 aim' },
            { id: 'tough', name: 'Tough', effect: '+2 HP' },
            { id: 'quick', name: 'Quick', effect: '+1 mobility' }
        ];

        // Random chance to have a trait
        if (Math.random() < 0.3) {
            return [Utils.randomPick(possibleTraits)];
        }
        return [];
    }

    // Promote and choose ability
    promote(abilityId) {
        if (this.level > 7) return false;

        this.unlockedAbilities.push(abilityId);
        EventBus.emit('soldierPromoted', { soldier: this, ability: abilityId });
        return true;
    }

    // Get available abilities at current level
    getAvailableAbilities() {
        const classData = SOLDIER_CLASS_DATA[this.class];
        if (!classData) return [];

        const levelAbilities = classData.abilities.find(a => a.rank === this.level);
        if (!levelAbilities) return [];

        return levelAbilities.choices.filter(
            choice => !this.unlockedAbilities.includes(choice.id)
        );
    }

    // Check if ability is unlocked
    hasAbility(abilityId) {
        return this.unlockedAbilities.includes(abilityId);
    }

    // Equip weapon
    equipWeapon(weapon, slot = 'primary') {
        if (slot === 'primary') {
            this.primaryWeapon = weapon;
            this.weapon = weapon;
        } else {
            this.secondaryWeapon = weapon;
        }
    }

    // Equip armor
    equipArmor(armor) {
        this.armorSlot = armor;
        // Apply armor bonuses
        if (armor) {
            this.armor = armor.armor || 0;
            // HP bonus is applied separately
        }
    }

    // Equip utility item
    equipUtility(item, slot = 0) {
        if (slot < this.utilitySlots.length) {
            this.utilitySlots[slot] = item;
        }
    }

    // Wound soldier after mission
    wound(severity) {
        this.status = 'wounded';
        this.healTime = severity * 3; // Days to heal
        EventBus.emit('soldierWounded', { soldier: this, healTime: this.healTime });
    }

    // Serialize
    toJSON() {
        return {
            ...super.toJSON(),
            firstName: this.firstName,
            lastName: this.lastName,
            callsign: this.callsign,
            level: this.level,
            rank: this.rank,
            xp: this.xp,
            unlockedAbilities: this.unlockedAbilities,
            primaryWeapon: this.primaryWeapon,
            secondaryWeapon: this.secondaryWeapon,
            armorSlot: this.armorSlot,
            utilitySlots: this.utilitySlots,
            status: this.status,
            healTime: this.healTime,
            appearance: this.appearance,
            traits: this.traits,
            bond: this.bond,
            kills: this.kills,
            missions: this.missions
        };
    }
}

// Make available globally
window.Soldier = Soldier;
