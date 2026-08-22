import { motion } from 'framer-motion';
import './sinan-abi.css';

// ------------------------------------------------------------------
// Kişisel mesajı buradan kolayca değiştirebilirsiniz.
// ------------------------------------------------------------------
const personalMessage =
  'Sinan abi, bu küçük teknoloji üssü Beşiktaş sevgisi ve sana duyulan hayranlıkla hazırlandı.';

export default function SinanAbi() {
  return (
    <div className="sinan-page">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <span className="eyebrow">SİNAN ABİ'YE ÖZEL</span>
        <h1 className="sinan-title glow-white">SİNAN ÇALIŞKANOĞLU</h1>
      </motion.div>

      <motion.div
        className="sinan-console glass-panel scanline"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="console-header">
          <span className="console-dot" />
          <span className="eyebrow">HOLOGRAPHIC SYSTEM</span>
        </div>
        <h2 className="console-name">SİNAN ÇALIŞKANOĞLU</h2>
        <div className="hairline" />
        <p className="console-tag eyebrow">BEŞİKTAŞ FAN EXPERIENCE</p>
      </motion.div>

      <motion.div
        className="sinan-message glass-panel"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        <span className="eyebrow">FAN MESAJI</span>
        <p className="message-lead">Bu sistem bir taraftarın sevgisiyle tasarlandı.</p>
        <p className="message-body">{personalMessage}</p>
      </motion.div>
    </div>
  );
}
