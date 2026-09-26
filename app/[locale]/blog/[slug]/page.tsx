import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Markdown, { type Components } from "react-markdown";
import { isValidLocale, getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import AnimatedLink from "@/components/AnimatedLink";
import LanguageToggle from "@/components/LanguageToggle";
import { posts } from "@/data/posts";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["en", "pt-br"]) {
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  const isPt = locale === "pt-br";
  return {
    title: isPt && post.titlePt ? post.titlePt : post.title,
    description: isPt && post.summaryPt ? post.summaryPt : post.summary,
  };
}

function formatDate(iso: string, locale: Locale) {
  return new Date(iso).toLocaleDateString(
    locale === "pt-br" ? "pt-BR" : "en-US",
    { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" },
  );
}

// Styled markdown components — uses site design tokens
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
    <pre className="overflow-x-auto rounded-sm border border-card-border bg-card p-4 font-mono text-xs leading-relaxed [&_code]:bg-transparent [&_code]:p-0" {...p} />
  ),
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ alt, src }) => <img src={src as string} alt={alt ?? ""} loading="lazy" className="w-full rounded-sm border border-card-border" />,
};

async function getContent(slug: string, locale: Locale): Promise<string> {
  const base = path.join(process.cwd(), "content/blog");
  // Try locale-specific file first (e.g. heap-vs-stack.pt.md), fall back to base
  if (locale === "pt-br") {
    try {
      return await readFile(path.join(base, `${slug}.pt.md`), "utf8");
    } catch {
      // fall through to EN
    }
  }
  return readFile(path.join(base, `${slug}.md`), "utf8");
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const t = getDict(locale as Locale);
  const title = locale === "pt-br" && post.titlePt ? post.titlePt : post.title;
  const summary = locale === "pt-br" && post.summaryPt ? post.summaryPt : post.summary;
  const readingTime = locale === "pt-br" && post.readingTimePt ? post.readingTimePt : post.readingTime;
  const content = await getContent(slug, locale as Locale);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 py-10 md:px-8 md:py-16">
      {/* Header */}
      <header className="flex items-baseline justify-between border-b border-hairline pb-4">
        <AnimatedLink href={`/${locale}/blog`}>{t.post.backToBlog}</AnimatedLink>
        <div className="flex items-center gap-4">
          <LanguageToggle locale={locale as Locale} />
          <span className="font-mono text-[11px] font-medium uppercase tracking-label text-secondary">
            {readingTime}
          </span>
        </div>
      </header>

      {/* Hero image */}
      {post.image && (
        <div className="mt-10 overflow-hidden rounded-sm border border-card-border">
          <Image
            src={post.image}
            alt={title}
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
            {formatDate(post.date, locale as Locale)}
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
          {title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-secondary">{summary}</p>
      </div>

      {/* Divider */}
      <div className="mt-8 border-t border-hairline" />

      {/* Content */}
      <div className="mt-10 flex flex-col gap-5">
        <Markdown components={md}>{content}</Markdown>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-hairline pt-6">
        <div className="flex justify-between font-mono text-[11px] uppercase tracking-label">
          <AnimatedLink href={`/${locale}/blog`}>{t.post.allPosts}</AnimatedLink>
          <AnimatedLink href={`/${locale}`}>{t.post.home}</AnimatedLink>
        </div>
      </footer>
    </main>
  );
}
