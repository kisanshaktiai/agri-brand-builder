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
  limits?: string[];
  forbidden?: string[];
}

export const FACTS: Fact[] = [
  // Platform
  { id: "platform.surfaces", area: "Platform", maturity: "live", statement: "The platform connects the Farmer App and Partner Portal through one shared, centrally governed foundation." },
  { id: "platform.core", area: "Platform", maturity: "live", statement: "The shared agricultural intelligence foundation connects land context, agricultural knowledge and partner context beneath the Farmer App and Partner Portal." },
  { id: "platform.separation", area: "Platform", maturity: "live", statement: "AI understands the farmer's question and explains it in the farmer's language; governed, expert-approved agricultural guidance determines what can be recommended for the field and crop stage." },
  { id: "platform.multi-tenant", area: "Platform", maturity: "live-limited", statement: "White-label platform: shared governed intelligence underneath; partner organisations run their own branded farmer ecosystems on top.", limits: ["Partners run under their own context and brand. They do not receive or fork source code."] },
  { id: "platform.commercial", area: "Commercial", maturity: "live", statement: "Sold to organisations, not directly to farmers. No farmer plans or prices are shown.", forbidden: ["per farmer", "₹/month"] },

  // Platform positioning
  { id: "platform.ai-intelligence", area: "Platform", maturity: "live", statement: "KisanShakti AI is an AI-powered agricultural intelligence platform built around each land, combining farmer conversations, changing field conditions and governed agricultural knowledge into clear, traceable guidance." },

  // Farmer App
  { id: "app.languages", area: "Farmer App", maturity: "live", statement: "14 Indian languages, with cross-language communication." },
  { id: "app.voice", area: "Farmer App", maturity: "live", statement: "Voice-first, with voice onboarding and voice land capture." },
  { id: "app.login", area: "Farmer App", maturity: "live", statement: "Mobile number and PIN login." },
  { id: "app.offline", area: "Farmer App", maturity: "live", statement: "Offline-first PWA plus Android and iOS builds that work on weak networks and sync when back online." },
  { id: "app.land", area: "Farmer App", maturity: "live", statement: "Land boundary mapping with automatic area, plus season, crop, variety, sowing date and cultivation method, a satellite thumbnail and a land health score." },
  { id: "app.companion", area: "Farmer App", maturity: "live", statement: "One companion for every farmer and every land: chat with photo capture, Photo Scan, crop plan, Farm Today, weather, satellite, market, community, videos, government schemes, soil health, alerts, growth tracking and farm analytics." },
  { id: "app.photo-scan", area: "Photo Scan", maturity: "live", statement: "Capture or upload crop and field photos for AI-assisted observation of visible crop, pest, disease, deficiency or field issues, connected to the farmer's land context." },
  { id: "app.analytics", area: "Farm Analytics", maturity: "live-limited", statement: "Total area, active crops, projected revenue and projected profit, plus Crop & Stage, Financial, Market Pulse, Soil Health, Task Performance, Water & Weather and Smart Recommendations.", limits: ["Projections come from logged expenses and expected yield at current market price, and every projection carries a projection notice."], forbidden: ["guaranteed"] },
  { id: "app.economics", area: "Farm Economics", maturity: "beta", statement: "Crop-wise income, expense and farm economics tracking for every farmer and every land.", limits: ["Beta, under development and in testing. Not a fully released feature."], forbidden: ["guaranteed"] },
  { id: "app.community", area: "Community", maturity: "live", statement: "Farmer feed, photos, comments, groups and group chat, trending topics, moderation, local-language posts and read-aloud, with communication across languages." },
  { id: "app.videos", area: "Videos", maturity: "live", statement: "Short education reels from the KisanShakti AI YouTube channel with comments, including crop-wise season journeys such as sugarcane from pre-season through ratoon." },
  { id: "app.soil", area: "Soil Health Report", maturity: "live-limited", statement: "Built from the farmer's own soil-test results.", limits: ["There is no soil-sensing hardware."] },
  { id: "app.schemes", area: "Government Schemes", maturity: "live", statement: "Plain-language information and eligibility for schemes such as PM-Kisan, crop insurance and Soil Health Card, in the farmer's language.", limits: ["No government affiliation is implied."] },
  { id: "app.services", area: "Agri Services", maturity: "live-limited", statement: "A service ecosystem connecting farmers with agricultural services such as labour and machinery." },

  // TARKA
  { id: "tarka.land-space", area: "TARKA", maturity: "live-limited", statement: "Every land has its own contextual conversation for that farmer's crop and field." },
  { id: "tarka.chain", area: "TARKA", maturity: "live-limited", statement: "Every recommendation is checked against the field's state, the crop's stage and expert-approved guidance before it reaches the farmer, and is explained in the farmer's language.", limits: ["Not a claim that every request visibly follows each step."] },
  { id: "tarka.chemical-gate", area: "TARKA", maturity: "live-limited", statement: "A chemical recommendation cannot reach a farmer without dose, pre-harvest interval and expert approval." },
  { id: "tarka.safety", area: "TARKA", maturity: "live-limited", statement: "Safety checks always win over advice. A photo of the plant is the final authority over any estimate." },
  { id: "tarka.knowledge", area: "TARKA", maturity: "live-limited", statement: "A governed knowledge base of expert-reviewed agronomy guidance, including ICAR and state-university packages of practice. (Audit note: 2,169 active farmer-servable entries on 2026-10-01; the figure is not published.)", limits: ["Coverage is deepest for rice and growing for sugarcane, soybean, cotton, chickpea, onion and jowar."], forbidden: ["all crops"] },

  // TATVA
  { id: "tatva.weather", area: "TATVA", maturity: "live", statement: "Hourly weather for each land with hourly and 7-day forecasts, rainfall, growing-degree-days, weather alerts and recommendations." },
  { id: "tatva.ndvi", area: "TATVA", maturity: "live", statement: "Daily satellite NDVI with a land health score, trend, map view and early warning." },
  { id: "tatva.water", area: "TATVA", maturity: "live", statement: "Evapotranspiration, a rain timeline, an irrigation gauge, a spray window, a daily water balance and risk episodes.", limits: ["No soil sensors, IoT or drones."] },

  // RIITU
  { id: "riitu.stage-graph", area: "RIITU", maturity: "live-limited", statement: "A living, stage-wise plan for each crop and the way it is grown, built from days since sowing, heat units, variety maturity and region-specific agronomy, Maharashtra first." },
  { id: "riitu.reconcile", area: "RIITU", maturity: "live-limited", statement: "The plan is updated every night against the field's actual stage and conditions." },
  { id: "riitu.farm-today", area: "RIITU", maturity: "live-limited", statement: "Farm Today with Due, Watch, Blocked and Info decisions." },
  { id: "riitu.growth", area: "RIITU", maturity: "live-limited", statement: "Growth tracking, farmer field readings and crop photos.", forbidden: ["predicts yield", "predict yield", "yield prediction"] },

  // PAHRA
  { id: "pahra.daily-risk", area: "PAHRA", maturity: "beta", statement: "Daily pest, disease and weather risk evaluated for each land, with notification preferences.", limits: ["Shown as early access."] },
  { id: "pahra.no-prescription", area: "PAHRA", maturity: "beta", statement: "An alert never prescribes a chemical; it asks the farmer to scout, confirm and then decide." },

  // RUKH
  { id: "rukh.prices", area: "RUKH", maturity: "live-limited", statement: "Current mandi prices, nearby markets, state comparison, historical comparison and a selling advisor.", limits: ["The marketplace is early access."], forbidden: ["guaranteed price", "price prediction"] },
  { id: "rukh.analytics", area: "RUKH", maturity: "live-limited", statement: "Market data feeds Farm Analytics." },

  // Partner portal
  { id: "tenant.portal", area: "Partner Portal", maturity: "live-limited", statement: "A multi-tenant operating portal for organisations that serve farmers: partner onboarding; farmer and land management; crop and vegetation monitoring; soil analysis; product catalog and dealer management; campaigns and farmer communications; sales and order workflows; analytics and reports; proactive alerts; integrations; organisation users, roles and permissions; white-label branding; localization; notifications; and subscription settings.", limits: ["Portal capabilities are delivered according to the partner's enabled configuration and release maturity. Some modules are early access or under active development. The portal is not claimed as a generic CRM, ERP or accounting system, and industry-specific banking, insurance or government workflows are not claimed unless separately implemented."], forbidden: ["guaranteed sales", "CRM replacement", "ERP replacement", "accounting system"] },

  // Admin portal
  { id: "admin.portal", area: "Admin Portal", maturity: "live", statement: "Partner and user management; agronomy masters (crops, varieties, companies, products); governance of the advisory knowledge base; monitoring. The governance layer, not another farmer app." },

  // Security
  { id: "security.verified", area: "Security & Governance", maturity: "live", statement: "Governed decisions, evidence chains, safety and servability gates, controlled administration, and partner-specific context and branding.", limits: ["A partner-isolation security audit is pending. No technical isolation, certification, zero-trust or military-grade claims."], forbidden: ["ISO 27001", "SOC 2", "zero-trust", "zero trust", "military-grade", "bank-grade"] },

  // Company
  { id: "company.stage", area: "Company", maturity: "live", statement: "Early-stage, bootstrapped, Maharashtra-based, pre-revenue.", forbidden: ["trusted by", "customers include", "testimonial"] },
];

export const factById = (id: string): Fact => {
  const f = FACTS.find((x) => x.id === id);
  if (!f) throw new Error(`Unknown fact ${id}`);
  return f;
};
