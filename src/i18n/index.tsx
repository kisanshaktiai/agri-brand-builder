import React, { createContext, useContext } from "react";

/**
 * Minimal i18n scaffold. English is the only locale today; Hindi and Marathi
 * are the next phase. Content modules hold every string, so adding a locale
 * means adding a dictionary that mirrors them, not touching components.
 */
export type Locale = "en" | "hi" | "mr";

export const LOCALES: { code: Locale; label: string; available: boolean }[] = [
  { code: "en", label: "English", available: true },
  { code: "hi", label: "हिन्दी", available: false },
  { code: "mr", label: "मराठी", available: false },
];

interface LocaleCtx {
  locale: Locale;
  dir: "ltr";
}

const Ctx = createContext<LocaleCtx>({ locale: "en", dir: "ltr" });

export function LocaleProvider({ locale = "en", children }: { locale?: Locale; children: React.ReactNode }) {
  return <Ctx.Provider value={{ locale, dir: "ltr" }}>{children}</Ctx.Provider>;
}

export const useLocale = () => useContext(Ctx);
