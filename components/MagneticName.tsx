"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

// How far (px) each letter repels from the cursor
const REPEL_RADIUS = 120;
const REPEL_STRENGTH = 28;

const LETTER_SPRING = { stiffness: 200, damping: 18, mass: 0.6 };

function MagneticLetter({ char }: { char: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, LETTER_SPRING);
  const y = useSpring(rawY, LETTER_SPRING);

  // Subtle color shift: white at rest → orange at full displacement
  const dist = useMotionValue(0);
  const color = useTransform(dist, [0, REPEL_STRENGTH], ["#ffffff", "#ff7a54"]);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const d  = Math.sqrt(dx * dx + dy * dy);

    if (d < REPEL_RADIUS) {
      const force = (1 - d / REPEL_RADIUS) * REPEL_STRENGTH;
      rawX.set(-(dx / d) * force);
      rawY.set(-(dy / d) * force);
      dist.set(force);
    }
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    dist.set(0);
  };

  // Spaces: render a plain non-breaking space, no motion needed
  if (char === " ") {
    return <span className="inline-block">&nbsp;</span>;
  }

  return (
    <motion.span
      ref={ref}
      style={{ x, y, color, display: "inline-block" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      // keep the letter interactive even when its siblings repel
      className="cursor-default select-none"
    >
      {char}
    </motion.span>
  );
}

interface MagneticNameProps {
  /** Text to render — split into individual letters */
  text: string;
  className?: string;
}

export default function MagneticName({ text, className }: MagneticNameProps) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <MagneticLetter key={i} char={char} />
      ))}
    </span>
  );
}
