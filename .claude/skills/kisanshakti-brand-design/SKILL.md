---
name: kisanshakti-brand-design
description: KisanShakti AI website design system for the agri-brand-builder repo. Use before building or changing any page, section, scene, moment or component on the site.
---

# KisanShakti AI website — design system

## Source of truth
- `src/styles/tokens.css` — every `--ks-*` token (colour, type, spacing, radius, shadow, motion) and the `.ks-*` utilities.
- `tailwind.config.ts` — maps those tokens to Tailwind: `ks-*` colours, `font-display` / `font-sans` / `font-mono`, `rounded-ks-*`, `shadow-ks-*`, `ease-ks-*`, `max-w-ks`, breakpoints.
- `src/styles/scenes.css` — SVG explainer scenes.
- `src/components/site/primitives.tsx` — Container, Section, Eyebrow, Heading, Lead, Body, TechMark, TechIcon, MaturityBadge, ButtonLink, Button, HairlineList.

Read these before any UI change. If this skill and those files ever disagree, the files win.

`src/index.css` still holds the older shadcn defaults (old green `142 76% 36%`, `--agri-*`, `.bg-agri-gradient`) and the founder palette. `tokens.css` is imported after it in `src/main.tsx` and re-points `--background`, `--foreground`, `--primary`, `--accent`, `--border`, `--input`, `--ring` and the rest at the brand, so the old values are overridden. Never use the old green, `--agri-*` or `.bg-agri-*` in new work.

## Point of view
Warm paper, deep ink, one accent (field green). Everything else is ink at four strengths and hairlines.

## Colour — Tailwind token classes only
Never write hex, rgb or hsl in a component, and never `bg-[#...]`. If a colour is missing, add a `--ks-*` token in `tokens.css`, map it in `tailwind.config.ts`, then use the class.

- Page `bg-ks-paper`; alternate band `bg-ks-paper-2` (or `<Section band>`); cards and surfaces `bg-ks-white`.
- Text: `text-ks-ink` headings, `text-ks-ink-2` body, `text-ks-ink-3` secondary and small, `text-ks-ink-4` on the paper-2 band.
- Lines: `border-ks-line` hairline, `border-ks-line-strong`.
- Accent (buttons, links, focus): `ks-field`, `ks-field-deep`; tint `bg-ks-field-soft`; text on accent `text-ks-field-ink`.
- Logo greens: `ks-leaf` for marks and highlights, `ks-lime` for accent lines — mainly on the dark hero.
- Dark hero canvas: `bg-ks-night` / `bg-ks-night-2`, with the content inside `.ks-on-dark`.
- `ks-signal` / `ks-signal-soft` only for early access and beta; `ks-danger` for errors.
- `ks-tatva`, `ks-tarka`, `ks-riitu`, `ks-pahra`, `ks-rukh` only inside the technology mark badge (`TechMark`).
- shadcn classes (`bg-primary`, `bg-card`, `text-muted-foreground`, `border-input`, `bg-destructive`) belong to `src/components/ui` and the lead form; they already resolve to brand colours. Site sections use the `ks-*` classes.

## Type
- Three self-hosted fonts only: Bricolage Grotesque (display), Instrument Sans (text, the default `font-sans`), JetBrains Mono (labels, marks, evidence — `font-mono`). Never add another font.
- Headings: `<Heading size=...>` or `.ks-display-1`, `.ks-display-2`, `.ks-h2`, `.ks-h3`. Text: `.ks-lead`, `.ks-body`, `.ks-small`. Labels: `.ks-label` (`<Eyebrow>`). Marks: `.ks-mark`, `.ks-mono`.
- Sizes are fluid `clamp()` tokens. Do not hardcode `text-[Npx]` for headings.
- Marathi and Hindi switch to Noto Sans Devanagari automatically through `:lang(mr)` / `:lang(hi)`. `SiteLayout` sets the document `lang`. Never set fonts per language in a component.

## Copy and claims
- The site is English, Marathi and Hindi. Visible copy lives in `src/content/*` (English base) with overrides in `src/i18n/mr.ts` and `src/i18n/hi.ts`. Never put copy directly in a component; add it to all three.
- Every product statement must trace to a fact and its maturity label in `src/content/facts.ts`. Early-access features carry a `MaturityBadge`. Never show a planned feature as live.
- Technology names, full forms and lines are locked in `src/content/technologies.ts`; the full forms are the finalized acronym expansions and stay in English in every language. "Panch Tatva" appears in only two prose places per language — do not add it elsewhere. `npm run qa:brand` checks all of this.

## Layout and spacing
- `.ks-container` (`<Container>`): max width `--ks-container` (76rem), gutter `--ks-gutter` 1rem, 1.5rem from md, 2.5rem from lg.
- `.ks-section` (`<Section>`) for vertical section rhythm; `--ks-stack` for stacks.
- Breakpoints: xs 360, sm 640, md 768, lg 1024, xl 1440, 2xl 1600. Build mobile-first. Below 768px the rem scale is lifted 6%. Nothing may scroll sideways at 360px — let rows `flex-wrap` and give grid children `min-w-0`.
- Radius: `rounded-ks-sm` 6px, `rounded-ks-md` 12px, `rounded-ks-lg` 20px.
- Elevation: `shadow-ks-1`, `shadow-ks-2`, `shadow-ks-device`.
- Device frames: `.ks-phone > .ks-phone-screen`, `.ks-browser` with `.ks-browser-bar` and `.ks-browser-url` (or `src/components/site/Device.tsx`); `.ks-screen-pending` for a screen not yet available.

## Motion
- Easing `ease-ks-out`, `ease-ks-in-out`; durations `--ks-dur-1` to `--ks-dur-4` (160, 240, 420, 720 ms).
- Reveal: `.ks-reveal` + `.is-in`, through `src/components/site/Reveal.tsx`, `src/lib/useInView.ts` and `src/lib/motion.ts` (`useReducedMotion`). Reuse these; do not write new observers.
- Every animation needs a `prefers-reduced-motion` fallback that shows the finished state. Motion must never be what makes content visible.
- Animated SVG explainers: `.ks-scene` inside `.ks-scene-wrap`, styled by `scenes.css` (see `src/components/scenes/`).

## Founder page only
`/founder` (`src/pages/Founder.tsx`, `src/components/founder/`) has its own palette and fonts: `founder-*` colours, `font-founder` (Manrope), `font-founder-display` (Sora), `founder-*` motion classes. Never use them anywhere else, and never use `ks-*` styling to restyle the founder page.

## Before you build
1. Read the source-of-truth files above and the closest existing component in `src/components/site`, `moments` or `scenes`; follow its pattern. Do not invent new logic.
2. Use the primitives instead of re-creating containers, headings or buttons.
3. After the change, run `npm run typecheck`, `npm run lint`, `npm run build`, `npm run qa:brand`, `npm run qa:claims` and `npm run qa:screens` (check 360px and 1440px).
