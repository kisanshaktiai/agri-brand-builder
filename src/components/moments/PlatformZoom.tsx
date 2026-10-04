import React, { useLayoutEffect, useRef, useState } from "react";
import { Phone, ScreenImage } from "@/components/site/Device";
import { Eyebrow, Heading } from "@/components/site/primitives";
import { FAMILY_ORDER } from "@/content/technologies";
import { useContent } from "@/i18n";
import { useReducedMotion, useMinWidth, useGsap } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ZoomStep { title: string; body: string }

/**
 * Signature moment 5 — the platform zoom-out.
 *
 * The story has one stable composition. The scroll position controls two
 * things together: the continuous zoom and the current caption level.
 * Desktop uses ScrollTrigger pinning; narrow/reduced-motion layouts keep the
 * same semantic content without replacing the DOM after first paint.
 */
export function PlatformZoom({ eyebrow, title, steps }: { eyebrow: string; title: string; steps: ZoomStep[] }) {
  const { TENANT_EXAMPLES, TECHNOLOGIES, UI } = useContent();
  const techByKey = (k: (typeof FAMILY_ORDER)[number]) => TECHNOLOGIES.find((t) => t.key === k)!;
  const reduced = useReducedMotion();
  const desktop = useMinWidth(1024);
  const pinned = desktop && !reduced;
  const gsap = useGsap(pinned);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [level, setLevel] = useState(0);
  const lastLevel = useRef(0);

  useLayoutEffect(() => {
    if (!gsap || !pinned || !sectionRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".pz-caption");
      const layers = {
        l1: gsap.utils.toArray<HTMLElement>(".pz-l1"),
        l2: gsap.utils.toArray<HTMLElement>(".pz-l2"),
        l3: gsap.utils.toArray<HTMLElement>(".pz-l3"),
      };

      // Never begin with a blank composition. The phone/first tenant remains
      // visible immediately; deeper layers arrive progressively as the stage
      // zooms out.
      gsap.set(layers.l1, { opacity: 0 });
      gsap.set(layers.l2, { opacity: 0 });
      gsap.set(layers.l3, { opacity: 0 });
      gsap.set(lines, { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (st) => {
            const next = Math.min(3, Math.floor(st.progress * 4));
            if (next !== lastLevel.current) {
              lastLevel.current = next;
              setLevel(next);
            }
          },
        },
      });

      // Continuous zoom is the backbone of the scene.
      tl.fromTo(stageRef.current, { scale: 2.6 }, { scale: 1, ease: "none", duration: 4 }, 0);

      // The composition and copy advance on the same four-part rhythm.
      // Keep one caption visible at a time. Each new step fades in while
      // the previous step fades away, so captions never overlap or stack.
      lines.forEach((el, i) => {
        const start = Math.max(0, i * 0.95);
        if (i === 0) {
          tl.to(el, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, start);
          return;
        }
        tl.to(lines[i - 1], { opacity: 0, y: -10, duration: 0.38, ease: "power2.inOut" }, start);
        tl.to(el, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, start + 0.08);
      });

      tl.to(layers.l1, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.9);
      tl.to(layers.l2, { opacity: 1, duration: 0.6, ease: "power2.out" }, 1.9);
      tl.to(layers.l3, { opacity: 1, duration: 0.6, ease: "power2.out" }, 2.9);
    }, sectionRef);

    return () => {
      lastLevel.current = 0;
      ctx.revert();
    };
  }, [gsap, pinned]);

  // lvl 0 = farmer; 1 = partner workspace; 2 = many partner ecosystems;
  // 3 = shared platform.
  const vis = (minLvl: number, lvl: number): React.CSSProperties | undefined =>
    !pinned && lvl < minLvl ? { opacity: 0 } : undefined;

  const Composite = ({ lvl, className }: { lvl: number; className?: string }) => (
    <div className={cn("relative mx-auto w-full max-w-[880px]", className)}>
      <div className="relative p-4 md:p-6">
        <div aria-hidden className="pz-l3 absolute inset-0 rounded-ks-lg border border-ks-line bg-ks-paper-2" style={vis(3, lvl)} />
        <p className="pz-l3 relative ks-label mb-3" style={vis(3, lvl)} aria-hidden={!pinned && lvl < 3}>{UI.sharedPlatformLabel}</p>
        <div className="relative grid grid-cols-3 gap-3">
          {TENANT_EXAMPLES.slice(1).map((t, i) => (
            <div key={t.id} className={cn("relative p-3", i > 0 && "pz-l2")} style={i > 0 ? vis(2, lvl) : undefined}>
              <div aria-hidden className={cn("absolute inset-0 rounded-ks-md border", i === 0 ? "pz-l1 border-ks-line bg-ks-white shadow-ks-1" : "border-ks-line/70 bg-ks-white/70")} style={i === 0 ? vis(1, lvl) : undefined} />
              <div className={cn("relative mb-2 flex items-center gap-2", i === 0 && "pz-l1")} style={i === 0 ? vis(1, lvl) : undefined}>
                <span aria-hidden className="grid h-5 w-5 place-items-center rounded text-[0.625rem] font-semibold text-white" style={{ background: `hsl(${t.brand})` }}>{t.initials}</span>
                <span className="truncate text-xs text-ks-ink-2">{t.name}</span>
              </div>
              {i === 0 ? (
                <div className="relative mx-auto w-[42%] min-w-[64px]">
                  <Phone className="!rounded-[16px] !p-[3px] [&>.ks-phone-screen]:!rounded-[13px] after:!hidden" label={UI.aFarmer}>
                    <ScreenImage screen="farm-today" />
                  </Phone>
                </div>
              ) : (
                <div className="relative grid gap-1.5">
                  {[0, 1, 2].map((k) => (
                    <div key={k} className="h-2 rounded bg-ks-paper-2" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <ul className="pz-l3 relative mt-4 flex flex-wrap gap-x-4 gap-y-1" style={vis(3, lvl)}>
          {FAMILY_ORDER.map((k) => (
            <li key={k} className="ks-mark text-[0.625rem] text-ks-ink-3">{techByKey(k).name}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div>
      <div ref={sectionRef} className={cn("relative flex flex-col justify-center", pinned ? "h-screen overflow-hidden" : "py-[var(--ks-section)]")}>
        <div className={cn("ks-container", pinned ? "grid h-full grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-center gap-12" : "")}>
          <div className={cn(pinned ? "relative z-10" : "")}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Heading>{title}</Heading>

            {pinned ? (
              <div className="relative mt-8 min-h-[10.5rem]" aria-live="polite">
                {steps.map((s, i) => (
                  <div
                    key={s.title}
                    className="pz-caption absolute inset-x-0 top-0 max-w-prose"
                    aria-hidden={level !== i}
                  >
                    <p className="ks-label mb-2">{String(i + 1).padStart(2, "0")} / {steps.length}</p>
                    <h3 className="ks-h3">{s.title}</h3>
                    <p className="ks-body mt-2">{s.body}</p>
                  </div>
                ))}
              </div>
            ) : (
              <ol className="mt-12 grid gap-14">
                {steps.map((s, i) => (
                  <li key={s.title} className="grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center">
                    <div>
                      <p className="ks-label mb-2">{String(i + 1).padStart(2, "0")} / {steps.length}</p>
                      <h3 className="ks-h3">{s.title}</h3>
                      <p className="ks-body mt-2">{s.body}</p>
                    </div>
                    <div className="overflow-hidden rounded-ks-lg">
                      <div style={{ transform: `scale(${[2.2, 1.5, 1.1, 1][i]})`, transformOrigin: "18% 40%" }} className="transition-transform duration-700 ease-ks-out">
                        <Composite lvl={i} />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {pinned && (
            <div className="relative overflow-hidden rounded-ks-lg" style={{ maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}>
              <div ref={stageRef} style={{ transformOrigin: "22% 46%" }}>
                <Composite lvl={3} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
