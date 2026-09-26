import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const SITE_URL = "https://martinfantinelli.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPt = locale === "pt-br";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Martin Fantinelli",
      template: "%s · Martin Fantinelli",
    },
    description: isPt
      ? "Engenheiro de software fullstack baseado em Porto Alegre, Brasil. Projetos selecionados e escrita."
      : "Fullstack software engineer based in Porto Alegre, Brazil. Selected projects and writing.",
    openGraph: {
      title: "Martin Fantinelli",
      description: isPt
        ? "Engenheiro de software fullstack baseado em Porto Alegre, Brasil."
        : "Fullstack software engineer based in Porto Alegre, Brazil.",
      url: SITE_URL,
      siteName: "Martin Fantinelli",
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt-br" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return <>{children}</>;
}
