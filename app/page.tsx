import Sphere from "@/components/Sphere";
import ProjectsList from "@/components/ProjectsList";
import Hero from "@/components/Hero";
import AnimatedLink from "@/components/AnimatedLink";

export default function Home() {
  return (
    <div id="top" className="relative w-full">
      {/* HERO: pinado. O painel de projetos sobe por cima (efeito silo). */}
      <section className="sticky top-0 z-0 h-dvh w-full overflow-hidden bg-background">
        {/* halo radial sutil para o branco não ficar chapado */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(55% 50% at 50% 52%, rgba(226,48,48,0.06), rgba(217,119,87,0.035) 45%, rgba(255,255,255,0) 72%)",
          }}
        />

        {/* esfera (atrás do texto para mantê-lo legível) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4 pt-8 md:pt-10">
          <Sphere />
        </div>

        <Hero />
      </section>

      {/* PROJETOS: desliza por cima do hero pinado */}
      <section
        id="projects"
        className="relative z-10 min-h-dvh w-full bg-background shadow-[0_-24px_60px_-20px_rgba(20,20,19,0.12)]"
      >
        <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-10 md:px-8 md:py-16">
          <header className="flex items-baseline justify-between">
            <span className="text-[11px] font-medium uppercase tracking-label text-secondary">
              Selected work
            </span>
            <span className="text-[11px] font-medium uppercase tracking-label text-secondary">
              Projects
            </span>
          </header>

          <div className="mt-12 flex-1 md:mt-16">
            <ProjectsList />
          </div>

          <footer className="mt-16 flex justify-between text-[11px] font-medium uppercase tracking-label">
            <AnimatedLink href="#top">↑ Top</AnimatedLink>
            <a
              href="https://github.com/martinfantinelli"
              target="_blank"
              rel="noreferrer"
              className="text-secondary transition-colors duration-200 hover:text-foreground"
            >
              GitHub
            </a>
          </footer>
        </div>
      </section>
    </div>
  );
}
