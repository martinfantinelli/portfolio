// Vitrine curada — projetos reais.
// Imagens: coloque capturas de tela em /public/projects/<slug>.png
// e remova o fallback placeholder correspondente quando estiver pronto.
export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  tech: string[];
  year: string;
  image: string;
  href?: string; // repo ou live
  live?: string; // url de demo, se houver
};

export const projects: Project[] = [
  {
    slug: "feixe",
    name: "Feixe",
    category: "SaaS · Lead intelligence",
    description:
      "Reads every Instagram comment, DM and story reply, identifies who is close to buying, and returns a priority queue so teams respond to the right people first — before the 24-hour API window closes.",
    tech: ["Next.js", "TypeScript", "Meta API", "OpenAI"],
    year: "2025",
    image: "/projects/feixe.png",
    live: "https://feixeapp.com",
  },
  {
    slug: "proventa",
    name: "Proventa",
    category: "Fintech · Crypto accounting",
    description:
      "Audit-grade crypto wallet proof for Brazilian accounting firms. Wallet ownership is verified on-chain via EIP-191 signatures — no private keys ever leave the client — and movement reports are exported with an append-only hash chain.",
    tech: ["Next.js", "TypeScript", "Ethereum", "LGPD"],
    year: "2025",
    image: "/projects/proventa.png",
    live: "https://proventa-git-master-martinfantinellis-projects.vercel.app/",
  },
  {
    slug: "tontos-cookies",
    name: "Tonto's Cookies",
    category: "E-commerce · Food & beverage",
    description:
      "Online ordering experience for a New York-style cookie shop in La Plata. Customers build their order by flavor, then checkout through Rappi or WhatsApp — no cart friction, no account required.",
    tech: ["Next.js", "TailwindCSS", "TypeScript"],
    year: "2025",
    image: "/projects/tontos-cookies.png",
    live: "https://tontos-cookies.vercel.app/",
  },
  {
    slug: "nutallo",
    name: "Nutallo",
    category: "Web app",
    description:
      "A client project built and deployed on Vercel. Replace this description once you add the real details about what Nutallo does.",
    tech: ["Next.js", "TypeScript", "TailwindCSS"],
    year: "2025",
    image: "/projects/nutallo.png",
    live: "https://nutallo.vercel.app/",
  },
  {
    slug: "poa-petcare",
    name: "POA PetCare 24H",
    category: "Healthcare · Veterinary",
    description:
      "Marketing site for a 24/7 veterinary clinic in Porto Alegre. Highlights emergency care, full surgical facilities and specialist coverage, giving pet owners confidence to reach out at any hour.",
    tech: ["Next.js", "TailwindCSS", "TypeScript"],
    year: "2025",
    image: "/projects/poa-petcare.png",
    live: "https://poa-petcare-24h-tw0q3.vercel.app/",
  },
  {
    slug: "placeholder-06",
    name: "Working Title 06",
    category: "Marketplace",
    description:
      "Placeholder case study — two-sided marketplace with search, filtering, and seller onboarding.",
    tech: ["Next.js", "PostgreSQL", "Redis"],
    year: "2023",
    image: "/projects/placeholder-06.png",
  },
];
