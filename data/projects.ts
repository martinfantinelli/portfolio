// Vitrine curada. Semeada com repos publicos reais de github.com/martinfantinelli.
// Edite a vontade: remova os fracos, adicione proventa/lain se forem publicos.
export type Project = {
  name: string;
  description: string;
  tech: string[];
  href: string; // repo ou live
  live?: string; // url de demo, se houver
  year?: string;
};

export const projects: Project[] = [
  {
    name: "Proventa",
    description:
      "Web3 accounting SaaS. On-chain wallet ownership proof and auditable movement reports with CSV and PDF export.",
    tech: ["Next.js", "TypeScript", "Drizzle", "viem / wagmi"],
    href: "https://github.com/martinfantinelli/proventa",
    live: "https://proventa-bay.vercel.app",
  },
  {
    name: "iFood Product Crawler",
    description:
      "Resilient, scalable crawler for iFood product data. Pluggable fetcher, retry/backoff, checkpointing, tested.",
    tech: ["Node.js", "JavaScript"],
    href: "https://github.com/martinfantinelli/ifood-product-crawler",
  },
  {
    name: "Nutallo",
    description: "Landing page, shipped on Vercel.",
    tech: ["JavaScript"],
    href: "https://github.com/martinfantinelli/nutallo-lp",
    live: "https://nutallo.vercel.app",
  },
  {
    name: "Pomodoro",
    description: "Simple pomodoro timer built for studies and work.",
    tech: ["Java"],
    href: "https://github.com/martinfantinelli/Pomodoro",
  },
  {
    name: "Blog",
    description:
      "Writing on software engineering. Building in public, heap vs stack, and notes from the work.",
    tech: ["Hugo"],
    href: "https://martinfantinelli.dev",
    live: "https://martinfantinelli.dev",
  },
];
