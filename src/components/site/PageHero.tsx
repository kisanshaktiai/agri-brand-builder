import React from "react";
import { Eyebrow } from "./primitives";
import { Kinetic } from "@/components/moments/HeroSignals";

/**
 * Page opener on every route except Home, in the Home hero's treatment:
 * white page, field eyebrow, kinetic headline, and a thin harvest band
 * along the bottom edge that carries the identity into every page.
 */
export function PageHero({ eyebrow, title, lead, children, size = "display-2" }: { eyebrow: string; title: string; lead?: string; children?: React.ReactNode; size?: "display-1" | "display-2" }) {
  return (
    <section className="ks-hero ks-guides relative overflow-hidden bg-ks-paper text-ks-ink" aria-labelledby="page-h">
      <div aria-hidden className="ks-hero-band-thin ks-band" />
      <div className="ks-container relative pb-[calc(var(--ks-section)*0.55)] pt-[calc(var(--ks-section)*0.6)]">
        <Eyebrow className="text-ks-field">{eyebrow}</Eyebrow>
        <h1 id="page-h" className={(size === "display-1" ? "ks-display-1" : "ks-display-2") + " max-w-5xl text-ks-ink"}>
          <Kinetic text={title} />
        </h1>
        {lead && (
          <p className="ks-lead ks-word-block mt-6 max-w-prose" style={{ animationDelay: "0.6s" }}>
            {lead}
          </p>
        )}
        {children && (
          <div className="ks-word-block" style={{ animationDelay: "0.8s" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
