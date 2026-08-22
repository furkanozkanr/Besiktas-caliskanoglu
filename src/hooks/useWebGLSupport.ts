import { useEffect, useState } from 'react';

/**
 * Detects whether the current device/browser can run WebGL.
 * Used to gate the 3D scene and fall back to the 2D "SYSTEM FALLBACK"
 * experience described in the brief (section 33).
 */
export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
      setSupported(Boolean(gl));
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
