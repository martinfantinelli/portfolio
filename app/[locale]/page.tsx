import { notFound } from "next/navigation";
import { isValidLocale, getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import HeroScene from "@/components/HeroScene";
import Hero from "@/components/Hero";
import ProjectsList from "@/components/ProjectsList";
import AnimatedLink from "@/components/AnimatedLink";
import LanguageToggle from "@/components/LanguageToggle";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const t = getDict(locale as Locale);

  return (
    <div id="top" className="relative w-full">
      {/* HERO */}
      <section className="sticky top-0 z-0 h-dvh w-full overflow-hidden bg-black">
        <div className="absolute inset-0 z-10">
          <HeroScene />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/10 to-black/80"
        />
        <Hero locale={locale as Locale} t={t} />
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="relative z-10 min-h-dvh w-full bg-background shadow-[0_-32px_80px_-16px_rgba(0,0,0,0.8)]"
      >
        <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-10 md:px-8 md:py-16">
          <header className="flex items-baseline justify-between border-b border-hairline pb-4">
            <span className="font-mono text-[11px] font-medium uppercase tracking-label text-primary">
              {t.projects.label}
            </span>
            <span className="font-mono text-[11px] font-medium uppercase tracking-label text-secondary">
              {t.projects.heading}
            </span>
          </header>

          <div className="mt-12 flex-1 md:mt-16">
            <ProjectsList />
          </div>

          <footer className="mt-16 border-t border-hairline pt-10">
            {/* Contact & social row */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-label text-secondary">
                  {t.footer.getInTouch}
                </span>
                <a
                  href="mailto:martinsfantinelli@gmail.com"
                  className="font-mono text-sm text-foreground transition-colors duration-200 hover:text-primary"
                >
                  martinsfantinelli@gmail.com
                </a>
              </div>

              <nav className="flex gap-6 font-mono text-[11px] uppercase tracking-label">
                <a
                  href="https://github.com/martinfantinelli"
                  target="_blank"
                  rel="noreferrer"
                  className="text-secondary transition-colors duration-200 hover:text-foreground"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/martin-fantinelli/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-secondary transition-colors duration-200 hover:text-foreground"
                >
                  LinkedIn
                </a>
                <AnimatedLink href="#top">{t.footer.top}</AnimatedLink>
              </nav>
            </div>

            {/* Legal row */}
            <div className="mt-8 flex flex-col gap-1 border-t border-hairline pt-6 font-mono text-[10px] uppercase tracking-label text-secondary sm:flex-row sm:justify-between">
              <span>M. Scherer Fantinelli Ltda · CNPJ 69.193.476/0001-92</span>
              <span>© {new Date().getFullYear()} Martin Fantinelli</span>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
