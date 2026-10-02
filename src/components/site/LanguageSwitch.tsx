import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOCALES, localePath, stripLocale, useLocale } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Language switch: a segmented pill with a sliding highlight. Switching keeps
 * the current page and moves the locale prefix in the URL; the page content
 * crossfades (see .ks-locale-in in SiteLayout). Works without JavaScript as
 * plain links to the localised URLs.
 */
export function LanguageSwitch({ size = "md", className, compact = false }: { size?: "md" | "lg"; className?: string; compact?: boolean }) {
  const { locale, content } = useLocale();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const idx = Math.max(0, LOCALES.findIndex((l) => l.code === locale));
  const [pulse, setPulse] = useState(false);
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, code: (typeof LOCALES)[number]["code"]) => {
    e.preventDefault();
    if (code === locale) return;
    setPulse(true);
    timer.current = window.setTimeout(() => setPulse(false), 500);
    navigate(localePath(stripLocale(pathname), code) + hash, { replace: false });
    try {
      localStorage.setItem("ks-locale", code);
    } catch {
      /* ignore */
    }
  };

  return (
    <nav aria-label={content.UI.language} className={cn("relative inline-grid grid-cols-3 rounded-full border border-ks-line bg-ks-white/70 p-0.5 backdrop-blur-sm", size === "lg" ? "w-full text-base" : "text-[0.8125rem]", pulse && "ks-lang-pulse", className)}>
      <span aria-hidden className="ks-lang-thumb absolute bottom-0.5 top-0.5 rounded-full bg-ks-ink" style={{ left: `calc(0.125rem + ${idx} * ((100% - 0.25rem) / 3))`, width: "calc((100% - 0.25rem) / 3)" }} />
      {LOCALES.map((l) => (
        <a
          key={l.code}
          href={localePath(stripLocale(pathname), l.code)}
          hrefLang={l.code}
          lang={l.code}
          aria-current={l.code === locale ? "true" : undefined}
          onClick={(e) => go(e, l.code)}
          className={cn("relative z-10 flex items-center justify-center rounded-full font-medium transition-colors duration-300", compact ? "h-8 px-2" : "px-3", size === "lg" ? "h-11" : "h-8", l.code === locale ? "text-ks-paper" : "text-ks-ink-2 hover:text-ks-ink")}
          title={l.native}
        >
          {compact ? l.short : l.native}
        </a>
      ))}
    </nav>
  );
}
