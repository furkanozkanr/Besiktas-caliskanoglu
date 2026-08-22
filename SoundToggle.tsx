import { useEffect, useRef, useState } from 'react';
import './sound-toggle.css';

/**
 * Sound is OFF by default (section 18). When enabled, we generate a
 * very low, ambient technology hum with the Web Audio API instead of
 * shipping/loading an audio file — keeps the bundle light and avoids
 * needing a licensed music track.
 */
export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ osc?: OscillatorNode; gain?: GainNode }>({});

  useEffect(() => {
    return () => {
      nodesRef.current.osc?.stop();
      ctxRef.current?.close();
    };
  }, []);

  function toggle() {
    if (!on) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 82;
      osc2.type = 'sine';
      osc2.frequency.value = 123.2;
      gain.gain.value = 0.0001;
      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc2.start();
      gain.gain.exponentialRampToValueAtTime(0.02, ctx.currentTime + 1.2);
      ctxRef.current = ctx;
      nodesRef.current = { osc, gain };
    } else {
      const gain = nodesRef.current.gain;
      const ctx = ctxRef.current;
      if (gain && ctx) {
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
        setTimeout(() => {
          nodesRef.current.osc?.stop();
          ctx.close();
        }, 700);
      }
    }
    setOn(!on);
  }

  return (
    <button className="sound-toggle" onClick={toggle} aria-pressed={on}>
      <span>{on ? '🔊' : '🔈'}</span>
      <span className="eyebrow">{on ? 'SESİ KAPAT' : 'SESİ AÇ'}</span>
    </button>
  );
}
