import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './splash-screen.css';

interface SplashScreenProps {
  onDone: () => void;
}

const AUTO_ADVANCE_MS = 3600;

export default function SplashScreen({ onDone }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => finish(), AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    setVisible(false);
    setTimeout(onDone, 420);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="splash"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="splash-void" />

          <motion.div
            className="splash-spark"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />

          <motion.div
            className="splash-lines"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <span className="line line-h" />
            <span className="line line-v" />
          </motion.div>

          <motion.div
            className="splash-gate"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.0, duration: 0.8, ease: 'easeInOut' }}
          />

          <motion.img
            src="/assets/logo/crest.png"
            alt="Beşiktaş Çalışkanoğlu amblemi"
            className="splash-crest"
            initial={{ opacity: 0, scale: 0.7, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay: 1.5, duration: 0.9, ease: 'easeOut' }}
          />

          <motion.div
            className="splash-title-wrap"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
          >
            <h1 className="splash-title glow-white">BEŞİKTAŞ ÇALIŞKANOĞLU</h1>
            <p className="splash-sub eyebrow">TEKNOLOJİNİN KALBİNDE SİYAH-BEYAZ BİR SEVDA</p>
          </motion.div>

          <motion.button
            className="splash-skip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={finish}
          >
            ATLA →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
