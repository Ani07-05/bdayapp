"use client";

import { useRef, useState } from "react";

type AmbienceHandle = { stop: () => void };

export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const handleRef = useRef<AmbienceHandle | null>(null);

  const start = () => {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();

    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);
    master.gain.linearRampToValueAtTime(0.055, ctx.currentTime + 1.8);

    // warm detuned pad, slow-swept lowpass — a soft studio hum to work by
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = 110;
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = 110 * 1.5;
    const osc3 = ctx.createOscillator();
    osc3.type = "triangle";
    osc3.frequency.value = 55;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 700;
    filter.Q.value = 0.6;

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.045;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 260;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(master);

    osc1.start();
    osc2.start();
    osc3.start();
    lfo.start();

    // occasional soft sparkle chime, like a notification from a nicer world
    const notes = [880, 1108, 1318, 1568];
    const sparkleTimer = setInterval(() => {
      const t = ctx.currentTime;
      const freq = notes[Math.floor(Math.random() * notes.length)];
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.045, t + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
      o.connect(g);
      g.connect(master);
      o.start(t);
      o.stop(t + 1.7);
    }, 3200);

    handleRef.current = {
      stop: () => {
        master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
        clearInterval(sparkleTimer);
        setTimeout(() => {
          osc1.stop();
          osc2.stop();
          osc3.stop();
          lfo.stop();
          ctx.close();
        }, 700);
      },
    };
  };

  const toggle = () => {
    if (on) {
      handleRef.current?.stop();
      handleRef.current = null;
      setOn(false);
    } else {
      start();
      setOn(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`rj-sound-toggle${on ? " is-on" : ""}`}
      aria-pressed={on}
      aria-label={on ? "Turn off background ambience" : "Turn on background ambience"}
    >
      <span className="rj-sound-bars" aria-hidden="true">
        <i></i><i></i><i></i>
      </span>
      {on ? "ambience on" : "play ambience"}
    </button>
  );
}
