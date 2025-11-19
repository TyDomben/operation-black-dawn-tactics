// Operation Black Dawn - AI System

class AISystemClass {
    constructor() {
        this.behaviorWeights = {
            terrorist: { aggression: 0.5, flanking: 0.4, cover: 0.6, retreat: 0.3 },
            rogue_military: { aggression: 0.6, flanking: 0.7, cover: 0.8, retreat: 0.4 },
            alien: { aggression: 0.7, flanking: 0.5, cover: 0.5, retreat: 0.2 },
            robot: { aggression: 0.8, flanking: 0.3, cover: 0.4, retreat: 0.1 }
        };
    }

    // Execute all enemy turns
    async executeEnemyTurn() {
        const enemies = Game.tactical.enemies.filter(e => e.state !== GAME_CONSTANTS.STATE_DEAD);

        for (const enemy of enemies) {
            if (enemy.actionsRemaining <= 0) continue;

            await this.executeUnitAI(enemy);
            await this.delay(500); // Pause between enemy actions for visibility
        }

        // End enemy phase
        CombatSystem.endPhase();
    }

    // Execute AI for a single unit
    async executeUnitAI(enemy) {
        const behavior = this.behaviorWeights[enemy.faction] || this.behaviorWeights.terrorist;
        const visibleTargets = LOSSystem.getEnemiesInSight(enemy, Game.tactical.map);

        // Determine best action
        const action = this.determineAction(enemy, visibleTargets, behavior);

        switch (action.type) {
            case 'attack':
                await this.executeAttack(enemy, action.target);
                break;
            case 'move_and_attack':
                await this.executeMoveAndAttack(enemy, action.position, action.target);
                break;
            case 'flank':
                await this.executeFlank(enemy, action.target);
                break;
            case 'overwatch':
                this.executeOverwatch(enemy);
                break;
            case 'advance':
                await this.executeAdvance(enemy, action.position);
                break;
            case 'retreat':
                await this.executeRetreat(enemy);
                break;
            case 'support':
                await this.executeSupport(enemy, action.target);
                break;
            default:
                // Do nothing / hunker
                enemy.actionsRemaining = 0;
        }
    }

    // Determine best action for unit
    determineAction(enemy, targets, behavior) {
        const map = Game.tactical.map;

        // Priority 1: Attack if in range
        if (targets.length > 0) {
            const bestTarget = this.selectTarget(enemy, targets);

            if (bestTarget && LOSSystem.canTarget(enemy, bestTarget.gridX, bestTarget.gridY, map)) {
                // Decide: attack now, or move for better position?
                const hitChance = CombatSystem.calculateHitChance(enemy, bestTarget);

                if (hitChance >= 50 || enemy.currentHP < enemy.maxHP * 0.3) {
                    return { type: 'attack', target: bestTarget };
                }

                // Try flanking
                if (Math.random() < behavior.flanking) {
                    const flankPos = this.findFlankingPosition(enemy, bestTarget, map);
                    if (flankPos) {
                        return { type: 'flank', target: bestTarget, position: flankPos };
                    }
                }

                // Move and attack
                const betterPos = this.findBetterAttackPosition(enemy, bestTarget, map);
                if (betterPos) {
                    return { type: 'move_and_attack', target: bestTarget, position: betterPos };
                }

                return { type: 'attack', target: bestTarget };
            }
        }

        // Priority 2: Move toward targets
        const allTargets = Game.tactical.units.filter(u => u.state !== GAME_CONSTANTS.STATE_DEAD);
        if (allTargets.length > 0) {
            const nearest = this.findNearestTarget(enemy, allTargets);
            if (nearest) {
                const pos = this.findAdvancePosition(enemy, nearest, map);
                if (pos) {
                    return { type: 'advance', position: pos };
                }
            }
        }

        // Priority 3: Overwatch if aggressive
        if (Math.random() < behavior.aggression) {
            return { type: 'overwatch' };
        }

        return { type: 'wait' };
    }

    // Select best target
    selectTarget(enemy, targets) {
        if (targets.length === 0) return null;

        // Score each target
        const scored = targets.map(target => {
            let score = 0;

            // Prefer wounded targets
            const hpPercent = target.currentHP / target.maxHP;
            score += (1 - hpPercent) * 50;

            // Prefer targets without cover
            const cover = CoverSystem.getCoverValue(target, enemy, Game.tactical.map);
            score += (2 - cover) * 20;

            // Prefer closer targets
            const dist = Utils.distance(enemy.gridX, enemy.gridY, target.gridX, target.gridY);
            score += Math.max(0, 20 - dist);

            // Prefer high-value targets (medics, snipers)
            if (['medic', 'sniper'].includes(target.class)) {
                score += 15;
            }

            return { target, score };
        });

        // Sort by score and return best
        scored.sort((a, b) => b.score - a.score);
        return scored[0].target;
    }

    // Find flanking position
    findFlankingPosition(enemy, target, map) {
        const positions = Pathfinding.getFlankingPositions(target, enemy, map);
        if (positions.length === 0) return null;

        // Filter to reachable positions
        const reachable = positions.filter(p => {
            const path = Pathfinding.findPath(enemy.gridX, enemy.gridY, p.x, p.y, map);
            return path && path.length <= enemy.mobility;
        });

        if (reachable.length === 0) return null;

        // Prefer positions with cover
        reachable.sort((a, b) => {
            const coverA = CoverSystem.hasCover(map, a.x, a.y) ? 1 : 0;
            const coverB = CoverSystem.hasCover(map, b.x, b.y) ? 1 : 0;
            return coverB - coverA;
        });

        return reachable[0];
    }

    // Find better attack position
    findBetterAttackPosition(enemy, target, map) {
        const range = Pathfinding.getMovementRange(enemy, map);

        // Find positions in weapon range with better hit chance
        const candidates = range.filter(pos => {
            const dist = Utils.distance(pos.x, pos.y, target.gridX, target.gridY);
            return dist <= (enemy.weapon?.range?.max || 15) &&
                   LOSSystem.hasLineOfSight(pos.x, pos.y, target.gridX, target.gridY, map);
        });

        if (candidates.length === 0) return null;

        // Score positions
        candidates.forEach(pos => {
            pos.score = 0;

            // Closer is better (for most weapons)
            const dist = Utils.distance(pos.x, pos.y, target.gridX, target.gridY);
            pos.score += Math.max(0, 20 - dist);

            // Cover is good
            if (CoverSystem.hasCover(map, pos.x, pos.y)) {
                pos.score += 15;
            }

            // Flanking is great
            const tempUnit = { gridX: pos.x, gridY: pos.y };
            if (CoverSystem.isFlanking(tempUnit, target, map)) {
                pos.score += 25;
            }
        });

        candidates.sort((a, b) => b.score - a.score);
        return candidates[0];
    }

    // Find position to advance toward target
    findAdvancePosition(enemy, target, map) {
        const range = Pathfinding.getMovementRange(enemy, map);
        if (range.length === 0) return null;

        // Move toward target
        range.forEach(pos => {
            const dist = Utils.distance(pos.x, pos.y, target.gridX, target.gridY);
            pos.distToTarget = dist;
        });

        // Sort by distance to target, prefer positions with cover
        range.sort((a, b) => {
            const coverA = CoverSystem.hasCover(map, a.x, a.y) ? 0 : 1;
            const coverB = CoverSystem.hasCover(map, b.x, b.y) ? 0 : 1;
            return (a.distToTarget + coverA * 5) - (b.distToTarget + coverB * 5);
        });

        return range[0];
    }

    // Find nearest target
    findNearestTarget(enemy, targets) {
        let nearest = null;
        let minDist = Infinity;

        targets.forEach(t => {
            const dist = Utils.distance(enemy.gridX, enemy.gridY, t.gridX, t.gridY);
            if (dist < minDist) {
                minDist = dist;
                nearest = t;
            }
        });

        return nearest;
    }

    // Execute attack action
    async executeAttack(enemy, target) {
        CombatSystem.executeShoot(enemy, target);
        await this.delay(800);

        // Second action if available
        if (enemy.actionsRemaining > 0) {
            if (Math.random() < 0.5) {
                CombatSystem.executeShoot(enemy, target);
            } else if (enemy.actionsRemaining >= 2) {
                this.executeOverwatch(enemy);
            }
        }
    }

    // Execute move and attack
    async executeMoveAndAttack(enemy, position, target) {
        // Move
        const path = Pathfinding.findPath(enemy.gridX, enemy.gridY, position.x, position.y, Game.tactical.map);
        if (path) {
            for (const tile of path) {
                enemy.gridX = tile.x;
                enemy.gridY = tile.y;
                await this.delay(100);
            }
        }
        enemy.actionsRemaining--;

        // Attack
        if (enemy.actionsRemaining > 0) {
            CombatSystem.executeShoot(enemy, target);
        }
    }

    // Execute flank maneuver
    async executeFlank(enemy, target) {
        const flankPos = this.findFlankingPosition(enemy, target, Game.tactical.map);
        if (flankPos) {
            await this.executeMoveAndAttack(enemy, flankPos, target);
        }
    }

    // Execute overwatch
    executeOverwatch(enemy) {
        enemy.state = GAME_CONSTANTS.STATE_OVERWATCH;
        enemy.actionsRemaining = 0;
        Game.tactical.overwatchUnits.push(enemy);
        CombatSystem.logCombat(`${enemy.name} enters overwatch`, 'info');
    }

    // Execute advance
    async executeAdvance(enemy, position) {
        const path = Pathfinding.findPath(enemy.gridX, enemy.gridY, position.x, position.y, Game.tactical.map);
        if (path) {
            for (const tile of path) {
                enemy.gridX = tile.x;
                enemy.gridY = tile.y;
                await this.delay(100);
            }
        }
        enemy.actionsRemaining = 0;
    }

    // Execute retreat
    async executeRetreat(enemy) {
        // Find position away from players
        const range = Pathfinding.getMovementRange(enemy, Game.tactical.map);
        const players = Game.tactical.units;

        range.forEach(pos => {
            pos.minDistToPlayer = Infinity;
            players.forEach(p => {
                const dist = Utils.distance(pos.x, pos.y, p.gridX, p.gridY);
                if (dist < pos.minDistToPlayer) {
                    pos.minDistToPlayer = dist;
                }
            });
        });

        // Move to furthest position with cover
        range.sort((a, b) => {
            const coverA = CoverSystem.hasCover(Game.tactical.map, a.x, a.y) ? 10 : 0;
            const coverB = CoverSystem.hasCover(Game.tactical.map, b.x, b.y) ? 10 : 0;
            return (b.minDistToPlayer + coverB) - (a.minDistToPlayer + coverA);
        });

        if (range.length > 0) {
            await this.executeAdvance(enemy, range[0]);
        }
    }

    // Execute support action (heal, buff)
    async executeSupport(enemy, target) {
        // Heal if medic
        if (enemy.abilities && enemy.abilities.includes('heal')) {
            // Find wounded ally
            const allies = Game.tactical.enemies.filter(e =>
                e !== enemy &&
                e.state !== GAME_CONSTANTS.STATE_DEAD &&
                e.currentHP < e.maxHP
            );

            if (allies.length > 0) {
                allies.sort((a, b) => a.currentHP / a.maxHP - b.currentHP / b.maxHP);
                const wounded = allies[0];

                // Heal
                const healAmount = enemy.healAmount || 4;
                wounded.currentHP = Math.min(wounded.maxHP, wounded.currentHP + healAmount);
                CombatSystem.logCombat(`${enemy.name} heals ${wounded.name} for ${healAmount}`, 'heal');
                enemy.actionsRemaining--;
            }
        }
    }

    // Utility delay
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Global instance
const AISystem = new AISystemClass();
