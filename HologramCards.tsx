import { useState } from 'react';
import { motion } from 'framer-motion';
import PlayerCard from '../components/PlayerCard';
import PlayerCardExpanded from '../components/PlayerCardExpanded';
import { players, type Player } from '../data/players';
import './hologram-cards.css';

export default function HologramCards() {
  const [selected, setSelected] = useState<Player | null>(null);

  return (
    <div className="hologram-cards">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <span className="eyebrow">PLAYER DATABASE</span>
        <h1 className="cards-title glow-white">HOLOGRAM KARTLARI</h1>
        <p className="cards-note text-fog">
          Kartlar tamamen fan yapımıdır. Gerçek istatistik veya resmi veri içermez.
        </p>
      </motion.div>

      <div className="cards-grid">
        {players.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <PlayerCard player={p} onOpen={setSelected} />
          </motion.div>
        ))}
      </div>

      <PlayerCardExpanded player={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
