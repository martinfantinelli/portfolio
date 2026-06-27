import type { Metadata } from "next";
import "./globals.css";

// ponytail: troque para o dominio final do portfolio quando definir
const SITE_URL = "https://martinfantinelli.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Martin Fantinelli",
    template: "%s · Martin Fantinelli",
  },
  description:
    "Fullstack software engineer based in Porto Alegre, Brazil. Selected projects and writing.",
  openGraph: {
    title: "Martin Fantinelli",
    description:
      "Fullstack software engineer based in Porto Alegre, Brazil. Selected projects and writing.",
    url: SITE_URL,
    siteName: "Martin Fantinelli",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Martin Fantinelli",
    description:
      "Fullstack software engineer based in Porto Alegre, Brazil.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
