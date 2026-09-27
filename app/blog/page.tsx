import type { Metadata } from "next";
import Link from "next/link";
import AnimatedLink from "@/components/AnimatedLink";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on software, product and craft by Martin Fantinelli.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 py-10 md:px-8 md:py-16">
      {/* Header */}
      <header className="flex items-baseline justify-between border-b border-hairline pb-4">
        <Link
          href="/"
          className="font-mono text-[11px] font-medium uppercase tracking-label text-primary transition-colors duration-200 hover:text-foreground"
        >
          ← Martin Fantinelli
        </Link>
        <span className="font-mono text-[11px] font-medium uppercase tracking-label text-secondary">
          Blog
        </span>
      </header>

      {/* Intro */}
      <div className="mt-12 md:mt-16">
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-foreground">
          Writing
        </h1>
        <p className="mt-2 font-mono text-sm leading-relaxed text-secondary">
          On software, product and the craft of building things that work.
        </p>
      </div>

      {/* Post list */}
      <ul className="mt-12 flex flex-col divide-y divide-hairline">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-2 py-8 transition-colors duration-200 hover:text-foreground"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-base font-semibold tracking-[-0.01em] text-foreground transition-colors duration-200 group-hover:text-primary">
                  {post.title}
                </h2>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-label text-secondary">
                  {post.readingTime}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-secondary">
                {post.summary}
              </p>

              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-label text-secondary">
                  {formatDate(post.date)}
                </span>
                <ul className="flex gap-2">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-sm border border-hairline px-2 py-0.5 font-mono text-[10px] uppercase tracking-label text-secondary"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <footer className="mt-auto border-t border-hairline pt-6">
        <div className="flex justify-between font-mono text-[11px] uppercase tracking-label">
          <AnimatedLink href="/">← Home</AnimatedLink>
          <a
            href="https://github.com/martinfantinelli"
            target="_blank"
            rel="noreferrer"
            className="text-secondary transition-colors duration-200 hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}
