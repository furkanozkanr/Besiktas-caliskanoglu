import { useRef, useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import type { Player } from '../data/players';
import './player-card.css';

// CSS custom properties aren't part of the standard CSSProperties type,
// so we extend it locally for the glow-position variables.
type CardStyle = CSSProperties & { '--glow-x'?: string; '--glow-y'?: string };

interface PlayerCardProps {
  player: Player;
  onOpen: (player: Player) => void;
}

export default function PlayerCard({ player, onOpen }: PlayerCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glowX: 50, glowY: 50 });

  function handleMove(clientX: number, clientY: number) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (clientX - rect.left) / rect.width; // 0..1
    const py = (clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 16; // rotateY
    const rx = (0.5 - py) * 14; // rotateX
    setTilt({ rx, ry, glowX: px * 100, glowY: py * 100 });
  }

  function reset() {
    setTilt({ rx: 0, ry: 0, glowX: 50, glowY: 50 });
  }

  return (
    <motion.button
      ref={cardRef}
      className="player-card scanline"
      style={{
        transform: `perspective(700px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        '--glow-x': `${tilt.glowX}%`,
        '--glow-y': `${tilt.glowY}%`,
      } as CardStyle}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseLeave={reset}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (t) handleMove(t.clientX, t.clientY);
      }}
      onTouchEnd={reset}
      onClick={() => onOpen(player)}
      layoutId={`card-${player.id}`}
    >
      <div className="player-card-glow" />
      <div className="player-card-frame">
        <span className="eyebrow player-card-tag">HOLOGRAM PLAYER</span>
        <div className="player-card-image-wrap">
          <img src={player.image} alt="" className="player-card-image" draggable={false} />
          <span className="player-card-number">{player.number}</span>
        </div>
        <h3 className="player-card-name">{player.name}</h3>
        <div className="player-card-meta">
          <div>
            <span className="eyebrow">POSITION</span>
            <p>{player.position}</p>
          </div>
          <div>
            <span className="eyebrow">STATUS</span>
            <p className="text-red">{player.status}</p>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
