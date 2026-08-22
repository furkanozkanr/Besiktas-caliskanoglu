import { useEffect, useRef } from 'react';

export interface ParallaxValue {
  x: number; // -1..1
  y: number; // -1..1
}

/**
 * Tracks pointer / touch movement (and, where available, device
 * orientation) and exposes a gentle -1..1 value used to drive subtle
 * camera and parallax movement. Deliberately damped — the brief asks
 * for a light drift, not a motion-sick shake.
 */
export function usePointerParallax(damping = 0.06) {
  const target = useRef<ParallaxValue>({ x: 0, y: 0 });
  const current = useRef<ParallaxValue>({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointer = (clientX: number, clientY: number) => {
      const nx = (clientX / window.innerWidth) * 2 - 1;
      const ny = (clientY / window.innerHeight) * 2 - 1;
      target.current = { x: nx, y: ny };
    };

    const onMouseMove = (e: MouseEvent) => handlePointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  // Called every frame by the consumer to get a damped, smoothed value.
  const sample = (): ParallaxValue => {
    current.current.x += (target.current.x - current.current.x) * damping;
    current.current.y += (target.current.y - current.current.y) * damping;
    return current.current;
  };

  return { sample };
}
