// Operation Black Dawn - Main Game Loop

class GameMain {
    constructor() {
        this.running = false;
        this.lastTime = 0;
    }

    // Initialize game
    async init() {
        console.log('Operation Black Dawn - Initializing...');

        // Initialize UI
        UIManager.init();
        TacticalUI.init();
        StrategicUI.init();

        // Initialize input
        InputHandler.init();

        // Load saved settings
        const settings = SaveSystem.loadSettings();
        Object.assign(Game.settings, settings);

        // Setup event listeners
        this.setupEventListeners();

        // Check for existing save
        if (SaveSystem.hasSave(0)) {
            const btn = document.getElementById('btn-continue');
            if (btn) btn.disabled = false;
        }

        // Start game loop
        this.running = true;
        this.gameLoop(0);

        Game.initialized = true;
        console.log('Operation Black Dawn - Ready!');
    }

    // Main game loop
    gameLoop(timestamp) {
        if (!this.running) return;

        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        // Update game state
        this.update(deltaTime);

        // Render
        this.render(timestamp);

        // Continue loop
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    // Update game state
    update(deltaTime) {
        // Edge scrolling in tactical view
        if (Game.tactical.active) {
            InputHandler.updateEdgeScroll();
        }

        // Update animations
        // (handled by renderer)
    }

    // Render current screen
    render(timestamp) {
        if (Game.tactical.active) {
            Renderer.render(timestamp);
        }
    }

    // Setup global event listeners
    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Escape to pause/menu
            if (e.key === 'Escape') {
                if (Game.tactical.active) {
                    const menu = document.getElementById('tactical-menu');
                    if (menu) {
                        menu.classList.toggle('hidden');
                        Game.paused = !menu.classList.contains('hidden');
                    }
                }
            }

            // Quick save (F5)
            if (e.key === 'F5' && !Game.settings.ironman) {
                SaveSystem.quickSave();
                console.log('Game saved');
            }

            // Quick load (F9)
            if (e.key === 'F9' && !Game.settings.ironman) {
                SaveSystem.quickLoad();
                console.log('Game loaded');
            }
        });

        // Unit selection from click
        EventBus.on('unitSelected', (unit) => {
            if (Game.tactical.active && unit.team === 'player') {
                CombatSystem.selectUnit(unit);
            }
        });

        // Action selection
        EventBus.on('actionSelected', (actionId) => {
            if (Game.tactical.active) {
                CombatSystem.selectAction(actionId);
            }
        });

        // Move request
        EventBus.on('moveRequested', (data) => {
            if (Game.tactical.active && Game.tactical.selectedUnit) {
                CombatSystem.executeMove(Game.tactical.selectedUnit, data.x, data.y);
            }
        });

        // Attack request
        EventBus.on('attackRequested', (data) => {
            if (Game.tactical.active && Game.tactical.selectedUnit) {
                CombatSystem.executeShoot(Game.tactical.selectedUnit, data.target);
            }
        });

        // Target selected (for abilities)
        EventBus.on('targetSelected', (data) => {
            if (Game.tactical.active && Game.tactical.selectedUnit) {
                const action = Game.tactical.selectedAction;
                const unit = Game.tactical.selectedUnit;

                if (action === 'shoot' && data.unit) {
                    CombatSystem.executeShoot(unit, data.unit);
                } else if (action === 'grenade') {
                    CombatSystem.executeGrenade(unit, data.x, data.y);
                }
            }
        });

        // End turn request
        EventBus.on('endTurnRequested', () => {
            if (Game.tactical.active && Game.isPlayerTurn()) {
                CombatSystem.endPhase();
            }
        });

        // Next unit request
        EventBus.on('nextUnitRequested', () => {
            if (Game.tactical.active) {
                CombatSystem.nextUnit();
            }
        });

        // Action cancelled
        EventBus.on('actionCancelled', () => {
            Game.tactical.selectedAction = null;
            Game.tactical.targetingMode = false;
        });

        // Combat end
        EventBus.on('combatEnd', (results) => {
            // Auto-save for ironman
            if (Game.settings.ironman) {
                SaveSystem.autoSave();
            }
        });

        // Tactical menu buttons
        document.getElementById('btn-resume')?.addEventListener('click', () => {
            document.getElementById('tactical-menu')?.classList.add('hidden');
            Game.paused = false;
        });

        document.getElementById('btn-save-tactical')?.addEventListener('click', () => {
            SaveSystem.saveGame(0);
        });

        document.getElementById('btn-abort-mission')?.addEventListener('click', () => {
            if (confirm('Abort mission? All progress will be lost.')) {
                Game.tactical.active = false;
                UIManager.showScreen('strategic-view');
            }
        });
    }

    // Stop game loop
    stop() {
        this.running = false;
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const game = new GameMain();
    game.init();
});

// Make game instance available
window.GameMain = GameMain;
