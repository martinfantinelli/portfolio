import type { Metadata } from "next";
import Link from "next/link";
import ProjectsList from "@/components/ProjectsList";
import AnimatedLink from "@/components/AnimatedLink";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects by Martin Fantinelli.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-8 md:px-8 md:py-12">
      <header className="flex items-baseline justify-between">
        <Link
          href="/"
          className="text-[11px] font-medium uppercase tracking-label text-secondary transition-colors duration-200 hover:text-foreground"
        >
          Martin Fantinelli
        </Link>
        <span className="text-[11px] font-medium uppercase tracking-label text-secondary">
          Projects
        </span>
      </header>

      <div className="mt-16 flex-1 md:mt-24">
        <ProjectsList />
      </div>

      <footer className="mt-16 flex justify-between text-[11px] font-medium uppercase tracking-label">
        <AnimatedLink href="/">← Home</AnimatedLink>
        <a
          href="https://github.com/martinfantinelli"
          target="_blank"
          rel="noreferrer"
          className="text-secondary transition-colors duration-200 hover:text-foreground"
        >
          GitHub
        </a>
      </footer>
    </main>
  );
}
