import Link from "next/link";
import Sphere from "@/components/Sphere";

export default function Home() {
  return (
    <main className="w-full grow flex">
      <div className="relative w-full min-h-dvh overflow-hidden bg-background">
        {/* CENTRO: esfera (atrás do texto para mantê-lo legível) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4 pt-8 md:pt-10">
          <Sphere />
        </div>

        {/* TOPO: wordmark em duas linhas */}
        <header className="absolute inset-x-0 top-0 z-20 px-4 pt-4 md:px-8 md:pt-6">
          <h1 className="select-none font-black uppercase leading-[0.85] tracking-[-0.02em] text-primary text-[clamp(2.75rem,11vw,9rem)]">
            <span className="block">Martin</span>
            <span className="block">Fantinelli</span>
          </h1>
        </header>

        {/* RODAPÉ: tagline + nav */}
        <footer className="absolute inset-x-0 bottom-0 z-20 px-4 pb-4 md:px-8 md:pb-6">
          <div className="flex items-end justify-between gap-4">
            <p className="max-w-[16rem] flex-1 text-[11px] font-medium uppercase leading-[15px] tracking-label text-secondary">
              Fullstack software engineer. Porto Alegre, Brazil.
            </p>
            <nav className="flex gap-4 text-[11px] font-medium uppercase tracking-label text-secondary md:gap-8">
              <Link
                href="/projects"
                className="transition-colors duration-200 hover:text-foreground"
              >
                Projects
              </Link>
              <a
                href="https://martinfantinelli.dev"
                className="transition-colors duration-200 hover:text-foreground"
              >
                Blog
              </a>
            </nav>
          </div>
        </footer>
      </div>
    </main>
  );
}
