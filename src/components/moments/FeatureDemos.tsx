import React, { useRef, useState } from "react";
import { Phone, ScreenImage } from "@/components/site/Device";
import { PartnerPortalSimulation } from "@/components/site/PartnerPortalSimulation";
import { Container, Eyebrow, Heading, Body, TechMark, MaturityBadge, Button } from "@/components/site/primitives";
import { type TechKey } from "@/content/technologies";
import { type Maturity } from "@/content/site";
import { useContent } from "@/i18n";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type DemoStep = { screen?: string; portal?: number; title: string; body: string };
type DemoTab = { key: string; label: string; tech?: string; maturity: string; steps: DemoStep[] };

/**
 * Step-through demos, one per key feature. The visitor picks a feature, then
 * steps through it with Back / Next or the step dots. Only the active screen is
 * mounted, so its scene plays from the start on every step; under reduced
 * motion the scene shows its finished state (scenes.css) and the swap is instant.
 * Nothing advances on its own.
 */
export function FeatureDemos({ id = "demos" }: { id?: string }) {
  const { HOME, TECHNOLOGIES } = useContent();
  const D = HOME.demos;
  const tabs = D.tabs as DemoTab[];
  const [t, setT] = useState(0);
  const [s, setS] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tab = tabs[t];
  const step = tab.steps[s];
  const tech = tab.tech ? TECHNOLOGIES.find((x) => x.key === tab.tech) : undefined;
  const last = s === tab.steps.length - 1;
  const isPortal = typeof step.portal === "number";

  const pick = (i: number) => {
    setT(i);
    setS(0);
    track("technology_engaged", { tech: tabs[i].tech ?? tabs[i].key, where: "feature-demo" }, true);
  };
  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + tabs.length) % tabs.length;
    pick(n);
    tabRefs.current[n]?.focus();
  };

  return (
    <Container>
      <div className="max-w-3xl">
        <Eyebrow>{D.eyebrow}</Eyebrow>
        <Heading id={`${id}-h`}>{D.title}</Heading>
        <Body className="mt-4">{D.body}</Body>
      </div>

      <div role="tablist" aria-label={D.title} className="mt-8 flex flex-wrap gap-2">
        {tabs.map((x, i) => (
          <button
            key={x.key}
            ref={(el) => (tabRefs.current[i] = el)}
            role="tab"
            id={`${id}-tab-${x.key}`}
            aria-selected={i === t}
            aria-controls={`${id}-panel`}
            tabIndex={i === t ? 0 : -1}
            onClick={() => pick(i)}
            onKeyDown={(e) => onTabKey(e, i)}
            className={cn(
              "inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-medium transition-colors duration-200 ease-ks-out",
              i === t ? "border-ks-ink bg-ks-ink text-ks-paper" : "border-ks-line-strong bg-ks-white text-ks-ink-2 hover:border-ks-ink hover:text-ks-ink",
            )}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${tab.key}`} className="mt-8 grid items-center gap-8 md:grid-cols-12 lg:mt-10 lg:gap-12">
        <div className={cn("order-2 min-w-0", isPortal ? "md:col-span-12 lg:order-none lg:col-span-7" : "md:order-none md:col-span-5")}>
          {isPortal ? (
            <div key={`${tab.key}-${s}`} className="ks-swap-in max-h-[460px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_82%,transparent)] lg:max-h-none lg:[mask-image:none]">
              <PartnerPortalSimulation tenantIndex={step.portal} />
            </div>
          ) : (
            <div className="mx-auto w-[72%] max-w-[320px] md:w-full lg:max-w-[340px]">
              <Phone label={step.title}>
                <div key={`${tab.key}-${s}`} className="ks-swap-in absolute inset-0">
                  <ScreenImage screen={step.screen!} />
                </div>
              </Phone>
            </div>
          )}
        </div>

        <div className={cn("order-1 min-w-0", isPortal ? "md:col-span-12 lg:order-none lg:col-span-5" : "md:order-none md:col-span-7 lg:col-span-6 lg:col-start-7")}>
          <div className="flex flex-wrap items-center gap-3">
            {tech ? <TechMark tech={tech.key as TechKey} name={tech.name} /> : null}
            <MaturityBadge maturity={tab.maturity as Maturity} />
          </div>
          <div aria-live="polite">
            <p className="ks-label mt-6">{D.stepOf.replace("{n}", String(s + 1)).replace("{total}", String(tab.steps.length))}</p>
            <div key={`${tab.key}-${s}`} className="ks-swap-in">
              <h3 className="ks-h2 mt-3 lg:mt-3">{step.title}</h3>
              <p className="ks-lead mt-4 max-w-prose">{step.body}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center" aria-label={D.stepOf.replace("{n}", String(s + 1)).replace("{total}", String(tab.steps.length))}>
              {tab.steps.map((x, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setS(i)}
                  aria-label={`${i + 1}. ${x.title}`}
                  aria-current={i === s ? "step" : undefined}
                  className="grid h-11 w-8 place-items-center"
                >
                  <span className={cn("block h-2 rounded-full transition-[width,background-color] duration-300 ease-ks-out", i === s ? "w-6 bg-ks-ink" : "w-2 bg-ks-line-strong")} />
                </button>
              ))}
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="secondary" className="h-11 disabled:pointer-events-none disabled:opacity-40" onClick={() => setS(s - 1)} disabled={s === 0} aria-disabled={s === 0}>
                {D.prev}
              </Button>
              <Button className="h-11" onClick={() => setS(last ? 0 : s + 1)}>
                {last ? D.again : D.next}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
