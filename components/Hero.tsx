"use client";

import { motion } from "motion/react";

const wordmarkLine = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.08 },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// Cabeçalho (wordmark) e rodapé (tagline + nav) do hero, com entrada animada.
export default function Hero() {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20 px-4 pt-4 md:px-8 md:pt-6">
        <h1 className="select-none font-black uppercase leading-[0.85] tracking-[-0.02em] text-primary text-[clamp(2.75rem,11vw,9rem)]">
          <motion.span
            custom={0}
            initial="hidden"
            animate="visible"
            variants={wordmarkLine}
            className="block"
          >
            Martin
          </motion.span>
          <motion.span
            custom={1}
            initial="hidden"
            animate="visible"
            variants={wordmarkLine}
            className="block"
          >
            Fantinelli
          </motion.span>
        </h1>
      </header>

      <footer className="absolute inset-x-0 bottom-0 z-20 px-4 pb-4 md:px-8 md:pb-6">
        <div className="flex items-end justify-between gap-4">
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.3}
            variants={fadeUp}
            className="max-w-[16rem] flex-1 text-[11px] font-medium uppercase leading-[15px] tracking-label text-secondary"
          >
            Fullstack software engineer. Porto Alegre, Brazil.
          </motion.p>
          <motion.nav
            initial="hidden"
            animate="visible"
            custom={0.4}
            variants={fadeUp}
            className="flex gap-4 text-[11px] font-medium uppercase tracking-label text-secondary md:gap-8"
          >
            <a
              href="#projects"
              className="transition-colors duration-200 hover:text-foreground"
            >
              Projects
            </a>
            <a
              href="https://martinfantinelli.dev"
              className="transition-colors duration-200 hover:text-foreground"
            >
              Blog
            </a>
          </motion.nav>
        </div>
      </footer>
    </>
  );
}
