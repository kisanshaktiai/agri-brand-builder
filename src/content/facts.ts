import type { Maturity } from "./site";

/**
 * The only source of product claims. Every product statement on the site
 * carries a fact id that resolves here; scripts/qa-claims-audit.mjs maps
 * each statement to its fact and maturity label.
 */
export interface Fact {
  id: string;
  area: string;
  maturity: Maturity;
  statement: string;
  /** Limits that copy must keep when the fact is "live-limited" or "beta". */
  limits?: string[];
  /** Words the copy must never use for this fact. */
  forbidden?: string[];
}

export const FACTS: Fact[] = [
  // Platform
  { id: "platform.surfaces", area: "Platform", maturity: "live", statement: "Three connected surfaces on one shared data foundation: the Farmer App, the Tenant SaaS Portal and the SaaS Admin Portal." },
  { id: "platform.separation", area: "Platform", maturity: "live", statement: "Language intelligence and decision intelligence are separate. The language model understands, canonicalises and explains; the Decision Brain decides. The language model never decides doses, quantities or timing." },
  { id: "platform.multi-tenant", area: "Platform", maturity: "live-limited", statement: "White-label, multi-tenant SaaS: shared governed intelligence underneath; organisations run their own branded farmer ecosystems on top.", limits: ["Tenants run under their own context and brand. They do not receive or fork source code."] },
  { id: "platform.commercial", area: "Commercial", maturity: "live", statement: "Sold to organisations, not directly to farmers. No farmer plans or prices are shown.", forbidden: ["per farmer", "₹/month"] },

  // Farmer App
  { id: "app.languages", area: "Farmer App", maturity: "live", statement: "14 languages." },
  { id: "app.voice", area: "Farmer App", maturity: "live", statement: "Voice-first, with voice onboarding and voice land capture." },
  { id: "app.login", area: "Farmer App", maturity: "live", statement: "Mobile number and PIN login." },
  { id: "app.offline", area: "Farmer App", maturity: "live", statement: "Offline-first PWA plus Android and iOS builds that work on weak networks and sync when back online." },
  { id: "app.land", area: "Farmer App", maturity: "live", statement: "Land boundary mapping with automatic area, plus season, crop, variety, sowing date and cultivation method, a satellite thumbnail and a land health score." },
  { id: "app.companion", area: "Farmer App", maturity: "live", statement: "AI chat with photo capture, InstaScan, crop schedule, Farm Today, weather, satellite, market, community, videos, government schemes, soil health, proactive alerts, growth tracking and farm analytics." },
  { id: "app.analytics", area: "Farm Analytics", maturity: "live-limited", statement: "Total area, active crops, projected revenue and projected profit, plus Crop & Stage, Financial, Market Pulse, Soil Health, Task Performance, Water & Weather and Smart Recommendations.", limits: ["Projections come from logged expenses and expected yield multiplied by the current market price, and every projection carries a projection notice."], forbidden: ["guaranteed"] },
  { id: "app.community", area: "Community", maturity: "live", statement: "Farmer feed, photos, comments, groups and group chat, trending topics, moderation, local-language posts and read-aloud." },
  { id: "app.videos", area: "Videos", maturity: "live", statement: "Short education reels from the KisanShakti AI YouTube channel with comments, including crop-wise season journeys such as sugarcane from pre-season through ratoon." },
  { id: "app.soil", area: "Soil Health Report", maturity: "live-limited", statement: "Built from the farmer's own soil-test results.", limits: ["There is no soil-sensing hardware."] },
  { id: "app.schemes", area: "Government Schemes", maturity: "live", statement: "Plain-language information and eligibility for schemes such as PM-Kisan, crop insurance and Soil Health Card.", limits: ["No government affiliation is implied."] },

  // TARKA
  { id: "tarka.chain", area: "TARKA", maturity: "live-limited", statement: "Question → canonical intent → observation → hypothesis → crop stage and land state → governed rule → evidence → safety and servability gate → decision → farmer-language explanation.", limits: ["An explanatory model, not a claim that every request visibly follows it."] },
  { id: "tarka.chemical-gate", area: "TARKA", maturity: "live-limited", statement: "A chemical recommendation cannot reach a farmer without dose, pre-harvest interval and expert approval." },
  { id: "tarka.safety", area: "TARKA", maturity: "live-limited", statement: "Safety blocks always win over advisory rules. Photo evidence is the final authority over estimates." },
  { id: "tarka.knowledge", area: "TARKA", maturity: "live-limited", statement: "2,169 active, farmer-servable governed rules (read from decision_rules on 2026-10-01) plus an English agronomy corpus including ICAR and state-university packages of practice.", limits: ["Coverage is deepest for rice and growing for sugarcane, soybean, cotton, chickpea, onion and jowar."], forbidden: ["all crops"] },

  // TATVA
  { id: "tatva.weather", area: "TATVA", maturity: "live", statement: "Hourly weather for each land with hourly and 7-day forecasts, rainfall, growing-degree-days, weather alerts and recommendations." },
  { id: "tatva.ndvi", area: "TATVA", maturity: "live", statement: "Daily satellite NDVI with a land health score, trend, map view and early warning." },
  { id: "tatva.water", area: "TATVA", maturity: "live", statement: "Evapotranspiration, a rain timeline, an irrigation gauge, a spray window, an FAO-56 daily water balance, and risk episodes.", limits: ["No soil sensors, IoT or drones."] },

  // RIITU
  { id: "riitu.stage-graph", area: "RIITU", maturity: "live-limited", statement: "A stage graph per crop and cultivation method, days-after-sowing and heat units, variety maturity, and region-scoped agronomy with Maharashtra first." },
  { id: "riitu.reconcile", area: "RIITU", maturity: "live-limited", statement: "Nightly reconciliation." },
  { id: "riitu.farm-today", area: "RIITU", maturity: "live-limited", statement: "Farm Today with Due, Watch, Blocked and Info decisions." },
  { id: "riitu.growth", area: "RIITU", maturity: "live-limited", statement: "Growth tracking, farmer field readings and crop photos.", forbidden: ["predicts yield", "predict yield", "yield prediction"] },

  // PAHRA
  { id: "pahra.daily-risk", area: "PAHRA", maturity: "beta", statement: "Daily pest, disease and weather risk evaluated for each land, with notification preferences.", limits: ["Shown as early access."] },
  { id: "pahra.no-prescription", area: "PAHRA", maturity: "beta", statement: "An alert never prescribes a chemical; it asks the farmer to scout, confirm and then decide." },

  // RUKH
  { id: "rukh.prices", area: "RUKH", maturity: "live-limited", statement: "Current mandi prices, nearby markets, state comparison, historical comparison and a selling advisor.", limits: ["The marketplace is early access."], forbidden: ["guaranteed price", "price prediction"] },
  { id: "rukh.analytics", area: "RUKH", maturity: "live-limited", statement: "Market data feeds Farm Analytics." },

  // Tenant portal
  { id: "tenant.portal", area: "Tenant SaaS Portal", maturity: "live-limited", statement: "Tenant onboarding, farmer management, land management, tenant branding, farmer activity, and running under the organisation's own context and brand.", limits: ["No CRM, ERP, accounting or sales-force modules are claimed."], forbidden: ["CRM", "ERP", "accounting", "sales force"] },

  // Admin portal
  { id: "admin.portal", area: "SaaS Admin Portal", maturity: "live", statement: "Tenant and user management; agronomy masters (crops, varieties, companies, products); Decision Brain administration (rules, observations, hypotheses, knowledge sources with PDF and Markdown ingestion); monitoring. The governance layer, not another farmer app." },

  // Security
  { id: "security.verified", area: "Security & Governance", maturity: "live", statement: "Governed decisions, evidence chains, safety and servability gates, controlled administration, and tenant-specific context and branding.", limits: ["A tenant-isolation security audit is pending. No technical isolation, certification, zero-trust or military-grade claims."], forbidden: ["ISO 27001", "SOC 2", "zero-trust", "zero trust", "military-grade", "bank-grade"] },

  // Company
  { id: "company.stage", area: "Company", maturity: "live", statement: "Early-stage, bootstrapped, Maharashtra-based, pre-revenue.", forbidden: ["trusted by", "customers include", "testimonial"] },
];

export const factById = (id: string): Fact => {
  const f = FACTS.find((x) => x.id === id);
  if (!f) throw new Error(`Unknown fact ${id}`);
  return f;
};
