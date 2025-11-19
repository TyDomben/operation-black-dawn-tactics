// Operation Black Dawn - Input Handler

class InputHandlerClass {
    constructor() {
        this.keys = {};
        this.mouse = {
            x: 0,
            y: 0,
            gridX: 0,
            gridY: 0,
            leftDown: false,
            rightDown: false,
            middleDown: false
        };

        this.dragStart = null;
        this.isDragging = false;

        // Edge scrolling
        this.edgeScrollMargin = 50;
        this.edgeScrollSpeed = 500;
    }

    init() {
        // Keyboard events
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        document.addEventListener('keyup', (e) => this.onKeyUp(e));

        // Mouse events on tactical canvas
        const canvas = document.getElementById('tactical-canvas');
        if (canvas) {
            canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
            canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
            canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
            canvas.addEventListener('wheel', (e) => this.onWheel(e));
            canvas.addEventListener('contextmenu', (e) => e.preventDefault());
            canvas.addEventListener('mouseleave', (e) => this.onMouseLeave(e));
        }

        // Prevent context menu
        document.addEventListener('contextmenu', (e) => {
            if (e.target.tagName === 'CANVAS') {
                e.preventDefault();
            }
        });
    }

    onKeyDown(e) {
        this.keys[e.key] = true;

        // Handle tactical shortcuts
        if (Game.tactical.active && Game.isPlayerTurn()) {
            this.handleTacticalKeyboard(e);
        }

        // Global shortcuts
        if (e.key === 'Escape') {
            EventBus.emit('escapePressed');
        }
    }

    onKeyUp(e) {
        this.keys[e.key] = false;
    }

    handleTacticalKeyboard(e) {
        const key = e.key;

        // Action shortcuts
        switch (key) {
            case KEY_BINDINGS.MOVE:
                EventBus.emit('actionSelected', 'move');
                break;
            case KEY_BINDINGS.SHOOT:
                EventBus.emit('actionSelected', 'shoot');
                break;
            case KEY_BINDINGS.OVERWATCH:
                EventBus.emit('actionSelected', 'overwatch');
                break;
            case KEY_BINDINGS.RELOAD:
                EventBus.emit('actionSelected', 'reload');
                break;
            case KEY_BINDINGS.HUNKER:
                EventBus.emit('actionSelected', 'hunker');
                break;
            case KEY_BINDINGS.GRENADE:
                EventBus.emit('actionSelected', 'grenade');
                break;
            case KEY_BINDINGS.ABILITY:
                EventBus.emit('actionSelected', 'ability1');
                break;
            case KEY_BINDINGS.END_TURN:
                EventBus.emit('endTurnRequested');
                break;
            case KEY_BINDINGS.CANCEL:
                EventBus.emit('actionCancelled');
                break;
            case KEY_BINDINGS.NEXT_UNIT:
                EventBus.emit('nextUnitRequested');
                e.preventDefault();
                break;
            case KEY_BINDINGS.ROTATE_LEFT:
                Renderer.camera.rotation = (Renderer.camera.rotation - 90 + 360) % 360;
                break;
            case KEY_BINDINGS.ROTATE_RIGHT:
                Renderer.camera.rotation = (Renderer.camera.rotation + 90) % 360;
                break;
            case KEY_BINDINGS.ZOOM_IN:
                Renderer.zoomIn();
                break;
            case KEY_BINDINGS.ZOOM_OUT:
                Renderer.zoomOut();
                break;
            case KEY_BINDINGS.CENTER:
                if (Game.tactical.selectedUnit) {
                    Renderer.centerOn(Game.tactical.selectedUnit.gridX, Game.tactical.selectedUnit.gridY);
                }
                break;
        }
    }

    onMouseMove(e) {
        const rect = e.target.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;

        // Update grid position
        const gridPos = Renderer.screenToGrid(this.mouse.x, this.mouse.y);
        this.mouse.gridX = gridPos.x;
        this.mouse.gridY = gridPos.y;

        // Handle dragging (camera pan)
        if (this.isDragging && this.dragStart) {
            const dx = this.mouse.x - this.dragStart.x;
            const dy = this.mouse.y - this.dragStart.y;
            Renderer.pan(-dx, -dy);
            this.dragStart = { x: this.mouse.x, y: this.mouse.y };
        }

        // Emit hover event
        EventBus.emit('tileHovered', { x: gridPos.x, y: gridPos.y });
    }

    onMouseDown(e) {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        switch (e.button) {
            case 0: // Left click
                this.mouse.leftDown = true;
                this.handleLeftClick(x, y);
                break;
            case 1: // Middle click
                this.mouse.middleDown = true;
                this.isDragging = true;
                this.dragStart = { x, y };
                break;
            case 2: // Right click
                this.mouse.rightDown = true;
                this.handleRightClick(x, y);
                break;
        }
    }

    onMouseUp(e) {
        switch (e.button) {
            case 0:
                this.mouse.leftDown = false;
                break;
            case 1:
                this.mouse.middleDown = false;
                this.isDragging = false;
                this.dragStart = null;
                break;
            case 2:
                this.mouse.rightDown = false;
                break;
        }
    }

    onMouseLeave() {
        this.mouse.leftDown = false;
        this.mouse.rightDown = false;
        this.mouse.middleDown = false;
        this.isDragging = false;
        this.dragStart = null;
    }

    onWheel(e) {
        e.preventDefault();
        if (e.deltaY < 0) {
            Renderer.zoomIn();
        } else {
            Renderer.zoomOut();
        }
    }

    handleLeftClick(screenX, screenY) {
        if (!Game.tactical.active) return;

        const gridPos = Renderer.screenToGrid(screenX, screenY);
        const { x, y } = gridPos;

        // Check if clicking on a unit
        const unit = Game.getUnitAt(x, y);

        if (Game.tactical.targetingMode) {
            // Targeting mode - execute action on target
            EventBus.emit('targetSelected', { x, y, unit });
        } else if (unit && unit.team === 'player') {
            // Select friendly unit
            EventBus.emit('unitSelected', unit);
        } else if (Game.tactical.selectedUnit && Game.tactical.selectedAction === 'move') {
            // Move to tile
            EventBus.emit('moveRequested', { x, y });
        } else if (unit && unit.team === 'enemy' && Game.tactical.selectedUnit) {
            // Quick attack on enemy
            EventBus.emit('attackRequested', { target: unit });
        } else {
            // Clicked empty space - deselect
            EventBus.emit('tileClicked', { x, y });
        }
    }

    handleRightClick(screenX, screenY) {
        if (!Game.tactical.active) return;

        const gridPos = Renderer.screenToGrid(screenX, screenY);

        // Right click cancels current action or targeting
        if (Game.tactical.targetingMode || Game.tactical.selectedAction) {
            EventBus.emit('actionCancelled');
        } else {
            // Context action - move if valid, attack if enemy
            const unit = Game.getUnitAt(gridPos.x, gridPos.y);
            if (unit && unit.team === 'enemy' && Game.tactical.selectedUnit) {
                EventBus.emit('attackRequested', { target: unit });
            } else if (Game.tactical.selectedUnit) {
                EventBus.emit('moveRequested', { x: gridPos.x, y: gridPos.y });
            }
        }
    }

    // Edge scrolling update (call in game loop)
    updateEdgeScroll() {
        if (!Game.tactical.active) return;

        const settings = SaveSystem.loadSettings();
        if (!settings.edgeScrolling) return;

        let dx = 0;
        let dy = 0;
        const speed = this.edgeScrollSpeed * Renderer.deltaTime;

        if (this.mouse.x < this.edgeScrollMargin) {
            dx = -speed;
        } else if (this.mouse.x > Renderer.width - this.edgeScrollMargin) {
            dx = speed;
        }

        if (this.mouse.y < this.edgeScrollMargin) {
            dy = -speed;
        } else if (this.mouse.y > Renderer.height - this.edgeScrollMargin) {
            dy = speed;
        }

        if (dx !== 0 || dy !== 0) {
            Renderer.pan(dx, dy);
        }
    }

    // Check if key is pressed
    isKeyDown(key) {
        return !!this.keys[key];
    }

    // Get current mouse grid position
    getMouseGridPos() {
        return { x: this.mouse.gridX, y: this.mouse.gridY };
    }
}

// Global input handler instance
const InputHandler = new InputHandlerClass();
