export const locales = ["en", "pt-br"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isValidLocale(l: unknown): l is Locale {
  return locales.includes(l as Locale);
}

// ─── Dictionary ───────────────────────────────────────────────────────────────

export const dict = {
  en: {
    // Hero
    hero: {
      role: "// fullstack software engineer",
      tagline: "Building fast, reliable products for teams that ship. Based in Porto Alegre, Brazil — working with clients worldwide.",
      scroll: "Scroll",
      location: "Porto Alegre, BR",
    },
    // Nav
    nav: {
      projects: "Projects",
      blog: "Blog",
    },
    // Projects section
    projects: {
      label: "// selected work",
      heading: "Projects",
    },
    // Footer
    footer: {
      getInTouch: "Get in touch",
      top: "↑ Top",
    },
    // Blog list
    blog: {
      heading: "Writing",
      subtitle: "On software, product and the craft of building things that work.",
      back: "← Martin Fantinelli",
      label: "Blog",
    },
    // Blog post
    post: {
      backToBlog: "← Blog",
      allPosts: "← All posts",
      home: "Home",
    },
  },

  "pt-br": {
    // Hero
    hero: {
      role: "// engenheiro de software fullstack",
      tagline: "Construindo produtos rápidos e confiáveis para times que entregam. Baseado em Porto Alegre, Brasil — atendendo clientes no mundo todo.",
      scroll: "Rolar",
      location: "Porto Alegre, BR",
    },
    // Nav
    nav: {
      projects: "Projetos",
      blog: "Blog",
    },
    // Projects section
    projects: {
      label: "// trabalhos selecionados",
      heading: "Projetos",
    },
    // Footer
    footer: {
      getInTouch: "Entre em contato",
      top: "↑ Topo",
    },
    // Blog list
    blog: {
      heading: "Escrita",
      subtitle: "Sobre software, produto e o ofício de construir coisas que funcionam.",
      back: "← Martin Fantinelli",
      label: "Blog",
    },
    // Blog post
    post: {
      backToBlog: "← Blog",
      allPosts: "← Todos os posts",
      home: "Início",
    },
  },
} as const;

export type Dict = typeof dict[Locale];

export function getDict(locale: Locale): Dict {
  return dict[locale];
}

/** Strips locale prefix from a pathname, e.g. /en/blog → /blog */
export function stripLocale(pathname: string): string {
  for (const l of locales) {
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) {
      return pathname.slice(l.length + 1) || "/";
    }
  }
  return pathname;
}

/** Returns the same path but with a different locale prefix */
export function switchLocale(pathname: string, next: Locale): string {
  return `/${next}${stripLocale(pathname)}`;
}
