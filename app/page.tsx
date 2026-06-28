import Sphere from "@/components/Sphere";
import ProjectsList from "@/components/ProjectsList";

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

        {/* wordmark em duas linhas */}
        <header className="absolute inset-x-0 top-0 z-20 px-4 pt-4 md:px-8 md:pt-6">
          <h1 className="select-none font-black uppercase leading-[0.85] tracking-[-0.02em] text-primary text-[clamp(2.75rem,11vw,9rem)]">
            <span className="block">Martin</span>
            <span className="block">Fantinelli</span>
          </h1>
        </header>

        {/* rodapé: tagline + nav */}
        <footer className="absolute inset-x-0 bottom-0 z-20 px-4 pb-4 md:px-8 md:pb-6">
          <div className="flex items-end justify-between gap-4">
            <p className="max-w-[16rem] flex-1 text-[11px] font-medium uppercase leading-[15px] tracking-label text-secondary">
              Fullstack software engineer. Porto Alegre, Brazil.
            </p>
            <nav className="flex gap-4 text-[11px] font-medium uppercase tracking-label text-secondary md:gap-8">
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
            </nav>
          </div>
        </footer>
      </section>

      {/* PROJETOS: desliza por cima do hero pinado */}
      <section
        id="projects"
        className="relative z-10 min-h-dvh w-full bg-background shadow-[0_-24px_60px_-20px_rgba(20,20,19,0.12)]"
      >
        <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 py-10 md:px-8 md:py-16">
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

          <footer className="mt-12 flex justify-between text-[11px] font-medium uppercase tracking-label text-secondary">
            <a
              href="#top"
              className="transition-colors duration-200 hover:text-foreground"
            >
              ↑ Top
            </a>
            <a
              href="https://github.com/martinfantinelli"
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-200 hover:text-foreground"
            >
              GitHub
            </a>
          </footer>
        </div>
      </section>
    </div>
  );
}
