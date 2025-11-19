// Operation Black Dawn - Pathfinding System (A*)

class PathfindingClass {
    // Find path between two points using A*
    findPath(startX, startY, endX, endY, map) {
        const openSet = new Utils.PriorityQueue();
        const closedSet = new Set();
        const cameFrom = new Map();
        const gScore = new Map();
        const fScore = new Map();

        const startKey = `${startX},${startY}`;
        const endKey = `${endX},${endY}`;

        gScore.set(startKey, 0);
        fScore.set(startKey, Utils.manhattanDistance(startX, startY, endX, endY));
        openSet.enqueue({ x: startX, y: startY }, fScore.get(startKey));

        while (!openSet.isEmpty()) {
            const current = openSet.dequeue();
            const currentKey = `${current.x},${current.y}`;

            if (currentKey === endKey) {
                return this.reconstructPath(cameFrom, current);
            }

            closedSet.add(currentKey);

            // Get neighbors
            const neighbors = Utils.getNeighbors(current.x, current.y, true);

            for (const neighbor of neighbors) {
                const neighborKey = `${neighbor.x},${neighbor.y}`;

                if (closedSet.has(neighborKey)) continue;
                if (!this.isWalkable(neighbor.x, neighbor.y, map)) continue;

                // Calculate movement cost (diagonal costs more)
                const isDiagonal = neighbor.x !== current.x && neighbor.y !== current.y;
                const moveCost = isDiagonal ? 1.414 : 1;

                const tentativeG = gScore.get(currentKey) + moveCost;

                if (!gScore.has(neighborKey) || tentativeG < gScore.get(neighborKey)) {
                    cameFrom.set(neighborKey, current);
                    gScore.set(neighborKey, tentativeG);
                    const h = Utils.manhattanDistance(neighbor.x, neighbor.y, endX, endY);
                    fScore.set(neighborKey, tentativeG + h);

                    openSet.enqueue(neighbor, fScore.get(neighborKey));
                }
            }
        }

        // No path found
        return null;
    }

    // Reconstruct path from came-from map
    reconstructPath(cameFrom, current) {
        const path = [{ x: current.x, y: current.y }];
        let key = `${current.x},${current.y}`;

        while (cameFrom.has(key)) {
            current = cameFrom.get(key);
            key = `${current.x},${current.y}`;
            path.unshift({ x: current.x, y: current.y });
        }

        // Remove starting position
        path.shift();

        return path;
    }

    // Check if a tile is walkable
    isWalkable(x, y, map) {
        if (!Utils.inBounds(x, y, map.width, map.height)) return false;

        const tile = map.getTile(x, y);
        if (!tile) return false;

        // Check terrain type
        if (tile.type === TERRAIN_TYPES.WALL ||
            tile.type === TERRAIN_TYPES.PIT) {
            return false;
        }

        // Check for units
        const unit = Game.getUnitAt(x, y);
        if (unit && unit.state !== GAME_CONSTANTS.STATE_DEAD) {
            return false;
        }

        return true;
    }

    // Get all tiles reachable within movement range
    getMovementRange(unit, map) {
        const range = [];
        const moveRange = unit.getMoveRange ? unit.getMoveRange() : unit.mobility || 12;
        const dashRange = moveRange * 2;

        const visited = new Map();
        const queue = [{ x: unit.gridX, y: unit.gridY, cost: 0 }];
        visited.set(`${unit.gridX},${unit.gridY}`, 0);

        while (queue.length > 0) {
            const current = queue.shift();

            const neighbors = Utils.getNeighbors(current.x, current.y, true);

            for (const neighbor of neighbors) {
                if (!this.isWalkable(neighbor.x, neighbor.y, map)) continue;

                const isDiagonal = neighbor.x !== current.x && neighbor.y !== current.y;
                const moveCost = isDiagonal ? 1.414 : 1;
                const newCost = current.cost + moveCost;

                const key = `${neighbor.x},${neighbor.y}`;

                if (newCost <= dashRange && (!visited.has(key) || newCost < visited.get(key))) {
                    visited.set(key, newCost);
                    queue.push({ x: neighbor.x, y: neighbor.y, cost: newCost });

                    range.push({
                        x: neighbor.x,
                        y: neighbor.y,
                        cost: newCost,
                        isDash: newCost > moveRange
                    });
                }
            }
        }

        return range;
    }

    // Get path length between two points
    getPathLength(startX, startY, endX, endY, map) {
        const path = this.findPath(startX, startY, endX, endY, map);
        return path ? path.length : Infinity;
    }

    // Check if position is reachable
    canReach(unit, targetX, targetY, map) {
        if (unit.gridX === targetX && unit.gridY === targetY) return true;

        const path = this.findPath(unit.gridX, unit.gridY, targetX, targetY, map);
        if (!path) return false;

        const moveRange = unit.getMoveRange ? unit.getMoveRange() : unit.mobility || 12;
        return path.length <= moveRange * 2; // Include dash range
    }

    // Find nearest walkable tile to target
    findNearestWalkable(targetX, targetY, map, maxSearch = 5) {
        // BFS for nearest walkable tile
        const queue = [{ x: targetX, y: targetY }];
        const visited = new Set();

        while (queue.length > 0) {
            const current = queue.shift();
            const key = `${current.x},${current.y}`;

            if (visited.has(key)) continue;
            visited.add(key);

            if (this.isWalkable(current.x, current.y, map)) {
                return current;
            }

            if (visited.size > maxSearch * maxSearch) break;

            const neighbors = Utils.getNeighbors(current.x, current.y, false);
            for (const n of neighbors) {
                if (Utils.inBounds(n.x, n.y, map.width, map.height)) {
                    queue.push(n);
                }
            }
        }

        return null;
    }

    // Get tiles for flanking positions
    getFlankingPositions(target, attacker, map) {
        const flanks = [];
        const range = Pathfinding.getMovementRange(attacker, map);

        range.forEach(pos => {
            // Check if this position provides flanking
            const tempUnit = { gridX: pos.x, gridY: pos.y };
            if (CoverSystem.isFlanking(tempUnit, target, map)) {
                flanks.push(pos);
            }
        });

        return flanks;
    }
}

// Global instance
const Pathfinding = new PathfindingClass();
