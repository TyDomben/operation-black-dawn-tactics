// Operation Black Dawn - Event Bus for decoupled communication

class EventBusClass {
    constructor() {
        this.listeners = {};
        this.onceListeners = {};
    }

    // Subscribe to an event
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);

        // Return unsubscribe function
        return () => this.off(event, callback);
    }

    // Subscribe to an event (fires once)
    once(event, callback) {
        if (!this.onceListeners[event]) {
            this.onceListeners[event] = [];
        }
        this.onceListeners[event].push(callback);
    }

    // Unsubscribe from an event
    off(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        }
        if (this.onceListeners[event]) {
            this.onceListeners[event] = this.onceListeners[event].filter(cb => cb !== callback);
        }
    }

    // Emit an event
    emit(event, data) {
        // Regular listeners
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event listener for ${event}:`, error);
                }
            });
        }

        // Once listeners
        if (this.onceListeners[event]) {
            this.onceListeners[event].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in once listener for ${event}:`, error);
                }
            });
            this.onceListeners[event] = [];
        }
    }

    // Clear all listeners for an event
    clear(event) {
        if (event) {
            delete this.listeners[event];
            delete this.onceListeners[event];
        } else {
            this.listeners = {};
            this.onceListeners = {};
        }
    }

    // Debug: list all events
    listEvents() {
        return Object.keys(this.listeners);
    }
}

// Global event bus instance
const EventBus = new EventBusClass();

// Common game events:
// - screenChange: { from, to }
// - gameStart: {}
// - gamePause: {}
// - gameResume: {}
// - newGame: { settings }
// - loadGame: { saveData }
// - saveGame: {}
//
// Campaign events:
// - missionStart: { mission }
// - missionEnd: { result, stats }
// - missionExpired: { mission }
// - newMission: { mission }
// - dayAdvance: { day }
// - monthEnd: { income }
//
// Tactical events:
// - turnStart: { turn, phase }
// - turnEnd: { turn }
// - unitSelected: { unit }
// - unitDeselected: {}
// - unitMoved: { unit, from, to }
// - unitAttack: { attacker, target, result }
// - unitDamaged: { unit, damage, source }
// - unitKilled: { unit, killer }
// - unitOverwatch: { unit }
// - overwatchTriggered: { watcher, target }
// - abilityUsed: { unit, ability, targets }
// - objectiveComplete: { objective }
// - objectiveFailed: { objective }
//
// Resource events:
// - resourcesChanged: { resources }
// - inventoryChanged: { category, itemId, quantity }
//
// Soldier events:
// - soldierAdded: { soldier }
// - soldierRemoved: { soldier }
// - soldierLevelUp: { soldier, newLevel }
// - soldierPromoted: { soldier, ability }
// - soldierWounded: { soldier, healTime }
// - soldierDied: { soldier }
//
// Base events:
// - facilityStarted: { x, y, type }
// - facilityComplete: { x, y, type }
// - researchStarted: { project }
// - researchComplete: { project }
//
// UI events:
// - uiUpdate: {}
// - tooltipShow: { content, x, y }
// - tooltipHide: {}
// - modalOpen: { id, data }
// - modalClose: { id }
// - combatLogAdd: { message, type }
