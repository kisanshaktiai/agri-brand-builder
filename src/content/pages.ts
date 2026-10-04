/**
 * Page copy. Product statements reference fact ids in src/content/facts.ts.
 * The story: Nature gives signals → TATVA observes → PAHRA alerts → Photo Scan
 * helps see → TARKA understands and guides → RIITU adapts the crop plan →
 * Market Intelligence supports decisions → Government Schemes support →
 * Community connects farmers → Farm Economics
 * helps understand the result.
 */
export const HOME = {
  seo: {
    title: "KisanShakti AI — AI-powered agricultural intelligence built around every land",
    description: "AI-powered agricultural intelligence built around each land, helping farmers understand changing field conditions, ask questions in their language, follow an adaptive crop plan and make informed decisions. Partners can bring the experience to their farmer networks under their own brand.",
  },
  hero: {
    eyebrow: "For every farmer. For every land.",
    title: "AI that understands every land. A companion for the whole season.",
    lead: "Your land. Your language. One companion that watches the field, warns you early, plans the season and tracks mandi prices. Organisations bring it to their farmers under their own brand.",
  },
  thesis: {
    eyebrow: "What it is",
    title: "Not just another AI chatbot. Agricultural intelligence built around every land.",
    body: "KisanShakti AI brings together conversation, field intelligence, agricultural knowledge and land context in one experience. It watches each land, notices what is changing and helps the farmer understand the crop. It keeps the season's plan in step with the field and brings market prices and scheme information closer. The Farmer App is what the farmer uses; the Partner Portal is how an organisation runs it for its own farmers.",
    fact: "platform.ai-intelligence",
  },
  living: {
    eyebrow: "One farmer. One land. One season.",
    title: "Start with the land. Then watch the season unfold.",
    steps: [
      { key: "land", arc: "Begin", feature: "Land setup", screen: "land", title: "Start with your land.", body: "Map each land once, record the crop and season, and give the app the field it needs to follow. Everything that comes next is tied to this land.", fact: "app.land" },
      { key: "observe", arc: "Observe", tech: "tatva", screen: "weather", title: "TATVA understands what nature is doing.", body: "Panch Tatva — Sky, Soil, Water, Temperature and Weather, read for this land: the satellite's view of the field, hourly weather, rainfall and the heat the crop has gathered.", fact: "tatva.weather" },
      { key: "alert", arc: "Anticipate", tech: "pahra", screen: "alerts", title: "PAHRA says what is changing, even when you are away.", body: "As conditions shift, a land-specific alert tells you what changed and what deserves a look. (Early access)", fact: "pahra.daily-risk" },
      { key: "see", arc: "See", feature: "Photo Scan", screen: "photo-scan", title: "Photo Scan helps you see the crop.", body: "Capture a leaf, a pest or a patch of field. The photo is read in the context of this land, so the observation means something.", fact: "app.photo-scan" },
      { key: "understand", arc: "Understand", tech: "tarka", screen: "chat-marathi", title: "TARKA understands and guides.", body: "Talk to your land, in your language. Each field has its own conversation that already knows the crop and the season, and answers with practical guidance and the reason why.", fact: "tarka.land-space" },
      { key: "plan", arc: "Plan", tech: "riitu", screen: "farm-today", title: "RIITU adapts the crop plan.", body: "A stage-wise plan for this land, checked every night against the crop's stage and conditions, so Farm Today says what is due, what to watch and what is blocked.", fact: "riitu.farm-today" },
      { key: "market", arc: "Decide", tech: "rukh", screen: "market", title: "RUKH shows the market before you sell.", body: "RUKH brings nearby mandi prices, comparisons and market context into the farmer's day. Information for the decision, never a promised price.", fact: "rukh.prices" },
      { key: "schemes", arc: "Support", feature: "Government Schemes", screen: "schemes", title: "Find support available to the farmer.", body: "Understand applicable agriculture schemes, benefits and eligibility in the farmer's language. No government affiliation is implied.", fact: "app.schemes" },
      { key: "connect", arc: "Connect", feature: "Community", screen: "community", title: "Community connects farmers beyond language.", body: "Farmers can share knowledge across languages—for example, a Telugu-speaking farmer can communicate with a Marathi-speaking farmer through the platform.", fact: "app.community" },
      { key: "result", arc: "Review", feature: "Farm Economics", screen: "economics", title: "Farm Economics helps understand the result.", body: "Record crop-wise income and expenses for every land and understand the season's economics. (Early access)", fact: "app.economics" },
    ],
  },
  demos: {
    eyebrow: "See it work",
    title: "Six features, one step at a time.",
    body: "Pick a feature and step through it. Each phone shows what the farmer sees in the app; the numbers on it are examples.",
    prev: "Back",
    next: "Next",
    again: "Start again",
    stepOf: "Step {n} of {total}",
    tabs: [
      { key: "chat", label: "AI chat with photo", tech: "tarka", maturity: "live-limited", steps: [
        { screen: "photo-scan", title: "Take a photo of the problem.", body: "In the chat for this land, tap the camera and photograph the leaf, pest or patch. The photo stays tied to this land.", fact: "app.photo-scan" },
        { screen: "chat-marathi", title: "Ask in your own words.", body: "Ask by voice or text, in your language. TARKA already knows the crop, its stage and the field.", fact: "tarka.land-space" },
        { screen: "evidence", title: "See why it said that.", body: "The answer can show what it was checked against: this land, this crop stage and expert-approved guidance. It never makes up a dose.", fact: "tarka.chain" },
      ] },
      { key: "plan", label: "Crop plan and Farm Today", tech: "riitu", maturity: "live-limited", steps: [
        { screen: "land", title: "Add the land once.", body: "Map the boundary, then record the crop, variety and sowing date. The area is worked out for you.", fact: "app.land" },
        { screen: "schedule", title: "Get a plan for each stage.", body: "RIITU builds the season's plan from days since sowing, the heat the crop has gathered and the variety.", fact: "riitu.stage-graph" },
        { screen: "farm-today", title: "Know what to do today.", body: "Farm Today sorts the day into Due, Watch, Blocked and Info, and the plan is checked again every night.", fact: "riitu.farm-today" },
      ] },
      { key: "weather", label: "Weather and satellite", tech: "tatva", maturity: "live", steps: [
        { screen: "weather", title: "Weather for this land, hour by hour.", body: "Hourly and 7-day forecasts, rainfall and weather alerts for where this land is.", fact: "tatva.weather" },
        { screen: "ndvi", title: "The satellite's view of the field.", body: "Daily satellite readings give a land health score and show which part of the field is changing.", fact: "tatva.ndvi" },
      ] },
      { key: "alerts", label: "Alerts", tech: "pahra", maturity: "beta", steps: [
        { screen: "alerts", title: "An alert for this land.", body: "When risk rises, PAHRA says what changed and asks you to go and look. It never prescribes a chemical. Early access.", fact: "pahra.daily-risk" },
        { screen: "photo-scan", title: "Check it with a photo.", body: "Walk the field, photograph what you see, then ask TARKA about it before you decide.", fact: "app.photo-scan" },
      ] },
      { key: "market", label: "Market prices", tech: "rukh", maturity: "live-limited", steps: [
        { screen: "market", title: "Today's mandi prices.", body: "Today's prices, nearby markets, the price trend and selling advice in plain words.", fact: "rukh.prices" },
        { screen: "analytics", title: "Prices feed your farm numbers.", body: "Market prices flow into Farm Analytics, so projected revenue uses today's price. Every projection says it is a projection.", fact: "rukh.analytics" },
      ] },
      { key: "partner", label: "Partner platform", maturity: "live-limited", steps: [
        { portal: 0, title: "One platform underneath.", body: "Farmers, lands, field signals and engagement are run from one Partner Portal on a shared, governed platform.", fact: "tenant.portal" },
        { portal: 1, title: "Your name and colours on top.", body: "A partner such as an FPO runs the farmer experience under its own brand. Partners get the service, not the source code.", fact: "platform.multi-tenant" },
        { portal: 2, title: "Every partner, the same guidance.", body: "A dealer network or an agri company gets its own workspace, while the agronomy guidance underneath stays the same and centrally governed.", fact: "platform.multi-tenant" },
      ] },
    ],
  },
  family: {
    eyebrow: "The Technology Family",
    title: "Five intelligence technologies behind one AI companion.",
    body: "Each has one job across the season: TATVA reads nature on each land, PAHRA flags what is changing (early access), TARKA answers the farmer's questions, RIITU keeps the crop plan and RUKH brings in the market. Around them, the Farmer App adds practical features such as Photo Scan, Government Schemes, Community and Farm Economics.",
  },
  separation: {
    eyebrow: "Why it can be trusted",
    title: "AI understands. Governed agricultural guidance decides.",
    body: "The AI understands the farmer's question and explains the answer in the farmer's language. What to apply, how much and when come only from expert-approved guidance, checked against this field and the crop's stage.",
    fact: "platform.separation",
  },
  evidence: {
    eyebrow: "Why did it say that?",
    title: "Every answer can explain itself.",
    body: "Follow one question from a rice field to the answer the farmer hears. Five plain steps take a question to a recommendation.",
    fact: "tarka.chain",
  },
  zoom: {
    eyebrow: "The platform",
    title: "From one farmer to the whole ecosystem.",
    steps: [
      { title: "A farmer and their lands", body: "One companion in their language, working offline, synced when the network returns." },
      { title: "A partner's network", body: "The organisation that serves these farmers runs the companion for its network, with the Partner Portal features it has switched on and its own brand." },
      { title: "Many partner ecosystems", body: "Government programmes, sugar factories, co-operatives, FPOs, agri companies, dealers and retailers, NGOs, banks, insurers and other farmer-serving organisations can each run an ecosystem with its own context and branding." },
      { title: "One shared platform", body: "The same governed intelligence and knowledge underneath them all." },
    ],
  },
  enterprise: {
    eyebrow: "For partner organisations",
    title: "Bring the companion to your farmers, under your name.",
    body: "Onboard your organisation, bring in your farmers and their lands, switch on the features you need and set your brand. Then run your farmer network from the Partner Portal. KisanShakti AI is sold to organisations, never directly to farmers.",
    fact: "tenant.portal",
  },
  final: {
    line1: "One digital companion.",
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
    title: "Agricultural intelligence for the whole season.",
    lead: "Five named intelligence technologies work together to help the farmer understand the land, notice change, ask questions, adapt the crop plan and bring market context into everyday decisions.",
  },
  hierarchy: {
    eyebrow: "How it fits together",
    title: "KisanShakti AI, its intelligence family, and everyone it serves.",
  },
};

export const PLATFORM_PAGE = {
  seo: {
    title: "Platform — One companion, your farmer ecosystem",
    description: "A white-label platform for partners: the Farmer App and the Partner Portal on one shared foundation, run under each organisation's own brand.",
  },
  hero: {
    eyebrow: "Platform",
    title: "One AI companion. Your farmer ecosystem.",
    lead: "Two connected parts on one shared foundation of agricultural intelligence, governed centrally. The Farmer App is the farmer's daily companion. The Partner Portal is where a partner organisation runs that experience for its own farmers, under its own brand.",
    fact: "platform.surfaces",
  },
  transform: {
    eyebrow: "White-label, for partners",
    title: "Your brand. Your farmer network. The same agricultural intelligence underneath.",
    body: "A partner runs the farmer experience under its own name, colours and context. The agricultural intelligence, crop guidance and safety controls are governed centrally, while the partner configures the farmer ecosystem around its needs. Partners receive the service, not the underlying source code.",
    fact: "platform.core",
    layers: ["Partner brand and context", "Farmer App experience", "Shared Agricultural Intelligence", "Platform administration"],
  },
  architecture: {
    eyebrow: "Architecture",
    title: "How the companion fits together.",
    hint: "Explore the Farmer App, the Partner Portal and the shared agricultural intelligence foundation behind the five named technologies.",
  },
  days: {
    eyebrow: "Two days, side by side",
    title: "One farmer's day. One partner's day.",
    farmer: [
      { time: "06:30", text: "TATVA shows what nature is doing on each land: sky, soil, water, temperature and weather.", fact: "tatva.weather" },
      { time: "08:00", text: "PAHRA surfaces a land-specific change worth noticing. (Early access)", fact: "pahra.daily-risk" },
      { time: "10:30", text: "Photo Scan helps inspect a crop photo, then TARKA lets the farmer ask that land about it.", fact: "app.photo-scan" },
      { time: "12:00", text: "TARKA answers in the farmer's language with practical guidance and the reason why.", fact: "tarka.land-space" },
      { time: "15:00", text: "RIITU keeps Farm Today aligned with the crop's stage and changing conditions.", fact: "riitu.farm-today" },
      { time: "18:00", text: "RUKH brings nearby mandi prices and market context into the decision.", fact: "rukh.prices" },
      { time: "19:00", text: "Government Schemes and Community support the farmer; Farm Economics, in early access, records the season's numbers.", fact: "app.companion" },
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
    eyebrow: "Governed centrally",
    title: "One companion, kept honest for every partner.",
    body: "Crops, varieties, products and the advisory knowledge every farmer receives are governed centrally and reviewed by experts, so a partner's farmers get the same trusted guidance under the partner's own name.",
    fact: "admin.portal",
  },
};

export const FARMER_APP_PAGE = {
  seo: {
    title: "Farmer App — One digital companion for every farmer and every land",
    description: "Understand what nature is doing, know what is changing, see the crop, talk to your land, follow a plan that adapts, know the market, find schemes, connect with farmers, and understand your farm economics.",
  },
  hero: {
    eyebrow: "Farmer App · Live",
    title: "An AI companion for every land you farm.",
    lead: "One app in 14 Indian languages, voice-first and offline-first, with mobile number and PIN login. It works on weak networks and syncs when the network returns.",
  },
  sections: [
    { id: "land", title: "Start with the land.", body: "Map the boundary and get the area automatically. Record season, crop, variety, sowing date and how the crop is grown. Each land carries a satellite thumbnail and a land health score, and from then on the companion knows this field.", screen: "land", fact: "app.land" },
    { id: "nature", title: "Understand what nature is doing.", body: "KisanShakti TATVA reads Panch Tatva for each land — Sky, Soil, Water, Temperature and Weather. The satellite's daily view of the field, hourly weather and a 7-day outlook, rainfall and water, the heat the crop has gathered, and a soil picture from your own soil test.", screen: "ndvi", fact: "tatva.ndvi" },
    { id: "alerts", title: "Know what is changing, even when you are away.", body: "KisanShakti PAHRA sends land-specific alerts as farm and weather conditions change, so you notice what matters and know when a field needs attention. Early access.", screen: "alerts", fact: "pahra.daily-risk" },
    { id: "scan", title: "See and understand the crop.", body: "Photo Scan: capture or upload a photo of the crop or field for AI-assisted observation. It helps identify visible crop, pest, disease, deficiency or field issues, and connects what it sees with this land's context.", screen: "photo-scan", fact: "app.photo-scan" },
    { id: "ask", title: "Talk to your land.", body: "KisanShakti TARKA is the AI you talk to, and it is not a generic chatbot. Every land has its own conversation, which already knows your crop and your field. Ask by voice or text, add a photo, and get practical guidance with the reason why. You can ask in one Indian language and share the answer in another.", screen: "chat-marathi", fact: "tarka.land-space" },
    { id: "today", title: "Follow a crop plan that adapts to nature.", body: "KisanShakti RIITU builds a practical, stage-wise plan for each land, then adapts it when TATVA sees the field or the weather change. Farm Today lists what is Due, what to Watch, what is Blocked and what is good to know.", screen: "farm-today", fact: "riitu.farm-today" },
    { id: "market", title: "Know the market around your crop.", body: "KisanShakti RUKH: today's mandi prices, nearby markets, comparisons across the state and over time, and a selling advisor in plain words. Market insight, not a guaranteed price.", screen: "market", fact: "rukh.prices" },
    { id: "schemes", title: "Discover the support you are eligible for.", body: "Government Schemes: find and understand applicable agriculture schemes, benefits and eligibility, such as PM-Kisan, crop insurance and Soil Health Card, in your language. No government affiliation is implied.", screen: "schemes", fact: "app.schemes" },
    { id: "community", title: "Farmers connected beyond language.", body: "A multilingual farmer community: feed, photos, comments, groups and group chat, trending topics and read-aloud. Posts written in one language can be read and answered in another.", screen: "community", fact: "app.community" },
    { id: "economics", title: "Understand income and expenses.", body: "Farm Economics, for each of your lands: record and understand crop-wise income, expenses and the season's result. Early access: still under development and in testing, and not yet a fully released feature.", screen: "economics", fact: "app.economics", maturity: "beta" },
  ],
  more: [
    { title: "Videos", body: "Short education reels from the KisanShakti AI YouTube channel, including crop-wise season journeys such as sugarcane from pre-season through ratoon.", fact: "app.videos", maturity: "live" },
    { title: "Farm Analytics", body: "Total area, active crops, and projected revenue and profit from your logged expenses and expected yield at current prices. Every projection carries a projection notice.", fact: "app.analytics", maturity: "live-limited" },
    { title: "Growth tracking", body: "Field readings and crop photos that keep the plan honest about the crop's actual stage.", fact: "riitu.growth", maturity: "live-limited" },
    { title: "Voice-first", body: "Voice onboarding, voice land capture, questions by voice and answers read aloud.", fact: "app.voice", maturity: "live" },
    { title: "Offline-first", body: "A web app (PWA) plus Android and iOS apps that work on weak networks and sync when back online.", fact: "app.offline", maturity: "live" },
    { title: "Mobile number and PIN", body: "Sign in with a mobile number and a PIN. No email needed.", fact: "app.login", maturity: "live" },
    { title: "Agri Services", body: "Finding labour and machinery near the farm is on the roadmap. It is not in the app yet.", fact: "app.services", maturity: "planned" },
  ],
};

export const ENTERPRISES_PAGE = {
  seo: {
    title: "For Partners — Bring the companion to your farmers",
    description: "For organisations that serve farmers: run a branded farmer ecosystem with farmer and land operations, field intelligence, engagement, analytics and enabled commercial workflows on one shared, governed platform.",
  },
  hero: {
    eyebrow: "For partner organisations",
    title: "Your farmers. Your brand. AI-powered agricultural intelligence.",
    lead: "Bring AI-powered farming guidance to your farmer network: a Farmer App your farmers use in their own language, and a Partner Portal your team uses to run it.",
  },
  capabilities: {
    eyebrow: "The Partner Portal",
    title: "More than farmer management.",
    body: "The Partner Portal is the operating surface for an organisation's farmer ecosystem. It brings farmer and land operations, field intelligence, engagement, analytics and enabled commercial workflows into one place.",
    groups: [
      { title: "Farmer & field operations", items: ["Farmer management", "Land management", "Crop monitoring", "Satellite vegetation monitoring (NDVI)", "Soil analysis", "Proactive alerts"] },
      { title: "Products & commercial operations", items: ["Product catalogue", "Dealer network management", "Sales dashboard", "Order management", "Cart and order workflows", "Sales analytics"] },
      { title: "Farmer engagement", items: ["Campaigns", "Notifications", "Messages", "Community / forum surfaces"] },
      { title: "Intelligence & reporting", items: ["Analytics", "Reports and performance views", "Network activity and engagement insights"] },
      { title: "Organisation & white-label", items: ["Organisation management", "Users, roles and permissions", "White-label branding", "Appearance", "Localisation", "Integrations", "Partner settings", "Subscription settings"] },
    ],
  },
  journey: {
    eyebrow: "The partner journey",
    title: "From first conversation to a running farmer network.",
    steps: [
      { title: "Talk to us", body: "Tell us who you serve and how large your network is. We tell you what fits today and when you could start." },
      { title: "Onboard the organisation", body: "Partner onboarding sets up your organisation and its users in the Partner Portal.", fact: "tenant.portal" },
      { title: "Set your brand", body: "Partner branding puts your name and colours on the farmer experience, running under your context.", fact: "tenant.portal" },
      { title: "Bring farmers and lands", body: "Farmer management and land management hold your network and its fields.", fact: "tenant.portal" },
      { title: "Follow activity", body: "Farmer activity shows how your network uses the companion, day by day.", fact: "tenant.portal" },
    ],
  },
  fit: {
    eyebrow: "Who can be a partner",
    title: "Built for organisations that serve farmers.",
    types: [
      { title: "Government & development programmes", body: "Bring structured farmer support, field context and programme-specific services to a defined farmer network." },
      { title: "Sugar factories & co-operative societies", body: "Support grower networks with land, crop, activity and engagement context under the organisation's identity." },
      { title: "FPOs, agri companies & service providers", body: "Serve members or customers with a branded farmer ecosystem and the portal capabilities your organisation enables." },
      { title: "Dealers, distributors & retailers", body: "Manage farmer relationships, products, dealer networks, engagement and enabled sales workflows from one portal." },
      { title: "NGOs & farmer-support organisations", body: "Run farmer programmes with organisation-level management, communication, monitoring and reporting surfaces." },
      { title: "Banks & insurance companies", body: "Use the farmer ecosystem as a digital service and engagement layer; financial underwriting, policy administration and regulated workflows remain separate unless implemented." },
      { title: "Other farmer-serving organisations", body: "Agritech, advisory, machinery, input, supply-chain and other organisations can partner where the platform fits their farmer-service model." },
    ],
  },
  honest: {
    eyebrow: "What you get, and what you do not",
    title: "One partner operating layer for an AI-powered farmer ecosystem.",
    body: "The portal brings together farmer and land operations, field intelligence, products and dealer workflows, campaigns, communications, analytics, alerts, organisation controls and white-label configuration. Which modules you get depends on your configuration, and some are still in early access or under development. It is not a generic CRM, ERP or accounting replacement. Banking, insurance or government workflows are not included unless they are separately built.",
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
    { title: "Controlled administration", body: "Crops, varieties, products and the advisory knowledge base are administered centrally, with monitoring. Partners configure their ecosystem; they never change the guidance itself.", fact: "admin.portal" },
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
    description: "An early-stage, bootstrapped AI company based in Maharashtra, India, building agricultural intelligence and a digital companion around each farmer's land.",
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
      { title: "Nature first", body: "Guidance takes account of what the sky, soil, water, temperature and weather are doing on that field." },
      { title: "Offline-first", body: "It must work on a weak network and sync when the network returns." },
      { title: "Explainable", body: "If we cannot say why, we do not recommend." },
      { title: "Honest maturity", body: "Live is live. Early access is early access. Roadmap means not built yet." },
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
    title: "Early-stage, bootstrapped, pre-revenue. Built in Maharashtra.",
    lead: "No customer logos, revenue or certifications yet, so we do not show any. What is real today: a live Farmer App in 14 Indian languages, a Partner Portal in limited release, crop plans built Maharashtra-first, and a governed knowledge base behind the guidance.",
    fact: "company.stage",
  },
  thesis: [
    { title: "The thesis", body: "Every farmer and every land deserves a companion that understands nature, speaks their language and keeps its guidance honest, brought to them by the organisations that already serve them." },
    { title: "What exists today", body: "The five-technology family, each at its stated maturity: TATVA live; TARKA, RIITU and RUKH live with stated limits; PAHRA in early access." },
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
    lead: "For FPOs, co-operatives, sugar factories, agri companies, dealers, programmes and other organisations that serve farmers. We reply directly and honestly about fit, coverage and timing.",
  },
  form: {
    name: "Your name",
    organisation: "Organisation",
    email: "Work email",
    phone: "Phone",
    orgType: "Organisation type",
    orgTypes: [
      { value: "government", label: "Government or development programme" },
      { value: "sugar_factory", label: "Sugar factory" },
      { value: "cooperative", label: "Co-operative society" },
      { value: "fpo", label: "FPO / farmer producer company" },
      { value: "agri_company", label: "Agri company or service provider" },
      { value: "dealer", label: "Agri dealer, distributor or retailer" },
      { value: "ngo", label: "NGO or farmer-support organisation" },
      { value: "bank", label: "Bank or financial institution" },
      { value: "insurance", label: "Insurance company" },
      { value: "enterprise", label: "Other agricultural enterprise" },
      { value: "other", label: "Other farmer-serving organisation" },
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
