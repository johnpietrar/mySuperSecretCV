// Sound effect generator using Web Audio API
class SoundEffects {
  constructor() {
    this.audioContext = null;
  }

  initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this.audioContext;
  }

  // Explosion sound
  playExplosionSound() {
    const ctx = this.initAudioContext();
    const now = ctx.currentTime;

    // Create explosion noise using white noise
    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.5);

    // Add bass boom
    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();

    bass.type = 'sine';
    bass.frequency.setValueAtTime(100, now);
    bass.frequency.exponentialRampToValueAtTime(50, now + 0.3);

    bassGain.gain.setValueAtTime(0.8, now);
    bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    bass.connect(bassGain);
    bassGain.connect(ctx.destination);

    bass.start(now);
    bass.stop(now + 0.3);
  }

  // Epic victory sound for Konami code
  playKonamiSound() {
    const ctx = this.initAudioContext();
    const now = ctx.currentTime;

    // First play explosion
    this.playExplosionSound();

    // Create multiple oscillators for a rich sound
    const oscillators = [];
    const gainNodes = [];

    // Victory fanfare notes (C major chord arpeggio going up)
    const notes = [
      { freq: 523.25, time: 0, duration: 0.15 },      // C5
      { freq: 659.25, time: 0.1, duration: 0.15 },    // E5
      { freq: 783.99, time: 0.2, duration: 0.15 },    // G5
      { freq: 1046.50, time: 0.3, duration: 0.3 },    // C6 (hold longer)
      { freq: 783.99, time: 0.5, duration: 0.1 },     // G5
      { freq: 1046.50, time: 0.6, duration: 0.5 }     // C6 (final triumphant note)
    ];

    notes.forEach(({ freq, time, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square'; // Retro 8-bit sound
      osc.frequency.setValueAtTime(freq, now + time);

      // Envelope for each note
      gain.gain.setValueAtTime(0, now + time);
      gain.gain.linearRampToValueAtTime(0.3, now + time + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, now + time + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + duration);

      oscillators.push(osc);
      gainNodes.push(gain);
    });

    // Add some extra sparkle with higher frequencies
    setTimeout(() => {
      const sparkle = ctx.createOscillator();
      const sparkleGain = ctx.createGain();

      sparkle.type = 'sine';
      sparkle.frequency.setValueAtTime(2093, ctx.currentTime); // C7

      sparkleGain.gain.setValueAtTime(0.2, ctx.currentTime);
      sparkleGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      sparkle.connect(sparkleGain);
      sparkleGain.connect(ctx.destination);

      sparkle.start(ctx.currentTime);
      sparkle.stop(ctx.currentTime + 0.3);
    }, 300);
  }

  // Achievement unlock sound
  playAchievementSound() {
    const ctx = this.initAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Level up sound
  playLevelUpSound() {
    const ctx = this.initAudioContext();
    const now = ctx.currentTime;

    // Ascending scale
    const frequencies = [523.25, 587.33, 659.25, 783.99];

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.2, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.15);
    });
  }

  // Coin/points sound
  playPointsSound() {
    const ctx = this.initAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(988, now);
    osc.frequency.setValueAtTime(1319, now + 0.05);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }
}

export const soundEffects = new SoundEffects();
