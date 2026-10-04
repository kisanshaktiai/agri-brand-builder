import React, { useEffect, useRef, useState } from "react";
import { Phone, ScreenImage } from "@/components/site/Device";
import { TechMark, Eyebrow, Heading } from "@/components/site/primitives";
import { type TechKey } from "@/content/technologies";
import { useContent } from "@/i18n";
import { useReducedMotion } from "@/lib/motion";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export interface LivingStep {
  key: string;
  arc: string;
  tech?: TechKey;
  /** General farmer-app feature; use when the feature is not one of the five named technologies. */
  feature?: string;
  screen: string;
  title: string;
  body: string;
}

/**
 * Signature moment 1 — the living Farmer App.
 * A real phone stays anchored (CSS sticky, no scroll hijack) while the story
 * scrolls past it; the screen crossfades and the technology mark for that
 * part of the day appears. On phones the device sits at the top of the
 * viewport at a smaller size and the steps pass beneath it. Under reduced
 * motion every step shows its own screen inline, with the same content.
 */
const FeatureMark = ({ label, size = "md" }: { label: string; size?: "sm" | "md" | "lg" }) => {
  const dot = size === "lg" ? "h-3 w-3" : size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2";
  const text = size === "lg" ? "text-base" : size === "sm" ? "text-[0.6875rem]" : "text-xs";
  return (
    <span className={`inline-flex items-center gap-2 ks-mark text-ks-ink ${text}`}>
      <span aria-hidden className={`rounded-full bg-ks-line-strong ${dot}`} />
      <span className="font-medium">{label}</span>
    </span>
  );
};

export function LivingPhone({ eyebrow, title, steps }: { eyebrow: string; title: string; steps: LivingStep[] }) {
  const reduced = useReducedMotion();
  const { TECHNOLOGIES } = useContent();
  const techByKey = (k: TechKey) => TECHNOLOGIES.find((t) => t.key === k)!;
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (reduced || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the viewport's vertical centre.
        let best: { i: number; d: number } | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = Number((e.target as HTMLElement).dataset.index);
          const r = e.boundingClientRect;
          const d = Math.abs(r.top + r.height / 2 - window.innerHeight / 2);
          if (!best || d < best.d) best = { i, d };
        }
        if (best) setActive(best.i);
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [reduced, steps.length]);

  useEffect(() => {
    if (active > 0 && steps[active]?.tech) track("technology_engaged", { tech: steps[active].tech, where: "living-phone" }, true);
  }, [active, steps]);

  const step = steps[active];
  const tech = step.tech ? techByKey(step.tech) : null;

  if (reduced) {
    return (
      <div className="ks-container">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading>{title}</Heading>
        <ol className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => {
            const t = s.tech ? techByKey(s.tech) : null;
            return (
              <li key={s.key} className="grid gap-5">
                <Phone className="max-w-[240px]" label={`${s.title}`}>
                  <ScreenImage screen={s.screen} />
                </Phone>
                <div>
                  <p className="ks-label mb-2">
                    {String(i + 1).padStart(2, "0")} · {s.arc}
                  </p>
                  {t ? <TechMark tech={t.key} name={t.name} /> : <FeatureMark label={s.feature ?? "Farmer feature"} />}
                  <h3 className="ks-h3 mt-3">{s.title}</h3>
                  <p className="ks-body mt-2">{s.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  return (
    <div className="ks-container">
      <div className="mb-10 text-center lg:mb-16">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading>{title}</Heading>
      </div>
      <div className="grid gap-x-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        {/* Anchored phone */}
        <div className="sticky top-16 z-10 -mx-[var(--ks-gutter)] bg-ks-paper px-[var(--ks-gutter)] pb-4 pt-3 lg:top-24 lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none lg:self-start">
          <div className="flex items-center gap-4 lg:block">
            <div className="w-[34%] max-w-[150px] shrink-0 lg:mx-auto lg:w-full lg:max-w-[340px]">
              <Phone label="Farmer App, following one farmer's day">
                {/* All screens are stacked; the active one fades in (CSS only). */}
                {Array.from(new Set(steps.map((s) => s.screen))).map((scr, i) => (
                  <div key={scr} className={cn("absolute inset-0 transition-opacity duration-500 ease-ks-out", step.screen === scr ? "opacity-100" : "opacity-0")} aria-hidden={step.screen !== scr}>
                    <ScreenImage screen={scr} priority={i === 0} />
                  </div>
                ))}
              </Phone>
            </div>
            <div className="min-w-0 flex-1 lg:mt-6 lg:text-center" aria-live="polite">
              <div key={step.key} className="ks-swap-in">
                <p className="ks-label mb-2">
                  {String(active + 1).padStart(2, "0")} · {step.arc}
                </p>
                {tech ? (
                  <>
                    <TechMark tech={tech.key} name={tech.name} size="md" />
                    <p className="mt-1 text-xs text-ks-ink-3 lg:hidden">{tech.positioning}</p>
                  </>
                ) : (
                  <FeatureMark label={step.feature ?? "Farmer feature"} size="md" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Story */}
        <ol className="lg:pt-[8vh]">
          {steps.map((s, i) => {
            const t = s.tech ? techByKey(s.tech) : null;
            return (
              <li
                key={s.key}
                ref={(el) => (refs.current[i] = el)}
                data-index={i}
                className="flex min-h-[52vh] flex-col justify-center py-10 lg:min-h-[70vh]"
              >
                <p className="ks-label mb-3">
                  {String(i + 1).padStart(2, "0")} · {s.arc}
                </p>
                <h3 className={cn("ks-h2 transition-colors duration-500", active === i ? "text-ks-ink" : "text-ks-ink-3")}>{s.title}</h3>
                <p className={cn("ks-lead mt-4 max-w-prose transition-colors duration-500", active === i ? "text-ks-ink-2" : "text-ks-ink-3")}>{s.body}</p>
                <p className="mt-5 hidden lg:block">
                  {t ? (
                    <>
                      <TechMark tech={t.key} name={t.name} />
                      <span className="ml-3 text-sm text-ks-ink-3">{t.positioning}</span>
                    </>
                  ) : (
                    <FeatureMark label={s.feature ?? "Farmer feature"} />
                  )}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
