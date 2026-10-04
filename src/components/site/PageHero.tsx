import React, { useRef } from "react";
import { usePointerGlow } from "@/lib/motion";
import { Eyebrow } from "./primitives";
import { Kinetic } from "@/components/moments/HeroSignals";

/**
 * Page opener on every route except Home, in the Home hero's treatment:
 * the canvas in the logo's shade zone with drifting light, the data field and
 * the cursor glow; lime eyebrow and kinetic headline, all centred like a
 * product page. Buttons placed inside take their dark-canvas styles from
 * `.ks-on-dark`.
 */
export function PageHero({ eyebrow, title, lead, children, size = "display-2" }: { eyebrow: string; title: string; lead?: string; children?: React.ReactNode; size?: "display-1" | "display-2" }) {
  const ref = useRef<HTMLElement>(null);
  usePointerGlow(ref);
  return (
    <section ref={ref} className="ks-hero ks-on-dark ks-hero-canvas relative overflow-hidden text-ks-paper" aria-labelledby="page-h">
      <div aria-hidden className="ks-aurora" />
      <div aria-hidden className="ks-fieldgrid opacity-60" />
      <div aria-hidden className="ks-spot" />
      <div className="ks-container relative pb-[calc(var(--ks-section)*0.55)] pt-[calc(var(--ks-section)*0.6)] text-center">
        <Eyebrow className="text-ks-lime">{eyebrow}</Eyebrow>
        <h1 id="page-h" className={(size === "display-1" ? "ks-display-1" : "ks-display-2") + " mx-auto max-w-5xl text-ks-paper"}>
          <Kinetic text={title} />
        </h1>
        {lead && (
          <p className="ks-lead ks-word-block mx-auto mt-6 max-w-2xl" style={{ animationDelay: "0.6s", color: "hsl(var(--ks-paper) / 0.78)" }}>
            {lead}
          </p>
        )}
        {children && (
          <div className="ks-word-block [&>*]:justify-center" style={{ animationDelay: "0.8s" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
