class SoundManager {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user interaction due to browser policies
  }

  private init() {
    if (!this.soundEnabled) return;
    if (!this.ctx) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        this.ctx = new AudioContextClass();
      } catch (e) {
        console.warn("Web Audio API not supported", e);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  isSoundEnabled() {
    return this.soundEnabled;
  }

  playClick() {
    this.init();
    if (!this.ctx) return;
    
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    
    osc.start(now);
    osc.stop(now + 0.09);
  }

  playTypewriterBeep() {
    this.init();
    if (!this.ctx) return;
    
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000 + Math.random() * 200, now); // randomized slightly for typing texture
    
    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
    
    osc.start(now);
    osc.stop(now + 0.04);
  }

  playSuccess() {
    this.init();
    if (!this.ctx) return;
    
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Bright and rewarding)
    const duration = 0.3;
    
    notes.forEach((freq, index) => {
      const time = now + index * 0.08;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      
      gain.gain.setValueAtTime(0.0, time);
      gain.gain.linearRampToValueAtTime(0.1, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      
      osc.start(time);
      osc.stop(time + duration + 0.05);
    });
  }

  playQuestStart() {
    this.init();
    if (!this.ctx) return;
    
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.linearRampToValueAtTime(600, now + 0.4);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(2000, now + 0.4);
    
    gain.gain.setValueAtTime(0.0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    
    osc.start(now);
    osc.stop(now + 0.5);
  }

  playLevelUp() {
    this.init();
    if (!this.ctx) return;
    
    const now = this.ctx.currentTime;
    
    // Grand arpeggio with a retro-synth lead
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51]; 
    notes.forEach((freq, index) => {
      const time = now + index * 0.06;
      const osc = this.ctx!.createOscillator();
      const osc2 = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      
      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx!.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 1.005, time); // detuned slightly for chorus effect
      
      gain.gain.setValueAtTime(0.0, time);
      gain.gain.linearRampToValueAtTime(0.08, time + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);
      
      osc.start(time);
      osc.stop(time + 0.5);
      osc2.start(time);
      osc2.stop(time + 0.5);
    });
  }

  playQuestFail() {
    this.init();
    if (!this.ctx) return;
    
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.4);
    
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    osc.start(now);
    osc.stop(now + 0.45);
  }
}

export const sound = new SoundManager();
