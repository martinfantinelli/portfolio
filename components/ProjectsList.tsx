"use client";

import { motion } from "motion/react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.04 },
  },
};

export default function ProjectsList() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="grid w-full grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2"
    >
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </motion.div>
  );
}
