import { useId, useRef, useState } from "react";
import type { TechModule } from "@/data/founderProfile";

interface TechStripProps {
  modules: TechModule[];
}

/**
 * Five technology modules as a single strip of monogram tiles with one shared
 * detail panel underneath. Implemented as a tab list so it stays one small
 * block instead of five stacked accordions.
 */
export function TechStrip({ modules }: TechStripProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    const next = (index + modules.length) % modules.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusTab(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusTab(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusTab(modules.length - 1);
    }
  };

  const current = modules[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="KisanShakti AI technology family"
        className="grid grid-cols-5 gap-1.5 sm:gap-2"
      >
        {modules.map((module, index) => {
          const selected = index === active;
          return (
            <button
              key={module.acronym}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={[
                "founder-press flex min-h-[56px] flex-col items-center justify-center rounded-lg border px-1 py-2",
                "text-[0.62rem] font-semibold tracking-[0.14em] sm:text-xs",
                selected
                  ? "border-founder-gold/60 bg-founder-gold/10 text-founder-gold"
                  : "border-founder-line bg-founder-surface/60 text-founder-muted hover:text-founder-ink",
              ].join(" ")}
            >
              {module.acronym}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="mt-3 rounded-lg border border-founder-line bg-founder-surface/60 px-4 py-4"
      >
        <p className="text-[0.95rem] font-medium leading-relaxed text-founder-ink">
          {current.expansion}
        </p>
        <p className="mt-1.5 text-sm text-founder-muted">{current.category}</p>
      </div>
    </div>
  );
}
