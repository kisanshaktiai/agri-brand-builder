import * as pages from "@/content/pages";
import { TECHNOLOGIES, HIERARCHY, ARC, FAMILY_ORDER } from "@/content/technologies";
import { SURFACES, ARCHITECTURE } from "@/content/platform";
import { TRUST_STEPS, TRUST_OWNERS } from "@/content/trust";
import { TENANT_EXAMPLES } from "@/content/tenants";
import { NAV, CTA, FOOTER, MATURITY_LABEL } from "@/content/site";
import { UI } from "./ui";
import type { Locale } from "./index";

/** The full English content tree. Locale files override any subset of it. */
export const BASE = {
  HOME: pages.HOME,
  TECHNOLOGY_PAGE: pages.TECHNOLOGY_PAGE,
  PLATFORM_PAGE: pages.PLATFORM_PAGE,
  FARMER_APP_PAGE: pages.FARMER_APP_PAGE,
  ENTERPRISES_PAGE: pages.ENTERPRISES_PAGE,
  SECURITY_PAGE: pages.SECURITY_PAGE,
  COMPANY_PAGE: pages.COMPANY_PAGE,
  INVESTORS_PAGE: pages.INVESTORS_PAGE,
  CONTACT_PAGE: pages.CONTACT_PAGE,
  NOT_FOUND: pages.NOT_FOUND,
  TECHNOLOGIES,
  HIERARCHY,
  ARC,
  FAMILY_ORDER,
  SURFACES,
  ARCHITECTURE,
  TRUST_STEPS,
  TRUST_OWNERS,
  TENANT_EXAMPLES,
  NAV,
  CTA,
  FOOTER,
  MATURITY_LABEL,
  UI,
};
export type Content = typeof BASE;

type DeepPartial<T> = T extends string ? string : T extends readonly (infer U)[] ? DeepPartial<U>[] : T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;
export type ContentOverride = DeepPartial<Content>;

/** Arrays merge element-wise (translations keep structure and ids); objects merge by key. */
export function merge<T>(base: T, over: DeepPartial<T> | undefined): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base)) return base.map((item, i) => merge(item, (over as unknown[])[i] as DeepPartial<typeof item>)) as unknown as T;
  if (typeof base === "object" && base !== null) {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [k, v] of Object.entries(over as Record<string, unknown>)) out[k] = merge((base as Record<string, unknown>)[k], v as never);
    return out as T;
  }
  return (over as unknown as T) ?? base;
}

const cache = new Map<Locale, Content>();
const loaders: Record<Locale, (() => ContentOverride) | null> = { en: null, mr: null, hi: null };

export function registerLocale(locale: Locale, loader: () => ContentOverride) {
  loaders[locale] = loader;
  cache.delete(locale);
}

export function getContent(locale: Locale): Content {
  if (locale === "en" || !loaders[locale]) return BASE;
  let c = cache.get(locale);
  if (!c) {
    c = merge(BASE, loaders[locale]!());
    cache.set(locale, c);
  }
  return c;
}
