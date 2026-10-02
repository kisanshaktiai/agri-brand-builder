import React, { createContext, useContext, useMemo } from "react";
import { getContent, type Content } from "./content";

/**
 * Locale plumbing. English is the base; Marathi and Hindi override the same
 * content tree (src/i18n/mr.ts, src/i18n/hi.ts). The locale lives in the URL
 * prefix (/mr/…, /hi/…) so every page is prerendered in every language.
 */
export type Locale = "en" | "hi" | "mr";

export const LOCALES: { code: Locale; label: string; native: string; short: string; prefix: string; available: boolean }[] = [
  { code: "en", label: "English", native: "English", short: "EN", prefix: "", available: true },
  { code: "mr", label: "Marathi", native: "मराठी", short: "मरा", prefix: "/mr", available: true },
  { code: "hi", label: "Hindi", native: "हिन्दी", short: "हिं", prefix: "/hi", available: true },
];

export const localeFromPath = (pathname: string): Locale => {
  const m = pathname.match(/^\/(mr|hi)(\/|$)/);
  return (m ? m[1] : "en") as Locale;
};

/** Strips a locale prefix: "/mr/technology" → "/technology". */
export const stripLocale = (pathname: string) => pathname.replace(/^\/(mr|hi)(?=\/|$)/, "") || "/";

/** Adds the prefix for a locale: ("/technology", "mr") → "/mr/technology". */
export const localePath = (to: string, locale: Locale) => {
  if (/^https?:/.test(to)) return to;
  const prefix = LOCALES.find((l) => l.code === locale)?.prefix ?? "";
  const clean = stripLocale(to);
  return prefix ? `${prefix}${clean === "/" ? "" : clean}` || prefix : clean;
};

interface LocaleCtx {
  locale: Locale;
  dir: "ltr";
  content: Content;
  /** Build an in-site link for the current locale. */
  href: (to: string) => string;
}

const Ctx = createContext<LocaleCtx>({ locale: "en", dir: "ltr", content: getContent("en"), href: (t) => t });

export function LocaleProvider({ locale = "en", children }: { locale?: Locale; children: React.ReactNode }) {
  const value = useMemo<LocaleCtx>(() => ({ locale, dir: "ltr", content: getContent(locale), href: (to) => localePath(to, locale) }), [locale]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLocale = () => useContext(Ctx);
export const useContent = () => useContext(Ctx).content;
export const useT = () => useContext(Ctx).content.UI;
