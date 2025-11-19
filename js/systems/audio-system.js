// Operation Black Dawn - Audio System

class AudioSystemClass {
    constructor() {
        this.context = null;
        this.masterVolume = 0.7;
        this.musicVolume = 0.5;
        this.sfxVolume = 0.8;
        this.sounds = {};
        this.music = {};
        this.currentMusic = null;
        this.enabled = true;
    }

    init() {
        // Create audio context on first user interaction
        const initContext = () => {
            if (!this.context) {
                this.context = new (window.AudioContext || window.webkitAudioContext)();
                this.masterGain = this.context.createGain();
                this.masterGain.connect(this.context.destination);
                this.masterGain.gain.value = this.masterVolume;

                this.musicGain = this.context.createGain();
                this.musicGain.connect(this.masterGain);
                this.musicGain.gain.value = this.musicVolume;

                this.sfxGain = this.context.createGain();
                this.sfxGain.connect(this.masterGain);
                this.sfxGain.gain.value = this.sfxVolume;
            }
        };

        document.addEventListener('click', initContext, { once: true });
        document.addEventListener('keydown', initContext, { once: true });

        // Subscribe to game events
        EventBus.on('shotFired', (data) => this.playWeaponSound(data));
        EventBus.on('explosion', () => this.play('explosion'));
        EventBus.on('unitHit', (data) => this.playHitSound(data));
        EventBus.on('unitKilled', () => this.play('death'));
        EventBus.on('turnStart', (data) => this.playTurnSound(data));
        EventBus.on('missionComplete', (data) => this.playMissionEndSound(data));
        EventBus.on('unitSelected', () => this.play('select'));
        EventBus.on('abilityUsed', (data) => this.playAbilitySound(data));
    }

    // Generate procedural sound effects
    generateSound(type) {
        if (!this.context) return null;

        const duration = SOUND_DEFINITIONS[type]?.duration || 0.3;
        const buffer = this.context.createBuffer(1, this.context.sampleRate * duration, this.context.sampleRate);
        const data = buffer.getChannelData(0);

        switch (type) {
            case 'rifle':
                this.generateGunshot(data, 0.1, 800);
                break;
            case 'shotgun':
                this.generateGunshot(data, 0.15, 400);
                break;
            case 'sniper':
                this.generateGunshot(data, 0.2, 1200);
                break;
            case 'pistol':
                this.generateGunshot(data, 0.08, 1000);
                break;
            case 'smg':
                this.generateGunshot(data, 0.06, 900);
                break;
            case 'lmg':
                this.generateGunshot(data, 0.12, 600);
                break;
            case 'plasma':
                this.generatePlasma(data);
                break;
            case 'laser':
                this.generateLaser(data);
                break;
            case 'explosion':
                this.generateExplosion(data);
                break;
            case 'hit':
                this.generateHit(data);
                break;
            case 'miss':
                this.generateMiss(data);
                break;
            case 'death':
                this.generateDeath(data);
                break;
            case 'select':
                this.generateSelect(data);
                break;
            case 'move':
                this.generateMove(data);
                break;
            case 'reload':
                this.generateReload(data);
                break;
            case 'heal':
                this.generateHeal(data);
                break;
            case 'overwatch':
                this.generateOverwatch(data);
                break;
            case 'grenade_throw':
                this.generateThrow(data);
                break;
            case 'psi':
                this.generatePsi(data);
                break;
            case 'alert':
                this.generateAlert(data);
                break;
            case 'victory':
                this.generateVictory(data);
                break;
            case 'defeat':
                this.generateDefeat(data);
                break;
            case 'ui_click':
                this.generateClick(data);
                break;
            case 'ui_hover':
                this.generateHover(data);
                break;
            case 'critical':
                this.generateCritical(data);
                break;
            case 'armor_hit':
                this.generateArmorHit(data);
                break;
            case 'footstep':
                this.generateFootstep(data);
                break;
            default:
                this.generateGeneric(data);
        }

        return buffer;
    }

    // Sound generation methods
    generateGunshot(data, attack, freq) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 30) * (t < attack ? t / attack : 1);
            const noise = Math.random() * 2 - 1;
            const tone = Math.sin(2 * Math.PI * freq * t * Math.exp(-t * 10));
            data[i] = envelope * (noise * 0.7 + tone * 0.3);
        }
    }

    generatePlasma(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 15);
            const freq = 400 + Math.sin(t * 50) * 200;
            const tone = Math.sin(2 * Math.PI * freq * t);
            data[i] = envelope * tone * 0.5;
        }
    }

    generateLaser(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 20);
            const freq = 2000 - t * 3000;
            const tone = Math.sin(2 * Math.PI * Math.max(100, freq) * t);
            data[i] = envelope * tone * 0.4;
        }
    }

    generateExplosion(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = t < 0.05 ? t / 0.05 : Math.exp(-(t - 0.05) * 8);
            const noise = Math.random() * 2 - 1;
            const bass = Math.sin(2 * Math.PI * 60 * t) * Math.exp(-t * 5);
            data[i] = envelope * (noise * 0.6 + bass * 0.4);
        }
    }

    generateHit(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 40);
            const noise = Math.random() * 2 - 1;
            data[i] = envelope * noise * 0.6;
        }
    }

    generateMiss(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 50);
            const tone = Math.sin(2 * Math.PI * 200 * t);
            data[i] = envelope * tone * 0.3;
        }
    }

    generateDeath(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 5);
            const freq = 300 - t * 200;
            const tone = Math.sin(2 * Math.PI * Math.max(50, freq) * t);
            data[i] = envelope * tone * 0.5;
        }
    }

    generateSelect(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 25);
            const tone = Math.sin(2 * Math.PI * 800 * t);
            data[i] = envelope * tone * 0.3;
        }
    }

    generateMove(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 30);
            const noise = Math.random() * 2 - 1;
            data[i] = envelope * noise * 0.2;
        }
    }

    generateReload(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const click1 = t < 0.1 ? Math.exp(-t * 50) : 0;
            const click2 = t > 0.15 && t < 0.25 ? Math.exp(-(t - 0.15) * 50) : 0;
            const noise = Math.random() * 2 - 1;
            data[i] = (click1 + click2) * noise * 0.5;
        }
    }

    generateHeal(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.sin(t * Math.PI / 0.5) * (t < 0.5 ? 1 : 0);
            const tone = Math.sin(2 * Math.PI * (600 + t * 400) * t);
            data[i] = envelope * tone * 0.3;
        }
    }

    generateOverwatch(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 15);
            const tone1 = Math.sin(2 * Math.PI * 400 * t);
            const tone2 = Math.sin(2 * Math.PI * 500 * t);
            data[i] = envelope * (tone1 + tone2) * 0.2;
        }
    }

    generateThrow(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 10);
            const freq = 200 + t * 100;
            const tone = Math.sin(2 * Math.PI * freq * t);
            const noise = Math.random() * 2 - 1;
            data[i] = envelope * (tone * 0.3 + noise * 0.2);
        }
    }

    generatePsi(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = t < 0.3 ? t / 0.3 : Math.exp(-(t - 0.3) * 5);
            const tone1 = Math.sin(2 * Math.PI * 300 * t);
            const tone2 = Math.sin(2 * Math.PI * 450 * t);
            const tone3 = Math.sin(2 * Math.PI * 600 * t);
            data[i] = envelope * (tone1 + tone2 + tone3) * 0.15;
        }
    }

    generateAlert(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const beep = Math.floor(t * 8) % 2;
            const envelope = beep ? 0.5 : 0;
            const tone = Math.sin(2 * Math.PI * 800 * t);
            data[i] = envelope * tone * 0.4;
        }
    }

    generateVictory(data) {
        const sampleRate = this.context.sampleRate;
        const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const noteIndex = Math.floor(t * 4);
            if (noteIndex < notes.length) {
                const localT = t - noteIndex * 0.25;
                const envelope = Math.exp(-localT * 8);
                const tone = Math.sin(2 * Math.PI * notes[noteIndex] * t);
                data[i] = envelope * tone * 0.3;
            }
        }
    }

    generateDefeat(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 3);
            const freq = 400 - t * 300;
            const tone = Math.sin(2 * Math.PI * Math.max(50, freq) * t);
            data[i] = envelope * tone * 0.4;
        }
    }

    generateClick(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 100);
            const tone = Math.sin(2 * Math.PI * 1000 * t);
            data[i] = envelope * tone * 0.2;
        }
    }

    generateHover(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 80);
            const tone = Math.sin(2 * Math.PI * 600 * t);
            data[i] = envelope * tone * 0.1;
        }
    }

    generateCritical(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 20);
            const tone1 = Math.sin(2 * Math.PI * 1200 * t);
            const tone2 = Math.sin(2 * Math.PI * 1500 * t);
            data[i] = envelope * (tone1 + tone2) * 0.25;
        }
    }

    generateArmorHit(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 50);
            const tone = Math.sin(2 * Math.PI * 300 * t);
            const noise = Math.random() * 2 - 1;
            data[i] = envelope * (tone * 0.4 + noise * 0.3);
        }
    }

    generateFootstep(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 60);
            const noise = Math.random() * 2 - 1;
            data[i] = envelope * noise * 0.15;
        }
    }

    generateGeneric(data) {
        const sampleRate = this.context.sampleRate;
        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 30);
            const tone = Math.sin(2 * Math.PI * 440 * t);
            data[i] = envelope * tone * 0.3;
        }
    }

    // Play a sound
    play(type, options = {}) {
        if (!this.enabled || !this.context) return;

        // Get or generate buffer
        if (!this.sounds[type]) {
            this.sounds[type] = this.generateSound(type);
        }

        const buffer = this.sounds[type];
        if (!buffer) return;

        const source = this.context.createBufferSource();
        source.buffer = buffer;

        // Apply pitch variation
        if (options.pitch) {
            source.playbackRate.value = options.pitch;
        } else {
            source.playbackRate.value = 0.9 + Math.random() * 0.2;
        }

        // Apply volume
        const gain = this.context.createGain();
        gain.gain.value = options.volume || 1;
        source.connect(gain);
        gain.connect(this.sfxGain);

        source.start(0);
    }

    // Play weapon sound based on weapon type
    playWeaponSound(data) {
        const weaponType = data.weapon?.type || 'rifle';
        let soundType = 'rifle';

        if (weaponType.includes('plasma')) soundType = 'plasma';
        else if (weaponType.includes('laser')) soundType = 'laser';
        else if (weaponType.includes('shotgun')) soundType = 'shotgun';
        else if (weaponType.includes('sniper')) soundType = 'sniper';
        else if (weaponType.includes('pistol')) soundType = 'pistol';
        else if (weaponType.includes('smg')) soundType = 'smg';
        else if (weaponType.includes('lmg') || weaponType.includes('cannon')) soundType = 'lmg';

        this.play(soundType);
    }

    // Play hit sound based on whether armor was involved
    playHitSound(data) {
        if (data.armorBlocked) {
            this.play('armor_hit');
        } else if (data.critical) {
            this.play('critical');
        } else {
            this.play('hit');
        }
    }

    // Play turn sound
    playTurnSound(data) {
        if (data.phase === 'player') {
            this.play('alert', { volume: 0.5 });
        }
    }

    // Play mission end sound
    playMissionEndSound(data) {
        if (data.victory) {
            this.play('victory');
        } else {
            this.play('defeat');
        }
    }

    // Play ability sound
    playAbilitySound(data) {
        const ability = data.ability;
        if (ability.includes('psi') || ability.includes('mind')) {
            this.play('psi');
        } else if (ability.includes('heal') || ability.includes('med')) {
            this.play('heal');
        } else if (ability.includes('overwatch')) {
            this.play('overwatch');
        } else if (ability.includes('grenade') || ability.includes('throw')) {
            this.play('grenade_throw');
        } else if (ability.includes('reload')) {
            this.play('reload');
        }
    }

    // Set volumes
    setMasterVolume(value) {
        this.masterVolume = value;
        if (this.masterGain) {
            this.masterGain.gain.value = value;
        }
    }

    setMusicVolume(value) {
        this.musicVolume = value;
        if (this.musicGain) {
            this.musicGain.gain.value = value;
        }
    }

    setSfxVolume(value) {
        this.sfxVolume = value;
        if (this.sfxGain) {
            this.sfxGain.gain.value = value;
        }
    }

    // Enable/disable audio
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

// Sound definitions
const SOUND_DEFINITIONS = {
    rifle: { duration: 0.3 },
    shotgun: { duration: 0.35 },
    sniper: { duration: 0.4 },
    pistol: { duration: 0.2 },
    smg: { duration: 0.15 },
    lmg: { duration: 0.35 },
    plasma: { duration: 0.4 },
    laser: { duration: 0.3 },
    explosion: { duration: 0.8 },
    hit: { duration: 0.15 },
    miss: { duration: 0.1 },
    death: { duration: 0.5 },
    select: { duration: 0.1 },
    move: { duration: 0.1 },
    reload: { duration: 0.4 },
    heal: { duration: 0.5 },
    overwatch: { duration: 0.3 },
    grenade_throw: { duration: 0.3 },
    psi: { duration: 0.8 },
    alert: { duration: 0.5 },
    victory: { duration: 1.0 },
    defeat: { duration: 1.0 },
    ui_click: { duration: 0.05 },
    ui_hover: { duration: 0.03 },
    critical: { duration: 0.2 },
    armor_hit: { duration: 0.15 },
    footstep: { duration: 0.1 }
};

// Global instance
const AudioSystem = new AudioSystemClass();
