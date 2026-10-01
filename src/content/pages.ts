/**
 * Page copy. Product statements reference fact ids in src/content/facts.ts.
 */
export const HOME = {
  seo: {
    title: "KisanShakti AI — Agricultural intelligence, built for the field",
    description: "A white-label, multi-tenant agricultural intelligence platform. Shared, governed intelligence underneath; your organisation's branded farmer ecosystem on top.",
  },
  hero: {
    eyebrow: "Agricultural intelligence platform",
    title: "One intelligence platform. Your agricultural ecosystem.",
    lead: "KisanShakti AI connects field intelligence, governed reasoning, crop scheduling, risk and market intelligence with the farmers who use them, the organisations that serve them, and the governance that keeps every decision honest.",
  },
  thesis: {
    eyebrow: "What it is",
    title: "Infrastructure for the agricultural ecosystem, not a farmer chatbot.",
    body: "Underneath, one shared and governed intelligence: land state, crop biology, rules with evidence, risk and market signals. On top, FPOs, dealers, agri-input companies and agricultural enterprises run their own branded farmer ecosystems. The farmer sees one companion. The organisation sees its network. The platform sees that every decision is governed.",
    fact: "platform.multi-tenant",
  },
  living: {
    eyebrow: "One farmer's day",
    title: "A real phone. A real day.",
    steps: [
      { key: "observe", arc: "Observe", tech: "tatva", screen: "weather", title: "Morning. The field reports in.", body: "Hourly weather for this land, growing-degree-days and a seven-day outlook arrive before the farmer does.", fact: "tatva.weather" },
      { key: "understand", arc: "Understand", tech: "tatva", screen: "ndvi", title: "The satellite pass is scored.", body: "Daily NDVI becomes a land health score, a trend and an early warning on the map.", fact: "tatva.ndvi" },
      { key: "reason", arc: "Reason", tech: "tarka", screen: "chat-marathi", title: "A question, in Marathi.", body: "The language model understands it. The Decision Brain evaluates it against the crop's stage, the land's state and governed rules.", fact: "tarka.chain" },
      { key: "act", arc: "Act", tech: "riitu", screen: "farm-today", title: "Farm Today says what is due.", body: "Due, Watch, Blocked and Info decisions, reconciled overnight against the crop's actual stage.", fact: "riitu.farm-today" },
      { key: "anticipate", arc: "Anticipate", tech: "pahra", screen: "alerts", title: "A risk to go and look at.", body: "Daily pest, disease and weather risk for this land. The alert asks the farmer to scout and confirm; it never prescribes a chemical. Early access.", fact: "pahra.daily-risk" },
      { key: "predict", arc: "Predict", tech: "rukh", screen: "market", title: "Evening. The market, in context.", body: "Mandi prices, nearby markets and a selling advisor, with market data flowing into Farm Analytics.", fact: "rukh.prices" },
    ],
  },
  family: {
    eyebrow: "The Technology Family",
    title: "Five technologies. One coherent intelligence.",
    body: "Each carries one part of the story, from observing the field to anticipating risk and reading the market. Together they are the intelligence every tenant's ecosystem runs on.",
  },
  separation: {
    eyebrow: "The core differentiator",
    title: "The language model explains. It never decides.",
    body: "Language intelligence understands the farmer's words, turns them into canonical intent and explains governed results in the farmer's language. Decision intelligence evaluates observations and hypotheses against the crop's biological stage and the land's state, applies governed rules, keeps evidence chains and enforces safety gates. Doses, quantities and timing come only from governed rules.",
    fact: "platform.separation",
  },
  evidence: {
    eyebrow: "Why did the system recommend this?",
    title: "Every decision keeps its evidence.",
    body: "One real rule from the governed knowledge base, followed from a farmer's question to the explanation they hear. The chain is how decisions are governed; it is not a claim that every request visibly walks each step.",
    fact: "tarka.chain",
  },
  zoom: {
    eyebrow: "The platform",
    title: "From one farmer to the whole ecosystem.",
    steps: [
      { title: "A farmer", body: "One companion in their language, working offline, synced when the network returns." },
      { title: "A tenant workspace", body: "The organisation that serves this farmer runs its network under its own brand and context." },
      { title: "Many tenant ecosystems", body: "FPOs, dealers, agri-input companies and enterprises, each with its own farmers and branding." },
      { title: "One shared platform", body: "The same governed intelligence, knowledge base and administration underneath them all." },
    ],
  },
  enterprise: {
    eyebrow: "For agricultural organisations",
    title: "Run your farmer network on governed intelligence.",
    body: "Onboard your organisation, bring your farmers and their lands, set your brand, and follow farmer activity from the Tenant SaaS Portal. KisanShakti AI is sold to organisations, never directly to farmers.",
    fact: "tenant.portal",
  },
  final: {
    line1: "Agricultural intelligence, built for the field.",
    line2: "For farmers.",
    line3: "For agricultural enterprises.",
    line4: "For the ecosystems that connect them.",
  },
};

export const TECHNOLOGY_PAGE = {
  seo: {
    title: "Technology — The KisanShakti AI Technology Family",
    description: "TATVA, TARKA, RIITU, PAHRA and RUKH: land-state, decision, scheduling, risk and market intelligence, governed and explainable.",
  },
  hero: {
    eyebrow: "Technology",
    title: "The Technology Family.",
    lead: "Five named technologies carry the platform's intelligence, from observing the field to anticipating risk and reading the market. They are presented as a story; the order is conceptual, not how the system runs.",
  },
  hierarchy: {
    eyebrow: "How it fits together",
    title: "KisanShakti AI, then the family, then everything it serves.",
  },
};

export const PLATFORM_PAGE = {
  seo: {
    title: "Platform — One intelligence platform, your agricultural ecosystem",
    description: "White-label, multi-tenant SaaS: three connected surfaces on one shared data foundation, run under each organisation's own brand.",
  },
  hero: {
    eyebrow: "Platform",
    title: "One intelligence platform. Your agricultural ecosystem.",
    lead: "Three connected surfaces on one shared data foundation. The Farmer App is the farmer's daily operating layer, the Tenant SaaS Portal is the organisation's operating layer, and the SaaS Admin Portal is the control plane that governs the platform's intelligence.",
    fact: "platform.surfaces",
  },
  transform: {
    eyebrow: "White-label, multi-tenant",
    title: "Your brand on top. The same governed intelligence underneath.",
    body: "A tenant runs the farmer experience under its own name, colours and context. The rules, evidence chains, schedules and safety gates are shared and governed centrally. Tenants configure their ecosystem; they do not receive or fork the platform's code.",
    fact: "platform.multi-tenant",
    layers: ["Tenant brand and context", "Farmer App experience", "Shared governed intelligence", "Platform administration"],
  },
  architecture: {
    eyebrow: "Architecture",
    title: "Every surface and technology, with its purpose, maturity and a real screen.",
    hint: "Hover a node on desktop, or tap it on a phone.",
  },
  days: {
    eyebrow: "Two days, side by side",
    title: "One farmer's day. One tenant's day.",
    farmer: [
      { time: "06:30", text: "Weather for the land and a seven-day outlook.", fact: "tatva.weather" },
      { time: "08:00", text: "Farm Today lists what is due, what to watch and what is blocked.", fact: "riitu.farm-today" },
      { time: "11:00", text: "A photo of a leaf, a question in Marathi, a governed answer with its evidence.", fact: "tarka.chain" },
      { time: "16:00", text: "A risk alert: go and scout the north plot. Early access.", fact: "pahra.daily-risk" },
      { time: "19:00", text: "Mandi prices nearby and the selling advisor.", fact: "rukh.prices" },
    ],
    tenant: [
      { time: "09:00", text: "Onboard a new farmer group and their lands.", fact: "tenant.portal" },
      { time: "10:30", text: "Review farmer activity across the network.", fact: "tenant.portal" },
      { time: "12:00", text: "Update the organisation's branding; farmers see it on their next sync.", fact: "tenant.portal" },
      { time: "15:00", text: "Check land records and crop coverage across villages.", fact: "tenant.portal" },
      { time: "17:00", text: "Everything ran under the organisation's own context, on shared governed intelligence.", fact: "platform.multi-tenant" },
    ],
  },
  governance: {
    eyebrow: "Governance",
    title: "The admin portal is the governance layer, not another farmer app.",
    body: "Rules, observations, hypotheses and knowledge sources are administered in one place, with PDF and Markdown ingestion for new sources, agronomy masters for crops, varieties, companies and products, and monitoring across tenants.",
    fact: "admin.portal",
  },
};

export const FARMER_APP_PAGE = {
  seo: {
    title: "Farmer App — One intelligent farm companion",
    description: "Voice-first, offline-first, in 14 languages. Land mapping, Farm Today, AI chat, weather, satellite, market, community, videos, schemes, soil health, alerts and analytics.",
  },
  hero: {
    eyebrow: "Farmer App · Live",
    title: "One intelligent farm companion.",
    lead: "Voice-first and offline-first, in 14 languages, with mobile number and PIN login. It works on weak networks and syncs when the network returns.",
  },
  sections: [
    { id: "land", title: "Start with the land.", body: "Map the boundary and get the area automatically. Record season, crop, variety, sowing date and cultivation method. Each land carries a satellite thumbnail and a land health score.", screen: "land", fact: "app.land" },
    { id: "today", title: "Know what is due today.", body: "Farm Today lists Due, Watch, Blocked and Info decisions reconciled overnight against the crop's actual stage.", screen: "farm-today", fact: "riitu.farm-today" },
    { id: "ask", title: "Ask in your language, with a photo.", body: "AI chat with photo capture and InstaScan. The language model understands; the Decision Brain decides from governed rules and explains why.", screen: "chat-marathi", fact: "app.companion" },
    { id: "field", title: "See the field from the sky.", body: "Hourly weather for each land, daily satellite NDVI with a land health score, a spray window and an irrigation gauge.", screen: "ndvi", fact: "tatva.ndvi" },
    { id: "market", title: "Sell better informed.", body: "Current mandi prices, nearby markets, comparisons and a selling advisor. Market insight, not a guaranteed price.", screen: "market", fact: "rukh.prices" },
    { id: "analytics", title: "Track the season's numbers.", body: "Total area, active crops, projected revenue and projected profit, with Crop & Stage, Financial, Market Pulse, Soil Health, Task Performance, Water & Weather and Smart Recommendations. Projections come from logged expenses and expected yield at current market price, and every projection carries a notice.", screen: "analytics", fact: "app.analytics" },
    { id: "community", title: "Learn from farmers near you.", body: "A farmer feed with photos, comments, groups and group chat, trending topics, moderation, local-language posts and read-aloud.", screen: "community", fact: "app.community" },
    { id: "videos", title: "Watch the season, crop by crop.", body: "Short education reels from the KisanShakti AI YouTube channel, including crop-wise season journeys such as sugarcane from pre-season through ratoon.", screen: "reels", fact: "app.videos" },
  ],
  more: [
    { title: "Soil Health Report", body: "Built from the farmer's own soil-test results. There is no soil-sensing hardware.", fact: "app.soil", maturity: "live-limited" },
    { title: "Government Schemes", body: "Plain-language information and eligibility for schemes such as PM-Kisan, crop insurance and Soil Health Card. No government affiliation is implied.", fact: "app.schemes", maturity: "live" },
    { title: "Proactive alerts", body: "Daily pest, disease and weather risk for each land, with notification preferences. Alerts ask the farmer to scout and confirm; they never prescribe a chemical.", fact: "pahra.daily-risk", maturity: "beta" },
    { title: "Growth tracking", body: "Field readings and crop photos that keep the schedule honest about the crop's actual stage.", fact: "riitu.growth", maturity: "live-limited" },
  ],
};

export const ENTERPRISES_PAGE = {
  seo: {
    title: "For Enterprises — Become a tenant of KisanShakti AI",
    description: "For FPOs, dealers, agri-input companies and agricultural enterprises: run a branded farmer ecosystem on shared, governed agricultural intelligence.",
  },
  hero: {
    eyebrow: "For agricultural organisations",
    title: "Your farmers. Your brand. Governed intelligence underneath.",
    lead: "KisanShakti AI is sold to organisations, not directly to farmers. An FPO, a dealer network, an agri-input company or an agricultural enterprise becomes a tenant and runs its own farmer ecosystem on the platform.",
  },
  journey: {
    eyebrow: "The tenant journey",
    title: "From first conversation to a running farmer network.",
    steps: [
      { title: "Talk to us", body: "Tell us who you serve and how large your network is. We confirm fit, coverage and timing honestly." },
      { title: "Onboard the organisation", body: "Tenant onboarding sets up your organisation and its users in the Tenant SaaS Portal.", fact: "tenant.portal" },
      { title: "Set your brand", body: "Tenant branding puts your name and colours on the farmer experience, running under your context.", fact: "tenant.portal" },
      { title: "Bring farmers and lands", body: "Farmer management and land management hold your network and its fields.", fact: "tenant.portal" },
      { title: "Follow activity", body: "Farmer activity shows how your network uses the companion, day by day.", fact: "tenant.portal" },
    ],
  },
  fit: {
    eyebrow: "Who it is for",
    title: "Four kinds of organisation.",
    types: [
      { title: "Farmer producer organisations", body: "Serve member farmers with one companion that carries the FPO's name." },
      { title: "Dealer networks", body: "Stay present in the farmer's day between visits, under your own brand." },
      { title: "Agri-input companies", body: "Reach the farmers who use your products with governed, evidence-based guidance." },
      { title: "Agricultural enterprises", body: "Run a farmer network with land records, activity and branding in one portal." },
    ],
  },
  honest: {
    eyebrow: "What you get, and what you do not",
    title: "The Tenant SaaS Portal is an operating layer, not a back office.",
    body: "It covers tenant onboarding, farmer management, land management, tenant branding and farmer activity. It is not a CRM, ERP, accounting or sales-force system, and we do not claim it is.",
    fact: "tenant.portal",
  },
};

export const SECURITY_PAGE = {
  seo: {
    title: "Security & Governance — How KisanShakti AI keeps decisions honest",
    description: "Governed decisions, evidence chains, safety and servability gates, controlled administration and tenant-specific context and branding.",
  },
  hero: {
    eyebrow: "Security & Governance",
    title: "What is verified, stated plainly.",
    lead: "We describe the controls that exist in the product today, and we say what is still pending.",
  },
  principles: [
    { title: "Governed decisions", body: "Doses, quantities and timing come only from governed rules. The language model understands and explains; it never decides.", fact: "platform.separation" },
    { title: "Evidence chains", body: "Every rule keeps its source, its stage window and its approval status. A decision can be followed back to its evidence.", fact: "tarka.chain" },
    { title: "Safety and servability gates", body: "A chemical recommendation cannot reach a farmer without a dose, a pre-harvest interval and expert approval. Safety blocks always win over advisory rules.", fact: "tarka.chemical-gate" },
    { title: "Controlled administration", body: "Rules, observations, hypotheses and knowledge sources are administered from the SaaS Admin Portal, with monitoring.", fact: "admin.portal" },
    { title: "Tenant-specific context and branding", body: "Each tenant runs under its own context and brand.", fact: "tenant.portal" },
  ],
  pending: {
    title: "What is pending",
    body: "A tenant-isolation security audit has not yet been completed. Until it is, we make no technical isolation claims and hold no security certifications. We will update this page when that changes.",
    fact: "security.verified",
  },
};

export const COMPANY_PAGE = {
  seo: {
    title: "Company — KisanShakti AI",
    description: "An early-stage, bootstrapped agricultural intelligence company based in Maharashtra, India.",
  },
  hero: {
    eyebrow: "Company",
    title: "Built in Maharashtra, for the field.",
    lead: "KisanShakti AI is an early-stage, bootstrapped company. We are pre-revenue, and we would rather show you the product than a logo wall.",
    fact: "company.stage",
  },
  principles: {
    eyebrow: "Engineering principles",
    title: "What we hold ourselves to.",
    items: [
      { title: "Governed over generative", body: "A model may explain. Only a governed rule with evidence may decide." },
      { title: "Field-aware", body: "Every decision is evaluated against the land's state and the crop's biological stage." },
      { title: "Offline-first", body: "The farmer's companion must work on a weak network and sync when it returns." },
      { title: "Explainable", body: "If we cannot show why, we do not recommend." },
      { title: "Honest maturity", body: "Live is live. Early access is early access. Roadmap is roadmap." },
    ],
  },
  vision: {
    eyebrow: "Long-term vision",
    title: "Agricultural intelligence as shared infrastructure.",
    body: "One governed intelligence that any agricultural organisation can run its ecosystem on, in the farmer's language, on the farmer's phone, accountable for every decision it makes.",
  },
  founder: { eyebrow: "Founder", title: "Meet the founder.", body: "The founder's profile, contact card and story live at /founder.", cta: "Founder profile" },
};

export const INVESTORS_PAGE = {
  seo: {
    title: "Investors & Press — KisanShakti AI",
    description: "Stage, thesis and contact for investors and press.",
  },
  hero: {
    eyebrow: "Investors & Press",
    title: "Early-stage, bootstrapped, pre-revenue.",
    lead: "We publish no customer logos, revenue, accuracy figures or certifications because we have none to publish yet. What we can show is a working platform, a governed knowledge base, and a clear thesis.",
    fact: "company.stage",
  },
  thesis: [
    { title: "The thesis", body: "Agricultural advice at scale needs infrastructure that is governed and explainable, sold to the organisations that already serve farmers." },
    { title: "What exists today", body: "A live Farmer App, a Tenant SaaS Portal in limited release, a live SaaS Admin Portal, and the five-technology family at the maturity stated on this site." },
    { title: "How to reach us", body: "Use the partner form or the founder's contact card. We answer directly." },
  ],
};

export const CONTACT_PAGE = {
  seo: {
    title: "Partner with KisanShakti AI",
    description: "Tell us about your organisation and farmer network. We reply directly.",
  },
  hero: {
    eyebrow: "Partner with KisanShakti AI",
    title: "Tell us about your farmer network.",
    lead: "For FPOs, dealers, agri-input companies and agricultural enterprises. We reply directly and honestly about fit, coverage and timing.",
  },
  form: {
    name: "Your name",
    organisation: "Organisation",
    email: "Work email",
    phone: "Phone",
    orgType: "Organisation type",
    orgTypes: [
      { value: "fpo", label: "Farmer producer organisation" },
      { value: "dealer", label: "Dealer or distributor network" },
      { value: "input", label: "Agri-input company" },
      { value: "enterprise", label: "Agricultural enterprise" },
      { value: "other", label: "Other" },
    ],
    networkSize: "Network size (farmers)",
    networkSizes: [
      { value: "under_500", label: "Under 500", number: 250 },
      { value: "500_2000", label: "500 to 2,000", number: 1000 },
      { value: "2000_10000", label: "2,000 to 10,000", number: 5000 },
      { value: "over_10000", label: "Over 10,000", number: 15000 },
    ],
    message: "Message",
    submit: "Send",
    sending: "Sending…",
    success: "Thank you. We have your message and will reply directly.",
    privacy: "We use these details only to reply to you.",
  },
};

export const NOT_FOUND = { title: "This page does not exist.", body: "The address may have changed. Start from the home page.", cta: "Go home" };
