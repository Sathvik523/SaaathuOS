/**
 * Web Audio API Sound Synthesizer for SaaathuOS
 * Synthesizes the iconic, resonant MacBook Startup Chime with an ultra-slow, cinematic swell.
 */

export const playGentleStartupSound = () => {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const triggerMacChime = () => {
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;

      // Iconic MacBook Startup Chime F# Major Chord Frequencies with staggered entrance delays
      const chord = [
        { freq: 46.25, gainMult: 1.00, type: "triangle", delay: 0 },       // Deep Sub-Bass (F#1)
        { freq: 92.50, gainMult: 0.90, type: "sawtooth", delay: 0.08 },     // Low Warm Bass (F#2)
        { freq: 138.59, gainMult: 0.80, type: "sawtooth", delay: 0.16 },    // Mid-Low Fifth (C#3)
        { freq: 185.00, gainMult: 0.70, type: "sine", delay: 0.24 },        // Mid Fundamental (F#3)
        { freq: 233.08, gainMult: 0.75, type: "sawtooth", delay: 0.32 },    // Major Third Resonance (A#3)
        { freq: 277.18, gainMult: 0.60, type: "sine", delay: 0.40 },        // Upper Fifth (C#4)
        { freq: 369.99, gainMult: 0.50, type: "triangle", delay: 0.48 },    // High Octave (F#4)
        { freq: 554.37, gainMult: 0.35, type: "sine", delay: 0.56 },        // Crystalline Overtones (C#5)
      ];

      // Master Low-Pass Filter (Ultra-slow, majestic frequency swell over 1.8 seconds)
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(140, now);
      filter.frequency.exponentialRampToValueAtTime(2400, now + 1.8); // Ultra-slow cinema bloom!
      filter.frequency.exponentialRampToValueAtTime(500, now + 6.2);

      // Master Volume Envelope (Super gradual 0.80s swell attack & 7.0s exponential decay)
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(0.85, now + 0.80); // Ultra-slow gentle attack swell
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 7.0); // Extended 7.0s decay

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      chord.forEach(({ freq, gainMult, type, delay }) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        const startTime = now + delay;

        osc.type = type as OscillatorType;
        osc.frequency.setValueAtTime(freq, startTime);

        // Subtle organic frequency shimmer
        osc.frequency.exponentialRampToValueAtTime(freq * 0.9994, startTime + 5.8);

        oscGain.gain.setValueAtTime(0.001, startTime);
        oscGain.gain.linearRampToValueAtTime(gainMult * 0.30, startTime + 0.70);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 6.5);

        osc.connect(oscGain);
        oscGain.connect(filter);

        osc.start(startTime);
        osc.stop(startTime + 7.0);
      });
    };

    if (ctx.state === "suspended") {
      const handleFirstInteraction = () => {
        triggerMacChime();
        window.removeEventListener("pointerdown", handleFirstInteraction);
        window.removeEventListener("keydown", handleFirstInteraction);
      };
      window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
      window.addEventListener("keydown", handleFirstInteraction, { once: true });
    }

    triggerMacChime();
  } catch (e) {
    console.warn("Mac startup audio playback notice:", e);
  }
};

/**
 * Web Audio Haptic Click for UI Window Snap & Minimize
 */
export const playWindowSnapSound = () => {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch (e) {
    // Silent fallback
  }
};

