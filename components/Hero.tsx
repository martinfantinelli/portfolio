"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import CursorGlow from "@/components/CursorGlow";
import MagneticName from "@/components/MagneticName";

const line: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 + i * 0.09 },
  }),
};

const STACK = ["Java", "Spring Boot", "TypeScript", "React", "Node.js", "Rust", "PostgreSQL"];

export default function Hero() {
  const [caret, setCaret] = useState(true);
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => setCaret((c) => !c), 550);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Cursor orb — fixed overlay, sits behind all hero content */}
      <CursorGlow />

      <div className="relative z-20 flex h-full w-full flex-col justify-between px-5 py-5 text-white md:px-10 md:py-8">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-between text-[11px] font-medium uppercase tracking-label text-white/50"
        >
          <span className="font-mono text-[#ff7a54]">martin.fantinelli</span>
          <nav className="flex gap-6">
            <a href="#projects" className="transition-colors duration-200 hover:text-white">
              Projects
            </a>
            <a
              href="https://martinfantinelli.dev"
              className="cursor-not-allowed opacity-30"
              aria-disabled="true"
              tabIndex={-1}
              onClick={(e) => e.preventDefault()}
            >
              Blog
            </a>
          </nav>
        </motion.header>

        <div className="max-w-xl">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={line}
            className="font-mono text-[11px] uppercase tracking-label text-[#ff7a54]"
          >
            {"// fullstack software engineer"}
          </motion.p>

          {/* Name — each letter repels from the cursor */}
          <h1 className="mt-3 font-black leading-[0.95] tracking-[-0.02em] text-[clamp(2.5rem,7vw,4.75rem)]">
            <motion.div custom={1} initial="hidden" animate="visible" variants={line} className="block">
              <MagneticName text="Martin" />
            </motion.div>
            <motion.div custom={2} initial="hidden" animate="visible" variants={line} className="block">
              <MagneticName text="Fantinelli" />
            </motion.div>
          </h1>

          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={line}
            className="mt-5 max-w-md font-mono text-sm leading-relaxed text-white/55"
          >
            Building fast, reliable products for teams that ship. Based in Porto
            Alegre, Brazil — working with clients worldwide.
            <span className={caret ? "opacity-100" : "opacity-0"}>▍</span>
          </motion.p>

          <motion.ul
            custom={4}
            initial="hidden"
            animate="visible"
            variants={line}
            className="mt-6 flex flex-wrap gap-2"
          >
            {STACK.map((s) => (
              <li
                key={s}
                className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] text-white/70"
              >
                {s}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center justify-between font-mono text-[11px] uppercase tracking-label text-white/40"
        >
          <span suppressHydrationWarning>Porto Alegre, BR · {time ?? "--:--"}</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-1 text-white/60"
          >
            Scroll <span aria-hidden>↓</span>
          </motion.span>
        </motion.div>
      </div>
    </>
  );
}
