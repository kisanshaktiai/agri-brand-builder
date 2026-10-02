/**
 * Page copy. Product statements reference fact ids in src/content/facts.ts.
 * The story: Nature gives signals → TATVA observes → PAHRA alerts → Photo Scan
 * helps see → TARKA understands and guides → RIITU adapts the crop plan →
 * Market Intelligence supports decisions → Government Schemes and Agri
 * Services help execution → Community connects farmers → Farm Economics
 * helps understand the result.
 */
export const HOME = {
  seo: {
    title: "KisanShakti AI — A complete digital companion for every farmer and every land",
    description: "Understand what nature is doing on your land, know what is changing, talk to your land in your language, and follow a crop plan that adapts. Partners run it for their farmer networks under their own brand.",
  },
  hero: {
    eyebrow: "For every farmer. For every land.",
    title: "A complete digital companion for every farmer and every land.",
    lead: "KisanShakti AI understands what nature is doing on your land, tells you what is changing while you are away, talks with you in your language about each field, and keeps a crop plan that adapts to the season. Partner organisations run it for their own farmer networks under their own brand.",
  },
  thesis: {
    eyebrow: "What it is",
    title: "Not an AI product. A companion for the whole season.",
    body: "From the first signal nature gives to the last rupee counted, one app stays with the farmer and with each of their lands: observing, alerting, seeing, understanding, planning, informing, connecting and accounting. FPOs, dealers, agri-input companies and agricultural enterprises bring that same companion to their farmers under their own name.",
    fact: "app.companion",
  },
  living: {
    eyebrow: "One farmer. One land. One season.",
    title: "Start with the land. Let the companion follow the season.",
    steps: [
      { key: "land", arc: "Begin", feature: "Land setup", screen: "land", title: "Start with your land.", body: "Map each land once, record the crop and season, and give the companion the field it needs to follow. Everything that comes next is tied to this land.", fact: "app.land" },
      { key: "observe", arc: "Observe", tech: "tatva", screen: "weather", title: "TATVA understands what nature is doing.", body: "Sky, soil, water, temperature and weather, read for this land: the satellite's view of the field, hourly weather, rainfall and the heat the crop has gathered.", fact: "tatva.weather" },
      { key: "alert", arc: "Anticipate", tech: "pahra", screen: "alerts", title: "PAHRA says what is changing, even when you are away.", body: "As conditions shift, a land-specific alert tells you what changed and what deserves a look. Early access.", fact: "pahra.daily-risk" },
      { key: "see", arc: "See", feature: "Photo Scan", screen: "photo-scan", title: "Photo Scan helps you see the crop.", body: "Capture a leaf, a pest or a patch of field. The photo is read in the context of this land, so the observation means something.", fact: "app.photo-scan" },
      { key: "understand", arc: "Understand", tech: "tarka", screen: "chat-marathi", title: "TARKA understands and guides.", body: "Talk to your land, in your language. Each field has its own conversation that already knows the crop and the season, and answers with practical guidance and the reason why.", fact: "tarka.land-space" },
      { key: "plan", arc: "Plan", tech: "riitu", screen: "farm-today", title: "RIITU adapts the crop plan.", body: "A stage-wise plan for this land, updated as nature changes, so Farm Today always says what is due, what to watch and what is blocked.", fact: "riitu.farm-today" },
      { key: "market", arc: "Decide", tech: "rukh", screen: "market", title: "Market intelligence supports the decision.", body: "RUKH brings nearby mandi prices, comparisons and market context into the farmer's day. Information for the decision, never a promised price.", fact: "rukh.prices" },
      { key: "schemes", arc: "Support", feature: "Government Schemes", screen: "schemes", title: "Find support available to the farmer.", body: "Understand applicable agriculture schemes, benefits and eligibility in the farmer's language. No government affiliation is implied.", fact: "app.schemes" },
      { key: "services", arc: "Execute", feature: "Agri Services", screen: "services", title: "Find the help the farm needs.", body: "Connect with practical agricultural services such as labour and machinery, so the work the crop needs can be organised.", fact: "app.services" },
      { key: "connect", arc: "Connect", feature: "Community", screen: "community", title: "Community connects farmers beyond language.", body: "Farmers can share knowledge across languages—for example, a Telugu-speaking farmer can communicate with a Marathi-speaking farmer through the platform.", fact: "app.community" },
      { key: "result", arc: "Understand", feature: "Farm Economics", screen: "economics", title: "Farm Economics helps understand the result.", body: "Record crop-wise income and expenses for every land and understand the season's economics. Beta, under development and in testing.", fact: "app.economics" },
    ],
  },
  family: {
    eyebrow: "The Technology Family",
    title: "Five technologies behind one companion.",
    body: "These five named technologies power the intelligence layer. The Farmer App adds practical features—Photo Scan, government schemes, agri services, community and farm economics—around them.",
  },
  separation: {
    eyebrow: "Why it can be trusted",
    title: "AI explains. Expert-approved guidance decides.",
    body: "The AI understands your question and explains the answer in your language. What to apply, how much and when come only from expert-approved guidance that has been checked against your field and your crop's stage. The AI never invents a dose.",
    fact: "platform.separation",
  },
  evidence: {
    eyebrow: "Why did it say that?",
    title: "Every answer can explain itself.",
    body: "Follow one question from a rice field to the answer the farmer hears. Five plain checks stand between a question and a recommendation.",
    fact: "tarka.chain",
  },
  zoom: {
    eyebrow: "The platform",
    title: "From one farmer to the whole ecosystem.",
    steps: [
      { title: "A farmer and their lands", body: "One companion in their language, working offline, synced when the network returns." },
      { title: "A partner's network", body: "The organisation that serves this farmer runs the companion for its whole network under its own brand." },
      { title: "Many partner ecosystems", body: "FPOs, dealers, agri-input companies and enterprises, each with its own farmers and branding." },
      { title: "One shared platform", body: "The same governed intelligence and knowledge underneath them all." },
    ],
  },
  enterprise: {
    eyebrow: "For partner organisations",
    title: "Bring the companion to your farmers, under your name.",
    body: "Onboard your organisation, bring your farmers and their lands, set your brand, and follow farmer activity from the Partner Portal. KisanShakti AI is sold to organisations, never directly to farmers.",
    fact: "tenant.portal",
  },
  final: {
    line1: "A complete digital companion.",
    line2: "For every farmer.",
    line3: "For every land.",
    line4: "For the partners who bring them together.",
  },
};

export const TECHNOLOGY_PAGE = {
  seo: {
    title: "Technology — The KisanShakti AI Technology Family",
    description: "TATVA understands what nature is doing. PAHRA knows what is changing. TARKA lets you talk to your land. RIITU keeps a crop plan that adapts. RUKH knows the market around your crop.",
  },
  hero: {
    eyebrow: "Technology",
    title: "The Technology Family.",
    lead: "Five named technologies form the intelligence layer: TATVA observes, PAHRA alerts, TARKA lets you talk with your land, RIITU adapts the crop plan, and RUKH brings market intelligence around your crop.",
  },
  hierarchy: {
    eyebrow: "How it fits together",
    title: "KisanShakti AI, then the family, then everyone it serves.",
  },
};

export const PLATFORM_PAGE = {
  seo: {
    title: "Platform — One companion, your farmer ecosystem",
    description: "A white-label platform for partners: three connected surfaces on one shared foundation, run under each organisation's own brand.",
  },
  hero: {
    eyebrow: "Platform",
    title: "One companion. Your farmer ecosystem.",
    lead: "Three connected surfaces on one shared foundation. The Farmer App is the farmer's daily companion, the Partner Portal is the partner organisation's operating layer, and the Admin Portal is the control plane that governs the platform.",
    fact: "platform.surfaces",
  },
  transform: {
    eyebrow: "White-label, for partners",
    title: "Your brand on top. The same companion underneath.",
    body: "A partner runs the farmer experience under its own name, colours and context. The guidance, crop plans and safety checks are shared and governed centrally. Partners configure their ecosystem; they do not receive or fork the platform's code.",
    fact: "platform.multi-tenant",
    layers: ["Partner brand and context", "Farmer App experience", "Shared governed intelligence", "Platform administration"],
  },
  architecture: {
    eyebrow: "Architecture",
    title: "How the companion fits together.",
    hint: "Explore the Farmer App, Partner Portal, Admin Portal and the five named technologies.",
  },
  days: {
    eyebrow: "Two days, side by side",
    title: "One farmer's day. One partner's day.",
    farmer: [
      { time: "06:30", text: "TATVA shows what nature is doing on each land: sky, soil, water, temperature and weather.", fact: "tatva.weather" },
      { time: "08:00", text: "PAHRA surfaces a land-specific change worth noticing; Early access.", fact: "pahra.daily-risk" },
      { time: "10:30", text: "Photo Scan helps inspect a crop photo, then TARKA lets the farmer ask that land about it.", fact: "app.photo-scan" },
      { time: "12:00", text: "TARKA answers in the farmer's language with practical guidance and the reason why.", fact: "tarka.land-space" },
      { time: "15:00", text: "RIITU keeps Farm Today aligned with the crop's stage and changing conditions.", fact: "riitu.farm-today" },
      { time: "18:00", text: "RUKH brings nearby mandi prices and market context into the decision.", fact: "rukh.prices" },
      { time: "19:00", text: "Government schemes, agri services and community help the farmer act; Farm Economics records the season's numbers in beta.", fact: "app.companion" },
    ],
    partner: [
      { time: "09:00", text: "Onboard a new farmer group and their lands.", fact: "tenant.portal" },
      { time: "10:30", text: "Review farmer activity across the network.", fact: "tenant.portal" },
      { time: "12:00", text: "Update the organisation's branding; farmers see it on their next sync.", fact: "tenant.portal" },
      { time: "15:00", text: "Check land records and crop coverage across villages.", fact: "tenant.portal" },
      { time: "17:00", text: "Everything ran under the partner's own context, on the shared companion.", fact: "platform.multi-tenant" },
    ],
  },
  governance: {
    eyebrow: "Governance",
    title: "The Admin Portal is the governance layer, not another farmer app.",
    body: "Partners, users, agronomy masters for crops, varieties, companies and products, and the advisory knowledge base are governed in one place, with monitoring across partners.",
    fact: "admin.portal",
  },
};

export const FARMER_APP_PAGE = {
  seo: {
    title: "Farmer App — A complete digital companion for every farmer and every land",
    description: "Understand what nature is doing, know what is changing, see the crop, talk to your land, follow a plan that adapts, know the market, find schemes and services, connect with farmers, and understand farm economics.",
  },
  hero: {
    eyebrow: "Farmer App · Live",
    title: "One companion for every land you farm.",
    lead: "In 14 Indian languages, voice-first and offline-first, with mobile number and PIN login. It works on weak networks and syncs when the network returns.",
  },
  sections: [
    { id: "land", title: "Start with the land.", body: "Map the boundary and get the area automatically. Record season, crop, variety, sowing date and how the crop is grown. Each land carries a satellite thumbnail and a land health score, and from then on the companion knows this field.", screen: "land", fact: "app.land" },
    { id: "nature", title: "Understand what nature is doing.", body: "KisanShakti TATVA reads the five natural elements for each land: Sky, Soil, Water, Temperature and Weather. The satellite's daily view of the field, hourly weather and a 7-day outlook, rainfall and water, the heat the crop has gathered, and a soil picture from your own soil test.", screen: "ndvi", fact: "tatva.ndvi" },
    { id: "alerts", title: "Know what is changing, even when you are away.", body: "KisanShakti PAHRA sends land-specific alerts as farm and weather conditions change, so you notice what matters and know when a field needs attention. Early access.", screen: "alerts", fact: "pahra.daily-risk" },
    { id: "scan", title: "See and understand the crop.", body: "Photo Scan: capture or upload a photo of the crop or field for AI-assisted observation. It helps identify visible crop, pest, disease, deficiency or field issues, and connects what it sees with this land's context.", screen: "photo-scan", fact: "app.photo-scan" },
    { id: "ask", title: "Talk to your land.", body: "KisanShakti TARKA is a multilingual AI assistant developed in India, and it is not a generic chatbot. Every land has its own conversation, which already knows your crop and your field. Ask by voice or text, add a photo, and get practical guidance with the reason why. Many Indian languages, and you can ask in one and share in another.", screen: "chat-marathi", fact: "tarka.land-space" },
    { id: "today", title: "Follow a crop plan that adapts to nature.", body: "KisanShakti RIITU builds a practical, stage-wise plan for each land, then adapts it when TATVA sees the field or the weather change. Farm Today lists what is Due, what to Watch, what is Blocked and what is good to know.", screen: "farm-today", fact: "riitu.farm-today" },
    { id: "market", title: "Know the market around your crop.", body: "KisanShakti RUKH: today's mandi prices, nearby markets, comparisons across the state and over time, and a selling advisor in plain words. Market insight, not a guaranteed price.", screen: "market", fact: "rukh.prices" },
    { id: "schemes", title: "Discover the support you are eligible for.", body: "Government Schemes: find and understand applicable agriculture schemes, benefits and eligibility, such as PM-Kisan, crop insurance and Soil Health Card, in your language. No government affiliation is implied.", screen: "schemes", fact: "app.schemes" },
    { id: "services", title: "Find the help the farm needs.", body: "Agri Services: a practical service ecosystem connecting you with agricultural services such as labour and machinery, so the work the plan calls for actually gets done.", screen: "services", fact: "app.services" },
    { id: "community", title: "Farmers connected beyond language.", body: "A multilingual farmer community: feed, photos, comments, groups and group chat, trending topics and read-aloud. A Telugu-speaking farmer can talk with a Marathi-speaking farmer through the platform.", screen: "community", fact: "app.community" },
    { id: "economics", title: "Understand income and expenses.", body: "Farm Economics, for every farmer and every land: record and understand crop-wise income, expenses and the season's result. This capability is in beta, under development and in testing. It is not yet a fully released feature.", screen: "economics", fact: "app.economics", maturity: "beta" },
  ],
  more: [
    { title: "Videos", body: "Short education reels from the KisanShakti AI YouTube channel, including crop-wise season journeys such as sugarcane from pre-season through ratoon.", fact: "app.videos", maturity: "live" },
    { title: "Farm Analytics", body: "Total area, active crops, and projected revenue and profit from your logged expenses and expected yield at current prices. Every projection carries a notice.", fact: "app.analytics", maturity: "live-limited" },
    { title: "Growth tracking", body: "Field readings and crop photos that keep the plan honest about the crop's actual stage.", fact: "riitu.growth", maturity: "live-limited" },
    { title: "Voice-first", body: "Voice onboarding, voice land capture, questions by voice and answers read aloud.", fact: "app.voice", maturity: "live" },
    { title: "Offline-first", body: "A PWA plus Android and iOS builds that work on weak networks and sync when back online.", fact: "app.offline", maturity: "live" },
    { title: "Mobile number and PIN", body: "Sign in with a mobile number and a PIN. No email needed.", fact: "app.login", maturity: "live" },
  ],
};

export const ENTERPRISES_PAGE = {
  seo: {
    title: "For Partners — Bring the companion to your farmers",
    description: "For FPOs, dealers, agri-input companies and agricultural enterprises: run a branded farmer ecosystem on one shared, governed companion.",
  },
  hero: {
    eyebrow: "For partner organisations",
    title: "Your farmers. Your brand. One companion underneath.",
    lead: "KisanShakti AI is sold to organisations, not directly to farmers. An FPO, a dealer network, an agri-input company or an agricultural enterprise becomes a partner and brings the companion to its own farmer network.",
  },
  journey: {
    eyebrow: "The partner journey",
    title: "From first conversation to a running farmer network.",
    steps: [
      { title: "Talk to us", body: "Tell us who you serve and how large your network is. We confirm fit, coverage and timing honestly." },
      { title: "Onboard the organisation", body: "Partner onboarding sets up your organisation and its users in the Partner Portal.", fact: "tenant.portal" },
      { title: "Set your brand", body: "Partner branding puts your name and colours on the farmer experience, running under your context.", fact: "tenant.portal" },
      { title: "Bring farmers and lands", body: "Farmer management and land management hold your network and its fields.", fact: "tenant.portal" },
      { title: "Follow activity", body: "Farmer activity shows how your network uses the companion, day by day.", fact: "tenant.portal" },
    ],
  },
  fit: {
    eyebrow: "Who it is for",
    title: "Four kinds of partner.",
    types: [
      { title: "Farmer producer organisations", body: "Serve member farmers with one companion that carries the FPO's name." },
      { title: "Dealer networks", body: "Stay present in the farmer's day between visits, under your own brand." },
      { title: "Agri-input companies", body: "Reach the farmers who use your products with practical, expert-reviewed guidance." },
      { title: "Agricultural enterprises", body: "Run a farmer network with land records, activity and branding in one portal." },
    ],
  },
  honest: {
    eyebrow: "What you get, and what you do not",
    title: "The Partner Portal is an operating layer, not a back office.",
    body: "It covers partner onboarding, farmer management, land management, partner branding and farmer activity. It is not a CRM, ERP, accounting or sales-force system, and we do not claim it is.",
    fact: "tenant.portal",
  },
};

export const SECURITY_PAGE = {
  seo: {
    title: "Security & Governance — How KisanShakti AI keeps guidance honest",
    description: "Governed decisions, evidence chains, safety checks, controlled administration and partner-specific context and branding.",
  },
  hero: {
    eyebrow: "Security & Governance",
    title: "What is verified, stated plainly.",
    lead: "We describe the controls that exist in the product today, and we say what is still pending.",
  },
  principles: [
    { title: "Governed decisions", body: "Doses, quantities and timing come only from expert-approved guidance. The AI understands and explains; it never decides.", fact: "platform.separation" },
    { title: "Evidence chains", body: "Every piece of guidance keeps its source, the crop stage it applies to and its approval status. A recommendation can be followed back to its evidence.", fact: "tarka.chain" },
    { title: "Safety checks", body: "A chemical recommendation cannot reach a farmer without a dose, a waiting period and expert approval. Safety checks always win over advice.", fact: "tarka.chemical-gate" },
    { title: "Controlled administration", body: "Partners, agronomy masters and the advisory knowledge base are administered from the Admin Portal, with monitoring.", fact: "admin.portal" },
    { title: "Partner-specific context and branding", body: "Each partner runs under its own context and brand.", fact: "tenant.portal" },
  ],
  pending: {
    title: "What is pending",
    body: "A partner-isolation security audit has not yet been completed. Until it is, we make no technical isolation claims and hold no security certifications. We will update this page when that changes.",
    fact: "security.verified",
  },
};

export const COMPANY_PAGE = {
  seo: {
    title: "Company — KisanShakti AI",
    description: "An early-stage, bootstrapped agricultural technology company based in Maharashtra, India, building a complete digital companion for every farmer and every land.",
  },
  hero: {
    eyebrow: "Company",
    title: "Built in Maharashtra, for the field.",
    lead: "KisanShakti AI is an early-stage, bootstrapped company. We are pre-revenue, and we would rather show you the product than a logo wall.",
    fact: "company.stage",
  },
  principles: {
    eyebrow: "Principles",
    title: "What we hold ourselves to.",
    items: [
      { title: "Every farmer, every land", body: "The companion follows each land, not just each user." },
      { title: "Nature first", body: "Every answer starts from what the sky, soil, water, temperature and weather are doing on that field." },
      { title: "Offline-first", body: "It must work on a weak network and sync when the network returns." },
      { title: "Explainable", body: "If we cannot say why, we do not recommend." },
      { title: "Honest maturity", body: "Live is live. Early access is early access. Beta is beta." },
    ],
  },
  vision: {
    eyebrow: "Long-term vision",
    title: "A companion every farmer can trust, in their own language.",
    body: "One digital companion that any agricultural organisation can bring to its farmers, on the farmer's phone, in the farmer's language, accountable for every piece of guidance it gives.",
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
    lead: "We publish no customer logos, revenue, accuracy figures or certifications because we have none to publish yet. What we can show is a working companion, a governed knowledge base, and a clear thesis.",
    fact: "company.stage",
  },
  thesis: [
    { title: "The thesis", body: "Every farmer and every land deserves a companion that understands nature, speaks their language and keeps its guidance honest, brought to them by the organisations that already serve them." },
    { title: "What exists today", body: "A live Farmer App, a Partner Portal in limited release, a live Admin Portal, and the five-technology family at the maturity stated on this site." },
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
