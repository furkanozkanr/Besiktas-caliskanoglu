import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { usePointerParallax } from '../hooks/usePointerParallax';

interface TechBase3DProps {
  performanceMode: boolean;
  crestTaps: number;
  onCrestTap: () => void;
}

/** Slowly rotating 3D crest medallion, built from the fan-art crest texture. */
function CrestMedallion({ onTap }: { onTap: () => void }) {
  const group = useRef<THREE.Group>(null);
  const texture = useTexture('/assets/logo/crest.png');

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.18;
  });

  return (
    <group
      ref={group}
      position={[0, 1.35, -1.4]}
      onPointerDown={onTap}
    >
      <mesh>
        <cylinderGeometry args={[1.05, 1.05, 0.06, 48]} />
        <meshStandardMaterial
          color="#3a3b40"
          metalness={0.9}
          roughness={0.25}
          emissive="#c8102e"
          emissiveIntensity={0.08}
        />
      </mesh>
      <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.7, 1.87]} />
        <meshStandardMaterial
          map={texture}
          transparent
          metalness={0.4}
          roughness={0.35}
          emissive="#ffffff"
          emissiveIntensity={0.06}
        />
      </mesh>
      <pointLight color="#c8102e" intensity={1.1} distance={4} position={[0, 0.6, 0]} />
    </group>
  );
}

/** Faint holographic ring that pulses around the crest. */
function EnergyRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const s = 1 + Math.sin(t * 1.4) * 0.03;
    ref.current.scale.set(s, s, s);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.35 + Math.sin(t * 1.4) * 0.15;
  });
  return (
    <mesh ref={ref} position={[0, 1.35, -1.4]} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.25, 1.32, 64]} />
      <meshBasicMaterial color="#f3f3f5" transparent opacity={0.3} side={THREE.DoubleSide} />
    </mesh>
  );
}

/** Grid floor with a subtle reflective sheen — the "teknoloji üssü" ground plane. */
function GridFloor() {
  const grid = useMemo(() => {
    const size = 24;
    const divisions = 24;
    const g = new THREE.GridHelper(size, divisions, '#c8102e', '#2a2b30');
    (g.material as THREE.Material).transparent = true;
    (g.material as THREE.Material).opacity = 0.35;
    return g;
  }, []);

  return (
    <group position={[0, -1.4, 0]}>
      <primitive object={grid} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#0a0a0c" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

/** Floating glass data panels flanking the crest — decorative "hologram" HUD. */
function FloatingPanels({ performanceMode }: { performanceMode: boolean }) {
  const panels = useMemo(
    () => [
      { pos: [-2.6, 0.9, -0.6] as [number, number, number], rot: 0.35, w: 0.9, h: 1.3 },
      { pos: [2.6, 0.6, -0.9] as [number, number, number], rot: -0.35, w: 0.9, h: 1.1 },
      { pos: [-1.9, -0.3, 0.6] as [number, number, number], rot: 0.55, w: 0.7, h: 0.5 },
    ],
    []
  );

  const refs = useRef<THREE.Mesh[]>([]);
  useFrame(({ clock }) => {
    if (performanceMode) return;
    const t = clock.getElapsedTime();
    refs.current.forEach((m, i) => {
      if (!m) return;
      m.position.y = panels[i].pos[1] + Math.sin(t * 0.6 + i) * 0.06;
    });
  });

  return (
    <>
      {panels.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => el && (refs.current[i] = el)}
          position={p.pos}
          rotation={[0, p.rot, 0]}
        >
          <planeGeometry args={[p.w, p.h]} />
          <meshPhysicalMaterial
            color="#101014"
            transparent
            opacity={0.35}
            roughness={0.15}
            metalness={0.1}
            emissive="#f3f3f5"
            emissiveIntensity={0.04}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  );
}

/** Slow drifting particle field standing in for volumetric dust / data motes. */
function ParticleField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = Math.random() * 4 - 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#c8c9cd" size={0.014} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/** Camera rig: applies a gentle pointer-driven parallax, never a full free-look. */
function CameraRig() {
  const { camera } = useThree();
  const { sample } = usePointerParallax(0.04);

  useFrame(() => {
    const { x, y } = sample();
    camera.position.x = x * 0.6;
    camera.position.y = 0.4 - y * 0.25;
    camera.lookAt(0, 0.6, -1.2);
  });

  return null;
}

export default function TechBase3D({ performanceMode, onCrestTap }: TechBase3DProps) {
  const particleCount = performanceMode ? 120 : 420;

  return (
    <Canvas
      dpr={performanceMode ? [1, 1.2] : [1, 2]}
      camera={{ position: [0, 0.4, 3.4], fov: 50 }}
      gl={{ antialias: !performanceMode, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#08080a']} />
      <fog attach="fog" args={['#08080a', 4, 11]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 2]} intensity={0.6} color="#f3f3f5" />
      <pointLight position={[-3, 2, 2]} intensity={0.5} color="#c8102e" />

      <GridFloor />
      <Suspense fallback={null}>
        <CrestMedallion onTap={onCrestTap} />
      </Suspense>
      <EnergyRing />
      {!performanceMode && <FloatingPanels performanceMode={performanceMode} />}
      <ParticleField count={particleCount} />
      <CameraRig />
    </Canvas>
  );
}
