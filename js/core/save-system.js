// Operation Black Dawn - Save/Load System

class SaveSystemClass {
    constructor() {
        this.saveKey = 'operation_black_dawn_save';
        this.settingsKey = 'operation_black_dawn_settings';
        this.maxSlots = 10;
    }

    // Save current game
    saveGame(slot = 0) {
        const saveData = {
            version: '1.0.0',
            timestamp: Date.now(),
            slot: slot,
            gameState: Game.toJSON()
        };

        try {
            const saves = this.getAllSaves();
            saves[slot] = saveData;
            localStorage.setItem(this.saveKey, JSON.stringify(saves));
            EventBus.emit('saveGame', { slot, success: true });
            return true;
        } catch (error) {
            console.error('Failed to save game:', error);
            EventBus.emit('saveGame', { slot, success: false, error });
            return false;
        }
    }

    // Load game from slot
    loadGame(slot = 0) {
        try {
            const saves = this.getAllSaves();
            const saveData = saves[slot];

            if (!saveData) {
                console.warn('No save data in slot', slot);
                return false;
            }

            Game.fromJSON(saveData.gameState);
            EventBus.emit('loadGame', { slot, success: true });
            return true;
        } catch (error) {
            console.error('Failed to load game:', error);
            EventBus.emit('loadGame', { slot, success: false, error });
            return false;
        }
    }

    // Get all save slots
    getAllSaves() {
        try {
            const data = localStorage.getItem(this.saveKey);
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Failed to get saves:', error);
            return {};
        }
    }

    // Get specific save info (without full data)
    getSaveInfo(slot) {
        const saves = this.getAllSaves();
        const save = saves[slot];

        if (!save) return null;

        return {
            slot: slot,
            timestamp: save.timestamp,
            date: new Date(save.timestamp).toLocaleString(),
            commanderName: save.gameState.settings.commanderName,
            difficulty: save.gameState.settings.difficulty,
            campaignDay: save.gameState.campaign.day,
            campaignMonth: save.gameState.campaign.month,
            campaignYear: save.gameState.campaign.year,
            missionCount: save.gameState.campaign.missionCount,
            soldierCount: save.gameState.soldiers.length
        };
    }

    // Delete save slot
    deleteSave(slot) {
        try {
            const saves = this.getAllSaves();
            delete saves[slot];
            localStorage.setItem(this.saveKey, JSON.stringify(saves));
            return true;
        } catch (error) {
            console.error('Failed to delete save:', error);
            return false;
        }
    }

    // Check if save exists
    hasSave(slot = 0) {
        const saves = this.getAllSaves();
        return !!saves[slot];
    }

    // Auto-save (for ironman mode)
    autoSave() {
        if (Game.settings.ironman) {
            return this.saveGame(0);
        }
        return false;
    }

    // Quick save
    quickSave() {
        return this.saveGame(9); // Slot 9 for quick save
    }

    // Quick load
    quickLoad() {
        return this.loadGame(9);
    }

    // Export save as JSON string
    exportSave(slot = 0) {
        const saves = this.getAllSaves();
        const save = saves[slot];
        if (!save) return null;
        return JSON.stringify(save);
    }

    // Import save from JSON string
    importSave(jsonString, slot = 0) {
        try {
            const saveData = JSON.parse(jsonString);
            const saves = this.getAllSaves();
            saves[slot] = saveData;
            localStorage.setItem(this.saveKey, JSON.stringify(saves));
            return true;
        } catch (error) {
            console.error('Failed to import save:', error);
            return false;
        }
    }

    // Save game settings (separate from game state)
    saveSettings(settings) {
        try {
            localStorage.setItem(this.settingsKey, JSON.stringify(settings));
            return true;
        } catch (error) {
            console.error('Failed to save settings:', error);
            return false;
        }
    }

    // Load game settings
    loadSettings() {
        try {
            const data = localStorage.getItem(this.settingsKey);
            return data ? JSON.parse(data) : this.getDefaultSettings();
        } catch (error) {
            console.error('Failed to load settings:', error);
            return this.getDefaultSettings();
        }
    }

    // Default game settings
    getDefaultSettings() {
        return {
            masterVolume: 80,
            musicVolume: 70,
            sfxVolume: 80,
            voiceVolume: 90,
            cameraSpeed: 50,
            edgeScrolling: true,
            showDamageNumbers: true,
            actionCam: true,
            autoEndTurn: false,
            confirmEndTurn: true,
            gridOverlay: false,
            showHitChance: true
        };
    }

    // Clear all game data
    clearAllData() {
        try {
            localStorage.removeItem(this.saveKey);
            localStorage.removeItem(this.settingsKey);
            return true;
        } catch (error) {
            console.error('Failed to clear data:', error);
            return false;
        }
    }

    // Get storage usage
    getStorageUsage() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length * 2; // UTF-16 = 2 bytes per char
            }
        }
        return {
            used: total,
            usedMB: (total / (1024 * 1024)).toFixed(2)
        };
    }
}

// Global save system instance
const SaveSystem = new SaveSystemClass();
