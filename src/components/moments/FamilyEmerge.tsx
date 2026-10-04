import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FAMILY_ORDER } from "@/content/technologies";
import { useLocale } from "@/i18n";
import { TechMark, TechIcon, MaturityBadge, Eyebrow, Heading, Body } from "@/components/site/primitives";
import { useReducedMotion } from "@/lib/motion";
import { useInView } from "@/lib/useInView";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Signature moment 2 — the technology family.
 * Five marks emerge from one point (the brand) and settle into a row, with
 * their part of the arc beneath. Under reduced motion they simply fade in.
 */
/** `compact` hides the full form on the cards (the Technology page states it once, in each section). */
export function FamilyEmerge({ eyebrow, title, body, linkTo = "/technology", compact = false }: { eyebrow: string; title: string; body?: string; linkTo?: string | null; compact?: boolean }) {
  const reduced = useReducedMotion();
  const { content, href } = useLocale();
  const { TECHNOLOGIES, UI } = content;
  const techByKey = (k: (typeof FAMILY_ORDER)[number]) => TECHNOLOGIES.find((t) => t.key === k)!;
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "0px 0px -20% 0px", threshold: 0.2 });
  const n = FAMILY_ORDER.length;
  // Server HTML stays visible; the emergence only arms after mount, off-screen.
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    if (r.top > window.innerHeight * 0.8) setArmed(true);
  }, [reduced, ref]);
  const shown = !armed || inView;

  return (
    <div className="ks-container" ref={ref}>
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading>{title}</Heading>
        {body && <Body className="mx-auto mt-6">{body}</Body>}
      </div>

      <div className="relative mt-14 overflow-x-clip md:mt-20">
        {/* Origin: the brand, from which the family emerges. */}
        <p aria-hidden className={cn("ks-label absolute left-1/2 top-0 -translate-x-1/2 -translate-y-8 text-ks-ink-4 transition-opacity duration-700", shown ? "opacity-100" : "opacity-0")}>
          KisanShakti AI
        </p>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {FAMILY_ORDER.map((key, i) => {
            const t = techByKey(key);
            const centerOffset = (i - (n - 1) / 2) * -100; // percent of own width toward the centre
            return (
              <li
                key={key}
                className={cn("group relative flex flex-col justify-between rounded-ks-md border border-ks-line bg-ks-white p-5 shadow-ks-1 hover:border-ks-line-strong", shown ? "ks-emerge-in" : "ks-emerge-out")}
                style={{ "--emerge-x": `${centerOffset}%`, transitionDelay: shown ? `${0.15 + i * 0.08}s` : "0s" } as React.CSSProperties}
                onMouseEnter={() => track("technology_engaged", { tech: key, where: "family" }, true)}
              >
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <TechIcon src={t.icon} name={t.name} size="lg" />
                    <MaturityBadge maturity={t.maturity} />
                  </div>
                  <div className="mt-4">
                    <TechMark tech={key} name={t.name} house={false} size="lg" />
                  </div>
                  {!compact && <p className="mt-3 text-sm leading-snug text-ks-ink-2">{t.fullForm}</p>}
                  <p className="ks-label mt-4 normal-case tracking-normal text-[0.75rem] text-ks-ink-3">{t.positioning}</p>
                </div>
                <p className="mt-6 ks-label text-ks-ink-4">{t.arc.join(" · ")}</p>
                {linkTo && (
                  <Link to={href(`${linkTo}#${key}`)} className="absolute inset-0 rounded-ks-md focus-visible:outline-offset-[-2px]" aria-label={`KisanShakti ${t.name}: ${t.positioning}`}>
                    <span className="sr-only">Read about KisanShakti {t.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
        <div aria-hidden className={cn("mx-auto mt-6 h-px max-w-4xl origin-left bg-ks-line transition-transform duration-[1200ms] ease-ks-out", shown ? "scale-x-100 delay-500" : "scale-x-0 !duration-0")} />
        <p className="mt-4 text-center text-xs text-ks-ink-3">{UI.arcNote}</p>
      </div>
      <p className="sr-only">{TECHNOLOGIES.map((t) => `KisanShakti ${t.name}: ${t.fullForm}. ${t.positioning}.`).join(" ")}</p>
    </div>
  );
}
