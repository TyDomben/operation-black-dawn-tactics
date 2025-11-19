// Operation Black Dawn - Damage System

class DamageSystemClass {
    // Apply damage to a unit
    applyDamage(target, damage, source, isCrit) {
        if (!target || target.state === GAME_CONSTANTS.STATE_DEAD) return;

        const actualDamage = Math.max(0, damage);
        target.currentHP -= actualDamage;

        // Show damage number
        Renderer.animateDamageNumber(target.gridX, target.gridY, actualDamage, isCrit);

        // Track stats
        if (source && source.team === 'player') {
            Game.tactical.stats.damageDealt += actualDamage;
        } else if (target.team === 'player') {
            Game.tactical.stats.damageTaken += actualDamage;
        }

        // Check for death
        if (target.currentHP <= 0) {
            this.handleDeath(target, source);
        } else {
            // Will check for panic
            MoraleSystem.checkWillDamage(target, actualDamage);
        }

        EventBus.emit('unitDamaged', { unit: target, damage: actualDamage, source });
    }

    // Handle unit death
    handleDeath(unit, killer) {
        unit.state = GAME_CONSTANTS.STATE_DEAD;
        unit.currentHP = 0;

        EventBus.emit('unitKilled', { unit, killer });

        if (unit.team === 'player') {
            CombatSystem.logCombat(`${unit.name} has been killed!`, 'kill');
            Game.tactical.stats.soldiersLost = (Game.tactical.stats.soldiersLost || 0) + 1;

            // Morale impact on allies
            MoraleSystem.allyDeath(unit);
        } else {
            CombatSystem.logCombat(`${unit.name} eliminated`, 'kill');
            Game.tactical.stats.kills++;

            // Award XP to killer
            if (killer && killer.team === 'player') {
                this.awardXP(killer, unit);
            }
        }
    }

    // Award XP for kill
    awardXP(soldier, enemy) {
        const xp = enemy.xp || 50;
        soldier.xp = (soldier.xp || 0) + xp;

        // Check for level up
        const nextLevelXP = GAME_CONSTANTS.XP_PER_LEVEL[soldier.level] || 1000;
        if (soldier.xp >= nextLevelXP) {
            this.levelUp(soldier);
        }
    }

    // Level up soldier
    levelUp(soldier) {
        if (soldier.level >= 10) return;

        soldier.level++;
        soldier.xp = 0;

        // Apply stat growth
        const classData = SOLDIER_CLASS_DATA[soldier.class];
        if (classData) {
            soldier.maxHP += classData.statGrowth.hp;
            soldier.currentHP += classData.statGrowth.hp;
            soldier.aim += classData.statGrowth.aim;
            soldier.will += classData.statGrowth.will;
            soldier.dodge += classData.statGrowth.dodge;
        }

        // Get new rank
        soldier.rank = GAME_CONSTANTS.RANKS[soldier.level - 1] || 'Legend';

        EventBus.emit('soldierLevelUp', { soldier, newLevel: soldier.level });
        CombatSystem.logCombat(`${soldier.name} promoted to ${soldier.rank}!`, 'info');
    }

    // Apply healing
    applyHealing(target, amount, source) {
        if (!target || target.state === GAME_CONSTANTS.STATE_DEAD) return;

        const actualHeal = Math.min(amount, target.maxHP - target.currentHP);
        target.currentHP += actualHeal;

        EventBus.emit('unitHealed', { unit: target, amount: actualHeal, source });
        CombatSystem.logCombat(`${target.name} healed for ${actualHeal}`, 'heal');
    }

    // Apply status effect
    applyStatus(target, status, duration) {
        switch (status) {
            case 'burn':
                target.burning = Math.max(target.burning || 0, duration);
                CombatSystem.logCombat(`${target.name} is burning!`, 'info');
                break;
            case 'poison':
                target.poisoned = Math.max(target.poisoned || 0, duration);
                CombatSystem.logCombat(`${target.name} is poisoned!`, 'info');
                break;
            case 'stun':
                target.stunned = duration;
                target.actionsRemaining = 0;
                CombatSystem.logCombat(`${target.name} is stunned!`, 'info');
                break;
            case 'disorient':
                target.disoriented = duration;
                CombatSystem.logCombat(`${target.name} is disoriented!`, 'info');
                break;
        }

        EventBus.emit('statusApplied', { unit: target, status, duration });
    }

    // Calculate effective armor
    getEffectiveArmor(target, damageType) {
        let armor = target.armor || 0;

        // Armor piercing
        if (damageType === 'piercing') {
            armor = Math.floor(armor / 2);
        }

        // Shred reduces armor
        if (target.shredded) {
            armor = Math.max(0, armor - target.shredded);
        }

        return armor;
    }

    // Shred armor
    shredArmor(target, amount) {
        target.shredded = (target.shredded || 0) + amount;
        CombatSystem.logCombat(`${target.name}'s armor shredded by ${amount}!`, 'info');
    }
}

// Global instance
const DamageSystem = new DamageSystemClass();
