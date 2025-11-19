// Operation Black Dawn - Enemy Class

class Enemy extends Unit {
    constructor(data = {}) {
        // Get enemy template data
        const template = ENEMIES_DATA[data.type] || {};

        super({
            ...template,
            ...data
        });

        this.team = 'enemy';
        this.type = data.type || 'terrorist_militia';
        this.faction = template.faction || data.faction || 'terrorist';

        // Apply template stats
        this.name = data.name || template.name || 'Enemy';
        this.maxHP = template.hp || data.hp || 5;
        this.currentHP = this.maxHP;
        this.aim = template.aim || data.aim || 60;
        this.armor = template.armor || data.armor || 0;
        this.mobility = template.mobility || data.mobility || 12;
        this.defense = template.defense || data.defense || 0;

        // Damage
        this.damage = template.damage || { min: 2, max: 4 };

        // Create weapon from damage
        this.weapon = {
            damage: this.damage,
            critDamage: { min: this.damage.min + 2, max: this.damage.max + 3 },
            critChance: 10,
            range: { optimal: template.range || 15, max: (template.range || 15) + 5 },
            ammo: 99,
            currentAmmo: 99
        };

        // Abilities
        this.abilities = template.abilities || data.abilities || [];

        // Special properties
        this.robotic = template.robotic || false;
        this.melee = template.melee || false;
        this.stationary = template.stationary || false;

        // Loot
        this.loot = template.loot || {};
        this.xp = template.xp || 50;

        // Support abilities
        this.healAmount = template.healAmount || 4;
        this.grenades = template.grenades || 0;
        this.rockets = template.rockets || 0;

        // Psionic
        this.psi = template.psi || 0;
    }

    // Factory method to create enemy from type
    static create(type, position = {}) {
        return new Enemy({
            type,
            gridX: position.x || 0,
            gridY: position.y || 0
        });
    }

    // Create enemies for a mission
    static createForMission(enemyList, map) {
        const enemies = [];
        const spawnZone = map.spawnZones?.enemy || { x: 15, y: 5, w: 10, h: 10 };

        enemyList.forEach(entry => {
            for (let i = 0; i < entry.count; i++) {
                // Find spawn position
                let x, y;
                let attempts = 0;
                do {
                    x = spawnZone.x + Utils.random(0, spawnZone.w - 1);
                    y = spawnZone.y + Utils.random(0, spawnZone.h - 1);
                    attempts++;
                } while (
                    attempts < 50 &&
                    (map.getTile(x, y)?.type === TERRAIN_TYPES.WALL ||
                     enemies.some(e => e.gridX === x && e.gridY === y))
                );

                const enemy = Enemy.create(entry.type, { x, y });
                enemies.push(enemy);
            }
        });

        return enemies;
    }

    // Check if enemy can use grenade
    canUseGrenade() {
        return this.grenades > 0 && this.abilities.includes('grenade');
    }

    // Check if enemy can use rocket
    canUseRocket() {
        return this.rockets > 0 && this.abilities.includes('rocket');
    }

    // Get loot when killed
    getLoot() {
        return this.loot;
    }
}

// Make available globally
window.Enemy = Enemy;
