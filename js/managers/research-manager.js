// Operation Black Dawn - Research Manager

class ResearchManagerClass {
    // Start research project
    startResearch(projectId) {
        const project = RESEARCH_DATA[projectId];
        if (!project) return false;

        // Check prerequisites
        if (project.prerequisites) {
            for (const prereq of project.prerequisites) {
                if (!Game.research.completed.includes(prereq)) {
                    return false;
                }
            }
        }

        // Check if already researched
        if (Game.research.completed.includes(projectId)) return false;

        // Check cost
        if (!Game.canAfford(project.cost)) return false;

        Game.spendResources(project.cost);

        Game.research.inProgress = projectId;
        Game.research.progress = 0;

        EventBus.emit('researchStarted', { project: projectId });
        return true;
    }

    // Update research progress
    updateResearch() {
        if (!Game.research.inProgress) return;

        const project = RESEARCH_DATA[Game.research.inProgress];
        if (!project) return;

        Game.research.progress += Game.getResearchRate();

        if (Game.research.progress >= project.time) {
            this.completeResearch(Game.research.inProgress);
        }
    }

    // Complete research
    completeResearch(projectId) {
        Game.research.completed.push(projectId);
        Game.research.inProgress = null;
        Game.research.progress = 0;

        const project = RESEARCH_DATA[projectId];
        EventBus.emit('researchComplete', { project: projectId, unlocks: project.unlocks });
    }

    // Get available research
    getAvailableResearch() {
        return Object.entries(RESEARCH_DATA)
            .filter(([id, project]) => {
                if (Game.research.completed.includes(id)) return false;
                if (!project.prerequisites) return true;
                return project.prerequisites.every(p => Game.research.completed.includes(p));
            })
            .map(([id]) => id);
    }

    // Check if research is unlocked
    isUnlocked(projectId) {
        return Game.research.completed.includes(projectId);
    }
}

// Global instance
const ResearchManager = new ResearchManagerClass();
