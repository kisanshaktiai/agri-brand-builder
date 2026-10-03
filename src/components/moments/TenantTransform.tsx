import React, { useEffect, useRef, useState } from "react";
import { FAMILY_ORDER } from "@/content/technologies";
import { useContent } from "@/i18n";
import { PartnerPortalSimulation } from "@/components/site/PartnerPortalSimulation";
import { Eyebrow, Heading, Body, TechMark } from "@/components/site/primitives";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Signature moment 4 — the multi-tenant transformation.
 * The left-hand workspace is an illustrative Partner Portal simulation.
 * It intentionally does not reuse a Farmer App screen. As the visitor scrolls,
 * the simulated workspace changes organisation, colour and dashboard context.
 */
export function TenantTransform({ eyebrow, title, body, layers }: { eyebrow: string; title: string; body: string; layers: string[] }) {
  const reduced = useReducedMotion();
  const { TENANT_EXAMPLES, TECHNOLOGIES, UI } = useContent();
  const techByKey = (k: (typeof FAMILY_ORDER)[number]) => TECHNOLOGIES.find((t) => t.key === k)!;
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (reduced || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [reduced]);

  const Plate = ({ tenantIndex }: { tenantIndex: number }) => (
    <div className="transition-all duration-700 ease-ks-out">
      <PartnerPortalSimulation tenantIndex={tenantIndex} />
    </div>
  );

  const Shared = () => (
    <div className="mt-4 rounded-ks-md border border-ks-line bg-ks-white p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="ks-label">{UI.sharedCompanion}</p>
        <p className="ks-label text-[0.625rem] text-ks-field">{UI.sameForEveryPartner}</p>
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {FAMILY_ORDER.map((k) => (
          <li key={k}>
            <TechMark tech={k} name={techByKey(k).name} house={false} size="sm" />
          </li>
        ))}
      </ul>
    </div>
  );

  if (reduced) {
    return (
      <div className="ks-container">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading>{title}</Heading>
        <Body className="mt-6">{body}</Body>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {TENANT_EXAMPLES.map((tenant) => (
            <li key={tenant.id}>
              <Plate tenantIndex={i} />
            </li>
          ))}
        </ul>
        <Shared />
      </div>
    );
  }

  return (
    <div className="ks-container">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Plate tenantIndex={active} />
          <Shared />
          <p className="ks-small mt-3">Illustrative Partner Portal simulation — concept only, not a captured product screen.</p>
        </div>
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading>{title}</Heading>
          <Body className="mt-6">{body}</Body>
          <ol className="mt-10">
            {TENANT_EXAMPLES.map((tenant, i) => (
              <li key={tenant.id} ref={(el) => (stepRefs.current[i] = el)} data-index={i} className="flex min-h-[40vh] flex-col justify-center border-t border-ks-line py-8 lg:min-h-[48vh]">
                <p className="ks-label mb-2">{tenant.type}</p>
                <h3 className={cn("ks-h3 transition-colors duration-500", active === i ? "text-ks-ink" : "text-ks-ink-3")}>{tenant.name}</h3>
                <p className={cn("ks-body mt-2 transition-colors duration-500", active === i ? "text-ks-ink-2" : "text-ks-ink-3")}>
                  {i === 0 ? UI.platformDefaultLine : UI.sameAppUnder.replace("{name}", tenant.name)}
                </p>
              </li>
            ))}
          </ol>
          <ol className="mt-6 grid gap-2 border-t border-ks-line pt-6">
            {layers.map((l, i) => (
              <li key={l} className="flex items-center gap-3 text-sm">
                <span className="ks-mono text-xs text-ks-ink-4">{String(i + 1).padStart(2, "0")}</span>
                <span className={i < 2 ? "text-ks-ink" : "text-ks-ink-2"}>{l}</span>
                <span className="ml-auto ks-label text-[0.625rem]">{i < 2 ? UI.perPartner : UI.shared}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
