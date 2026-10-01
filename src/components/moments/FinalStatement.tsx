import React, { useEffect, useRef } from "react";
import { Mark } from "@/components/site/Wordmark";
import { Reveal } from "@/components/site/Reveal";
import { useReducedMotion, useMinWidth, useGsap } from "@/lib/motion";

/**
 * Signature moment 6 — the final statement.
 * Motion slows and only the brand remains. Desktop: a pinned section where
 * each line settles in slowly with scroll. Phones and reduced motion: a plain
 * stacked reveal with the same words.
 */
export function FinalStatement({ lines }: { lines: string[] }) {
  const reduced = useReducedMotion();
  const desktop = useMinWidth(1024);
  const pinned = desktop && !reduced;
  const gsap = useGsap(pinned);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gsap || !ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top top", end: "+=160%", scrub: 1.2, pin: true } });
      tl.fromTo(".fs-line", { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.9, duration: 1.4, ease: "power2.out" });
      tl.fromTo(".fs-mark", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, "+=0.4");
    }, ref);
    return () => ctx.revert();
  }, [gsap]);

  if (!pinned) {
    return (
      <div className="ks-container py-24 text-center md:py-32">
        {lines.map((l, i) => (
          <Reveal key={l} as="p" delay={i * 0.12} className={i === 0 ? "ks-display-2 text-ks-ink" : "ks-h2 mt-3 text-ks-ink-2"}>
            {l}
          </Reveal>
        ))}
        <Reveal delay={0.6} className="mt-12 flex justify-center">
          <Mark size={40} />
        </Reveal>
      </div>
    );
  }

  return (
    <div ref={ref} className="flex h-screen items-center">
      <div className="ks-container text-center">
        {lines.map((l, i) => (
          <p key={l} className={"fs-line " + (i === 0 ? "ks-display-2 text-ks-ink" : "ks-h2 mt-3 text-ks-ink-2")}>
            {l}
          </p>
        ))}
        <div className="fs-mark mt-14 flex justify-center">
          <Mark size={44} />
        </div>
      </div>
    </div>
  );
}
