import React from "react";
import { Phone, ScreenImage } from "@/components/site/Device";
import { ButtonLink, Eyebrow } from "@/components/site/primitives";
import { CTA } from "@/content/site";
import { track } from "@/lib/analytics";

/**
 * Home hero. A deep leaf-green canvas in the logo's palette; five signal
 * lines (sky, soil, water, temperature, weather) draw in from the left and
 * converge on the farmer's phone. The headline rises word by word. CSS only,
 * visible at rest, still under reduced motion.
 */
const SIGNALS = [
  { key: "sky", label: "Sky", d: "M0 60 C 220 60, 420 140, 640 170" },
  { key: "soil", label: "Soil", d: "M0 120 C 240 120, 440 160, 640 180" },
  { key: "water", label: "Water", d: "M0 180 C 240 180, 440 186, 640 190" },
  { key: "temp", label: "Temperature", d: "M0 240 C 240 240, 440 212, 640 200" },
  { key: "weather", label: "Weather", d: "M0 300 C 220 300, 420 236, 640 210" },
];

function Kinetic({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((w, i) => (
        <React.Fragment key={i}>
          <span className="ks-word" style={{ animationDelay: `${0.08 + i * 0.07}s` }} aria-hidden>
            {w}
          </span>{" "}
        </React.Fragment>
      ))}
    </span>
  );
}

export function HeroSignals({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <section className="ks-hero relative overflow-hidden bg-ks-night text-ks-paper" aria-labelledby="hero-h">
      <div aria-hidden className="ks-hero-glow" />
      <div className="ks-container relative grid items-center gap-12 pb-[calc(var(--ks-section)*0.7)] pt-[calc(var(--ks-section)*0.6)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8">
        <div className="relative z-10">
          <Eyebrow className="text-ks-lime">{eyebrow}</Eyebrow>
          <h1 id="hero-h" className="ks-display-2 max-w-4xl text-ks-paper">
            <Kinetic text={title} />
          </h1>
          <p className="ks-lead ks-word-block mt-6 max-w-prose text-ks-paper/75" style={{ animationDelay: "0.7s" }}>
            {lead}
          </p>
          <div className="ks-word-block mt-9 flex flex-wrap gap-3" style={{ animationDelay: "0.9s" }}>
            <ButtonLink href={CTA.openApp.href} size="lg" className="!bg-ks-leaf !text-ks-ink hover:!bg-ks-lime" onClick={() => track("farmer_app_cta", { where: "hero" })}>
              {CTA.openApp.label}
            </ButtonLink>
            <ButtonLink to={CTA.partner.to} variant="secondary" size="lg" className="!border-ks-paper/30 !text-ks-paper hover:!border-ks-lime" onClick={() => track("partner_cta", { where: "hero" })}>
              {CTA.partner.label}
            </ButtonLink>
          </div>
          <ul className="ks-word-block mt-12 flex flex-wrap gap-x-6 gap-y-2 ks-label" style={{ color: "hsl(var(--ks-paper) / 0.7)" }} style={{ animationDelay: "1.1s" }} aria-label="What the companion reads for every land">
            {SIGNALS.map((s) => (
              <li key={s.key}>{s.label}</li>
            ))}
          </ul>
        </div>

        <div className="relative lg:min-h-[560px]">
          {/* Signal lines, desktop only: they would cross the text on narrow screens. */}
          <svg aria-hidden viewBox="0 0 640 360" className="ks-signals pointer-events-none absolute -left-[46%] top-1/2 hidden w-[150%] -translate-y-1/2 lg:block" preserveAspectRatio="none">
            {SIGNALS.map((s, i) => (
              <g key={s.key}>
                <path d={s.d} className="ks-signal" style={{ animationDelay: `${0.3 + i * 0.12}s` }} />
                <circle r="3" className="ks-signal-dot" style={{ animationDelay: `${1.6 + i * 0.4}s`, offsetPath: `path("${s.d}")` } as React.CSSProperties} />
              </g>
            ))}
          </svg>
          <div className="relative mx-auto w-[72%] max-w-[300px] lg:w-[300px]">
            <div className="ks-phone-halo" aria-hidden />
            <Phone label="Farmer App, Farm Today">
              <ScreenImage screen="farm-today" priority />
            </Phone>
          </div>
        </div>
      </div>
    </section>
  );
}
