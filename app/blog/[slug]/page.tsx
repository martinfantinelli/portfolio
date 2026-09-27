import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Markdown, { type Components } from "react-markdown";
import AnimatedLink from "@/components/AnimatedLink";
import { posts } from "@/data/posts";

// Static params for all posts
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// Styled markdown elements — no typography plugin, just the site tokens.
const md: Components = {
  h1: (p) => <h2 className="mt-6 text-xl font-bold tracking-[-0.01em] text-foreground" {...p} />,
  h2: (p) => <h2 className="mt-6 text-lg font-bold tracking-[-0.01em] text-foreground" {...p} />,
  h3: (p) => <h3 className="mt-4 text-base font-semibold text-foreground" {...p} />,
  p: (p) => <p className="text-sm leading-[1.8] text-secondary" {...p} />,
  a: (p) => <a className="text-primary underline-offset-4 hover:underline" target="_blank" rel="noreferrer" {...p} />,
  strong: (p) => <strong className="font-semibold text-foreground" {...p} />,
  ul: (p) => <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm leading-[1.7] text-secondary marker:text-hairline" {...p} />,
  ol: (p) => <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-sm leading-[1.7] text-secondary" {...p} />,
  blockquote: (p) => <blockquote className="border-l-2 border-primary pl-4 [&_p]:italic" {...p} />,
  hr: () => <hr className="border-hairline" />,
  code: (p) => <code className="rounded-sm bg-card px-1 py-0.5 font-mono text-[0.85em] text-foreground" {...p} />,
  pre: (p) => (
    <pre
      className="overflow-x-auto rounded-sm border border-card-border bg-card p-4 font-mono text-xs leading-relaxed [&_code]:bg-transparent [&_code]:p-0"
      {...p}
    />
  ),
  // eslint-disable-next-line @next/next/no-img-element -- markdown images have no known size
  img: ({ alt, src }) => <img src={src as string} alt={alt ?? ""} loading="lazy" className="w-full rounded-sm border border-card-border" />,
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 py-10 md:px-8 md:py-16">
      {/* Header */}
      <header className="flex items-baseline justify-between border-b border-hairline pb-4">
        <AnimatedLink href="/blog">← Blog</AnimatedLink>
        <span className="font-mono text-[11px] font-medium uppercase tracking-label text-secondary">
          {post.readingTime}
        </span>
      </header>

      {/* Hero image */}
      {post.image && (
        <div className="mt-10 overflow-hidden rounded-sm border border-card-border">
          <Image
            src={post.image}
            alt={post.title}
            width={960}
            height={480}
            className="w-full object-cover"
            priority
          />
        </div>
      )}

      {/* Meta */}
      <div className="mt-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-label text-secondary">
            {formatDate(post.date)}
          </span>
          <span className="text-hairline">·</span>
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

        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.02em] text-foreground">
          {post.title}
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-secondary">
          {post.summary}
        </p>
      </div>

      {/* Divider */}
      <div className="mt-8 border-t border-hairline" />

      {/* Content */}
      <div className="mt-10 flex flex-col gap-5">
        <Markdown components={md}>
          {await readFile(path.join(process.cwd(), "content/blog", `${slug}.md`), "utf8")}
        </Markdown>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-hairline pt-6">
        <div className="flex justify-between font-mono text-[11px] uppercase tracking-label">
          <AnimatedLink href="/blog">← All posts</AnimatedLink>
          <AnimatedLink href="/">Home</AnimatedLink>
        </div>
      </footer>
    </main>
  );
}
