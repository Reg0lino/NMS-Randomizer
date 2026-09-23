// Web Audio API synthesized sound generator for Atlas Terminal
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
  try {
    localStorage.setItem('atlas_terminal_sound', enabled ? 'true' : 'false');
  } catch {
    // Ignore storage issues
  }
}

export function isSoundEnabled(): boolean {
  try {
    const val = localStorage.getItem('atlas_terminal_sound');
    return val === null ? true : val === 'true';
  } catch {
    return true;
  }
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Terminal UI click / keypress
export function playTerminalClick() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Silent fail on audio restrictions
  }
}

// Resonant Atlas Pulse (Directive generation / transmit)
export function playAtlasPulse() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Sub bass hum
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(90, now);
    subOsc.frequency.exponentialRampToValueAtTime(55, now + 0.5);

    subGain.gain.setValueAtTime(0.15, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);

    subOsc.start(now);
    subOsc.stop(now + 0.5);

    // Ethereal Atlas chord
    const freqs = [330, 495, 660];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.05, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + 0.45);
    });
  } catch {
    // Ignore
  }
}

// Milestone checked / Victory sound
export function playMilestoneComplete() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [440, 554.37, 659.25, 880]; // A major arpeggio
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.07);

      gain.gain.setValueAtTime(0.06, now + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.25);
    });
  } catch {
    // Ignore
  }
}

// Ambient Atlas Drone (Low frequency 16Hz / 55Hz harmonic resonance)
let droneOsc1: OscillatorNode | null = null;
let droneOsc2: OscillatorNode | null = null;
let droneGain: GainNode | null = null;
let droneActive = false;

export function isDroneActive(): boolean {
  return droneActive;
}

export function startAtlasDrone() {
  if (!soundEnabled || droneActive) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.001, ctx.currentTime);
    droneGain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 2.0);
    droneGain.connect(ctx.destination);

    // Fundamental drone (55 Hz - A1)
    droneOsc1 = ctx.createOscillator();
    droneOsc1.type = 'sine';
    droneOsc1.frequency.setValueAtTime(55, ctx.currentTime);
    droneOsc1.connect(droneGain);
    droneOsc1.start();

    // Secondary sub-drone with 16-cycle binaural offset (56.6 Hz)
    droneOsc2 = ctx.createOscillator();
    droneOsc2.type = 'triangle';
    droneOsc2.frequency.setValueAtTime(56.6, ctx.currentTime);
    droneOsc2.connect(droneGain);
    droneOsc2.start();

    droneActive = true;
  } catch {
    droneActive = false;
  }
}

export function stopAtlasDrone() {
  try {
    if (droneGain && audioCtx) {
      droneGain.gain.setValueAtTime(droneGain.gain.value, audioCtx.currentTime);
      droneGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
      setTimeout(() => {
        try {
          droneOsc1?.stop();
          droneOsc2?.stop();
          droneOsc1?.disconnect();
          droneOsc2?.disconnect();
          droneGain?.disconnect();
        } catch {}
        droneOsc1 = null;
        droneOsc2 = null;
        droneGain = null;
        droneActive = false;
      }, 900);
    } else {
      droneActive = false;
    }
  } catch {
    droneActive = false;
  }
}
