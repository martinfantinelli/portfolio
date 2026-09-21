"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ComponentProps } from "react";

type AnimatedLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">;

// Link com sublinhado que desliza da esquerda ao passar o mouse.
export default function AnimatedLink({
  href,
  children,
  className = "",
  ...props
}: AnimatedLinkProps) {
  return (
    <Link
      href={href}
      className={`group relative inline-block text-secondary transition-colors duration-200 hover:text-foreground ${className}`}
      {...props}
    >
      {children}
      <motion.span
        aria-hidden
        className="absolute -bottom-1 left-0 h-px w-full origin-left bg-foreground"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </Link>
  );
}
