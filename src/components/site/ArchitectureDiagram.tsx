import React, { useId, useState } from "react";
import { type ArchNode } from "@/content/platform";
import { useContent } from "@/i18n";
import { Eyebrow, Heading, MaturityBadge, TechMark } from "@/components/site/primitives";
import { Phone, Browser, ScreenImage } from "@/components/site/Device";
import { screenById } from "@/content/screens";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function ArchNodeButton({ n, active, panelId, onSelect }: { n: ArchNode; active: boolean; panelId: string; onSelect: (n: ArchNode) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(n)}
      onMouseEnter={() => window.matchMedia("(hover: hover) and (pointer: fine)").matches && onSelect(n)}
      onFocus={() => onSelect(n)}
      aria-pressed={active}
      aria-controls={panelId}
      className={cn(
        "flex w-full flex-col items-start gap-1 rounded-ks-md border px-3 py-3 text-left transition-colors duration-200",
        active ? "border-ks-ink bg-ks-white shadow-ks-1" : "border-ks-line bg-ks-white/60 hover:border-ks-line-strong",
      )}
    >
      {n.tech ? <TechMark tech={n.tech} name={n.label} house={false} /> : <span className="text-sm font-medium text-ks-ink">{n.label}</span>}
      <span className="text-xs text-ks-ink-3">{n.purpose}</span>
    </button>
  );
}

/**
 * Interactive architecture diagram. Hover (fine pointer), focus or tap a
 * node to see its purpose, maturity, a short description and a real screen.
 * On phones the detail opens beneath the diagram (progressive disclosure).
 */
export function ArchitectureDiagram({ eyebrow, title, hint }: { eyebrow: string; title: string; hint: string }) {
  const { ARCHITECTURE, UI } = useContent();
  const [activeId, setActiveId] = useState<string>("farmer-app");
  const panelId = useId();
  const active = ARCHITECTURE.find((n) => n.id === activeId) ?? ARCHITECTURE[0];
  const surfaces = ARCHITECTURE.filter((n) => n.kind === "surface");
  const techs = ARCHITECTURE.filter((n) => n.kind === "technology");
  const foundation = ARCHITECTURE.find((n) => n.kind === "foundation")!;

  const select = (n: ArchNode) => {
    setActiveId(n.id);
    if (n.tech) track("technology_engaged", { tech: n.tech, where: "architecture" }, true);
  };


  return (
    <div className="ks-container">
      <div className="max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading>{title}</Heading>
        <p className="ks-small mt-4">{hint}</p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
        <div className="rounded-ks-lg border border-ks-line bg-ks-paper-2 p-3 md:p-5" role="group" aria-label={UI.platformArchitecture}>
          <p className="ks-label mb-2 px-1">{UI.surfaces}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {surfaces.map((n) => (
              <ArchNodeButton key={n.id} n={n} active={activeId === n.id} panelId={panelId} onSelect={select} />
            ))}
          </div>
          <div aria-hidden className="mx-auto my-3 h-5 w-px bg-ks-line-strong" />
          <p className="ks-label mb-2 px-1">{UI.technologyFamily}</p>
          <div className="grid gap-2 sm:grid-cols-5">
            {techs.map((n) => (
              <ArchNodeButton key={n.id} n={n} active={activeId === n.id} panelId={panelId} onSelect={select} />
            ))}
          </div>
          <div aria-hidden className="mx-auto my-3 h-5 w-px bg-ks-line-strong" />
          <p className="ks-label mb-2 px-1">{UI.foundation}</p>
          <ArchNodeButton n={foundation} active={activeId === foundation.id} panelId={panelId} onSelect={select} />
        </div>

        <div id={panelId} aria-live="polite" className="rounded-ks-lg border border-ks-line bg-ks-white p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {active.tech ? <TechMark tech={active.tech} name={active.label} size="lg" /> : <h3 className="ks-h3">{active.label}</h3>}
            <MaturityBadge maturity={active.maturity} />
          </div>
          <p className="mt-1 text-sm text-ks-ink-3">{active.purpose}</p>
          <p className="ks-body mt-4">{active.description}</p>
          {active.screen && (
            <div className="mt-6">
              {screenById(active.screen).surface === "farmer-app" ? (
                <div className="mx-auto w-[52%] max-w-[220px]">
                  <Phone label={screenById(active.screen).title}>
                    <ScreenImage screen={active.screen} />
                  </Phone>
                </div>
              ) : (
                <Browser url="partner.kisanshaktiai.in">
                  <ScreenImage screen={active.screen} />
                </Browser>
              )}
              <p className="ks-small mt-3 text-center">{screenById(active.screen).question}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
