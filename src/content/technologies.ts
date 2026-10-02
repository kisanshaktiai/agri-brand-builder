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
      "KisanShakti TATVA watches each of your lands for you: the weather it is actually getting, how it looks from the satellite each day, and how much water it holds. Every recommendation starts from the field as it is.",
    capabilities: [
      { text: "Hourly weather for each land, with hourly and 7-day forecasts, rainfall, growing-degree-days, weather alerts and recommendations.", fact: "tatva.weather" },
      { text: "Daily satellite NDVI with a land health score, trend, map view and early warning.", fact: "tatva.ndvi" },
      { text: "Evapotranspiration, a rain timeline, an irrigation gauge, a spray window, a daily water balance and risk episodes.", fact: "tatva.water" },
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
      "KisanShakti TARKA is the reasoning behind every answer. You ask in your own words, with a photo if you like. The answer is checked against your field's state, your crop's stage and expert-approved guidance, then explained back in your language. The AI explains; it never invents a dose, a quantity or a timing.",
    capabilities: [
      { text: "Ask in your language, with a photo. The answer is checked against your field, your crop's stage and expert-approved guidance, then explained in your language with the reason why.", fact: "tarka.chain" },
      { text: "A chemical recommendation cannot reach a farmer without a dose, a pre-harvest interval and expert approval.", fact: "tarka.chemical-gate" },
      { text: "Safety checks always win over advice. A photo of the plant is the final authority over any estimate.", fact: "tarka.safety" },
      { text: "Guidance comes from a governed, expert-reviewed knowledge base that includes ICAR and state-university packages of practice.", fact: "tarka.knowledge" },
    ],
    limits: [
      "Not every question needs every check; the checks describe how answers are governed, not a screen you watch.",
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
      "KisanShakti RIITU turns your crop's growth into a living schedule. It knows how your crop is grown, counts days and heat since sowing, and listens to what you report from the field, so Farm Today always reflects your field's actual stage.",
    capabilities: [
      { text: "A schedule for each crop and the way it is grown, built from days since sowing, heat units, variety maturity and region-specific agronomy, Maharashtra first.", fact: "riitu.stage-graph" },
      { text: "Updated every night against your field's actual stage.", fact: "riitu.reconcile" },
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
      "KisanShakti PAHRA looks at pest, disease and weather risk for each of your lands every day and tells you what to go and look at. An alert never prescribes a chemical: scout, confirm, then decide.",
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
      "KisanShakti RUKH puts today's mandi prices, nearby markets, comparisons across the state and over time, and a selling advisor in your hand, and feeds the same market data into your Farm Analytics. Market insight, not a guaranteed price prediction.",
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
