import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import TechBase3D from './components/TechBase3D';
import FallbackScene from './components/FallbackScene';
import BottomNav, { type Route } from './components/BottomNav';
import EasterEggOverlay from './components/EasterEggOverlay';
import HomeBase from './pages/HomeBase';
import HologramCards from './pages/HologramCards';
import BesiktasPage from './pages/BesiktasPage';
import SinanAbi from './pages/SinanAbi';
import SystemSettings from './pages/SystemSettings';
import { useWebGLSupport } from './hooks/useWebGLSupport';
import './App.css';

const CREST_TAP_THRESHOLD = 5;
const CREST_TAP_WINDOW_MS = 2500;

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [route, setRoute] = useState<Route>('base');
  const [performanceMode, setPerformanceMode] = useState(false);
  const [crestTaps, setCrestTaps] = useState(0);
  const [eggActive, setEggActive] = useState(false);
  const webglSupported = useWebGLSupport();

  // Auto-enable performance mode on devices that report low concurrency
  // (a lightweight, dependency-free heuristic for "low-powered device").
  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4;
    const isSmallScreen = window.innerWidth < 380;
    if (cores <= 4 && isSmallScreen) setPerformanceMode(true);
  }, []);

  useEffect(() => {
    if (crestTaps === 0) return;
    const timer = setTimeout(() => setCrestTaps(0), CREST_TAP_WINDOW_MS);
    if (crestTaps >= CREST_TAP_THRESHOLD) {
      setEggActive(true);
      setCrestTaps(0);
      setTimeout(() => setEggActive(false), 2200);
    }
    return () => clearTimeout(timer);
  }, [crestTaps]);

  function handleCrestTap() {
    setCrestTaps((n) => n + 1);
  }

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}

      {splashDone && (
        <div className="app-shell">
          <div className="scene-layer">
            {webglSupported === false ? (
              <FallbackScene />
            ) : webglSupported === true ? (
              <TechBase3D
                performanceMode={performanceMode}
                crestTaps={crestTaps}
                onCrestTap={handleCrestTap}
              />
            ) : null}
          </div>

          <AnimatePresence mode="wait">
            <motion.main
              key={route}
              className="page-container"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {route === 'base' && <HomeBase onNavigate={setRoute} />}
              {route === 'cards' && <HologramCards />}
              {route === 'club' && <BesiktasPage />}
              {route === 'sinan' && <SinanAbi />}
              {route === 'system' && (
                <SystemSettings
                  performanceMode={performanceMode}
                  onTogglePerformance={() => setPerformanceMode((v) => !v)}
                />
              )}
            </motion.main>
          </AnimatePresence>

          <BottomNav active={route} onNavigate={setRoute} />
          <EasterEggOverlay active={eggActive} />
        </div>
      )}
    </>
  );
}
