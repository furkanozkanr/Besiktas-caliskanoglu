import { motion } from 'framer-motion';
import './hologram-banner.css';

interface HologramBannerProps {
  text?: string;
}

/**
 * A banner rendered as pure holographic light rather than a physical
 * fabric pankart — semi-transparent, blue-white glow with faint red
 * energy lines, scanlines and drifting digital particles.
 */
export default function HologramBanner({ text = 'BEŞİKTAŞ ÇALIŞKANOĞLU' }: HologramBannerProps) {
  return (
    <motion.div
      className="holo-banner scanline"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="holo-banner-particles">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="holo-particle" style={{ ['--i' as string]: i }} />
        ))}
      </div>
      <div className="holo-banner-frame">
        <span className="holo-corner tl" />
        <span className="holo-corner tr" />
        <span className="holo-corner bl" />
        <span className="holo-corner br" />
        <p className="holo-banner-text glow-white">{text}</p>
        <div className="holo-banner-underline" />
      </div>
    </motion.div>
  );
}
