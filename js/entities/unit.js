// Operation Black Dawn - Base Unit Class

class Unit {
    constructor(data = {}) {
        this.id = data.id || Utils.generateId();
        this.name = data.name || 'Unit';
        this.team = data.team || 'enemy';
        this.class = data.class || 'rifleman';
        this.faction = data.faction || 'terrorist';

        // Position
        this.gridX = data.gridX || 0;
        this.gridY = data.gridY || 0;
        this.height = data.height || 0;

        // Stats
        this.maxHP = data.maxHP || data.hp || 5;
        this.currentHP = data.currentHP || this.maxHP;
        this.aim = data.aim || 60;
        this.will = data.will || 50;
        this.currentWill = data.currentWill || this.will;
        this.dodge = data.dodge || 0;
        this.armor = data.armor || 0;
        this.mobility = data.mobility || 12;

        // Combat
        this.actionsRemaining = GAME_CONSTANTS.ACTIONS_PER_TURN;
        this.hasMoved = false;
        this.hasActed = false;
        this.state = data.state || GAME_CONSTANTS.STATE_IDLE;

        // Equipment
        this.weapon = data.weapon || null;
        this.armor = data.armor || null;
        this.items = data.items || [];

        // Status effects
        this.burning = 0;
        this.poisoned = 0;
        this.stunned = 0;
        this.disoriented = 0;
        this.shredded = 0;
        this.concealed = data.concealed || false;

        // Abilities
        this.abilities = data.abilities || [];
        this.cooldowns = {};

        // Ranges (calculated)
        this.movementRange = [];
        this.attackRange = [];
    }

    // Get movement range
    getMoveRange() {
        let range = this.mobility;
        if (this.disoriented > 0) range -= 3;
        return Math.max(1, range);
    }

    // Get sight range
    getSightRange() {
        return GAME_CONSTANTS.MAX_VISION_RANGE;
    }

    // Check if unit can act
    canAct() {
        return this.actionsRemaining > 0 &&
               this.state !== GAME_CONSTANTS.STATE_DEAD &&
               this.state !== GAME_CONSTANTS.STATE_STUNNED;
    }

    // Check if unit can move
    canMove() {
        return this.canAct() && !this.hasMoved;
    }

    // Get weapon damage range
    getWeaponDamage() {
        if (this.weapon) {
            return this.weapon.damage;
        }
        return { min: 2, max: 4 };
    }

    // Use ability
    useAbility(abilityId) {
        if (this.cooldowns[abilityId] > 0) return false;

        const ability = this.abilities.find(a => a === abilityId || a.id === abilityId);
        if (!ability) return false;

        // Set cooldown
        const cooldown = typeof ability === 'object' ? ability.cooldown : 0;
        if (cooldown > 0) {
            this.cooldowns[abilityId] = cooldown;
        }

        return true;
    }

    // Reduce cooldowns at turn start
    reduceCooldowns() {
        Object.keys(this.cooldowns).forEach(key => {
            if (this.cooldowns[key] > 0) {
                this.cooldowns[key]--;
            }
        });
    }

    // Serialize for save
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            team: this.team,
            class: this.class,
            faction: this.faction,
            gridX: this.gridX,
            gridY: this.gridY,
            maxHP: this.maxHP,
            currentHP: this.currentHP,
            aim: this.aim,
            will: this.will,
            currentWill: this.currentWill,
            dodge: this.dodge,
            armor: this.armor,
            mobility: this.mobility,
            state: this.state,
            weapon: this.weapon,
            items: this.items,
            abilities: this.abilities,
            cooldowns: this.cooldowns
        };
    }
}

// Make available globally
window.Unit = Unit;
