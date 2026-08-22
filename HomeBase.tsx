import { motion } from 'framer-motion';
import HologramBanner from '../components/HologramBanner';
import type { Route } from '../components/BottomNav';
import './home-base.css';

interface HomeBaseProps {
  onNavigate: (route: Route) => void;
}

const statusPanels = [
  { label: 'SİSTEM', value: 'ONLINE' },
  { label: 'BEŞİKTAŞ MODE', value: 'ACTIVE' },
  { label: 'FAN ENERGY', value: '100%' },
  { label: 'ÇALIŞKANOĞLU SYSTEM', value: 'READY' },
];

const portals: { title: string; desc: string; route: Route }[] = [
  { title: 'PLAYER DATABASE', desc: 'Hologram futbolcu kartları', route: 'cards' },
  { title: 'BEŞİKTAŞ ARCHIVE', desc: 'Kulüp kimliği ve ruhu', route: 'club' },
  { title: 'SİNAN ABİ', desc: 'Kişiye özel bölüm', route: 'sinan' },
  { title: 'SİSTEM', desc: 'Ayarlar & hakkında', route: 'system' },
];

export default function HomeBase({ onNavigate }: HomeBaseProps) {
  return (
    <div className="home-base">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <span className="eyebrow">TEKNOLOJİ ÜSSÜ · CANLI</span>
        <h1 className="home-title glow-white">ANA ÜS</h1>
      </motion.div>

      <div className="status-grid">
        {statusPanels.map((s, i) => (
          <motion.div
            key={s.label}
            className="status-panel glass-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
          >
            <span className="eyebrow">{s.label}</span>
            <p className="status-value text-red">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <HologramBanner />

      <div className="portal-list">
        <span className="eyebrow portal-heading">HOLOGRAM PORTALLARI</span>
        {portals.map((p, i) => (
          <motion.button
            key={p.title}
            className="portal-card glass-panel"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.06 }}
            onClick={() => onNavigate(p.route)}
          >
            <div>
              <p className="portal-title">{p.title}</p>
              <p className="portal-desc text-fog">{p.desc}</p>
            </div>
            <span className="portal-arrow text-red">→</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
