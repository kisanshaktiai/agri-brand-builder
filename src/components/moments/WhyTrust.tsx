import React, { useLayoutEffect, useRef } from "react";
import { type TrustStep } from "@/content/trust";
import { useContent } from "@/i18n";
import { Eyebrow, Heading, Body, TechMark } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { TechScene } from "@/components/scenes/TechScene";
import { useReducedMotion, useMinWidth, useGsap } from "@/lib/motion";
import { cn } from "@/lib/utils";

const OWNER_CLS: Record<TrustStep["owner"], string> = {
  you: "bg-ks-paper-2 text-ks-ink-2",
  guidance: "bg-ks-field-soft text-ks-field-deep",
  ai: "bg-ks-signal-soft text-ks-signal",
};

/**
 * Signature moment 3 — why an answer can be trusted. One question followed
 * through five plain checks; the rail is drawn by scroll on desktop.
 */
export function WhyTrust({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  const { TRUST_STEPS, TRUST_OWNERS } = useContent();
  const reduced = useReducedMotion();
  const desktop = useMinWidth(1024);
  const gsap = useGsap(desktop && !reduced);
  const railRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useLayoutEffect(() => {
    if (!gsap || !railRef.current || !listRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(railRef.current, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: listRef.current, start: "top 70%", end: "bottom 70%", scrub: 0.6 } });
    });
    return () => ctx.revert();
  }, [gsap]);

  return (
    <div className="ks-container">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading>{title}</Heading>
          <Body className="mt-6">{body}</Body>
          <p className="mt-6">
            <TechMark tech="tarka" name="TARKA" />
          </p>
          <TechScene tech="tarka" className="mt-8" />
        </div>
        <div className="relative">
          <div aria-hidden className="absolute bottom-6 left-[11px] top-6 w-px bg-ks-line" />
          <div ref={railRef} aria-hidden className={cn("absolute bottom-6 left-[11px] top-6 w-px origin-top bg-ks-ink", !desktop || reduced ? "scale-y-100" : "")} />
          <ol ref={listRef} className="grid gap-2">
            {TRUST_STEPS.map((step, i) => (
              <Reveal key={step.id} as="li" delay={desktop ? 0 : 0.04 * i} className="relative pl-10">
                <span aria-hidden className={cn("absolute left-0 top-5 flex h-6 w-6 items-center justify-center rounded-full border bg-ks-paper text-[0.625rem] ks-mono", step.owner === "guidance" ? "border-ks-field" : step.owner === "ai" ? "border-ks-signal" : "border-ks-line-strong")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="rounded-ks-md border border-ks-line bg-ks-white p-5 shadow-ks-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="ks-h3 text-[1.0625rem]">{step.title}</h3>
                    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", OWNER_CLS[step.owner])}>{TRUST_OWNERS[step.owner].label}</span>
                  </div>
                  <p className="ks-body mt-2">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <dl className="mt-6 grid gap-2 text-sm">
            {(Object.keys(TRUST_OWNERS) as TrustStep["owner"][]).map((k) => (
              <div key={k} className="flex items-center gap-3">
                <dt className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", OWNER_CLS[k])}>{TRUST_OWNERS[k].label}</dt>
                <dd className="text-ks-ink-3">{TRUST_OWNERS[k].note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
