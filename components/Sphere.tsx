"use client";

import { useEffect, useRef } from "react";

// Esfera de pontos (gráfico decorativo central). Estética area.tech: volume 3D
// por tamanho + opacidade dos pontos. Incrementos: cor por profundidade
// (roxo perto -> azul-cinza longe), linhas de constelação entre vizinhos,
// glow radial, respiração + rotação multi-eixo. Parallax do mouse.
const DOT_COUNT = 620;
const NEIGHBORS = 3;

type P = { x: number; y: number; z: number; nb: number[] };

function buildSphere(n: number): P[] {
  const pts: P[] = [];
  const phi = Math.PI * (Math.sqrt(5) - 1); // golden angle
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = phi * i;
    pts.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r, nb: [] });
  }
  // vizinhos mais próximos (precomputado uma vez) para as linhas
  for (let i = 0; i < n; i++) {
    const d: { j: number; dist: number }[] = [];
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      const dz = pts[i].z - pts[j].z;
      d.push({ j, dist: dx * dx + dy * dy + dz * dz });
    }
    d.sort((a, b) => a.dist - b.dist);
    pts[i].nb = d.slice(0, NEIGHBORS).map((o) => o.j);
  }
  return pts;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function Sphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const points = buildSphere(DOT_COUNT);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let targetRX = 0;
    let targetRY = 0;
    let rx = 0;
    let ry = 0;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetRY = ((e.clientX - rect.left) / rect.width - 0.5) * 0.7;
      targetRX = ((e.clientY - rect.top) / rect.height - 0.5) * 0.7;
    };
    window.addEventListener("mousemove", onMove);

    // buffers de projeção reutilizados
    const px = new Float32Array(DOT_COUNT);
    const py = new Float32Array(DOT_COUNT);
    const pd = new Float32Array(DOT_COUNT); // depth 0..1

    let angle = 0;
    let t = 0;
    let raf = 0;

    const frame = () => {
      t += 0.016;
      if (!reduced) angle += 0.0024;
      rx += (targetRX - rx) * 0.06;
      ry += (targetRY - ry) * 0.06;

      // abre e fecha (respiração marcada) junto com o giro
      const breathe = reduced ? 1 : 1 + Math.sin(t * 0.9) * 0.13;
      const base = Math.min(w, h) * 0.42 * breathe;
      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h) / 520;

      const ay = angle + ry;
      const sinY = Math.sin(ay);
      const cosY = Math.cos(ay);
      const tilt = rx + (reduced ? 0 : Math.sin(t * 0.5) * 0.12);
      const sinX = Math.sin(tilt);
      const cosX = Math.cos(tilt);

      ctx.clearRect(0, 0, w, h);

      // glow radial atrás da esfera
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, base * 1.5);
      glow.addColorStop(0, "rgba(226, 48, 48, 0.12)");
      glow.addColorStop(0.5, "rgba(217, 119, 87, 0.05)");
      glow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // projeta todos os pontos
      for (let i = 0; i < DOT_COUNT; i++) {
        const p = points[i];
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const depth = (z2 + 1) / 2;
        const persp = 0.62 + depth * 0.38;
        px[i] = cx + x1 * base * persp;
        py[i] = cy + y2 * base * persp;
        pd[i] = depth;
      }

      // linhas de constelação (atrás dos pontos)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < DOT_COUNT; i++) {
        const nb = points[i].nb;
        for (let k = 0; k < nb.length; k++) {
          const j = nb[k];
          if (j < i) continue; // desenha cada par uma vez
          const dd = (pd[i] + pd[j]) / 2;
          const a = dd * dd * 0.16;
          if (a < 0.012) continue;
          ctx.strokeStyle = `rgba(200, 80, 80, ${a})`;
          ctx.beginPath();
          ctx.moveTo(px[i], py[i]);
          ctx.lineTo(px[j], py[j]);
          ctx.stroke();
        }
      }

      // pontos (cor roxo perto -> azul-cinza longe)
      for (let i = 0; i < DOT_COUNT; i++) {
        const depth = pd[i];
        // vermelho: escuro no fundo da esfera, vivo na frente
        const r = Math.round(lerp(120, 226, depth));
        const g = Math.round(lerp(30, 48, depth));
        const b = Math.round(lerp(30, 48, depth));
        const alpha = 0.16 + depth * depth * 0.84;
        const dot = Math.max((0.5 + depth * 1.8) * scale, 0.4);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.arc(px[i], py[i], dot, 0, Math.PI * 2);
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
    <div className="relative flex h-full w-full cursor-pointer select-none items-center justify-center">
      <canvas
        ref={canvasRef}
        aria-hidden
        className="w-[min(86vw,86vh,640px)] aspect-square"
      />
    </div>
  );
}
