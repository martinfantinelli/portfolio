export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO 8601
  readingTime: string; // e.g. "4 min read"
  tags: string[];
  content: string; // markdown-ish plain text for now
  image?: string; // /blog/<slug>.png
};

export const posts: Post[] = [
  {
    slug: "why-i-build-for-small-businesses",
    title: "Why I build for small businesses",
    summary:
      "Most dev tooling is built for scale. But the most interesting problems — and the fastest feedback loops — live in the long tail of small, specific, real businesses.",
    date: "2025-09-01",
    readingTime: "4 min read",
    tags: ["craft", "product", "startups"],
    image: "/blog/why-i-build-for-small-businesses.png",
    content: `There's a certain kind of problem I keep being drawn to.

It's not the distributed systems problem, or the billion-user scale problem. It's the "we're doing this in a spreadsheet and it's killing us" problem.

The cookie shop that loses 30% of orders because WhatsApp messages fall through the cracks. The accounting firm that spends two hours per client manually verifying crypto wallets. The vet clinic that has no web presence at all, so people don't know they're open at 3am.

These aren't glamorous problems. They don't make it onto Hacker News. But they're real, the feedback loop from "I built this" to "this saved me hours today" is measured in days, not quarters — and there's something deeply satisfying about that.

## The long tail is underserved

Most software is built either for consumers at massive scale or for enterprises with procurement processes. The small business in the middle — the one with 3 to 30 people, real revenue, and zero engineering capacity — gets the leftovers.

They get SaaS tools that are 80% of what they need with 20% that's wrong for them. They get no-code tools that break the moment their workflow is slightly non-standard. They get agencies that build something, disappear, and leave them with code nobody can touch.

What they rarely get is a developer who actually understands their operation and builds something that fits it exactly.

## Fast feedback changes how you build

When your client is a small business owner who uses what you build every day, the feedback is immediate and unambiguous. There's no product manager between you and the person with the problem. No sprint planning. No OKR alignment.

You ship something on Tuesday. By Thursday you know if it worked.

That compression of feedback changes how you make decisions. You stop optimizing for elegance and start optimizing for usefulness. You ask "does this save them time today?" before you ask anything else.

## It compounds

The other thing about building for small businesses: every project teaches you something transferable.

The ordering system I built for a cookie shop taught me more about checkout UX than any case study. The crypto wallet verifier taught me on-chain proof patterns I now use in fintech work. The vet clinic site forced me to think seriously about local SEO and trust signals.

None of it is glamorous. All of it compounds.

That's why I keep coming back to it.`,
  },
];
