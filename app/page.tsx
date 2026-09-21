import HeroScene from "@/components/HeroScene";
import ProjectsList from "@/components/ProjectsList";
import Hero from "@/components/Hero";
import AnimatedLink from "@/components/AnimatedLink";

export default function Home() {
  return (
    <div id="top" className="relative w-full">
      {/* HERO: pinado, tema escuro. O painel de projetos (claro) sobe por
          cima e revela a transição, como um "amanhecer" (efeito silo). */}
      <section className="sticky top-0 z-0 h-dvh w-full overflow-hidden bg-black">
        {/* cena 3D (R3F): núcleo distorcido + grid de piso, atrás do texto */}
        <div className="absolute inset-0 z-10">
          <HeroScene />
        </div>

        {/* vinheta para garantir contraste do texto sobre a cena */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/10 to-black/80"
        />

        <Hero />
      </section>

      {/* PROJETOS: desliza por cima do hero pinado */}
      <section
        id="projects"
        className="relative z-10 min-h-dvh w-full bg-background shadow-[0_-32px_80px_-16px_rgba(0,0,0,0.8)]"
      >
        <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-10 md:px-8 md:py-16">
          <header className="flex items-baseline justify-between border-b border-hairline pb-4">
            <span className="font-mono text-[11px] font-medium uppercase tracking-label text-primary">
              // selected work
            </span>
            <span className="font-mono text-[11px] font-medium uppercase tracking-label text-secondary">
              Projects
            </span>
          </header>

          <div className="mt-12 flex-1 md:mt-16">
            <ProjectsList />
          </div>

          <footer className="mt-16 flex justify-between border-t border-hairline pt-6 font-mono text-[11px] font-medium uppercase tracking-label">
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
