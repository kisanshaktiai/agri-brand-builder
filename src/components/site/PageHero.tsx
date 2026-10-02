import React from "react";
import { Eyebrow } from "./primitives";
import { Kinetic } from "@/components/moments/HeroSignals";

/**
 * Page opener on every route except Home, in the Home hero's treatment:
 * the deep leaf-green canvas, lime eyebrow, kinetic headline. Buttons placed
 * inside take their dark-canvas styles from `.ks-on-dark`.
 */
export function PageHero({ eyebrow, title, lead, children, size = "display-2" }: { eyebrow: string; title: string; lead?: string; children?: React.ReactNode; size?: "display-1" | "display-2" }) {
  return (
    <section className="ks-hero ks-on-dark relative overflow-hidden bg-ks-night text-ks-paper" aria-labelledby="page-h">
      <div aria-hidden className="ks-hero-glow" />
      <div className="ks-container relative pb-[calc(var(--ks-section)*0.55)] pt-[calc(var(--ks-section)*0.6)]">
        <Eyebrow className="text-ks-lime">{eyebrow}</Eyebrow>
        <h1 id="page-h" className={(size === "display-1" ? "ks-display-1" : "ks-display-2") + " max-w-5xl text-ks-paper"}>
          <Kinetic text={title} />
        </h1>
        {lead && (
          <p className="ks-lead ks-word-block mt-6 max-w-prose" style={{ animationDelay: "0.6s", color: "hsl(var(--ks-paper) / 0.78)" }}>
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
