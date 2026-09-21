"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Spring config — heavier stiffness = snappier, lower = more lag/weight
const SPRING = { stiffness: 80, damping: 20, mass: 0.8 };

export default function CursorGlow() {
  const rawX = useMotionValue(-400);
  const rawY = useMotionValue(-400);

  // Lagged position — the orb trails behind the cursor
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  // Slightly faster inner glow for a two-layer depth effect
  const ix = useSpring(rawX, { stiffness: 140, damping: 22, mass: 0.5 });
  const iy = useSpring(rawY, { stiffness: 140, damping: 22, mass: 0.5 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [rawX, rawY]);

  return (
    // pointer-events-none so it never blocks clicks
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Outer soft halo — large, very blurred, low opacity */}
      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute h-[520px] w-[520px] rounded-full bg-[#ff7a54] opacity-[0.07] blur-[96px]"
      />
      {/* Inner tighter glow — smaller, sharper, slightly brighter */}
      <motion.div
        style={{
          x: ix,
          y: iy,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute h-[180px] w-[180px] rounded-full bg-[#ff7a54] opacity-[0.13] blur-[40px]"
      />
    </div>
  );
}
