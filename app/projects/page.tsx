import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects by Martin Fantinelli.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 py-8 md:px-8 md:py-12">
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

      <ul className="mt-16 flex-1 md:mt-24">
        {projects.map((p) => (
          <li
            key={p.name}
            className="border-t border-hairline py-8 last:border-b"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-8">
              <div className="md:max-w-md">
                <h2 className="text-lg font-semibold tracking-[-0.01em] text-foreground">
                  {p.name}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-secondary">
                  {p.description}
                </p>
                <p className="mt-3 text-[11px] font-medium uppercase tracking-label text-primary">
                  {p.tech.join(" · ")}
                </p>
              </div>
              <div className="flex shrink-0 gap-4 text-[11px] font-medium uppercase tracking-label">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="text-secondary transition-colors duration-200 hover:text-foreground"
                  >
                    Live
                  </a>
                )}
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-secondary transition-colors duration-200 hover:text-foreground"
                >
                  Code
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <footer className="mt-16 flex justify-between text-[11px] font-medium uppercase tracking-label text-secondary">
        <Link
          href="/"
          className="transition-colors duration-200 hover:text-foreground"
        >
          ← Home
        </Link>
        <a
          href="https://github.com/martinfantinelli"
          target="_blank"
          rel="noreferrer"
          className="transition-colors duration-200 hover:text-foreground"
        >
          GitHub
        </a>
      </footer>
    </main>
  );
}
