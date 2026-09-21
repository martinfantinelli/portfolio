"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Grid, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#ff5a36";

// Objeto central: icosaedro distorcido com casca wireframe sobreposta.
// Reage à posição do mouse (parallax de rotação) e flutua suavemente.
function DistortedCore() {
  const group = useRef<THREE.Group>(null);
  const wireframe = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    const { pointer, clock } = state;
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.12 + pointer.x * 0.5;
      group.current.rotation.x = t * 0.05 + pointer.y * 0.25;
    }
    if (wireframe.current) {
      wireframe.current.rotation.y = -t * 0.08;
      wireframe.current.rotation.z = t * 0.04;
    }
  });

  const scale = Math.min(viewport.width, viewport.height) * 0.34;

  return (
    <group ref={group} scale={scale}>
      <mesh>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.6}
          distort={0.32}
          speed={1.4}
        />
      </mesh>
      <mesh ref={wireframe} scale={1.28}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

// Partículas dispersas ao fundo para dar profundidade sem competir com o core.
function Dust() {
  const count = 240;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  }, []);
  const points = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ff8a6a" size={0.02} sizeAttenuation transparent opacity={0.5} />
    </points>
  );
}

function Rig() {
  const { camera } = useThree();
  useFrame((state) => {
    camera.position.x += (state.pointer.x * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (-state.pointer.y * 0.35 + 0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 6.2], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 5, 13]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={40} color={ACCENT} />
      <pointLight position={[-5, -3, -2]} intensity={12} color="#3a6bff" />

      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.6}>
        <DistortedCore />
      </Float>

      <Dust />

      <Grid
        position={[0, -2.4, 0]}
        args={[24, 24]}
        cellSize={0.6}
        cellThickness={0.5}
        cellColor="#3a1a12"
        sectionSize={3}
        sectionThickness={1}
        sectionColor={ACCENT}
        fadeDistance={14}
        fadeStrength={1.5}
        infiniteGrid
      />

      <Rig />
    </Canvas>
  );
}
