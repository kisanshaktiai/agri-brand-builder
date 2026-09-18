import { useId, useRef, useState } from "react";
import type { TechModule } from "@/data/founderProfile";
import { Button } from "@/components/ui/button";

interface TechStripProps {
  modules: TechModule[];
}

/**
 * Five technology modules as one row of acronyms with a shared detail panel.
 * The selected item is marked by weight, colour and a rule underneath — no
 * boxes, so the strip reads as type rather than as five buttons.
 */
export function TechStrip({ modules }: TechStripProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  /** Swap the panel inside a View Transition where the browser has one. */
  const select = (index: number) => {
    const startViewTransition = (
      document as Document & {
        startViewTransition?: (cb: () => void) => { finished: Promise<void> };
      }
    ).startViewTransition;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (startViewTransition && !reduced) {
      startViewTransition.call(document, () => setActive(index));
    } else {
      setActive(index);
    }
  };

  const move = (index: number) => {
    const next = (index + modules.length) % modules.length;
    select(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => move(index + 1),
      ArrowLeft: () => move(index - 1),
      Home: () => move(0),
      End: () => move(modules.length - 1),
    };
    const handler = keys[event.key];
    if (handler) {
      event.preventDefault();
      handler();
    }
  };

  const current = modules[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="KisanShakti AI technology family"
        className="flex flex-wrap gap-x-5 gap-y-1"
      >
        {modules.map((module, index) => {
          const selected = index === active;
          return (
            <Button
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
              onClick={() => select(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              variant="ghost"
              className={[
                "founder-press relative min-h-[48px] rounded-none px-0 text-[0.95rem]",
                selected
                  ? "font-semibold text-founder-accent"
                  : "font-medium text-founder-muted hover:text-founder-ink",
              ].join(" ")}
            >
              {module.acronym}
              <span
                aria-hidden="true"
                className={[
                  "absolute inset-x-0 bottom-2 h-[2px] rounded-full bg-founder-accent transition-opacity duration-200",
                  selected ? "opacity-100" : "opacity-0",
                ].join(" ")}
              />
            </Button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="mt-4 max-w-md"
        style={{ viewTransitionName: "founder-tech" } as React.CSSProperties}
      >
        <p className="text-[1.15rem] font-medium leading-snug text-founder-ink">
          {current.expansion}
        </p>
        <p className="mt-2 text-[0.95rem] text-founder-muted">{current.category}</p>
      </div>
    </div>
  );
}
