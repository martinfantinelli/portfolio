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
            variants={{ rest: { scale: 1 }, hover: { scale: 1.045 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[16/10] w-full"
          >
            <Image
              src={project.image}
              alt={`${project.name} preview`}
              width={960}
              height={600}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute inset-0 bg-foreground/5"
          />

          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-label text-secondary opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
            View
          </span>
        </a>
      </motion.div>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-[-0.01em] text-foreground">
            {project.name}
          </h3>
          <span className="shrink-0 text-[11px] font-medium uppercase tracking-label text-secondary">
            {project.year}
          </span>
        </div>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-label text-primary">
          {project.category}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-secondary">
          {project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-hairline px-2.5 py-1 text-[10px] font-medium uppercase tracking-label text-secondary"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
