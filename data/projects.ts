// Vitrine curada.
//
// PLACEHOLDER DATA: every entry below is a mock case study used to design
// and preview the "Selected work" section. Replace each one with a real
// project (name, description, tags, year, cover image under /public/projects,
// and links) when that content is ready — the shape of `Project` stays the
// same, so swapping content is a drop-in edit here.
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
    slug: "placeholder-01",
    name: "Working Title 01",
    category: "Fintech dashboard",
    description:
      "Placeholder case study — real-time analytics dashboard with anomaly detection and exportable reports.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    year: "2025",
    image: "/projects/placeholder-01.png",
  },
  {
    slug: "placeholder-02",
    name: "Working Title 02",
    category: "Mobile commerce",
    description:
      "Placeholder case study — mobile-first storefront with a streamlined checkout and inventory sync.",
    tech: ["React Native", "Node.js", "Stripe"],
    year: "2025",
    image: "/projects/placeholder-02.png",
  },
  {
    slug: "placeholder-03",
    name: "Working Title 03",
    category: "SaaS platform",
    description:
      "Placeholder case study — multi-tenant workspace tooling with role-based access and audit trails.",
    tech: ["Next.js", "Drizzle", "TailwindCSS"],
    year: "2024",
    image: "/projects/placeholder-03.png",
  },
  {
    slug: "placeholder-04",
    name: "Working Title 04",
    category: "Brand & web",
    description:
      "Placeholder case study — identity system and marketing site built for a fast-moving launch.",
    tech: ["Next.js", "Framer Motion", "TailwindCSS"],
    year: "2024",
    image: "/projects/placeholder-04.png",
  },
  {
    slug: "placeholder-05",
    name: "Working Title 05",
    category: "Data visualization",
    description:
      "Placeholder case study — interactive network graph for exploring large relational datasets.",
    tech: ["TypeScript", "Canvas", "D3.js"],
    year: "2024",
    image: "/projects/placeholder-05.png",
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
