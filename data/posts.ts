export type Post = {
  slug: string; // body lives in content/blog/<slug>.md (PT: <slug>.pt.md)
  title: string;
  titlePt?: string;
  summary: string;
  summaryPt?: string;
  date: string; // ISO 8601
  readingTime: string;
  readingTimePt?: string;
  tags: string[];
  image?: string; // /blog/<file>
};

export const posts: Post[] = [
  {
    slug: "why-i-build-for-small-businesses",
    title: "Why I build for small businesses",
    titlePt: "Por que eu construo para pequenos negócios",
    summary:
      "Most dev tooling is built for scale. But the most interesting problems — and the fastest feedback loops — live in the long tail of small, specific, real businesses.",
    summaryPt:
      "A maioria das ferramentas de dev é feita para escala. Mas os problemas mais interessantes — e os loops de feedback mais rápidos — vivem na cauda longa dos pequenos negócios reais.",
    date: "2026-09-01",
    readingTime: "4 min read",
    readingTimePt: "4 min de leitura",
    tags: ["craft", "product", "startups"],
    image: "/blog/why-i-build-for-small-businesses.png",
  },
  {
    slug: "build-in-public-1",
    title: "Build in Public #1: Tech Stack Decisions for a Fintech Startup",
    titlePt: "Build in Public #1: Decisões de Stack para uma Startup Fintech",
    summary:
      "Honest analysis of each choice, performance benchmarks, financial context, detailed tradeoffs, and migration strategies for a fintech MVP.",
    summaryPt:
      "Análise honesta de cada escolha, benchmarks de performance, contexto financeiro, tradeoffs detalhados e estratégias de migração para um MVP fintech.",
    date: "2025-09-01",
    readingTime: "12 min read",
    readingTimePt: "12 min de leitura",
    tags: ["build in public", "fintech", "architecture"],
    image: "/blog/nami.jpg",
  },
  {
    slug: "heap-vs-stack",
    title: "Heap vs Stack",
    titlePt: "Heap vs Stack",
    summary:
      "What the heap and the stack are, how they differ, and how C, Java and Rust deal with memory management.",
    summaryPt:
      "O que são heap e stack, como diferem, e como C, Java e Rust lidam com o gerenciamento de memória.",
    date: "2025-08-05",
    readingTime: "4 min read",
    readingTimePt: "4 min de leitura",
    tags: ["fundamentals", "memory"],
  },
  {
    slug: "who-am-i",
    title: "Who am I",
    titlePt: "Quem sou eu",
    summary:
      "A quick introduction: who I am, what drives me, and what you're going to find here.",
    summaryPt:
      "Uma introdução rápida: quem sou, o que me motiva e o que você vai encontrar por aqui.",
    date: "2025-07-27",
    readingTime: "2 min read",
    readingTimePt: "2 min de leitura",
    tags: ["personal"],
  },
];
