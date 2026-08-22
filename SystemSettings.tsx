import { motion } from 'framer-motion';
import SoundToggle from '../components/SoundToggle';
import './system-settings.css';

interface SystemSettingsProps {
  performanceMode: boolean;
  onTogglePerformance: () => void;
}

export default function SystemSettings({ performanceMode, onTogglePerformance }: SystemSettingsProps) {
  return (
    <div className="system-page">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <span className="eyebrow">SYSTEM</span>
        <h1 className="system-title glow-white">AYARLAR &amp; HAKKINDA</h1>
      </motion.div>

      <div className="system-panel glass-panel">
        <div className="system-row">
          <div>
            <p className="system-row-title">PERFORMANCE MODE</p>
            <p className="system-row-desc text-fog">Düşük güçlü cihazlarda 3D efektleri azaltır.</p>
          </div>
          <button
            className={`switch ${performanceMode ? 'switch-on' : ''}`}
            role="switch"
            aria-checked={performanceMode}
            onClick={onTogglePerformance}
          >
            <span className="switch-knob" />
          </button>
        </div>

        <div className="hairline" style={{ margin: '16px 0' }} />

        <div className="system-row">
          <div>
            <p className="system-row-title">SES</p>
            <p className="system-row-desc text-fog">Varsayılan olarak kapalıdır.</p>
          </div>
          <SoundToggle />
        </div>
      </div>

      <div className="system-panel glass-panel">
        <span className="eyebrow">BU SİSTEM NEDEN VAR?</span>
        <p className="about-text">
          Beşiktaş sevgisini, teknoloji ve hayal gücüyle birleştiren tamamen fan yapımı
          küçük bir proje.
        </p>
        <p className="about-meta text-metal">BEŞİKTAŞ ÇALIŞKANOĞLU · FAN MADE · NON-COMMERCIAL</p>
      </div>

      <div className="system-panel disclaimer-panel glass-panel">
        <span className="eyebrow text-red">YASAL BİLGİLENDİRME</span>
        <p className="disclaimer-text">
          Bu uygulama tamamen fan yapımı ve ticari olmayan bir hayran projesidir. Beşiktaş
          Jimnastik Kulübü veya ilgili kişi/kurumlarla resmi bir bağlantısı yoktur. Kart
          görselleri örnek/placeholder içeriklerdir.
        </p>
      </div>
    </div>
  );
}
