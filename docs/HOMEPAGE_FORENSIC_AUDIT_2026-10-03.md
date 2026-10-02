# KisanShakti AI Website — Forensic Content & Homepage Audit
Date: 2026-10-03
Branch: `kisanshakti-website-advanced-20261002`

## Executive summary

The branch contains a substantial website rebuild with a centralized content/facts model, a shared visual token system, responsive page components, and automated QA scripts. The existing claims audit is currently **PASS**: product statements are mapped to fact IDs and the built-HTML sweep reports no forbidden claims.

The principal issue was not missing content architecture; it was first-impression hierarchy. The homepage opened with a large text block plus a single static phone, while the strongest product story—land context, the five named technologies, and the farmer experience—was distributed farther down the page.

### Changes made in this pass

- Redesigned the homepage hero into an editorial, product-led first impression.
- Added a living product stack that cycles through real/approved screen states: Farm Today, TATVA weather, TARKA conversation, and PAHRA alerts.
- Preserved the existing KisanShakti design tokens: warm paper, deep ink, field green, restrained signal color, Bricolage Grotesque / Instrument Sans / JetBrains Mono.
- Added restrained layered UI callouts for "one land · one context" and "AI explains · guidance decides".
- Kept the existing CTA destinations and analytics tracking.
- Respected reduced-motion preferences for the new hero cycle.

## Content forensic findings

### 1. Source-of-truth architecture — PASS

Product claims are centralized in `src/content/facts.ts`, while page copy lives in `src/content/pages.ts`. The repository also contains `scripts/qa-claims-audit.mjs`, which maps claims to facts and checks maturity/forbidden language.

Current claim-audit output: **PASS**.

### 2. Verified product maturity — PASS WITH LIMITS

The content correctly distinguishes Live, Live/limited and Early access. PAHRA and Farm Economics are explicitly presented as early-access/beta capabilities. Market and tenant-portal limitations are also encoded.

### 3. Known factual contradiction requiring future editorial review

`docs/CONTRADICTIONS.md` records that the live `decision_rules` query on 2026-10-01 found **2,169 active farmer-servable rules** (1,097 also expert-approved), while the supplied product narrative previously referred to approximately 1,600 rules. The site avoids publishing the exact count, which prevents the discrepancy from becoming a public numerical claim.

The same audit records that rule counts are deepest for sugarcane (591 servable rules) and rice (291), while no servable rules were found for chickpea or jowar. The current knowledge-base coverage sentence still lists chickpea and jowar, so this wording should be revalidated against the agronomy coverage definition before publishing a quantitative coverage statement.

### 4. Repeated messaging

The phrase/theme "complete digital companion for every farmer and every land" appears in multiple pages and the footer. This works as a brand refrain, but the homepage should avoid repeating the same paragraph-level explanation. The redesign therefore uses a shorter, more distinctive hero headline while retaining the governed product story below.

### 5. Legacy content implementation

The branch removes the previous generic `Header`, `HeroSection`, `FeatureCards`, `StatsSection`, `HowItWorks`, and `Index` path in favor of the newer site system. This reduces the risk of the older generic agricultural-marketing copy resurfacing accidentally.

## Visual / UX forensic findings

### Strengths

- One coherent token system in `src/styles/tokens.css`.
- Strong typography hierarchy.
- Reusable site primitives for headings, sections, buttons, marks and maturity badges.
- Real product screen wrapper with explicit "capture pending" behavior rather than silently presenting invented UI.
- Mobile navigation uses a native dialog.
- Responsive layout paths exist for the major motion sections.

### Homepage issues addressed

1. Hero was too text-heavy before the first product visual.
2. The product experience was represented by one static phone rather than a living sequence.
3. The strongest trust proposition was below the first viewport.
4. The page needed more visual depth without introducing a new color system or decorative noise.

## Motion forensic findings

### Existing motion architecture

- `Reveal` uses IntersectionObserver and keeps server-rendered content visible at first paint.
- `LivingPhone` maps the active story step to the corresponding screen and changes the screen based on the section nearest the viewport center.
- `PlatformZoom` uses GSAP ScrollTrigger to pin the desktop scene and update the narrative level as scroll progress changes.
- `WhyTrust` draws its evidence rail from scroll progress.
- `FinalStatement` uses a pinned closing sequence on desktop.
- Reduced-motion paths are explicitly implemented.

### Motion risk to keep testing

The scroll-driven sections depend on pinning, sticky positioning, and responsive breakpoints. They should continue to be tested with the repository's existing `qa:motion` script for fast scroll, slow scroll, reverse scroll, resize, refresh, mobile touch, and reduced motion.

The existing QA script is especially relevant because it checks horizontal overflow, document-height stability, CTA visibility, pin count and console errors.

## Homepage design direction

The redesigned hero intentionally takes inspiration from contemporary product storytelling patterns: large editorial typography, controlled negative space, one dominant product object, restrained secondary metadata, and motion that demonstrates the product rather than acting as decoration. Apple's current homepage similarly emphasizes a small number of product stories with large visual treatments and focused actions. citeturn750773view0

The KisanShakti implementation stays distinct: it uses its own field-green visual language, its own content hierarchy, and agriculture-specific product storytelling rather than copying Apple's brand treatment.

## Verification status

- Repository branch: verified.
- Claims/audit architecture: verified.
- Homepage source: updated.
- Reduced-motion handling for new hero rotation: implemented.
- Git commit created on branch.
- Full browser build/screenshot execution was not run through this connector session, so final visual QA should still execute the repository's `build`, `qa:screens`, `qa:motion`, `qa:a11y`, `qa:brand`, and `qa:claims` commands in CI or the development environment before production deployment.

## Recommended next refinement

Run the existing visual QA suite against the updated homepage and, based on screenshots at 360 / 768 / 1024 / 1440 px, tune the hero's phone scale and layered callout positions only where real capture evidence shows overlap or clipping.
