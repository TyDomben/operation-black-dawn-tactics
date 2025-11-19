// Operation Black Dawn - Cover System

class CoverSystemClass {
    // Get cover value from target relative to attacker
    getCoverValue(target, attacker, map) {
        if (!target || !attacker || !map) return GAME_CONSTANTS.COVER_NONE;

        // Direction from attacker to target
        const dx = target.gridX - attacker.gridX;
        const dy = target.gridY - attacker.gridY;

        // Normalize direction
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance === 0) return GAME_CONSTANTS.COVER_NONE;

        const ndx = dx / distance;
        const ndy = dy / distance;

        // Check tiles adjacent to target that are between attacker and target
        const coverDirections = this.getCoverDirections(ndx, ndy);
        let bestCover = GAME_CONSTANTS.COVER_NONE;

        for (const dir of coverDirections) {
            const coverX = target.gridX + dir.x;
            const coverY = target.gridY + dir.y;

            const tile = map.getTile(coverX, coverY);
            if (!tile) continue;

            const coverValue = this.getTileCoverValue(tile);
            if (coverValue > bestCover) {
                bestCover = coverValue;
            }
        }

        return bestCover;
    }

    // Get relevant cover directions based on attack angle
    getCoverDirections(ndx, ndy) {
        const directions = [];

        // Primary direction
        if (Math.abs(ndx) > Math.abs(ndy)) {
            // Attack mainly from X direction
            directions.push({ x: -Math.sign(ndx), y: 0 });
        } else {
            // Attack mainly from Y direction
            directions.push({ x: 0, y: -Math.sign(ndy) });
        }

        // Also check diagonal if attack is diagonal
        if (Math.abs(ndx) > 0.3 && Math.abs(ndy) > 0.3) {
            directions.push({
                x: -Math.sign(ndx),
                y: -Math.sign(ndy)
            });
        }

        return directions;
    }

    // Get cover value for a tile
    getTileCoverValue(tile) {
        if (!tile) return GAME_CONSTANTS.COVER_NONE;

        switch (tile.type) {
            case TERRAIN_TYPES.WALL:
            case TERRAIN_TYPES.COVER_HIGH:
                return GAME_CONSTANTS.COVER_FULL;
            case TERRAIN_TYPES.COVER_LOW:
                return GAME_CONSTANTS.COVER_HALF;
            default:
                return GAME_CONSTANTS.COVER_NONE;
        }
    }

    // Check if attacker is flanking target
    isFlanking(attacker, target, map) {
        const cover = this.getCoverValue(target, attacker, map);
        return cover === GAME_CONSTANTS.COVER_NONE;
    }

    // Get cover indicators for a unit (for UI display)
    getCoverIndicators(unit, map) {
        const indicators = [];
        const directions = [
            { x: -1, y: 0, name: 'west' },
            { x: 1, y: 0, name: 'east' },
            { x: 0, y: -1, name: 'north' },
            { x: 0, y: 1, name: 'south' }
        ];

        directions.forEach(dir => {
            const tileX = unit.gridX + dir.x;
            const tileY = unit.gridY + dir.y;
            const tile = map.getTile(tileX, tileY);

            if (tile) {
                const coverValue = this.getTileCoverValue(tile);
                if (coverValue > 0) {
                    indicators.push({
                        direction: dir.name,
                        value: coverValue,
                        x: tileX,
                        y: tileY
                    });
                }
            }
        });

        return indicators;
    }

    // Destroy cover at a position
    destroyCover(map, x, y) {
        const tile = map.getTile(x, y);
        if (!tile) return;

        if (tile.destructible && tile.hp !== undefined) {
            tile.hp--;
            if (tile.hp <= 0) {
                tile.type = TERRAIN_TYPES.FLOOR;
                tile.destructible = false;
                EventBus.emit('coverDestroyed', { x, y });
            }
        }
    }

    // Damage cover at position
    damageCover(map, x, y, damage) {
        const tile = map.getTile(x, y);
        if (!tile || !tile.destructible) return;

        tile.hp = (tile.hp || GAME_CONSTANTS.COVER_HP.medium) - damage;
        if (tile.hp <= 0) {
            tile.type = TERRAIN_TYPES.FLOOR;
            tile.destructible = false;
            EventBus.emit('coverDestroyed', { x, y });
        }
    }

    // Check if position has any cover
    hasCover(map, x, y) {
        const directions = [
            { x: -1, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: -1 },
            { x: 0, y: 1 }
        ];

        for (const dir of directions) {
            const tile = map.getTile(x + dir.x, y + dir.y);
            if (tile && this.getTileCoverValue(tile) > 0) {
                return true;
            }
        }

        return false;
    }

    // Get best cover position in range
    findBestCoverPosition(unit, enemies, map, maxRange) {
        let bestPos = null;
        let bestScore = -Infinity;

        const positions = Pathfinding.getMovementRange(unit, map);

        positions.forEach(pos => {
            let score = 0;

            // Score based on cover from enemies
            enemies.forEach(enemy => {
                if (enemy.state === GAME_CONSTANTS.STATE_DEAD) return;

                // Create temporary unit at position to check cover
                const tempUnit = { gridX: pos.x, gridY: pos.y };
                const cover = this.getCoverValue(tempUnit, enemy, map);

                score += cover * 10;

                // Bonus for being able to see enemy
                if (LOSSystem.hasLineOfSight(pos.x, pos.y, enemy.gridX, enemy.gridY, map)) {
                    score += 5;
                }
            });

            // Penalize exposed positions
            if (!this.hasCover(map, pos.x, pos.y)) {
                score -= 20;
            }

            if (score > bestScore) {
                bestScore = score;
                bestPos = pos;
            }
        });

        return bestPos;
    }
}

// Global instance
const CoverSystem = new CoverSystemClass();
