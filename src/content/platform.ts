import type { Maturity } from "./site";
import type { TechKey } from "./technologies";

export interface SurfaceDef {
  key: "farmer-app" | "tenant-portal";
  name: string;
  role: string;
  maturity: Maturity;
  question: string;
  description: string;
  screen: string;
  fact: string;
  capabilities: { text: string; fact: string }[];
  limits?: string[];
}

export const SURFACES: SurfaceDef[] = [
  {
    key: "farmer-app",
    name: "Farmer App",
    role: "The farmer's daily companion",
    maturity: "live",
    question: "What should I do on this land today?",
    description:
      "A complete digital companion for every farmer and every land, in 14 Indian languages, voice-first and offline-first: land mapping, Farm Today, a conversation for each land, Photo Scan, weather and satellite, a crop plan that adapts, market intelligence, schemes, services, community and farm economics.",
    screen: "farm-today",
    fact: "app.companion",
    capabilities: [
      { text: "14 Indian languages, voice onboarding and voice land capture.", fact: "app.languages" },
      { text: "Mobile number and PIN login.", fact: "app.login" },
      { text: "Offline-first PWA plus Android and iOS builds that sync when back online.", fact: "app.offline" },
      { text: "Land boundary mapping with automatic area, satellite thumbnail and land health score.", fact: "app.land" },
    ],
  },
  {
    key: "tenant-portal",
    name: "Partner Portal",
    role: "The partner organisation's operating layer",
    maturity: "live-limited",
    question: "How do I run my farmer network?",
    description:
      "For organisations that serve farmers: onboard your organisation, bring your farmers and their lands, configure your enabled capabilities, set your brand and manage the farmer ecosystem from one partner portal, all under your own name.",
    screen: "tenant-dashboard",
    fact: "tenant.portal",
    capabilities: [
      { text: "Partner onboarding, organisation setup, users, roles and permissions.", fact: "tenant.portal" },
      { text: "Farmer and land management, with crop monitoring, NDVI and soil-analysis surfaces.", fact: "tenant.portal" },
      { text: "Product catalog, dealer management, sales and order workflows where enabled.", fact: "tenant.portal" },
      { text: "Campaigns, notifications, messages and farmer communication tools.", fact: "tenant.portal" },
      { text: "Analytics, reports, performance views and proactive alerts.", fact: "tenant.portal" },
      { text: "White-label branding, appearance, localization, integrations and partner settings.", fact: "tenant.portal" },
    ],
    limits: ["Capabilities are enabled according to partner configuration and release maturity. The portal is not presented as a generic CRM, ERP or accounting replacement."],
  },
];

export interface ArchNode {
  id: string;
  kind: "surface" | "technology" | "foundation";
  label: string;
  purpose: string;
  maturity: Maturity;
  description: string;
  screen?: string;
  tech?: TechKey;
  fact: string;
}

export const ARCHITECTURE: ArchNode[] = [
  { id: "farmer-app", kind: "surface", label: "Farmer App", purpose: "The farmer's daily companion", maturity: "live", description: "Where a farmer talks to each land, sees what nature is doing, and knows what to do today.", screen: "farm-today", fact: "app.companion" },
  { id: "tenant-portal", kind: "surface", label: "Partner Portal", purpose: "Partner organisation's operating layer", maturity: "live-limited", description: "Where an FPO, dealer or agri-input company runs its branded farmer network.", screen: "tenant-dashboard", fact: "tenant.portal" },
  { id: "tatva", kind: "technology", tech: "tatva", label: "TATVA", purpose: "Understand what nature is doing", maturity: "live", description: "Sky, soil, water, temperature and weather, read for each land.", screen: "ndvi", fact: "tatva.ndvi" },
  { id: "pahra", kind: "technology", tech: "pahra", label: "PAHRA", purpose: "Know what is changing", maturity: "beta", description: "Land-specific alerts as conditions change; look, confirm, then decide.", screen: "alerts", fact: "pahra.daily-risk" },
  { id: "tarka", kind: "technology", tech: "tarka", label: "TARKA", purpose: "Talk to your land", maturity: "live-limited", description: "A conversation for each land, in your language, with practical guidance checked against expert-approved knowledge.", screen: "chat-marathi", fact: "tarka.chain" },
  { id: "riitu", kind: "technology", tech: "riitu", label: "RIITU", purpose: "A crop plan that adapts", maturity: "live-limited", description: "A stage-wise plan for each land that changes when nature does.", screen: "farm-today", fact: "riitu.farm-today" },
  { id: "rukh", kind: "technology", tech: "rukh", label: "RUKH", purpose: "Know the market around your crop", maturity: "live-limited", description: "Mandi prices, comparisons and a selling advisor.", screen: "market", fact: "rukh.prices" },
  { id: "foundation", kind: "foundation", label: "Shared foundation", purpose: "One governed knowledge base", maturity: "live", description: "Expert-reviewed guidance, land state and crop plans, shared by every partner's ecosystem.", fact: "platform.surfaces" },
];
