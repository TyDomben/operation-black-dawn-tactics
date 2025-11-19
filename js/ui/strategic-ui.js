// Operation Black Dawn - Strategic UI

class StrategicUIClass {
    init() {
        // World map rendering
        this.canvas = document.getElementById('map-canvas');
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
            this.resizeCanvas();
            window.addEventListener('resize', () => this.resizeCanvas());
        }

        EventBus.on('newMission', () => this.updateMissionMarkers());
        EventBus.on('missionExpired', () => this.updateMissionMarkers());
    }

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
        this.renderWorldMap();
    }

    renderWorldMap() {
        if (!this.ctx) return;

        const { width, height } = this.canvas;

        // Background
        this.ctx.fillStyle = '#0a1628';
        this.ctx.fillRect(0, 0, width, height);

        // Draw grid
        this.ctx.strokeStyle = '#1a3050';
        this.ctx.lineWidth = 1;

        for (let x = 0; x < width; x += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, height);
            this.ctx.stroke();
        }

        for (let y = 0; y < height; y += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(width, y);
            this.ctx.stroke();
        }

        // Draw base location
        const baseX = width * 0.5;
        const baseY = height * 0.5;

        this.ctx.fillStyle = '#3498db';
        this.ctx.beginPath();
        this.ctx.arc(baseX, baseY, 15, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = '#fff';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('HQ', baseX, baseY + 4);
    }

    updateMissionMarkers() {
        const container = document.getElementById('mission-markers');
        if (!container) return;

        container.innerHTML = '';

        Game.availableMissions.forEach((mission, i) => {
            const marker = document.createElement('div');
            marker.className = 'mission-marker';

            // Position randomly around the map
            const angle = (i / Game.availableMissions.length) * Math.PI * 2;
            const radius = 150 + Math.random() * 100;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);

            marker.style.left = `${x}%`;
            marker.style.top = `${y}%`;

            marker.addEventListener('click', () => {
                UIManager.selectMission(mission);
            });

            container.appendChild(marker);
        });
    }
}

// Global instance
const StrategicUI = new StrategicUIClass();
