import React from "react";
import { cn } from "@/lib/utils";

type Tenant = {
  name: string;
  initials: string;
  type: string;
  brand: string;
  soft: string;
  accent: string;
};

const TENANTS: Tenant[] = [
  { name: "KisanShakti AI", initials: "KS", type: "Platform workspace", brand: "hsl(var(--ks-field))", soft: "hsl(var(--ks-field-soft))", accent: "hsl(var(--ks-field-deep))" },
  { name: "Your FPO", initials: "F", type: "Farmer producer organisation", brand: "hsl(157 70% 38%)", soft: "hsl(157 55% 96%)", accent: "hsl(157 70% 30%)" },
  { name: "Your Dealer Network", initials: "DN", type: "Dealer network", brand: "hsl(214 80% 54%)", soft: "hsl(214 80% 97%)", accent: "hsl(214 70% 40%)" },
  { name: "Your Agri Brand", initials: "AB", type: "Agricultural company", brand: "hsl(273 65% 55%)", soft: "hsl(273 65% 97%)", accent: "hsl(273 55% 42%)" },
];

const nav = ["Dashboard", "Farmers", "Products", "Dealers", "Sales", "Campaigns", "NDVI", "Soil Analysis"];

export function PartnerPortalSimulation({ tenantIndex = 0 }: { tenantIndex?: number }) {
  const tenant = TENANTS[tenantIndex] ?? TENANTS[0];

  return (
    <div
      className="overflow-hidden rounded-ks-lg border border-ks-line bg-[#fbfcfc] shadow-ks-2"
      style={{ "--portal-brand": tenant.brand, "--portal-soft": tenant.soft, "--portal-accent": tenant.accent } as React.CSSProperties}
      aria-label="Illustrative Partner Portal simulation"
    >
      <div className="flex min-h-[520px] text-left">
        <aside className="hidden w-[170px] shrink-0 border-r border-ks-line bg-white p-3 md:block">
          <div className="flex items-center gap-2 border-b border-ks-line pb-3">
            <span className="grid h-7 w-7 place-items-center rounded-md text-xs font-semibold text-white" style={{ background: "var(--portal-brand)" }}>{tenant.initials}</span>
            <div className="min-w-0">
              <p className="truncate text-[10px] font-semibold text-ks-ink">{tenant.name}</p>
              <p className="text-[9px] text-ks-ink-4">partner workspace</p>
            </div>
          </div>
          <p className="ks-label mt-5 px-2 text-[9px]">Workspace</p>
          <nav className="mt-2 space-y-1">
            {nav.map((item, i) => (
              <div key={item} className={cn("flex items-center gap-2 rounded-md px-2 py-2 text-[10px]", i === 0 ? "font-medium text-ks-ink" : "text-ks-ink-3")} style={i === 0 ? { background: "var(--portal-soft)", color: "var(--portal-accent)" } : undefined}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: i === 0 ? "var(--portal-brand)" : "hsl(var(--ks-line-strong))" }} />
                {item}
                {(item === "Products" || item === "NDVI") && <span className="ml-auto rounded-full px-1.5 py-0.5 text-[8px]" style={{ background: "var(--portal-soft)", color: "var(--portal-accent)" }}>NEW</span>}
              </div>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-ks-line bg-white px-4 py-3 md:px-5">
            <div>
              <p className="text-[11px] font-semibold text-ks-ink">{tenant.name}</p>
              <p className="text-[9px] text-ks-ink-4">{tenant.type}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-ks-line px-2 py-1 text-[9px] text-ks-ink-3">Illustrative</span>
              <span className="h-6 w-6 rounded-full" style={{ background: "var(--portal-soft)", border: "1px solid color-mix(in srgb, var(--portal-brand) 20%, transparent)" }} />
            </div>
          </header>

          <div className="p-4 md:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="ks-label text-[9px]" style={{ color: "var(--portal-accent)" }}>Partner dashboard</p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight text-ks-ink md:text-xl">Your farmer network</h3>
                <p className="mt-1 text-[10px] text-ks-ink-3">A simulated view of the organisation workspace — not a live product screen.</p>
              </div>
              <button type="button" className="rounded-md px-3 py-2 text-[9px] font-medium text-white" style={{ background: "var(--portal-brand)" }}>Add farmer</button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
              {[
                ["Farmers", "1,248"],
                ["Active lands", "2,936"],
                ["Attention", "18"],
                ["Coverage", "42 villages"],
              ].map(([label, value], i) => (
                <div key={label} className="rounded-md border border-ks-line bg-white p-3">
                  <p className="text-[9px] text-ks-ink-3">{label}</p>
                  <p className="mt-1 text-base font-semibold text-ks-ink">{value}</p>
                  <p className="mt-1 text-[8px]" style={{ color: i === 2 ? "hsl(var(--ks-signal))" : "var(--portal-accent)" }}>
                    {i === 2 ? "needs review" : "illustrative"}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-1 rounded-md bg-[#f3f5f5] p-1">
              {["Overview", "Farmers", "Land Data", "Analytics"].map((tab, i) => (
                <div key={tab} className={cn("flex-1 rounded px-2 py-2 text-center text-[9px]", i === 0 ? "bg-white font-medium text-ks-ink shadow-sm" : "text-ks-ink-3")}>{tab}</div>
              ))}
            </div>

            <div className="mt-3 grid gap-3 lg:grid-cols-[1.25fr_.75fr]">
              <div className="rounded-md border border-ks-line bg-white p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold text-ks-ink">Farmer activity</p>
                    <p className="text-[9px] text-ks-ink-4">Illustrative network view</p>
                  </div>
                  <span className="text-[9px]" style={{ color: "var(--portal-accent)" }}>Last 7 days</span>
                </div>
                <div className="mt-4 flex h-24 items-end gap-1.5">
                  {[38, 55, 48, 70, 61, 82, 66, 88, 73, 92, 78, 86].map((h, i) => (
                    <span key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i > 8 ? "var(--portal-brand)" : "hsl(var(--ks-line-strong))", opacity: i > 8 ? 0.82 : 0.55 }} />
                  ))}
                </div>
              </div>
              <div className="rounded-md border border-ks-line bg-white p-3">
                <p className="text-[11px] font-semibold text-ks-ink">Land signals</p>
                <p className="mt-1 text-[9px] text-ks-ink-4">Illustrative status cards</p>
                <div className="mt-3 space-y-2">
                  {[
                    ["NDVI", "Monitoring"],
                    ["Soil", "12 reports"],
                    ["Weather", "6 alerts"],
                  ].map(([a, b]) => (
                    <div key={a} className="flex items-center justify-between rounded border border-ks-line px-2.5 py-2">
                      <span className="text-[9px] font-medium text-ks-ink">{a}</span>
                      <span className="text-[9px] text-ks-ink-3">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-md border border-dashed border-ks-line-strong bg-white/70 px-3 py-2 text-center text-[9px] text-ks-ink-4">
              Simulation only · example interface · no live partner data
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
