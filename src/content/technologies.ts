import type { Maturity } from "./site";

/**
 * The Technology Family — locked brand assets.
 * Names, full forms and positioning lines are final and used verbatim.
 * Everything else is written for a farmer: what it does, in plain words.
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
  /** The one question a farmer should leave able to answer. */
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
    positioning: "Five-Element Land Intelligence",
    maturity: "live",
    arc: ["Observe", "Understand"],
    question: "What is nature doing on my land right now?",
    tagline: "Understand what nature is doing.",
    summary:
      "Five natural elements shape every season: Sky, Soil, Water, Temperature and Weather. KisanShakti TATVA reads all five for each of your lands, so you know what nature is doing on your field today, not what it is doing somewhere in the district.",
    capabilities: [
      { text: "Sky: a satellite view of your field, scored daily into a simple land health picture, with a trend and an early warning when a patch changes.", fact: "tatva.ndvi" },
      { text: "Weather: hourly weather for each land, a 7-day outlook, rainfall and alerts, with a window for spraying.", fact: "tatva.weather" },
      { text: "Water: how much your field has received and used, a rain timeline and an irrigation gauge.", fact: "tatva.water" },
      { text: "Temperature: the heat your crop has accumulated, so its stage is judged by what it has actually experienced.", fact: "tatva.weather" },
      { text: "Soil: a soil health picture built from your own soil-test results.", fact: "app.soil" },
    ],
    limits: ["Satellite, weather and your own soil test. No sensors, drones or devices to buy."],
    screens: ["weather", "ndvi"],
    badge: "5",
  },
  {
    key: "pahra",
    name: "PAHRA",
    fullForm: "Proactive Agricultural Hazard & Risk Assessment",
    positioning: "Proactive Farm Alerts",
    maturity: "beta",
    arc: ["Anticipate"],
    question: "What is changing on my land while I am away?",
    tagline: "Know what is changing, even when you are away.",
    summary:
      "You cannot stand in every field every day. KisanShakti PAHRA watches the conditions on each of your lands as they change and tells you when something deserves your attention: a pest or disease risk building, weather turning, a field that needs a look.",
    capabilities: [
      { text: "Land-specific alerts as farm and weather conditions change, every day.", fact: "pahra.daily-risk" },
      { text: "Each alert says what changed and what to go and look at. You decide what to do next.", fact: "pahra.no-prescription" },
      { text: "You choose which alerts reach you and how.", fact: "pahra.daily-risk" },
    ],
    limits: ["Early access. Alerts help you notice change; they do not prescribe a treatment."],
    screens: ["alerts"],
  },
  {
    key: "tarka",
    name: "TARKA",
    fullForm: "Trusted Agricultural Reasoning & Knowledge Architecture",
    positioning: "Land-Specific Multilingual AI",
    maturity: "live-limited",
    arc: ["Reason", "Decide"],
    question: "Can I just ask my land what it needs?",
    tagline: "Talk to your land.",
    summary:
      "KisanShakti TARKA is a multilingual AI assistant developed in India, and it is not a generic chatbot. Every land you own has its own conversation, which already knows your crop, your field and your season. Ask in your language, add a photo, and get practical guidance that fits this field, explained with the reason why.",
    capabilities: [
      { text: "A separate conversation for each land, carrying that land's crop, stage and conditions into every answer.", fact: "tarka.land-space" },
      { text: "Understands questions by voice or text, photos of the crop, and the context of your field.", fact: "tarka.chain" },
      { text: "Answers in your language. Many Indian languages are supported, and you can ask in one language and share in another.", fact: "app.languages" },
      { text: "Practical guidance checked against your field and expert-reviewed agricultural knowledge, never invented on the spot.", fact: "tarka.knowledge" },
    ],
    limits: ["Guidance is deepest for rice and growing for sugarcane, soybean, cotton, chickpea, onion and jowar.", "Where something needs a specialist's eye, it says so."],
    screens: ["chat-marathi", "voice"],
  },
  {
    key: "riitu",
    name: "RIITU",
    fullForm: "Responsive Intelligence for Integrated Temporal Agriculture",
    positioning: "Dynamic Crop Scheduling & Guidance",
    maturity: "live-limited",
    arc: ["Act"],
    question: "What should I do on this land today?",
    tagline: "A crop plan that adapts to nature.",
    summary:
      "KisanShakti RIITU turns your crop's biology into a practical, stage-wise plan for each land: what to do, when, and in what order. When TATVA sees the field or the weather change, the plan changes with it, so Farm Today always reflects your field's actual stage.",
    capabilities: [
      { text: "A stage-wise crop plan for each land and the way the crop is grown, Maharashtra first.", fact: "riitu.stage-graph" },
      { text: "Farm Today: what is Due, what to Watch, what is Blocked by conditions, and what is simply good to know.", fact: "riitu.farm-today" },
      { text: "Adapts as the season unfolds: rain, heat and what you report from the field all move the plan.", fact: "riitu.reconcile" },
      { text: "Growth tracking with your field readings and crop photos.", fact: "riitu.growth" },
    ],
    limits: ["The plan adapts to your field's stage. It does not predict your yield."],
    screens: ["farm-today", "growth"],
  },
  {
    key: "rukh",
    name: "RUKH",
    fullForm: "Real-time Unified Knowledge for Market Horizons",
    positioning: "Crop & Market Intelligence",
    maturity: "live-limited",
    arc: ["Predict"],
    question: "What is the market doing around my crop?",
    tagline: "Know the market around your crop.",
    summary:
      "KisanShakti RUKH brings the market to your crop: today's prices at mandis near you, how they compare across the state and over time, and a selling advisor that puts it in plain words, so selling decisions are made with information, not guesswork.",
    capabilities: [
      { text: "Current mandi prices, nearby markets, comparison across the state and over time.", fact: "rukh.prices" },
      { text: "A selling advisor that explains what the numbers mean for your crop.", fact: "rukh.prices" },
      { text: "The same market view feeds your farm economics.", fact: "rukh.analytics" },
    ],
    limits: ["Market insight, never a guaranteed price.", "The marketplace is early access."],
    screens: ["market"],
  },
];

/** Hierarchy the site communicates. Conceptual, not runtime order. */
export const HIERARCHY = ["KisanShakti AI", "The Technology Family", "Agricultural intelligence", "The platform", "Partners", "Farmers"];
export const ARC = ["Observe", "Understand", "Reason", "Decide", "Act", "Anticipate", "Predict"];

/** Order the family is presented in, following the farmer journey. */
export const FAMILY_ORDER: TechKey[] = ["tatva", "pahra", "tarka", "riitu", "rukh"];

export function techByKey(key: TechKey): Technology {
  const t = TECHNOLOGIES.find((x) => x.key === key);
  if (!t) throw new Error(`Unknown technology ${key}`);
  return t;
}
