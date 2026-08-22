import { motion, AnimatePresence } from 'framer-motion';
import './easter-egg-overlay.css';

export default function EasterEggOverlay({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="egg-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.h2
            className="egg-text glow-red"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          >
            BEŞİKTAŞ MODE
            <br />
            ACTIVATED
          </motion.h2>
          <p className="egg-sub eyebrow">1903 · KARA KARTAL SİSTEMİ ÇEVRİMİÇİ</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
