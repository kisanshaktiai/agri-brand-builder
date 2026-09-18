/**
 * Single source of truth for the /founder page.
 * Content only — presentation components read from this module and never hold copy.
 */

export type BrandKey = "kisanshakti" | "aptech" | "learnixa";

export interface Brand {
  key: BrandKey;
  name: string;
  tagline: string;
  description: string;
  url: string;
  urlLabel: string;
  /** Path under /public. Optional — nothing is rendered if the file is missing. */
  logo?: string;
}

export interface PhoneNumber {
  label: string;
  display: string;
  /** E.164 with country code — used for tel:, wa.me and the vCard */
  e164: string;
  whatsapp: boolean;
}

export interface EmailAddress {
  label: string;
  address: string;
}

export interface PostalAddress {
  label: string;
  lines: string[];
  full: string;
  mapQuery: string;
}

export interface TechModule {
  acronym: string;
  expansion: string;
  category: string;
}

export interface SocialLink {
  /** linkedin | x | instagram | youtube | facebook — drives the icon */
  key: string;
  label: string;
  handle: string;
  url: string;
}

export interface FounderProfile {
  name: string;
  title: string;
  slug: string;
  summary: string;
  /** Path under /public. Optional — the hero renders without it. */
  portrait?: string;
  brands: Brand[];
  phones: PhoneNumber[];
  emails: EmailAddress[];
  addresses: PostalAddress[];
  socials: SocialLink[];
  techFamily: {
    heading: string;
    intro: string;
    modules: TechModule[];
  };
}

export const founderProfile: FounderProfile = {
  name: "Amarsinh Patil",
  title: "Founder",
  slug: "/founder",
  summary: `25+ Years in Technology, Computer Education & Digital Innovation

• Founded Aptech Computers — building a computer education journey since 2001
• Founder ApTech LearniXa — a digital learning & online test platform
• Founder, Innovator KisanShakti AI — an AI platform focused on farmers & agriculture
• 25+ years of hands-on experience in technology, education & entrepreneurship

25 Years of Teaching Technology. Now Building AI for Agriculture.`,
  portrait: "/founder-assets/amar-patil.jpg",
  brands: [
    {
      key: "kisanshakti",
      name: "KisanShakti AI",
      tagline: "Intelligent AI guru for farmers",
      description: "Agricultural intelligence platform for farmers.",
      url: "https://www.kisanshaktiai.in",
      urlLabel: "kisanshaktiai.in",
      logo: "/brands/kisanshakti.png",
    },
    {
      key: "aptech",
      name: "AP-TECH",
      tagline: "रहा अग्रेसर सदैव..!",
      description: "Technology and skilling initiative.",
      url: "https://www.aptechskill.in",
      urlLabel: "aptechskill.in",
      logo: "/brands/aptech.png",
    },
    {
      key: "learnixa",
      name: "LearniXa",
      tagline: "Learn today, lead tomorrow",
      description: "Learning platform.",
      url: "https://www.learnixa.in",
      urlLabel: "learnixa.in",
      logo: "/brands/learnixa.png",
    },
  ],
  phones: [
    { label: "Personal", display: "+91 98609 89495", e164: "+919860989495", whatsapp: true },
    { label: "Office", display: "+91 89839 89495", e164: "+918983989495", whatsapp: false },
  ],
  emails: [
    { label: "Personal", address: "amarsinhp@gmail.com" },
    { label: "KisanShakti AI", address: "admin@kisanshaktiai.in" },
  ],
  addresses: [
    {
      label: "Office",
      lines: ["Ap-Tech, Main Road, Bambawade", "Tal - Shahuwadi, Dist- Kolhapur", "Maharashtra, India - 416213"],
      full: "Ap-Tech, Main Road, Bambawade, Tal - Shahuwadi, Dist- Kolhapur, Maharashtra, India - 416213",
      mapQuery: "Ap-Tech, Main Road, Bambawade, Tal - Shahuwadi, Dist- Kolhapur, Maharashtra, India - 416213",
    },
  ],
  // Add real profile URLs here. While this list is empty the Connect block is
  // not rendered at all, and nothing is added to the vCard or the JSON-LD.
  socials: [],
  techFamily: {
    heading: "The KisanShakti AI technology family",
    intro: "Five intelligence layers behind the farmer app.",
    modules: [
      {
        acronym: "TARKA",
        expansion: "Trusted Agricultural Reasoning & Knowledge Architecture",
        category: "Neuro-symbolic AI reasoning",
      },
      {
        acronym: "TATVA",
        expansion: "Terrain, Atmosphere, Thermal & Vegetation Analytics",
        category: "Multimodal AI land-state intelligence",
      },
      {
        acronym: "RIITU",
        expansion: "Responsive Intelligence for Integrated Temporal Agriculture",
        category: "Adaptive AI prescription",
      },
      {
        acronym: "PAHRA",
        expansion: "Proactive Agricultural Hazard & Risk Assessment",
        category: "Predictive AI risk intelligence",
      },
      {
        acronym: "RUKH",
        expansion: "Regional Understanding, Knowledge & Harvest",
        category: "Predictive AI market intelligence",
      },
    ],
  },
};

/** Canonical public address of this page. Used for QR, share and meta tags. */
export const FOUNDER_URL = "https://www.kisanshaktiai.in/founder";

/** Absolute URL of the link-preview image used by WhatsApp and LinkedIn. */
export const FOUNDER_OG_IMAGE = "https://www.kisanshaktiai.in/founder-assets/og-founder.jpg";

/** RFC 6350 vCard, generated entirely client-side from the data above. */
export function buildVCard(p: FounderProfile = founderProfile): string {
  const [first, ...rest] = p.name.split(" ");
  const last = rest.join(" ");
  const esc = (value: string) => value.replace(/,/g, "\\,");

  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${last};${first};;;`,
    `FN:${p.name}`,
    `ORG:${p.brands.map((b) => b.name).join(" | ")}`,
    `TITLE:${p.title}`,
    ...p.phones.map((ph) => `TEL;TYPE=${ph.label.toLowerCase() === "office" ? "WORK,VOICE" : "CELL,VOICE"}:${ph.e164}`),
    ...p.emails.map((e) => `EMAIL;TYPE=INTERNET:${e.address}`),
    ...p.addresses.map((a) => `ADR;TYPE=${a.label.toLowerCase() === "office" ? "WORK" : "HOME"}:;;${esc(a.full)};;;;`),
    `URL:${FOUNDER_URL}`,
    ...p.brands.map((b) => `URL:${b.url}`),
    ...p.socials.map((s) => `X-SOCIALPROFILE;TYPE=${s.key}:${s.url}`),
    `NOTE:${esc(p.brands.map((b) => `${b.name} — ${b.tagline}`).join(" | "))}`,
    "END:VCARD",
  ].join("\r\n");
}
