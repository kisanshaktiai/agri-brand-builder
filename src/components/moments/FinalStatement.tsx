import React, { useLayoutEffect, useRef } from "react";
import { Mark } from "@/components/site/Wordmark";
import { useReducedMotion, useMinWidth, useGsap } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Signature moment 6 — the final statement.
 *
 * The section keeps one stable DOM tree across SSR, hydration and responsive
 * changes. Desktop uses a pinned, scrubbed settle sequence; narrow/reduced
 * motion uses the same content as a normal stacked statement.
 *
 * Motion is enhancement only: the first line is visible immediately, and the
 * remaining lines retain a quiet baseline presence so the section can never
 * become a blank screen while the animation engine is loading.
 */
export function FinalStatement({ lines }: { lines: string[] }) {
  const reduced = useReducedMotion();
  const desktop = useMinWidth(1024);
  const pinned = desktop && !reduced;
  const gsap = useGsap(pinned);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!gsap || !pinned || !ref.current) return;

    const ctx = gsap.context(() => {
      const lineEls = gsap.utils.toArray<HTMLElement>(".fs-line");
      const mark = ref.current?.querySelector<HTMLElement>(".fs-mark");

      // Non-blank starting state. The first line leads; the later lines and
      // mark are visible-but-quiet until the visitor scrolls through the pin.
      gsap.set(lineEls, { opacity: 0.18, y: 18 });
      if (lineEls[0]) gsap.set(lineEls[0], { opacity: 1, y: 8 });
      if (mark) gsap.set(mark, { opacity: 0.22, scale: 0.96 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=175%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (lineEls[0]) {
        tl.to(lineEls[0], { y: 0, duration: 0.45, ease: "power2.out" }, 0);
      }
      lineEls.slice(1).forEach((el, i) => {
        tl.to(el, { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" }, 0.7 + i * 0.9);
      });
      if (mark) {
        tl.to(mark, { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }, 3.55);
      }
    }, ref);

    return () => ctx.revert();
  }, [gsap, pinned]);

  return (
    <div className={cn("fs-root", pinned ? "fs-root-pinned" : "fs-root-flow")}>
      <div ref={ref} className={cn("relative flex min-h-[82svh] items-center", pinned ? "h-screen" : "py-24 md:py-32")}>
        <div className="ks-container text-center">
          {lines.map((l, i) => (
            <p
              key={l}
              className={cn(
                "fs-line",
                i === 0 ? "ks-display-2 text-ks-ink" : "ks-h2 mt-3 text-ks-ink-2",
                !pinned && "opacity-100 transform-none",
              )}
            >
              {l}
            </p>
          ))}
          <div className="fs-mark mt-12 flex justify-center md:mt-14">
            <Mark size={pinned ? 44 : 40} />
          </div>
        </div>
      </div>
    </div>
  );
}
