# Claims audit

Generated 2026-10-01T20:08:10.270Z. Every product statement below carries the fact it traces to and that fact's maturity label.

| Where | Statement | Fact | Maturity | Check |
|---|---|---|---|---|
| technologies.tatva | Hourly weather for each land, with hourly and 7-day forecasts, rainfall, growing-degree-days, weather alerts and recommendations. | tatva.weather | Live | ok |
| technologies.tatva | Daily satellite NDVI with a land health score, trend, map view and early warning. | tatva.ndvi | Live | ok |
| technologies.tatva | Evapotranspiration, a rain timeline, an irrigation gauge, a spray window, an FAO-56 daily water balance and risk episodes. | tatva.water | Live | ok |
| technologies.tarka | A chain from a farmer's question to canonical intent, observation, hypothesis, crop stage and land state, governed rule, evidence, a safety and servability gate, a decision and a farmer-language explanation. | tarka.chain | Live, limited | ok |
| technologies.tarka | A chemical recommendation cannot reach a farmer without a dose, a pre-harvest interval and expert approval. | tarka.chemical-gate | Live, limited | ok |
| technologies.tarka | Safety blocks always win over advisory rules. Photo evidence is the final authority over estimates. | tarka.safety | Live, limited | ok |
| technologies.tarka | Over 2,000 governed, farmer-servable rules, plus an English agronomy corpus that includes ICAR and state-university packages of practice. | tarka.knowledge | Live, limited | ok |
| technologies.riitu | A stage graph per crop and cultivation method, days-after-sowing and heat units, variety maturity, and region-scoped agronomy with Maharashtra first. | riitu.stage-graph | Live, limited | ok |
| technologies.riitu | Nightly reconciliation of every active schedule. | riitu.reconcile | Live, limited | ok |
| technologies.riitu | Farm Today, with Due, Watch, Blocked and Info decisions. | riitu.farm-today | Live, limited | ok |
| technologies.riitu | Growth tracking, farmer field readings and crop photos. | riitu.growth | Live, limited | ok |
| technologies.pahra | Daily pest, disease and weather risk evaluated for each land, with notification preferences. | pahra.daily-risk | Early access | beta: statement itself lacks 'early access' (badge/limits must carry it) |
| technologies.pahra | Alerts ask the farmer to scout and confirm. They never prescribe a chemical. | pahra.no-prescription | Early access | beta: statement itself lacks 'early access' (badge/limits must carry it) |
| technologies.rukh | Current mandi prices, nearby markets, state comparison, historical comparison and a selling advisor. | rukh.prices | Live, limited | ok |
| technologies.rukh | Market data feeds Farm Analytics projections. | rukh.analytics | Live, limited | ok |
| platform.farmer-app | One intelligent farm companion in 14 languages, voice-first and offline-first, with land mapping, Farm Today, chat, weather, satellite, market, community, videos, schemes, soil health, alerts, growth tracking and analytics. | app.companion | Live | ok |
| platform.farmer-app | 14 languages, voice onboarding and voice land capture. | app.languages | Live | ok |
| platform.farmer-app | Mobile number and PIN login. | app.login | Live | ok |
| platform.farmer-app | Offline-first PWA plus Android and iOS builds that sync when back online. | app.offline | Live | ok |
| platform.farmer-app | Land boundary mapping with automatic area, satellite thumbnail and land health score. | app.land | Live | ok |
| platform.tenant-portal | For FPOs, dealers, agri-input companies and agricultural enterprises: onboard the organisation, manage farmers and their lands, set the brand, and follow farmer activity, all under the organisation's own context. | tenant.portal | Live, limited | ok |
| platform.tenant-portal | Tenant onboarding and farmer management. | tenant.portal | Live, limited | ok |
| platform.tenant-portal | Land management and farmer activity. | tenant.portal | Live, limited | ok |
| platform.tenant-portal | Tenant branding: the farmer experience runs under your name and colours. | tenant.portal | Live, limited | ok |
| platform.admin-portal | Tenant and user management, agronomy masters for crops, varieties, companies and products, and administration of the Decision Brain itself: rules, observations, hypotheses and knowledge sources with PDF and Markdown ingestion, plus monitoring. | admin.portal | Live | ok |
| platform.admin-portal | Tenant and user management. | admin.portal | Live | ok |
| platform.admin-portal | Agronomy masters: crops, varieties, companies, products. | admin.portal | Live | ok |
| platform.admin-portal | Decision Brain administration: rules, observations, hypotheses, knowledge sources with PDF and Markdown ingestion. | admin.portal | Live | ok |
| platform.admin-portal | Monitoring. | admin.portal | Live | ok |
| architecture.farmer-app | Where a farmer asks, records, is reminded and decides. | app.companion | Live | ok |
| architecture.tenant-portal | Where an FPO, dealer or agri-input company runs its branded farmer network. | tenant.portal | Live, limited | ok |
| architecture.admin-portal | Where rules, knowledge sources and tenants are administered and monitored. | admin.portal | Live | ok |
| architecture.tatva | Weather, satellite NDVI and water balance for each land. | tatva.ndvi | Live | ok |
| architecture.tarka | Governed rules, evidence chains and safety gates. The language model explains; it never decides doses. | tarka.chain | Live, limited | ok |
| architecture.riitu | Stage graphs reconciled nightly into Farm Today. | riitu.farm-today | Live, limited | ok |
| architecture.pahra | Daily pest, disease and weather risk; scout, confirm, then decide. | pahra.daily-risk | Early access | beta: statement itself lacks 'early access' (badge/limits must carry it) |
| architecture.rukh | Mandi prices, comparisons and a selling advisor. | rukh.prices | Live, limited | ok |
| architecture.foundation | Rules, observations, hypotheses, knowledge sources, land state and schedules shared by every tenant's ecosystem. | platform.surfaces | Live | ok |
| pages.COMPANY_PAGE.hero | KisanShakti AI is an early-stage, bootstrapped company. We are pre-revenue, and we would rather show you the product than a logo wall. | company.stage | Live | ok |
| pages.ENTERPRISES_PAGE.journey.steps[1] | Tenant onboarding sets up your organisation and its users in the Tenant SaaS Portal. | tenant.portal | Live, limited | ok |
| pages.ENTERPRISES_PAGE.journey.steps[2] | Tenant branding puts your name and colours on the farmer experience, running under your context. | tenant.portal | Live, limited | ok |
| pages.ENTERPRISES_PAGE.journey.steps[3] | Farmer management and land management hold your network and its fields. | tenant.portal | Live, limited | ok |
| pages.ENTERPRISES_PAGE.journey.steps[4] | Farmer activity shows how your network uses the companion, day by day. | tenant.portal | Live, limited | ok |
| pages.ENTERPRISES_PAGE.honest | It covers tenant onboarding, farmer management, land management, tenant branding and farmer activity. It is not a CRM, ERP, accounting or sales-force system, and we do not claim it is. | tenant.portal | Live, limited | ok (negated: "accounting") |
| pages.FARMER_APP_PAGE.sections[0] | Map the boundary and get the area automatically. Record season, crop, variety, sowing date and cultivation method. Each land carries a satellite thumbnail and a land health score. | app.land | Live | ok |
| pages.FARMER_APP_PAGE.sections[1] | Farm Today lists Due, Watch, Blocked and Info decisions reconciled overnight against the crop's actual stage. | riitu.farm-today | Live, limited | ok |
| pages.FARMER_APP_PAGE.sections[2] | AI chat with photo capture and InstaScan. The language model understands; the Decision Brain decides from governed rules and explains why. | app.companion | Live | ok |
| pages.FARMER_APP_PAGE.sections[3] | Hourly weather for each land, daily satellite NDVI with a land health score, a spray window and an irrigation gauge. | tatva.ndvi | Live | ok |
| pages.FARMER_APP_PAGE.sections[4] | Current mandi prices, nearby markets, comparisons and a selling advisor. Market insight, not a guaranteed price. | rukh.prices | Live, limited | ok (negated: "guaranteed price") |
| pages.FARMER_APP_PAGE.sections[5] | Total area, active crops, projected revenue and projected profit, with Crop & Stage, Financial, Market Pulse, Soil Health, Task Performance, Water & Weather and Smart Recommendations. Projections come from logged expenses and expected yield at current market price, and every projection carries a notice. | app.analytics | Live, limited | ok |
| pages.FARMER_APP_PAGE.sections[6] | A farmer feed with photos, comments, groups and group chat, trending topics, moderation, local-language posts and read-aloud. | app.community | Live | ok |
| pages.FARMER_APP_PAGE.sections[7] | Short education reels from the KisanShakti AI YouTube channel, including crop-wise season journeys such as sugarcane from pre-season through ratoon. | app.videos | Live | ok |
| pages.FARMER_APP_PAGE.more[0] | Built from the farmer's own soil-test results. There is no soil-sensing hardware. | app.soil | Live, limited | ok |
| pages.FARMER_APP_PAGE.more[1] | Plain-language information and eligibility for schemes such as PM-Kisan, crop insurance and Soil Health Card. No government affiliation is implied. | app.schemes | Live | ok |
| pages.FARMER_APP_PAGE.more[2] | Daily pest, disease and weather risk for each land, with notification preferences. Alerts ask the farmer to scout and confirm; they never prescribe a chemical. | pahra.daily-risk | Early access | beta: statement itself lacks 'early access' (badge/limits must carry it) |
| pages.FARMER_APP_PAGE.more[3] | Field readings and crop photos that keep the schedule honest about the crop's actual stage. | riitu.growth | Live, limited | ok |
| pages.HOME.thesis | Underneath, one shared and governed intelligence: land state, crop biology, rules with evidence, risk and market signals. On top, FPOs, dealers, agri-input companies and agricultural enterprises run their own branded farmer ecosystems. The farmer sees one companion. The organisation sees its network. The platform sees that every decision is governed. | platform.multi-tenant | Live, limited | ok |
| pages.HOME.living.steps[0] | Hourly weather for this land, growing-degree-days and a seven-day outlook arrive before the farmer does. | tatva.weather | Live | ok |
| pages.HOME.living.steps[1] | Daily NDVI becomes a land health score, a trend and an early warning on the map. | tatva.ndvi | Live | ok |
| pages.HOME.living.steps[2] | The language model understands it. The Decision Brain evaluates it against the crop's stage, the land's state and governed rules. | tarka.chain | Live, limited | ok |
| pages.HOME.living.steps[3] | Due, Watch, Blocked and Info decisions, reconciled overnight against the crop's actual stage. | riitu.farm-today | Live, limited | ok |
| pages.HOME.living.steps[4] | Daily pest, disease and weather risk for this land. The alert asks the farmer to scout and confirm; it never prescribes a chemical. Early access. | pahra.daily-risk | Early access | ok |
| pages.HOME.living.steps[5] | Mandi prices, nearby markets and a selling advisor, with market data flowing into Farm Analytics. | rukh.prices | Live, limited | ok |
| pages.HOME.separation | Language intelligence understands the farmer's words, turns them into canonical intent and explains governed results in the farmer's language. Decision intelligence evaluates observations and hypotheses against the crop's biological stage and the land's state, applies governed rules, keeps evidence chains and enforces safety gates. Doses, quantities and timing come only from governed rules. | platform.separation | Live | ok |
| pages.HOME.evidence | One real rule from the governed knowledge base, followed from a farmer's question to the explanation they hear. The chain is how decisions are governed; it is not a claim that every request visibly walks each step. | tarka.chain | Live, limited | ok |
| pages.HOME.enterprise | Onboard your organisation, bring your farmers and their lands, set your brand, and follow farmer activity from the Tenant SaaS Portal. KisanShakti AI is sold to organisations, never directly to farmers. | tenant.portal | Live, limited | ok |
| pages.INVESTORS_PAGE.hero | We publish no customer logos, revenue, accuracy figures or certifications because we have none to publish yet. What we can show is a working platform, a governed knowledge base, and a clear thesis. | company.stage | Live | ok |
| pages.PLATFORM_PAGE.hero | Three connected surfaces on one shared data foundation. The Farmer App is the farmer's daily operating layer, the Tenant SaaS Portal is the organisation's operating layer, and the SaaS Admin Portal is the control plane that governs the platform's intelligence. | platform.surfaces | Live | ok |
| pages.PLATFORM_PAGE.transform | A tenant runs the farmer experience under its own name, colours and context. The rules, evidence chains, schedules and safety gates are shared and governed centrally. Tenants configure their ecosystem; they do not receive or fork the platform's code. | platform.multi-tenant | Live, limited | ok |
| pages.PLATFORM_PAGE.days.farmer[0] | Weather for the land and a seven-day outlook. | tatva.weather | Live | ok |
| pages.PLATFORM_PAGE.days.farmer[1] | Farm Today lists what is due, what to watch and what is blocked. | riitu.farm-today | Live, limited | ok |
| pages.PLATFORM_PAGE.days.farmer[2] | A photo of a leaf, a question in Marathi, a governed answer with its evidence. | tarka.chain | Live, limited | ok |
| pages.PLATFORM_PAGE.days.farmer[3] | A risk alert: go and scout the north plot. Early access. | pahra.daily-risk | Early access | ok |
| pages.PLATFORM_PAGE.days.farmer[4] | Mandi prices nearby and the selling advisor. | rukh.prices | Live, limited | ok |
| pages.PLATFORM_PAGE.days.tenant[0] | Onboard a new farmer group and their lands. | tenant.portal | Live, limited | ok |
| pages.PLATFORM_PAGE.days.tenant[1] | Review farmer activity across the network. | tenant.portal | Live, limited | ok |
| pages.PLATFORM_PAGE.days.tenant[2] | Update the organisation's branding; farmers see it on their next sync. | tenant.portal | Live, limited | ok |
| pages.PLATFORM_PAGE.days.tenant[3] | Check land records and crop coverage across villages. | tenant.portal | Live, limited | ok |
| pages.PLATFORM_PAGE.days.tenant[4] | Everything ran under the organisation's own context, on shared governed intelligence. | platform.multi-tenant | Live, limited | ok |
| pages.PLATFORM_PAGE.governance | Rules, observations, hypotheses and knowledge sources are administered in one place, with PDF and Markdown ingestion for new sources, agronomy masters for crops, varieties, companies and products, and monitoring across tenants. | admin.portal | Live | ok |
| pages.SECURITY_PAGE.principles[0] | Doses, quantities and timing come only from governed rules. The language model understands and explains; it never decides. | platform.separation | Live | ok |
| pages.SECURITY_PAGE.principles[1] | Every rule keeps its source, its stage window and its approval status. A decision can be followed back to its evidence. | tarka.chain | Live, limited | ok |
| pages.SECURITY_PAGE.principles[2] | A chemical recommendation cannot reach a farmer without a dose, a pre-harvest interval and expert approval. Safety blocks always win over advisory rules. | tarka.chemical-gate | Live, limited | ok |
| pages.SECURITY_PAGE.principles[3] | Rules, observations, hypotheses and knowledge sources are administered from the SaaS Admin Portal, with monitoring. | admin.portal | Live | ok |
| pages.SECURITY_PAGE.principles[4] | Each tenant runs under its own context and brand. | tenant.portal | Live, limited | ok |
| pages.SECURITY_PAGE.pending | A tenant-isolation security audit has not yet been completed. Until it is, we make no technical isolation claims and hold no security certifications. We will update this page when that changes. | security.verified | Live | ok |

## Built HTML sweep for forbidden language

- ok (negated) dist/farmer-app/index.html: "advisor. Market insight, not a guaranteed"
- ok (negated) dist/technology/index.html: "s. It is market insight, not a guaranteed"
- ok (negated) dist/technology/index.html: "cess.  Market insight, never a guaranteed"
- ok (negated) dist/technology/index.html: "ield&#x27;s stage. It does not predict yield"
- No forbidden language found in built HTML.

## Maturity labels

- platform.surfaces — Live
- platform.separation — Live
- platform.multi-tenant — Live, limited — limits: Tenants run under their own context and brand. They do not receive or fork source code.
- platform.commercial — Live
- app.languages — Live
- app.voice — Live
- app.login — Live
- app.offline — Live
- app.land — Live
- app.companion — Live
- app.analytics — Live, limited — limits: Projections come from logged expenses and expected yield multiplied by the current market price, and every projection carries a projection notice.
- app.community — Live
- app.videos — Live
- app.soil — Live, limited — limits: There is no soil-sensing hardware.
- app.schemes — Live — limits: No government affiliation is implied.
- tarka.chain — Live, limited — limits: An explanatory model, not a claim that every request visibly follows it.
- tarka.chemical-gate — Live, limited
- tarka.safety — Live, limited
- tarka.knowledge — Live, limited — limits: Coverage is deepest for rice and growing for sugarcane, soybean, cotton, chickpea, onion and jowar.
- tatva.weather — Live
- tatva.ndvi — Live
- tatva.water — Live — limits: No soil sensors, IoT or drones.
- riitu.stage-graph — Live, limited
- riitu.reconcile — Live, limited
- riitu.farm-today — Live, limited
- riitu.growth — Live, limited
- pahra.daily-risk — Early access — limits: Shown as early access.
- pahra.no-prescription — Early access
- rukh.prices — Live, limited — limits: The marketplace is early access.
- rukh.analytics — Live, limited
- tenant.portal — Live, limited — limits: No CRM, ERP, accounting or sales-force modules are claimed.
- admin.portal — Live
- security.verified — Live — limits: A tenant-isolation security audit is pending. No technical isolation, certification, zero-trust or military-grade claims.
- company.stage — Live

**PASS**
