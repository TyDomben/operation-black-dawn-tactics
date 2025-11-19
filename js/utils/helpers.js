// Operation Black Dawn - Helper Utilities

const Utils = {
    // Random number between min and max (inclusive)
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Random float between min and max
    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    },

    // Roll percentage chance
    rollChance(percent) {
        return Math.random() * 100 < percent;
    },

    // Clamp value between min and max
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },

    // Distance between two points
    distance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    },

    // Manhattan distance (grid-based)
    manhattanDistance(x1, y1, x2, y2) {
        return Math.abs(x2 - x1) + Math.abs(y2 - y1);
    },

    // Chebyshev distance (8-directional)
    chebyshevDistance(x1, y1, x2, y2) {
        return Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    },

    // Angle between two points (radians)
    angle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    },

    // Angle between two points (degrees)
    angleDeg(x1, y1, x2, y2) {
        return this.angle(x1, y1, x2, y2) * 180 / Math.PI;
    },

    // Linear interpolation
    lerp(a, b, t) {
        return a + (b - a) * t;
    },

    // Smooth step interpolation
    smoothstep(a, b, t) {
        t = this.clamp((t - a) / (b - a), 0, 1);
        return t * t * (3 - 2 * t);
    },

    // Deep clone object
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    // Generate unique ID
    generateId() {
        return 'id_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    },

    // Shuffle array in place
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    // Pick random element from array
    randomPick(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    // Pick random weighted element
    weightedPick(items, weights) {
        const total = weights.reduce((sum, w) => sum + w, 0);
        let random = Math.random() * total;
        for (let i = 0; i < items.length; i++) {
            random -= weights[i];
            if (random <= 0) return items[i];
        }
        return items[items.length - 1];
    },

    // Format number with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    // Format time (seconds to mm:ss)
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    },

    // Format date
    formatDate(date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.month - 1]} ${date.day}, ${date.year}`;
    },

    // Grid position to pixel coordinates
    gridToPixel(gridX, gridY, tileSize = GAME_CONSTANTS.TILE_SIZE) {
        return {
            x: gridX * tileSize + tileSize / 2,
            y: gridY * tileSize + tileSize / 2
        };
    },

    // Pixel coordinates to grid position
    pixelToGrid(pixelX, pixelY, tileSize = GAME_CONSTANTS.TILE_SIZE) {
        return {
            x: Math.floor(pixelX / tileSize),
            y: Math.floor(pixelY / tileSize)
        };
    },

    // Get neighbors of a grid cell
    getNeighbors(x, y, diagonal = true) {
        const neighbors = [
            { x: x - 1, y: y },
            { x: x + 1, y: y },
            { x: x, y: y - 1 },
            { x: x, y: y + 1 }
        ];
        if (diagonal) {
            neighbors.push(
                { x: x - 1, y: y - 1 },
                { x: x + 1, y: y - 1 },
                { x: x - 1, y: y + 1 },
                { x: x + 1, y: y + 1 }
            );
        }
        return neighbors;
    },

    // Check if point is in bounds
    inBounds(x, y, width, height) {
        return x >= 0 && x < width && y >= 0 && y < height;
    },

    // Bresenham's line algorithm
    getLine(x0, y0, x1, y1) {
        const points = [];
        const dx = Math.abs(x1 - x0);
        const dy = Math.abs(y1 - y0);
        const sx = x0 < x1 ? 1 : -1;
        const sy = y0 < y1 ? 1 : -1;
        let err = dx - dy;

        while (true) {
            points.push({ x: x0, y: y0 });
            if (x0 === x1 && y0 === y1) break;
            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x0 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y0 += sy;
            }
        }
        return points;
    },

    // Get tiles in radius (circle)
    getTilesInRadius(centerX, centerY, radius) {
        const tiles = [];
        for (let y = centerY - radius; y <= centerY + radius; y++) {
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                if (this.distance(centerX, centerY, x, y) <= radius) {
                    tiles.push({ x, y });
                }
            }
        }
        return tiles;
    },

    // Get tiles in cone
    getTilesInCone(originX, originY, dirX, dirY, angle, range) {
        const tiles = [];
        const baseAngle = Math.atan2(dirY - originY, dirX - originX);
        const halfAngle = (angle / 2) * Math.PI / 180;

        for (let y = originY - range; y <= originY + range; y++) {
            for (let x = originX - range; x <= originX + range; x++) {
                if (x === originX && y === originY) continue;
                const dist = this.distance(originX, originY, x, y);
                if (dist > range) continue;

                const tileAngle = Math.atan2(y - originY, x - originX);
                let angleDiff = Math.abs(tileAngle - baseAngle);
                if (angleDiff > Math.PI) angleDiff = 2 * Math.PI - angleDiff;

                if (angleDiff <= halfAngle) {
                    tiles.push({ x, y });
                }
            }
        }
        return tiles;
    },

    // Easing functions
    ease: {
        linear: t => t,
        quadIn: t => t * t,
        quadOut: t => t * (2 - t),
        quadInOut: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        cubicIn: t => t * t * t,
        cubicOut: t => (--t) * t * t + 1,
        cubicInOut: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        bounce: t => {
            if (t < 1 / 2.75) return 7.5625 * t * t;
            if (t < 2 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
            if (t < 2.5 / 2.75) return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
            return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        }
    },

    // Simple animation
    animate(duration, callback, easing = 'linear') {
        const start = performance.now();
        const easeFn = this.ease[easing] || this.ease.linear;

        const tick = (now) => {
            const elapsed = now - start;
            const t = Math.min(elapsed / duration, 1);
            callback(easeFn(t));
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Generate random name
    generateName() {
        const firstNames = [
            'Alex', 'Jordan', 'Morgan', 'Casey', 'Riley', 'Quinn', 'Avery', 'Blake',
            'Cameron', 'Dakota', 'Emerson', 'Finley', 'Harper', 'Kai', 'Logan', 'Mason',
            'Noah', 'Oliver', 'Parker', 'River', 'Sage', 'Taylor', 'Reese', 'Phoenix'
        ];
        const lastNames = [
            'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
            'Rodriguez', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson',
            'Martin', 'Lee', 'Thompson', 'White', 'Harris', 'Clark', 'Lewis', 'Walker', 'Hall'
        ];
        return {
            first: this.randomPick(firstNames),
            last: this.randomPick(lastNames)
        };
    },

    // Generate callsign
    generateCallsign() {
        const adjectives = [
            'Ghost', 'Shadow', 'Iron', 'Steel', 'Storm', 'Thunder', 'Wolf', 'Eagle',
            'Hawk', 'Raven', 'Viper', 'Cobra', 'Phoenix', 'Dragon', 'Frost', 'Blaze'
        ];
        const nouns = [
            'One', 'Six', 'Alpha', 'Bravo', 'Delta', 'Echo', 'Actual', 'Lead',
            'Eye', 'Fist', 'Hand', 'Heart', 'Mind', 'Soul', 'Edge', 'Point'
        ];
        return `${this.randomPick(adjectives)} ${this.randomPick(nouns)}`;
    },

    // Color utilities
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },

    rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    },

    // Priority queue for pathfinding
    PriorityQueue: class {
        constructor() {
            this.elements = [];
        }

        enqueue(element, priority) {
            this.elements.push({ element, priority });
            this.elements.sort((a, b) => a.priority - b.priority);
        }

        dequeue() {
            return this.elements.shift()?.element;
        }

        isEmpty() {
            return this.elements.length === 0;
        }
    }
};

// Make Utils available globally
window.Utils = Utils;
