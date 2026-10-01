import React, { useEffect, useRef } from "react";
import { EVIDENCE_CHAIN, CHAIN_OWNERS, type ChainNode } from "@/content/evidenceChain";
import { Eyebrow, Heading, Body, TechMark } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { useReducedMotion, useMinWidth, useGsap } from "@/lib/motion";
import { cn } from "@/lib/utils";

const OWNER_CLS: Record<ChainNode["owner"], string> = {
  language: "bg-ks-paper-2 text-ks-ink-2",
  brain: "bg-ks-field-soft text-ks-field-deep",
  gate: "bg-ks-signal-soft text-ks-signal",
};

/**
 * Signature moment 3 — the evidence chain.
 * A real decision explanation unfolds node by node. On desktop the rail is
 * drawn by scroll (GSAP ScrollTrigger scrub); each node reveals in view.
 * Under reduced motion the rail is drawn and every node is visible.
 */
export function EvidenceChain({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  const reduced = useReducedMotion();
  const desktop = useMinWidth(1024);
  const gsap = useGsap(desktop && !reduced);
  const railRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (!gsap || !railRef.current || !listRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        railRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: listRef.current, start: "top 70%", end: "bottom 70%", scrub: 0.6 },
        },
      );
    });
    return () => ctx.revert();
  }, [gsap]);

  return (
    <div className="ks-container">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading>{title}</Heading>
          <Body className="mt-6">{body}</Body>
          <p className="mt-6">
            <TechMark tech="tarka" name="TARKA" />
          </p>
          <dl className="mt-8 grid gap-3 text-sm">
            {(Object.keys(CHAIN_OWNERS) as ChainNode["owner"][]).map((k) => (
              <div key={k} className="flex items-center gap-3">
                <dt className={cn("rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium", OWNER_CLS[k])}>{CHAIN_OWNERS[k].label}</dt>
                <dd className="text-ks-ink-3">{CHAIN_OWNERS[k].note}</dd>
              </div>
            ))}
          </dl>
          <p className="ks-small mt-8 max-w-prose">Rule RICE_NUTR_N_TOP2_001 and hypothesis HYP_RICE_N_DEFICIT_001 as stored in the governed knowledge base on 1 October 2026. The farmer's question is illustrative.</p>
        </div>

        <div className="relative">
          <div aria-hidden className="absolute bottom-6 left-[11px] top-6 w-px bg-ks-line" />
          <div ref={railRef} aria-hidden className={cn("absolute bottom-6 left-[11px] top-6 w-px origin-top bg-ks-ink", !desktop || reduced ? "scale-y-100" : "")} />
          <ol ref={listRef} className="grid gap-2">
            {EVIDENCE_CHAIN.map((node, i) => (
              <Reveal key={node.id} as="li" delay={desktop ? 0 : 0.03 * i} className="relative pl-10">
                <span aria-hidden className={cn("absolute left-0 top-5 flex h-6 w-6 items-center justify-center rounded-full border border-ks-line bg-ks-paper text-[0.625rem] ks-mono", node.owner === "gate" && "border-ks-signal", node.owner === "brain" && "border-ks-field")}>
                  {node.step}
                </span>
                <div className="rounded-ks-md border border-ks-line bg-ks-white p-5 shadow-ks-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="ks-h3 text-[1.0625rem]">{node.title}</h3>
                    <span className={cn("rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium", OWNER_CLS[node.owner])}>{CHAIN_OWNERS[node.owner].label}</span>
                  </div>
                  <p className="ks-body mt-2">{node.body}</p>
                  {node.detail && <p className="ks-mono mt-3 text-[0.75rem] text-ks-ink-3">{node.detail}</p>}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
