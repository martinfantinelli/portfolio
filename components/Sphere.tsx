"use client";

import { useEffect, useRef } from "react";

// Esfera de pontos roxos (gráfico decorativo central), recriando a estética
// area.tech: volume 3D por tamanho + opacidade dos pontos, não por gradiente.
// Pontos distribuídos por Fibonacci sphere, rotação lenta em Y + parallax do mouse.
const DOT_COUNT = 720;
const ACCENT = "155, 89, 182"; // #9b59b6

type P = { x: number; y: number; z: number };

function fibonacciSphere(n: number): P[] {
  const pts: P[] = [];
  const phi = Math.PI * (Math.sqrt(5) - 1); // golden angle
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2; // 1 -> -1
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }
  return pts;
}

export default function Sphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const points = fibonacciSphere(DOT_COUNT);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // mouse parallax (alvo suavizado)
    let targetRX = 0;
    let targetRY = 0;
    let rx = 0;
    let ry = 0;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRY = nx * 0.6;
      targetRX = ny * 0.6;
    };
    window.addEventListener("mousemove", onMove);

    let angle = 0;
    let raf = 0;

    const frame = () => {
      const radius = Math.min(w, h) * 0.42;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      if (!reduced) angle += 0.0022;
      rx += (targetRX - rx) * 0.06;
      ry += (targetRY - ry) * 0.06;

      const ay = angle + ry;
      const sinY = Math.sin(ay);
      const cosY = Math.cos(ay);
      const sinX = Math.sin(rx);
      const cosX = Math.cos(rx);

      for (const p of points) {
        // rotação em Y
        let x = p.x * cosY - p.z * sinY;
        let z = p.x * sinY + p.z * cosY;
        let y = p.y;
        // leve inclinação em X (mouse)
        const y2 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;
        y = y2;
        z = z2;

        // perspectiva: z em [-1,1], mais perto = maior/opaco
        const depth = (z + 1) / 2; // 0..1
        const persp = 0.65 + depth * 0.35;
        const px = cx + x * radius * persp;
        const py = cy + y * radius * persp;
        const dot = (0.6 + depth * 1.7) * (Math.min(w, h) / 520);
        const alpha = 0.18 + depth * depth * 0.82;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${ACCENT}, ${alpha})`;
        ctx.arc(px, py, Math.max(dot, 0.4), 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none cursor-pointer">
      <canvas
        ref={canvasRef}
        aria-hidden
        className="w-[min(86vw,86vh,640px)] aspect-square"
      />
    </div>
  );
}
