// Operation Black Dawn - Line of Sight System

class LOSSystemClass {
    // Check if there's line of sight between two points
    hasLineOfSight(x1, y1, x2, y2, map) {
        const line = Utils.getLine(x1, y1, x2, y2);

        // Skip first and last points (source and target)
        for (let i = 1; i < line.length - 1; i++) {
            const point = line[i];
            const tile = map.getTile(point.x, point.y);

            if (!tile || this.blocksLOS(tile)) {
                return false;
            }
        }

        return true;
    }

    // Check if a tile blocks line of sight
    blocksLOS(tile) {
        if (!tile) return true;

        switch (tile.type) {
            case TERRAIN_TYPES.WALL:
            case TERRAIN_TYPES.COVER_HIGH:
                return true;
            default:
                return false;
        }
    }

    // Get all tiles visible from a position
    getVisibleTiles(x, y, range, map) {
        const visibleTiles = [];

        for (let ty = y - range; ty <= y + range; ty++) {
            for (let tx = x - range; tx <= x + range; tx++) {
                if (!Utils.inBounds(tx, ty, map.width, map.height)) continue;

                const distance = Utils.distance(x, y, tx, ty);
                if (distance > range) continue;

                if (this.hasLineOfSight(x, y, tx, ty, map)) {
                    visibleTiles.push({ x: tx, y: ty, distance });
                }
            }
        }

        return visibleTiles;
    }

    // Get all units visible to a unit
    getVisibleUnits(unit, allUnits, map) {
        const range = unit.getSightRange ? unit.getSightRange() : GAME_CONSTANTS.MAX_VISION_RANGE;
        const visible = [];

        allUnits.forEach(other => {
            if (other === unit) return;
            if (other.state === GAME_CONSTANTS.STATE_DEAD) return;

            const distance = Utils.distance(unit.gridX, unit.gridY, other.gridX, other.gridY);
            if (distance > range) return;

            if (this.hasLineOfSight(unit.gridX, unit.gridY, other.gridX, other.gridY, map)) {
                visible.push(other);
            }
        });

        return visible;
    }

    // Get attack range for a unit
    getAttackRange(unit, map) {
        const weapon = unit.weapon || { range: { max: 15 } };
        const range = weapon.range?.max || 15;

        return this.getVisibleTiles(unit.gridX, unit.gridY, range, map);
    }

    // Check if target is in range and visible
    canTarget(unit, targetX, targetY, map) {
        const weapon = unit.weapon || { range: { max: 15 } };
        const range = weapon.range?.max || 15;

        const distance = Utils.distance(unit.gridX, unit.gridY, targetX, targetY);
        if (distance > range) return false;

        return this.hasLineOfSight(unit.gridX, unit.gridY, targetX, targetY, map);
    }

    // Get enemies in sight
    getEnemiesInSight(unit, map) {
        const enemies = unit.team === 'player' ? Game.tactical.enemies : Game.tactical.units;
        return this.getVisibleUnits(unit, enemies, map);
    }

    // Get allies in sight
    getAlliesInSight(unit, map) {
        const allies = unit.team === 'player' ? Game.tactical.units : Game.tactical.enemies;
        return this.getVisibleUnits(unit, allies.filter(a => a !== unit), map);
    }

    // Count enemies in sight
    countEnemiesInSight(unit, map) {
        return this.getEnemiesInSight(unit, map).length;
    }

    // Check if tile is in shadow (for concealment)
    isInShadow(x, y, map) {
        const tile = map.getTile(x, y);
        return tile && tile.shadow;
    }

    // Calculate concealment modifier
    getConcealmentModifier(unit, map) {
        if (unit.concealed) {
            return GAME_CONSTANTS.CONCEALMENT_BONUS;
        }

        const tile = map.getTile(unit.gridX, unit.gridY);
        if (tile && tile.shadow) {
            return 10;
        }

        return 0;
    }

    // Reveal hidden enemies when spotted
    revealEnemies(unit, map) {
        const enemies = this.getEnemiesInSight(unit, map);

        enemies.forEach(enemy => {
            if (enemy.concealed) {
                enemy.concealed = false;
                EventBus.emit('enemyRevealed', enemy);
            }
        });

        return enemies;
    }
}

// Global instance
const LOSSystem = new LOSSystemClass();
