import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import AnimatedLink from "@/components/AnimatedLink";
import LanguageToggle from "@/components/LanguageToggle";
import { posts } from "@/data/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPt = locale === "pt-br";
  return {
    title: "Blog",
    description: isPt
      ? "Escrita sobre software, produto e ofício por Martin Fantinelli."
      : "Writing on software, product and craft by Martin Fantinelli.",
  };
}

function formatDate(iso: string, locale: Locale) {
  return new Date(iso).toLocaleDateString(
    locale === "pt-br" ? "pt-BR" : "en-US",
    { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" },
  );
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const t = getDict(locale as Locale);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 py-10 md:px-8 md:py-16">
      {/* Header */}
      <header className="flex items-baseline justify-between border-b border-hairline pb-4">
        <Link
          href={`/${locale}`}
          className="font-mono text-[11px] font-medium uppercase tracking-label text-primary transition-colors duration-200 hover:text-foreground"
        >
          {t.blog.back}
        </Link>
        <div className="flex items-center gap-4">
          <LanguageToggle locale={locale as Locale} />
          <span className="font-mono text-[11px] font-medium uppercase tracking-label text-secondary">
            {t.blog.label}
          </span>
        </div>
      </header>

      {/* Intro */}
      <div className="mt-12 md:mt-16">
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-foreground">
          {t.blog.heading}
        </h1>
        <p className="mt-2 font-mono text-sm leading-relaxed text-secondary">
          {t.blog.subtitle}
        </p>
      </div>

      {/* Post list */}
      <ul className="mt-12 flex flex-col divide-y divide-hairline">
        {posts.map((post) => {
          const title = locale === "pt-br" && post.titlePt ? post.titlePt : post.title;
          const summary = locale === "pt-br" && post.summaryPt ? post.summaryPt : post.summary;
          const readingTime = locale === "pt-br" && post.readingTimePt ? post.readingTimePt : post.readingTime;

          return (
            <li key={post.slug}>
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="group flex flex-col gap-2 py-8"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-base font-semibold tracking-[-0.01em] text-foreground transition-colors duration-200 group-hover:text-primary">
                    {title}
                  </h2>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-label text-secondary">
                    {readingTime}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-secondary">{summary}</p>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-label text-secondary">
                    {formatDate(post.date, locale as Locale)}
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
          );
        })}
      </ul>

      {/* Footer */}
      <footer className="mt-auto border-t border-hairline pt-6">
        <div className="flex justify-between font-mono text-[11px] uppercase tracking-label">
          <AnimatedLink href={`/${locale}`}>← {t.post.home}</AnimatedLink>
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
