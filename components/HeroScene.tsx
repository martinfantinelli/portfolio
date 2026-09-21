"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const ORANGE = "#ff7a54";

// ─── Particle field ──────────────────────────────────────────────────────────
// 52×38 grid of dots displaced on Z by a compound sine wave.
// The wave phase is driven by the cursor position — ripples flow toward
// wherever the mouse is pointing.

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const COLS = 52;
  const ROWS = 38;
  const count = COLS * ROWS;

  const { positions, baseXY } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const baseXY = new Float32Array(count * 2);
    const w = viewport.width * 1.1;
    const h = viewport.height * 1.1;
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = (c / (COLS - 1) - 0.5) * w;
        const y = (r / (ROWS - 1) - 0.5) * h;
        positions[i * 3]     = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = 0;
        baseXY[i * 2]     = x;
        baseXY[i * 2 + 1] = y;
        i++;
      }
    }
    return { positions, baseXY };
  // viewport dims are stable after mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state) => {
    const geo = ref.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const t  = state.clock.getElapsedTime();
    const mx = state.pointer.x * (viewport.width  / 2);
    const my = state.pointer.y * (viewport.height / 2);

    for (let i = 0; i < count; i++) {
      const bx = baseXY[i * 2];
      const by = baseXY[i * 2 + 1];
      const dx = bx - mx;
      const dy = by - my;
      const dist      = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.exp(-dist * 0.18) * 0.9;

      const z =
        Math.sin(bx * 0.35 + t * 0.6)  * 0.18 +
        Math.sin(by * 0.45 + t * 0.5)  * 0.14 +
        Math.sin(dist * 0.5 - t * 2.2) * influence;

      pos.setXYZ(i, bx, by, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={ORANGE}
        size={0.028}
        sizeAttenuation
        transparent
        opacity={0.28}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Camera parallax ─────────────────────────────────────────────────────────

function Rig() {
  const { camera } = useThree();
  useFrame((state) => {
    camera.position.x += (state.pointer.x * 0.5  - camera.position.x) * 0.04;
    camera.position.y += (-state.pointer.y * 0.3 + 0.2 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── Scene ───────────────────────────────────────────────────────────────────

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 6, 14]} />
      <ParticleField />
      <Rig />
    </Canvas>
  );
}
