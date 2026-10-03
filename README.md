# KisanShakti AI — Public Website

Production marketing site for KisanShakti AI, the agricultural intelligence platform and white-label farmer companion.

## Product story

The public site communicates one connected platform:

- **Farmer App** — the farmer-facing companion for every farmer and every land.
- **Partner Portal** — the organisation-facing layer for FPOs, dealer networks, agri-input companies and agricultural enterprises.
- **Core Agricultural Intelligence Platform** — the shared intelligence layer governing agricultural knowledge, decision logic, evidence, safety gates and partner context.
- **Technology Family** — TATVA, PAHRA, TARKA, RIITU and RUKH.

The public narrative follows:

**Nature signals → observe → alert → see → understand → decide → act → anticipate → market context.**

## Claims governance

Product claims are centrally defined in `src/content/facts.ts`.

Every product statement should reference a fact id. Maturity is explicit:

- `live`
- `live-limited`
- `beta`
- `early-access`
- `planned`

Do not add customer counts, revenue, accuracy percentages, certifications, guarantees or technical security claims unless supported by an approved fact.

Run:

```bash
npm run qa:claims
npm run qa:brand
```

## Canonical technology family

| Technology | Public positioning |
|---|---|
| **TATVA** | Five-Element Land Intelligence |
| **PAHRA** | Proactive Farm Alerts |
| **TARKA** | Land-Specific Multilingual AI |
| **RIITU** | Dynamic Crop Scheduling & Guidance |
| **RUKH** | Crop & Market Intelligence |

The founder page uses the same vocabulary. Do not introduce alternative acronym expansions without updating the canonical technology content first.

## Architecture

The public site describes the Core Agricultural Intelligence Platform without exposing implementation details that are not part of the public product contract.

Internal implementation remains behind the product surfaces. The website is not a technical architecture dump.

## Real product screens

The site has a real-screen capture pipeline in `scripts/capture-screens.mjs`.

It is designed to capture authenticated screens from the Farmer App, Partner Portal and SaaS Admin Portal. Credentials are supplied only through environment variables and are never committed.

Until genuine authenticated captures are available, the website must use its explicit **Capture pending** state rather than fabricated screenshots.

## Development

```bash
npm ci
npm run dev
```

Production build:

```bash
npm run build
```

Type checking and linting:

```bash
npm run typecheck
npm run lint
```

## Visual and accessibility QA

```bash
npm run qa:screens
npm run qa:lighthouse
npm run qa:a11y
npm run qa:motion
```

Authenticated product capture:

```bash
npm run capture
```

Required capture environment variables are documented at the top of `scripts/capture-screens.mjs`.

## Deployment

The production deployment workflow is `.github/workflows/deploy-hostinger.yml`.

It installs from `package-lock.json`, builds and prerenders public routes, verifies founder assets, removes any stale physical `/founder` directory, deploys through SFTP with SCP fallback, verifies the remote deployment, and optionally purges Cloudflare cache.

The `/founder` page is a React route, not a physical directory.

## Source of truth

The website content hierarchy is:

1. `src/content/facts.ts` — product claim authority
2. `src/content/technologies.ts` — canonical technology family
3. `src/content/pages.ts` — page narrative
4. `src/data/founderProfile.ts` — founder and venture profile
5. visual components — presentation only

When these disagree, resolve the content source first; do not patch the UI with duplicate copy.

## Publication rule

The site should say exactly what can be supported today, label limited/beta/early-access capabilities, and leave unsupported future capabilities out of current-state claims.

That is intentional product positioning, not missing content.
