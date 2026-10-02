import React from "react";
import { Eyebrow, Heading } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { useT } from "@/i18n";

interface Entry { time: string; text: string }

/** One farmer's day and one partner's day, as parallel timelines. */
export function TwoDays({ eyebrow, title, farmer, partner }: { eyebrow: string; title: string; farmer: Entry[]; partner: Entry[] }) {
  const UI = useT();
  const Col = ({ heading, items, who }: { heading: string; items: Entry[]; who: string }) => (
    <div>
      <p className="ks-label mb-1">{who}</p>
      <h3 className="ks-h3 mb-6">{heading}</h3>
      <ol className="border-l border-ks-line">
        {items.map((e, i) => (
          <Reveal key={e.time} as="li" delay={i * 0.05} className="relative py-4 pl-6">
            <span aria-hidden className="absolute -left-[3px] top-[1.45rem] h-[5px] w-[5px] rounded-full bg-ks-ink" />
            <p className="ks-mono text-xs text-ks-ink-3">{e.time}</p>
            <p className="ks-body mt-1 text-ks-ink">{e.text}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
  return (
    <div className="ks-container">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading>{title}</Heading>
      <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
        <Col who={UI.farmerApp} heading={UI.oneFarmersDay} items={farmer} />
        <Col who={UI.partnerPortal} heading={UI.onePartnersDay} items={partner} />
      </div>
    </div>
  );
}
