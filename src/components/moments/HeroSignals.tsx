import React, { useRef } from "react";
import { Phone, ScreenImage } from "@/components/site/Device";
import { ButtonLink, Eyebrow } from "@/components/site/primitives";
import { useContent } from "@/i18n";
import { track } from "@/lib/analytics";
import { usePointerGlow } from "@/lib/motion";

/**
 * Home hero, composed like a product launch page on a canvas in the logo's
 * shade zone (leaf-black falling into field green), with drifting leaf and
 * lime light, a data field of crop rows flowing toward the visitor and a glow
 * that follows the cursor. Eyebrow, headline, lead and the two calls to
 * action are centred; the farmer's phone sits below as the product. Five
 * signal lines (sky, soil, water, temperature, weather) draw in from both
 * sides and converge on the phone, and on desktop the five signals float
 * around it. Visible at rest, still under reduced motion.
 */
const SIGNALS = [
  { key: "sky", label: "Sky", d: "M0 60 C 220 60, 420 140, 640 170" },
  { key: "soil", label: "Soil", d: "M0 120 C 240 120, 440 160, 640 180" },
  { key: "water", label: "Water", d: "M0 180 C 240 180, 440 186, 640 190" },
  { key: "temp", label: "Temperature", d: "M0 240 C 240 240, 440 212, 640 200" },
  { key: "weather", label: "Weather", d: "M0 300 C 220 300, 420 236, 640 210" },
];

/** Where each floating signal sits around the phone, alternating sides. */
const CHIP_POS = [
  "-left-40 top-[14%]",
  "-right-36 top-[24%]",
  "-left-48 top-[46%]",
  "-right-52 top-[58%]",
  "-left-36 top-[76%]",
];

export function Kinetic({ text, className }: { text: string; className?: string }) {
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
  const { CTA, UI } = useContent();
  const ref = useRef<HTMLElement>(null);
  usePointerGlow(ref);
  return (
    <section ref={ref} className="ks-hero ks-on-dark ks-hero-canvas relative overflow-hidden text-ks-paper" aria-labelledby="hero-h">
      <div aria-hidden className="ks-aurora" />
      <div aria-hidden className="ks-fieldgrid" />
      <div aria-hidden className="ks-spot" />
      <div className="ks-container relative pt-[calc(var(--ks-section)*0.55)] text-center">
        <Eyebrow className="text-ks-lime">{eyebrow}</Eyebrow>
        <h1 id="hero-h" className="ks-display-1 mx-auto max-w-5xl text-ks-paper">
          <Kinetic text={title} />
        </h1>
        <p className="ks-lead ks-word-block mx-auto mt-6 max-w-2xl" style={{ animationDelay: "0.7s", color: "hsl(var(--ks-paper) / 0.78)" }}>
          {lead}
        </p>
        <div className="ks-word-block mt-9 flex flex-wrap justify-center gap-3" style={{ animationDelay: "0.9s" }}>
          <ButtonLink href={CTA.openApp.href} size="lg" onClick={() => track("farmer_app_cta", { where: "hero" })}>
            {CTA.openApp.label}
          </ButtonLink>
          <ButtonLink to={CTA.partner.to} variant="secondary" size="lg" onClick={() => track("partner_cta", { where: "hero" })}>
            {CTA.partner.label}
          </ButtonLink>
        </div>
        <ul className="ks-word-block mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 ks-label lg:sr-only" style={{ color: "hsl(var(--ks-paper) / 0.7)" }} aria-label={UI.signalsLabel}>
          {SIGNALS.map((s, i) => (
            <li key={s.key}>{UI.signals[i] ?? s.label}</li>
          ))}
        </ul>

        {/* The product: the phone, with the five signals converging on it from both sides (desktop only). */}
        <div className="relative mt-14 pb-[calc(var(--ks-section)*0.6)] lg:mt-20">
          {[false, true].map((mirror) => (
            <svg
              key={String(mirror)}
              aria-hidden
              viewBox="0 0 640 360"
              className={"ks-signals pointer-events-none absolute top-[38%] hidden w-1/2 -translate-y-1/2 lg:block " + (mirror ? "right-0 -scale-x-100" : "left-0")}
              preserveAspectRatio="none"
            >
              {SIGNALS.map((s, i) => (
                <g key={s.key}>
                  <path d={s.d} className="ks-signal" style={{ animationDelay: `${0.3 + i * 0.12}s` }} />
                  <circle r="3" className="ks-signal-dot" style={{ animationDelay: `${1.6 + i * 0.4 + (mirror ? 0.2 : 0)}s`, offsetPath: `path("${s.d}")` } as React.CSSProperties} />
                </g>
              ))}
            </svg>
          ))}
          <div className="relative mx-auto w-[74%] max-w-[320px] text-left lg:w-[340px] lg:max-w-[340px]">
            <div className="ks-phone-halo" aria-hidden />
            {/* The five signals float around the phone on desktop (the list above carries them for screen readers). */}
            {SIGNALS.map((s, i) => (
              <span key={s.key} aria-hidden className={"ks-chip ks-label z-10 " + CHIP_POS[i]} style={{ animationDelay: `${-i * 1.1}s` }}>
                {UI.signals[i] ?? s.label}
              </span>
            ))}
            <Phone label={UI.heroPhoneLabel}>
              <ScreenImage screen="farm-today" priority />
            </Phone>
          </div>
        </div>
      </div>
    </section>
  );
}
