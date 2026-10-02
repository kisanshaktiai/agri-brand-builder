/**
 * Site-wide constants. All copy lives in content modules so the site is
 * i18n-ready: the English dictionary is the default locale (see src/i18n).
 */
export const SITE_URL = "https://www.kisanshaktiai.in";
export const FARMER_APP_URL = "https://app.kisanshaktiai.in";
export const BRAND = "KisanShakti AI";
export const HOUSE_MARK = "KisanShakti";
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@kisanshaktiai";

export type Maturity = "live" | "live-limited" | "beta" | "planned";

export const MATURITY_LABEL: Record<Maturity, string> = {
  live: "Live",
  "live-limited": "Live, limited",
  beta: "Early access",
  planned: "Roadmap",
};

export const NAV = [
  { to: "/technology", label: "Technology" },
  { to: "/platform", label: "Platform" },
  { to: "/farmer-app", label: "Farmer App" },
  { to: "/enterprises", label: "For Partners" },
  { to: "/security", label: "Security & Governance" },
  { to: "/company", label: "Company" },
] as const;

export const CTA = {
  openApp: { label: "Open Farmer App", href: FARMER_APP_URL, event: "farmer_app_cta" },
  partner: { label: "Partner with us", to: "/contact", event: "partner_cta" },
  tenant: { label: "Become a partner", to: "/enterprises", event: "tenant_cta" },
} as const;

export const FOOTER = {
  statement: "A complete digital companion for every farmer and every land.",
  columns: [
    {
      title: "Product",
      links: [
        { to: "/technology", label: "Technology" },
        { to: "/platform", label: "Platform" },
        { to: "/farmer-app", label: "Farmer App" },
        { to: "/enterprises", label: "For Partners" },
        { to: "/security", label: "Security & Governance" },
      ],
    },
    {
      title: "Company",
      links: [
        { to: "/company", label: "About" },
        { to: "/founder", label: "Founder" },
        { to: "/company/investors", label: "Investors & Press" },
        { to: "/contact", label: "Contact" },
      ],
    },
  ],
  legal: "Bootstrapped and built in Maharashtra, India.",
};
