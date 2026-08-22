import { useState } from 'react';
import { motion } from 'framer-motion';
import EasterEggOverlay from '../components/EasterEggOverlay';
import './besiktas-page.css';

export default function BesiktasPage() {
  const [eggActive, setEggActive] = useState(false);

  function trigger1903() {
    setEggActive(true);
    setTimeout(() => setEggActive(false), 2200);
  }

  return (
    <div className="besiktas-page">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <span className="eyebrow">BEŞİKTAŞ ARCHIVE</span>
        <h1 className="bjk-title glow-white">KARA KARTAL RUHU</h1>
      </motion.div>

      <div className="bjk-panel glass-panel">
        <p>
          Bu bölüm, siyah-beyaz renklerin taşıdığı tutkuyu ve taraftarlığın nesilden nesile
          aktarılan enerjisini bu teknoloji üssüne yansıtmak için var. İçerik tamamen fan
          yapımıdır ve kulübün resmi arşivini temsil etmez.
        </p>
      </div>

      <button className="year-chip" onClick={trigger1903}>
        <span className="eyebrow">KURULUŞ</span>
        <span className="year-number text-red">1903</span>
      </button>

      <div className="bjk-grid">
        <div className="bjk-mini glass-panel">
          <span className="eyebrow">RENKLER</span>
          <p>Siyah &amp; Beyaz</p>
        </div>
        <div className="bjk-mini glass-panel">
          <span className="eyebrow">RUH</span>
          <p>Kara Kartallar</p>
        </div>
      </div>

      <EasterEggOverlay active={eggActive} />
    </div>
  );
}
