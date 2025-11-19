// Operation Black Dawn - Canvas Renderer

class RendererClass {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.width = 0;
        this.height = 0;

        // Camera
        this.camera = {
            x: 0,
            y: 0,
            zoom: 1,
            rotation: 0, // 0, 90, 180, 270
            targetX: 0,
            targetY: 0,
            targetZoom: 1
        };

        // Render settings
        this.showGrid = true;
        this.showCover = true;
        this.showRanges = true;

        // Animation queue
        this.animations = [];

        // Cached images
        this.images = {};

        // Frame timing
        this.lastTime = 0;
        this.deltaTime = 0;
        this.fps = 0;
    }

    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error('Canvas not found:', canvasId);
            return false;
        }

        this.ctx = this.canvas.getContext('2d');
        this.resize();

        // Handle window resize
        window.addEventListener('resize', () => this.resize());

        return true;
    }

    resize() {
        this.width = this.canvas.parentElement.clientWidth;
        this.height = this.canvas.parentElement.clientHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    // Main render loop
    render(timestamp = 0) {
        this.deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        this.fps = Math.round(1 / this.deltaTime);

        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);

        if (!Game.tactical.active || !Game.tactical.map) {
            return;
        }

        // Update camera
        this.updateCamera();

        // Save context state
        this.ctx.save();

        // Apply camera transform
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.scale(this.camera.zoom, this.camera.zoom);
        this.ctx.translate(-this.camera.x, -this.camera.y);

        // Render layers
        this.renderMap();
        this.renderCover();
        this.renderRanges();
        this.renderUnits();
        this.renderEffects();
        this.renderUI();

        // Restore context
        this.ctx.restore();

        // Update animations
        this.updateAnimations();
    }

    updateCamera() {
        // Smooth camera movement
        const smoothing = 0.1;
        this.camera.x += (this.camera.targetX - this.camera.x) * smoothing;
        this.camera.y += (this.camera.targetY - this.camera.y) * smoothing;
        this.camera.zoom += (this.camera.targetZoom - this.camera.zoom) * smoothing;
    }

    // Center camera on position
    centerOn(gridX, gridY) {
        const pos = Utils.gridToPixel(gridX, gridY);
        this.camera.targetX = pos.x;
        this.camera.targetY = pos.y;
    }

    // Zoom controls
    zoomIn() {
        this.camera.targetZoom = Math.min(2, this.camera.targetZoom + 0.2);
    }

    zoomOut() {
        this.camera.targetZoom = Math.max(0.5, this.camera.targetZoom - 0.2);
    }

    // Pan camera
    pan(dx, dy) {
        this.camera.targetX += dx / this.camera.zoom;
        this.camera.targetY += dy / this.camera.zoom;
    }

    // Convert screen coordinates to world coordinates
    screenToWorld(screenX, screenY) {
        const worldX = (screenX - this.width / 2) / this.camera.zoom + this.camera.x;
        const worldY = (screenY - this.height / 2) / this.camera.zoom + this.camera.y;
        return { x: worldX, y: worldY };
    }

    // Convert screen to grid coordinates
    screenToGrid(screenX, screenY) {
        const world = this.screenToWorld(screenX, screenY);
        return Utils.pixelToGrid(world.x, world.y);
    }

    // Render map tiles
    renderMap() {
        const map = Game.tactical.map;
        if (!map) return;

        const tileSize = GAME_CONSTANTS.TILE_SIZE;

        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                const tile = map.getTile(x, y);
                const px = x * tileSize;
                const py = y * tileSize;

                // Draw tile
                this.ctx.fillStyle = this.getTileColor(tile);
                this.ctx.fillRect(px, py, tileSize, tileSize);

                // Draw grid
                if (this.showGrid) {
                    this.ctx.strokeStyle = COLORS.GRID;
                    this.ctx.lineWidth = 1;
                    this.ctx.strokeRect(px, py, tileSize, tileSize);
                }

                // Draw height indicator
                if (tile.height > 0) {
                    this.ctx.fillStyle = 'rgba(255,255,255,0.1)';
                    this.ctx.fillRect(px, py, tileSize, tileSize);
                }
            }
        }
    }

    getTileColor(tile) {
        switch (tile.type) {
            case TERRAIN_TYPES.WALL:
                return COLORS.WALL;
            case TERRAIN_TYPES.COVER_LOW:
                return '#3d5a5a';
            case TERRAIN_TYPES.COVER_HIGH:
                return '#2d4a4a';
            case TERRAIN_TYPES.WATER:
                return '#1e3a5f';
            case TERRAIN_TYPES.EXPLOSIVE:
                return '#5a3d3d';
            case TERRAIN_TYPES.OBJECTIVE:
                return '#3d5a3d';
            default:
                return COLORS.FLOOR;
        }
    }

    // Render cover indicators
    renderCover() {
        if (!this.showCover || !Game.tactical.selectedUnit) return;

        const map = Game.tactical.map;
        const tileSize = GAME_CONSTANTS.TILE_SIZE;
        const unit = Game.tactical.selectedUnit;

        // Show cover relative to enemies
        Game.tactical.enemies.forEach(enemy => {
            if (enemy.state === GAME_CONSTANTS.STATE_DEAD) return;

            // Draw line from selected unit to enemy
            const ux = unit.gridX * tileSize + tileSize / 2;
            const uy = unit.gridY * tileSize + tileSize / 2;
            const ex = enemy.gridX * tileSize + tileSize / 2;
            const ey = enemy.gridY * tileSize + tileSize / 2;

            this.ctx.beginPath();
            this.ctx.moveTo(ux, uy);
            this.ctx.lineTo(ex, ey);
            this.ctx.strokeStyle = 'rgba(231, 76, 60, 0.3)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });
    }

    // Render movement/attack ranges
    renderRanges() {
        if (!this.showRanges) return;

        const tileSize = GAME_CONSTANTS.TILE_SIZE;
        const unit = Game.tactical.selectedUnit;
        const action = Game.tactical.selectedAction;

        if (!unit || unit.team !== 'player') return;

        if (action === 'move' && unit.movementRange) {
            // Draw movement range
            unit.movementRange.forEach(tile => {
                const px = tile.x * tileSize;
                const py = tile.y * tileSize;
                this.ctx.fillStyle = COLORS.MOVE_RANGE;
                this.ctx.fillRect(px, py, tileSize, tileSize);
            });
        } else if (action === 'shoot' && unit.attackRange) {
            // Draw attack range
            unit.attackRange.forEach(tile => {
                const px = tile.x * tileSize;
                const py = tile.y * tileSize;
                this.ctx.fillStyle = COLORS.ATTACK_RANGE;
                this.ctx.fillRect(px, py, tileSize, tileSize);
            });
        } else if (action === 'grenade') {
            // Draw grenade range and blast radius
            const range = 10; // Typical grenade throw range
            const tiles = Utils.getTilesInRadius(unit.gridX, unit.gridY, range);
            tiles.forEach(tile => {
                const px = tile.x * tileSize;
                const py = tile.y * tileSize;
                this.ctx.fillStyle = 'rgba(243, 156, 18, 0.2)';
                this.ctx.fillRect(px, py, tileSize, tileSize);
            });
        }

        // Draw overwatch cone for overwatch action
        if (action === 'overwatch') {
            // Show potential overwatch coverage
            const range = unit.getSightRange();
            const tiles = Utils.getTilesInRadius(unit.gridX, unit.gridY, range);
            tiles.forEach(tile => {
                const px = tile.x * tileSize;
                const py = tile.y * tileSize;
                this.ctx.fillStyle = COLORS.OVERWATCH;
                this.ctx.fillRect(px, py, tileSize, tileSize);
            });
        }
    }

    // Render all units
    renderUnits() {
        const tileSize = GAME_CONSTANTS.TILE_SIZE;
        const allUnits = [...Game.tactical.units, ...Game.tactical.enemies];

        // Sort by Y for proper overlap
        allUnits.sort((a, b) => a.gridY - b.gridY);

        allUnits.forEach(unit => {
            if (unit.state === GAME_CONSTANTS.STATE_DEAD) return;

            const px = unit.gridX * tileSize + tileSize / 2;
            const py = unit.gridY * tileSize + tileSize / 2;

            // Draw unit shadow
            this.ctx.fillStyle = 'rgba(0,0,0,0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(px, py + 20, 20, 8, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw unit body
            const color = unit.team === 'player' ? COLORS.PLAYER : COLORS.ENEMY;
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(px, py, 20, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw class icon
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(this.getClassIcon(unit.class), px, py);

            // Draw selection indicator
            if (unit === Game.tactical.selectedUnit) {
                this.ctx.strokeStyle = COLORS.SELECTED;
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.arc(px, py, 25, 0, Math.PI * 2);
                this.ctx.stroke();
            }

            // Draw health bar
            const hpPercent = unit.currentHP / unit.maxHP;
            const barWidth = 30;
            const barHeight = 4;
            const barX = px - barWidth / 2;
            const barY = py - 35;

            this.ctx.fillStyle = '#333';
            this.ctx.fillRect(barX, barY, barWidth, barHeight);
            this.ctx.fillStyle = hpPercent > 0.5 ? COLORS.HEAL : hpPercent > 0.25 ? COLORS.COVER_HALF : COLORS.DAMAGE;
            this.ctx.fillRect(barX, barY, barWidth * hpPercent, barHeight);

            // Draw status indicators
            this.renderUnitStatus(unit, px, py);
        });
    }

    getClassIcon(className) {
        const icons = {
            assault: 'A',
            sniper: 'S',
            heavy: 'H',
            medic: 'M',
            engineer: 'E',
            scout: 'R',
            psionic: 'P',
            specialist: 'X',
            // Enemy types
            rifleman: 'r',
            shotgunner: 's',
            sniper_enemy: 'n',
            heavy_enemy: 'h',
            medic_enemy: 'm',
            officer: 'O',
            mech: 'M',
            drone: 'd'
        };
        return icons[className] || '?';
    }

    renderUnitStatus(unit, x, y) {
        const indicators = [];

        if (unit.state === GAME_CONSTANTS.STATE_OVERWATCH) {
            indicators.push({ icon: '👁', color: '#9b59b6' });
        }
        if (unit.state === GAME_CONSTANTS.STATE_HUNKERED) {
            indicators.push({ icon: '🛡', color: '#3498db' });
        }
        if (unit.state === GAME_CONSTANTS.STATE_SUPPRESSED) {
            indicators.push({ icon: '⚠', color: '#f39c12' });
        }
        if (unit.state === GAME_CONSTANTS.STATE_PANICKED) {
            indicators.push({ icon: '!', color: '#e74c3c' });
        }

        indicators.forEach((ind, i) => {
            this.ctx.fillStyle = ind.color;
            this.ctx.font = '12px Arial';
            this.ctx.fillText(ind.icon, x + 30, y - 20 + i * 15);
        });
    }

    // Render visual effects
    renderEffects() {
        this.animations.forEach(anim => {
            anim.render(this.ctx);
        });
    }

    // Render in-world UI elements
    renderUI() {
        // Render damage numbers, floating text, etc.
    }

    // Animation management
    addAnimation(animation) {
        this.animations.push(animation);
    }

    updateAnimations() {
        this.animations = this.animations.filter(anim => {
            anim.update(this.deltaTime);
            return !anim.finished;
        });
    }

    // Play bullet animation
    animateBullet(from, to, hit, callback) {
        const animation = {
            fromX: from.x * GAME_CONSTANTS.TILE_SIZE + GAME_CONSTANTS.TILE_SIZE / 2,
            fromY: from.y * GAME_CONSTANTS.TILE_SIZE + GAME_CONSTANTS.TILE_SIZE / 2,
            toX: to.x * GAME_CONSTANTS.TILE_SIZE + GAME_CONSTANTS.TILE_SIZE / 2,
            toY: to.y * GAME_CONSTANTS.TILE_SIZE + GAME_CONSTANTS.TILE_SIZE / 2,
            progress: 0,
            duration: 0.3,
            hit: hit,
            finished: false,

            update(dt) {
                this.progress += dt / this.duration;
                if (this.progress >= 1) {
                    this.finished = true;
                    if (callback) callback();
                }
            },

            render(ctx) {
                const t = this.progress;
                const x = Utils.lerp(this.fromX, this.toX, t);
                const y = Utils.lerp(this.fromY, this.toY, t);

                // Draw bullet trail
                ctx.beginPath();
                ctx.moveTo(this.fromX, this.fromY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = '#ff0';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Draw bullet
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        this.addAnimation(animation);
    }

    // Play explosion animation
    animateExplosion(gridX, gridY, radius, callback) {
        const animation = {
            x: gridX * GAME_CONSTANTS.TILE_SIZE + GAME_CONSTANTS.TILE_SIZE / 2,
            y: gridY * GAME_CONSTANTS.TILE_SIZE + GAME_CONSTANTS.TILE_SIZE / 2,
            radius: radius * GAME_CONSTANTS.TILE_SIZE,
            progress: 0,
            duration: 0.5,
            finished: false,

            update(dt) {
                this.progress += dt / this.duration;
                if (this.progress >= 1) {
                    this.finished = true;
                    if (callback) callback();
                }
            },

            render(ctx) {
                const t = this.progress;
                const currentRadius = this.radius * Utils.ease.quadOut(t);
                const alpha = 1 - t;

                // Outer blast
                ctx.fillStyle = `rgba(255, 150, 0, ${alpha * 0.5})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
                ctx.fill();

                // Inner core
                ctx.fillStyle = `rgba(255, 255, 200, ${alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, currentRadius * 0.3, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        this.addAnimation(animation);
    }

    // Floating damage number
    animateDamageNumber(gridX, gridY, damage, isCrit) {
        const animation = {
            x: gridX * GAME_CONSTANTS.TILE_SIZE + GAME_CONSTANTS.TILE_SIZE / 2,
            y: gridY * GAME_CONSTANTS.TILE_SIZE,
            damage: damage,
            isCrit: isCrit,
            progress: 0,
            duration: 1,
            finished: false,

            update(dt) {
                this.progress += dt / this.duration;
                if (this.progress >= 1) {
                    this.finished = true;
                }
            },

            render(ctx) {
                const t = this.progress;
                const y = this.y - 50 * t;
                const alpha = 1 - t;

                ctx.font = this.isCrit ? 'bold 24px Arial' : '18px Arial';
                ctx.fillStyle = this.isCrit ? `rgba(255, 200, 0, ${alpha})` : `rgba(255, 100, 100, ${alpha})`;
                ctx.textAlign = 'center';
                ctx.fillText(`-${this.damage}`, this.x, y);
            }
        };

        this.addAnimation(animation);
    }
}

// Global renderer instance
const Renderer = new RendererClass();
