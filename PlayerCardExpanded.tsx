import { motion, AnimatePresence } from 'framer-motion';
import type { Player } from '../data/players';
import './player-card-expanded.css';

interface Props {
  player: Player | null;
  onClose: () => void;
}

export default function PlayerCardExpanded({ player, onClose }: Props) {
  return (
    <AnimatePresence>
      {player && (
        <motion.div
          className="card-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="card-modal scanline"
            layoutId={`card-${player.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="card-modal-close" onClick={onClose} aria-label="Kapat">✕</button>
            <span className="eyebrow">HOLOGRAM PLAYER · LIVE FEED</span>
            <div className="card-modal-image-wrap">
              <img src={player.image} alt="" className="card-modal-image" />
            </div>
            <h2 className="card-modal-name glow-white">{player.name}</h2>
            <div className="card-modal-grid">
              <div>
                <span className="eyebrow">POSITION</span>
                <p>{player.position}</p>
              </div>
              <div>
                <span className="eyebrow">NUMBER</span>
                <p>{player.number}</p>
              </div>
              <div>
                <span className="eyebrow">STATUS</span>
                <p className="text-red">{player.status}</p>
              </div>
            </div>
            <p className="card-modal-desc text-fog">{player.description}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
