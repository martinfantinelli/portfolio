"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const link = project.live ?? project.href;

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0 },
      }}
      className="group flex flex-col"
    >
      {/* image container */}
      <motion.div
        whileHover="hover"
        initial="rest"
        animate="rest"
        className="relative overflow-hidden rounded-sm border border-card-border bg-card"
      >
        <a
          href={link}
          target={link ? "_blank" : undefined}
          rel={link ? "noreferrer" : undefined}
          className="block"
          aria-label={`${project.name} — ${project.category}`}
        >
          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[16/10] w-full"
          >
            <Image
              src={project.image}
              alt={`${project.name} preview`}
              width={960}
              height={600}
              className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            />
          </motion.div>

          {/* dark overlay on hover */}
          <motion.div
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute inset-0 bg-black/20"
          />

          {/* "View" badge */}
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-label text-white/80 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
            View ↗
          </span>

          {/* year badge bottom-left */}
          <span className="absolute bottom-3 left-3 font-mono text-[10px] font-medium uppercase tracking-label text-white/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {project.year}
          </span>
        </a>
      </motion.div>

      {/* metadata */}
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-base font-semibold tracking-[-0.01em] text-foreground">
            {project.name}
          </h3>
          <span className="shrink-0 font-mono text-[10px] font-medium uppercase tracking-label text-secondary">
            {project.year}
          </span>
        </div>

        <p className="mt-1 font-mono text-[11px] font-medium uppercase tracking-label text-primary">
          {project.category}
        </p>

        <p className="mt-2 text-sm leading-relaxed text-secondary">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-sm border border-hairline px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-label text-secondary"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
