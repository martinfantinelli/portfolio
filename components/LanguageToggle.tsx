"use client";

import { usePathname, useRouter } from "next/navigation";
import { switchLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

interface LanguageToggleProps {
  locale: Locale;
  className?: string;
}

export default function LanguageToggle({ locale, className = "" }: LanguageToggleProps) {
  const pathname = usePathname();
  const router = useRouter();

  const next: Locale = locale === "en" ? "pt-br" : "en";
  const label = locale === "en" ? "PT" : "EN";

  const handleToggle = () => {
    router.push(switchLocale(pathname, next));
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={`Switch to ${next === "en" ? "English" : "Português"}`}
      className={`font-mono text-[11px] font-medium uppercase tracking-label text-white/50 transition-colors duration-200 hover:text-white ${className}`}
    >
      {label}
    </button>
  );
}
