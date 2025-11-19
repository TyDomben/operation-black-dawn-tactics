// Operation Black Dawn - UI Manager

class UIManagerClass {
    constructor() {
        this.currentScreen = 'main-menu';
    }

    init() {
        this.bindMainMenu();
        this.bindCampaignSetup();
        this.bindStrategicView();
        this.bindSquadSelection();
        this.bindTacticalView();

        // Subscribe to events
        EventBus.on('screenChange', (data) => this.showScreen(data.to));
        EventBus.on('resourcesChanged', () => this.updateResources());
        EventBus.on('combatLogAdd', (data) => this.addLogEntry(data));
    }

    // Show screen
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.remove('hidden');
            this.currentScreen = screenId;
        }
    }

    // Main Menu bindings
    bindMainMenu() {
        document.getElementById('btn-new-game')?.addEventListener('click', () => {
            this.showScreen('campaign-setup');
        });

        document.getElementById('btn-continue')?.addEventListener('click', () => {
            if (SaveSystem.hasSave(0)) {
                CampaignManager.continueCampaign(0);
                this.showScreen('strategic-view');
                this.updateStrategicUI();
            }
        });

        document.getElementById('btn-skirmish')?.addEventListener('click', () => {
            // Quick battle mode
            this.startSkirmish();
        });
    }

    // Campaign Setup bindings
    bindCampaignSetup() {
        document.getElementById('btn-start-campaign')?.addEventListener('click', () => {
            const settings = {
                commanderName: document.getElementById('commander-name')?.value || 'Commander',
                difficulty: document.getElementById('difficulty')?.value || 'veteran',
                ironman: document.getElementById('ironman-mode')?.checked || false,
                tutorialEnabled: document.getElementById('tutorial-enabled')?.checked || true
            };

            CampaignManager.startNewCampaign(settings);
            this.showScreen('strategic-view');
            this.updateStrategicUI();
        });

        document.getElementById('btn-back-menu')?.addEventListener('click', () => {
            this.showScreen('main-menu');
        });
    }

    // Strategic View bindings
    bindStrategicView() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                const tabId = `tab-${btn.dataset.tab}`;
                document.getElementById(tabId)?.classList.add('active');

                this.updateTabContent(btn.dataset.tab);
            });
        });
    }

    // Squad Selection bindings
    bindSquadSelection() {
        document.getElementById('btn-launch-mission')?.addEventListener('click', () => {
            const selectedSoldiers = this.getSelectedSquad();
            if (selectedSoldiers.length >= GAME_CONSTANTS.MIN_SQUAD_SIZE) {
                const mission = Game.selectedMission;
                if (mission && MissionManager.startMission(mission, selectedSoldiers)) {
                    this.showScreen('tactical-view');
                    Renderer.init('tactical-canvas');
                }
            }
        });

        document.getElementById('btn-cancel-mission')?.addEventListener('click', () => {
            this.showScreen('strategic-view');
        });
    }

    // Tactical View bindings
    bindTacticalView() {
        // Action buttons
        document.querySelectorAll('.ability-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                CombatSystem.selectAction(action);
                this.updateActionBar();
            });
        });

        // End turn
        document.getElementById('btn-end-turn')?.addEventListener('click', () => {
            CombatSystem.endPhase();
        });

        // Camera controls
        document.getElementById('btn-rotate-left')?.addEventListener('click', () => {
            Renderer.camera.rotation = (Renderer.camera.rotation - 90 + 360) % 360;
        });

        document.getElementById('btn-rotate-right')?.addEventListener('click', () => {
            Renderer.camera.rotation = (Renderer.camera.rotation + 90) % 360;
        });

        document.getElementById('btn-zoom-in')?.addEventListener('click', () => Renderer.zoomIn());
        document.getElementById('btn-zoom-out')?.addEventListener('click', () => Renderer.zoomOut());

        document.getElementById('btn-center-camera')?.addEventListener('click', () => {
            if (Game.tactical.selectedUnit) {
                Renderer.centerOn(Game.tactical.selectedUnit.gridX, Game.tactical.selectedUnit.gridY);
            }
        });
    }

    // Update resources display
    updateResources() {
        document.getElementById('res-money').textContent = Utils.formatNumber(Game.resources.money);
        document.getElementById('res-intel').textContent = Game.resources.intel;
        document.getElementById('res-supplies').textContent = Game.resources.supplies;
        document.getElementById('res-materials').textContent = Game.resources.alienMaterials;
        document.getElementById('game-date').textContent = Game.getFormattedDate();
        document.getElementById('threat-fill').style.width = `${Game.threatLevel}%`;
        document.getElementById('threat-value').textContent = `${Game.threatLevel}%`;
    }

    // Update strategic UI
    updateStrategicUI() {
        this.updateResources();
        this.updateTabContent('missions');
    }

    // Update tab content
    updateTabContent(tab) {
        switch (tab) {
            case 'missions':
                this.updateMissionList();
                break;
            case 'soldiers':
                this.updateSoldierList();
                break;
            case 'base':
                this.updateFacilityGrid();
                break;
            case 'research':
                this.updateResearchList();
                break;
            case 'armory':
                this.updateArmory();
                break;
        }
    }

    // Update mission list
    updateMissionList() {
        const container = document.getElementById('mission-list');
        if (!container) return;

        container.innerHTML = '';
        Game.availableMissions.forEach(mission => {
            const div = document.createElement('div');
            div.className = 'mission-item';
            div.innerHTML = `
                <div class="mission-name">${mission.name}</div>
                <div class="mission-type">${mission.type} - Difficulty ${mission.difficulty}</div>
                ${mission.expires ? `<div class="mission-timer">Expires in ${mission.expiresIn} days</div>` : ''}
            `;
            div.addEventListener('click', () => this.selectMission(mission));
            container.appendChild(div);
        });
    }

    // Update soldier list
    updateSoldierList() {
        const container = document.getElementById('soldier-list');
        if (!container) return;

        container.innerHTML = '';
        Game.soldiers.forEach(soldier => {
            const div = document.createElement('div');
            div.className = 'soldier-item';
            div.innerHTML = `
                <div class="portrait"></div>
                <div class="info">
                    <div class="name">${soldier.name}</div>
                    <div class="class">${soldier.rank} ${SOLDIER_CLASS_DATA[soldier.class]?.name || soldier.class}</div>
                </div>
                <span class="status ${soldier.status}">${soldier.status}</span>
            `;
            container.appendChild(div);
        });
    }

    // Update facility grid
    updateFacilityGrid() {
        const container = document.getElementById('facility-grid');
        if (!container) return;

        container.innerHTML = '';
        Game.base.facilities.forEach((row, y) => {
            row.forEach((slot, x) => {
                const div = document.createElement('div');
                div.className = 'facility-slot';
                if (slot.type && slot.type !== FACILITY_TYPES.EMPTY) {
                    div.classList.add(slot.building ? 'building' : 'built');
                    const facility = FACILITIES_DATA[slot.type];
                    div.textContent = facility?.name || slot.type;
                } else {
                    div.textContent = 'Empty';
                }
                div.addEventListener('click', () => this.clickFacility(x, y));
                container.appendChild(div);
            });
        });
    }

    // Update research list
    updateResearchList() {
        const container = document.getElementById('research-list');
        if (!container) return;

        container.innerHTML = '';
        const available = ResearchManager.getAvailableResearch();

        available.forEach(projectId => {
            const project = RESEARCH_DATA[projectId];
            const div = document.createElement('div');
            div.className = 'research-item';
            if (Game.research.inProgress === projectId) {
                div.classList.add('in-progress');
            }
            div.innerHTML = `
                <div class="research-name">${project.name}</div>
                <div class="research-cost">${project.time} days</div>
                ${Game.research.inProgress === projectId ?
                    `<div class="research-progress"><div class="fill" style="width:${(Game.research.progress / project.time) * 100}%"></div></div>` : ''}
            `;
            div.addEventListener('click', () => ResearchManager.startResearch(projectId));
            container.appendChild(div);
        });
    }

    // Update armory
    updateArmory() {
        const container = document.getElementById('armory-inventory');
        if (!container) return;
        container.innerHTML = '<p>Equipment inventory</p>';
    }

    // Select mission
    selectMission(mission) {
        Game.selectedMission = mission;
        document.getElementById('mission-title').textContent = mission.name;
        document.getElementById('mission-desc').textContent = mission.description;
        document.getElementById('mission-type').textContent = mission.type;
        document.getElementById('mission-difficulty').textContent = `Level ${mission.difficulty}`;
        document.getElementById('mission-turns').textContent = mission.turnLimit || '∞';

        this.updateSquadSelection();
        this.showScreen('squad-selection');
    }

    // Update squad selection
    updateSquadSelection() {
        const pool = document.getElementById('soldier-pool');
        if (!pool) return;

        pool.innerHTML = '';
        Game.getAvailableSoldiers().forEach(soldier => {
            const div = document.createElement('div');
            div.className = 'soldier-item';
            div.dataset.soldierId = soldier.id;
            div.innerHTML = `
                <div class="portrait"></div>
                <div class="info">
                    <div class="name">${soldier.name}</div>
                    <div class="class">${SOLDIER_CLASS_DATA[soldier.class]?.name || soldier.class}</div>
                </div>
            `;
            div.addEventListener('click', () => this.toggleSoldierSelection(soldier));
            pool.appendChild(div);
        });

        this.selectedSquadIds = [];
        this.updateLaunchButton();
    }

    // Toggle soldier selection
    toggleSoldierSelection(soldier) {
        const idx = this.selectedSquadIds?.indexOf(soldier.id) ?? -1;
        if (idx > -1) {
            this.selectedSquadIds.splice(idx, 1);
        } else if ((this.selectedSquadIds?.length || 0) < GAME_CONSTANTS.MAX_SQUAD_SIZE) {
            this.selectedSquadIds = this.selectedSquadIds || [];
            this.selectedSquadIds.push(soldier.id);
        }
        this.updateLaunchButton();
    }

    // Get selected squad
    getSelectedSquad() {
        return (this.selectedSquadIds || []).map(id => Game.getSoldierById(id)).filter(s => s);
    }

    // Update launch button
    updateLaunchButton() {
        const btn = document.getElementById('btn-launch-mission');
        const count = this.selectedSquadIds?.length || 0;
        if (btn) {
            btn.disabled = count < GAME_CONSTANTS.MIN_SQUAD_SIZE;
            btn.textContent = `LAUNCH MISSION (${count}/${GAME_CONSTANTS.MAX_SQUAD_SIZE})`;
        }
    }

    // Update action bar
    updateActionBar() {
        const unit = Game.tactical.selectedUnit;
        if (!unit) return;

        document.getElementById('ap-display').textContent = `${unit.actionsRemaining}/${GAME_CONSTANTS.ACTIONS_PER_TURN}`;

        // Update unit info panel
        const infoPanel = document.getElementById('unit-info');
        if (infoPanel) {
            infoPanel.classList.remove('hidden');
            infoPanel.querySelector('.unit-name').textContent = unit.name;
            infoPanel.querySelector('.unit-class').textContent = SOLDIER_CLASS_DATA[unit.class]?.name || unit.class;

            const hpPercent = (unit.currentHP / unit.maxHP) * 100;
            infoPanel.querySelector('.stat-bar.hp .fill').style.width = `${hpPercent}%`;
            infoPanel.querySelector('.stat-bar.hp .value').textContent = `${unit.currentHP}/${unit.maxHP}`;

            const willPercent = ((unit.currentWill || unit.will) / unit.will) * 100;
            infoPanel.querySelector('.stat-bar.will .fill').style.width = `${willPercent}%`;
            infoPanel.querySelector('.stat-bar.will .value').textContent = `${unit.currentWill || unit.will}/${unit.will}`;
        }
    }

    // Add combat log entry
    addLogEntry(data) {
        const container = document.getElementById('log-entries');
        if (!container) return;

        const entry = document.createElement('div');
        entry.className = `log-entry ${data.type}`;
        entry.textContent = data.message;
        container.appendChild(entry);
        container.scrollTop = container.scrollHeight;
    }

    // Click facility slot
    clickFacility(x, y) {
        // Show build menu
        console.log('Clicked facility at', x, y);
    }

    // Start skirmish
    startSkirmish() {
        // Quick battle with random soldiers and enemies
        const settings = { difficulty: 'veteran' };
        CampaignManager.startNewCampaign(settings);

        const mission = MissionManager.generateMission('elimination', 1);
        const squad = Game.soldiers.slice(0, 4);

        if (mission && MissionManager.startMission(mission, squad)) {
            this.showScreen('tactical-view');
            Renderer.init('tactical-canvas');
        }
    }
}

// Global instance
const UIManager = new UIManagerClass();
