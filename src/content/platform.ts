import type { Maturity } from "./site";
import type { TechKey } from "./technologies";

export interface SurfaceDef {
  key: "farmer-app" | "tenant-portal" | "admin-portal";
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
    role: "The farmer's daily operating layer",
    maturity: "live",
    question: "What should I do today?",
    description:
      "One intelligent farm companion in 14 languages, voice-first and offline-first, with land mapping, Farm Today, chat, weather, satellite, market, community, videos, schemes, soil health, alerts, growth tracking and analytics.",
    screen: "farm-today",
    fact: "app.companion",
    capabilities: [
      { text: "14 languages, voice onboarding and voice land capture.", fact: "app.languages" },
      { text: "Mobile number and PIN login.", fact: "app.login" },
      { text: "Offline-first PWA plus Android and iOS builds that sync when back online.", fact: "app.offline" },
      { text: "Land boundary mapping with automatic area, satellite thumbnail and land health score.", fact: "app.land" },
    ],
  },
  {
    key: "tenant-portal",
    name: "Tenant SaaS Portal",
    role: "The organisation's operating layer",
    maturity: "live-limited",
    question: "How do I run my farmer network?",
    description:
      "For FPOs, dealers, agri-input companies and agricultural enterprises: onboard the organisation, manage farmers and their lands, set the brand, and follow farmer activity, all under the organisation's own context.",
    screen: "tenant-dashboard",
    fact: "tenant.portal",
    capabilities: [
      { text: "Tenant onboarding and farmer management.", fact: "tenant.portal" },
      { text: "Land management and farmer activity.", fact: "tenant.portal" },
      { text: "Tenant branding: the farmer experience runs under your name and colours.", fact: "tenant.portal" },
    ],
    limits: ["Not a CRM, ERP, accounting or sales-force system."],
  },
  {
    key: "admin-portal",
    name: "SaaS Admin Portal",
    role: "The control plane that governs the platform's intelligence",
    maturity: "live",
    question: "How is the platform governed?",
    description:
      "Tenant and user management, agronomy masters for crops, varieties, companies and products, governance of the advisory knowledge base, and monitoring across tenants.",
    screen: "admin-rules",
    fact: "admin.portal",
    capabilities: [
      { text: "Tenant and user management.", fact: "admin.portal" },
      { text: "Agronomy masters: crops, varieties, companies, products.", fact: "admin.portal" },
      { text: "Governance of the advisory knowledge base: what is approved, what is under review, and where it comes from.", fact: "admin.portal" },
      { text: "Monitoring.", fact: "admin.portal" },
    ],
    limits: ["The governance layer, not another farmer app."],
  },
];

/** Nodes of the interactive architecture diagram. */
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
  { id: "farmer-app", kind: "surface", label: "Farmer App", purpose: "Farmer's daily operating layer", maturity: "live", description: "Where a farmer asks, records, is reminded and decides.", screen: "farm-today", fact: "app.companion" },
  { id: "tenant-portal", kind: "surface", label: "Tenant SaaS Portal", purpose: "Organisation's operating layer", maturity: "live-limited", description: "Where an FPO, dealer or agri-input company runs its branded farmer network.", screen: "tenant-dashboard", fact: "tenant.portal" },
  { id: "admin-portal", kind: "surface", label: "SaaS Admin Portal", purpose: "Governance control plane", maturity: "live", description: "Where tenants, agronomy masters and the advisory knowledge base are governed and monitored.", screen: "admin-rules", fact: "admin.portal" },
  { id: "tatva", kind: "technology", tech: "tatva", label: "TATVA", purpose: "Land-state intelligence", maturity: "live", description: "Weather, satellite NDVI and water balance for each land.", screen: "ndvi", fact: "tatva.ndvi" },
  { id: "tarka", kind: "technology", tech: "tarka", label: "TARKA", purpose: "Decision intelligence", maturity: "live-limited", description: "Checks every answer against the field, the crop's stage and expert-approved guidance. AI explains; it never invents a dose.", screen: "chat-marathi", fact: "tarka.chain" },
  { id: "riitu", kind: "technology", tech: "riitu", label: "RIITU", purpose: "Crop scheduling", maturity: "live-limited", description: "A living crop schedule, updated every night into Farm Today.", screen: "farm-today", fact: "riitu.farm-today" },
  { id: "pahra", kind: "technology", tech: "pahra", label: "PAHRA", purpose: "Farm-risk intelligence", maturity: "beta", description: "Daily pest, disease and weather risk; scout, confirm, then decide.", screen: "alerts", fact: "pahra.daily-risk" },
  { id: "rukh", kind: "technology", tech: "rukh", label: "RUKH", purpose: "Market intelligence", maturity: "live-limited", description: "Mandi prices, comparisons and a selling advisor.", screen: "market", fact: "rukh.prices" },
  { id: "foundation", kind: "foundation", label: "Shared data foundation", purpose: "One governed knowledge base", maturity: "live", description: "Expert-reviewed guidance, land state and crop schedules, shared by every tenant's ecosystem.", fact: "platform.surfaces" },
];
