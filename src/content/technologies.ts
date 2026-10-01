import type { Maturity } from "./site";

/**
 * The Technology Family — locked brand assets.
 * Names, full forms and positioning lines are final and used verbatim.
 */
export type TechKey = "tarka" | "tatva" | "riitu" | "pahra" | "rukh";

export interface Capability {
  text: string;
  /** Fact id from src/content/facts.ts, for the claims audit. */
  fact: string;
}

export interface Technology {
  key: TechKey;
  name: string;
  fullForm: string;
  positioning: string;
  maturity: Maturity;
  /** Narrative arc stage(s) this technology carries. Conceptual, not runtime order. */
  arc: string[];
  /** The one question a visitor should leave able to answer. */
  question: string;
  tagline: string;
  summary: string;
  capabilities: Capability[];
  limits: string[];
  /** Screen ids from src/content/screens.ts */
  screens: string[];
  /** Badge detail: TATVA carries a small numeral 5 for the five elements. */
  badge?: "5";
}

export const TECHNOLOGIES: Technology[] = [
  {
    key: "tatva",
    name: "TATVA",
    fullForm: "Terrain, Atmosphere, Thermal & Vegetation Assessment",
    positioning: "Multimodal AI Land-State Intelligence",
    maturity: "live",
    arc: ["Observe", "Understand"],
    question: "What is the state of my field right now?",
    tagline: "Know the state of every field.",
    summary:
      "KisanShakti TATVA reads each land's weather, satellite vegetation and water balance so that every other decision starts from the field as it is, not as it was assumed to be.",
    capabilities: [
      { text: "Hourly weather for each land, with hourly and 7-day forecasts, rainfall, growing-degree-days, weather alerts and recommendations.", fact: "tatva.weather" },
      { text: "Daily satellite NDVI with a land health score, trend, map view and early warning.", fact: "tatva.ndvi" },
      { text: "Evapotranspiration, a rain timeline, an irrigation gauge, a spray window, an FAO-56 daily water balance and risk episodes.", fact: "tatva.water" },
    ],
    limits: ["Uses weather and satellite data only. There are no soil sensors, IoT devices or drones."],
    screens: ["weather", "ndvi"],
    badge: "5",
  },
  {
    key: "tarka",
    name: "TARKA",
    fullForm: "Trusted Agricultural Reasoning & Knowledge Architecture",
    positioning: "Neuro-Symbolic AI Decision Intelligence",
    maturity: "live-limited",
    arc: ["Reason", "Decide"],
    question: "Why did the system recommend this?",
    tagline: "The Decision Brain.",
    summary:
      "KisanShakti TARKA separates understanding language from making decisions. The language model turns a farmer's question into canonical intent and explains the result in the farmer's language. The Decision Brain evaluates observations and hypotheses against the crop's biological stage and the land's state, applies governed rules, keeps evidence chains and enforces safety gates. It never lets the language model decide doses, quantities or timing.",
    capabilities: [
      { text: "A chain from a farmer's question to canonical intent, observation, hypothesis, crop stage and land state, governed rule, evidence, a safety and servability gate, a decision and a farmer-language explanation.", fact: "tarka.chain" },
      { text: "A chemical recommendation cannot reach a farmer without a dose, a pre-harvest interval and expert approval.", fact: "tarka.chemical-gate" },
      { text: "Safety blocks always win over advisory rules. Photo evidence is the final authority over estimates.", fact: "tarka.safety" },
      { text: "Over 2,000 governed, farmer-servable rules, plus an English agronomy corpus that includes ICAR and state-university packages of practice.", fact: "tarka.knowledge" },
    ],
    limits: [
      "The chain is an explanatory model of how decisions are governed, not a claim that every request visibly passes through each step.",
      "Coverage is deepest for rice and growing for sugarcane, soybean, cotton, chickpea, onion and jowar.",
    ],
    screens: ["chat-marathi", "evidence"],
  },
  {
    key: "riitu",
    name: "RIITU",
    fullForm: "Responsive Intelligence for Integrated Temporal Agriculture",
    positioning: "Dynamic AI Crop Scheduling & Prescription",
    maturity: "live-limited",
    arc: ["Act"],
    question: "What should I do today?",
    tagline: "Crop biology as a living schedule.",
    summary:
      "KisanShakti RIITU keeps a stage graph for each crop and cultivation method and reconciles it every night against days after sowing, heat units, variety maturity and what the farmer reports from the field. The schedule adapts to your field's actual stage.",
    capabilities: [
      { text: "A stage graph per crop and cultivation method, days-after-sowing and heat units, variety maturity, and region-scoped agronomy with Maharashtra first.", fact: "riitu.stage-graph" },
      { text: "Nightly reconciliation of every active schedule.", fact: "riitu.reconcile" },
      { text: "Farm Today, with Due, Watch, Blocked and Info decisions.", fact: "riitu.farm-today" },
      { text: "Growth tracking, farmer field readings and crop photos.", fact: "riitu.growth" },
    ],
    limits: ["Region-scoped agronomy starts with Maharashtra.", "The schedule adapts to the field's stage. It does not predict yield."],
    screens: ["farm-today", "schedule", "growth"],
  },
  {
    key: "pahra",
    name: "PAHRA",
    fullForm: "Proactive Agricultural Hazard & Risk Assessment",
    positioning: "Proactive AI Farm-Risk Intelligence",
    maturity: "beta",
    arc: ["Anticipate"],
    question: "What should I watch for this week?",
    tagline: "See risk before it becomes an emergency.",
    summary:
      "KisanShakti PAHRA evaluates pest, disease and weather risk for each land every day and tells the farmer what to go and look at. An alert never prescribes a chemical. It asks the farmer to scout, confirm and then decide.",
    capabilities: [
      { text: "Daily pest, disease and weather risk evaluated for each land, with notification preferences.", fact: "pahra.daily-risk" },
      { text: "Alerts ask the farmer to scout and confirm. They never prescribe a chemical.", fact: "pahra.no-prescription" },
    ],
    limits: ["Early access. Available to farmers as a preview while coverage and thresholds are reviewed."],
    screens: ["alerts"],
  },
  {
    key: "rukh",
    name: "RUKH",
    fullForm: "Regional Understanding, Knowledge & Harvest",
    positioning: "Predictive AI Market Intelligence",
    maturity: "live-limited",
    arc: ["Predict"],
    question: "Where and when should I sell?",
    tagline: "Better-informed selling decisions.",
    summary:
      "KisanShakti RUKH brings current mandi prices, nearby markets, state and historical comparison and a selling advisor into the farmer's day, and feeds market data into Farm Analytics. It is market insight, not a guaranteed price prediction.",
    capabilities: [
      { text: "Current mandi prices, nearby markets, state comparison, historical comparison and a selling advisor.", fact: "rukh.prices" },
      { text: "Market data feeds Farm Analytics projections.", fact: "rukh.analytics" },
    ],
    limits: ["The marketplace is early access.", "Market insight, never a guaranteed price prediction."],
    screens: ["market"],
  },
];

/** Hierarchy and arc the site communicates. Conceptual stories, not runtime order. */
export const HIERARCHY = ["KisanShakti AI", "The Technology Family", "Agricultural intelligence", "The platform", "Tenants", "Farmers"];
export const ARC = ["Observe", "Understand", "Reason", "Decide", "Act", "Anticipate", "Predict"];

/** Order the family is presented in: Observe → Predict. */
export const FAMILY_ORDER: TechKey[] = ["tatva", "tarka", "riitu", "pahra", "rukh"];

export function techByKey(key: TechKey): Technology {
  const t = TECHNOLOGIES.find((x) => x.key === key);
  if (!t) throw new Error(`Unknown technology ${key}`);
  return t;
}
