import React from "react";
import type { TechKey } from "@/content/technologies";
import { SceneFrame } from "./SceneFrame";

/**
 * Animated explainers for the five technologies. Diagrams, not product
 * screens: each shows what the technology does for a field, in the site's
 * own drawing language. viewBox 480×320.
 */
const D = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;

function TatvaScene() {
  return (
    <svg className="ks-scene" viewBox="0 0 480 320" aria-hidden>
      {/* sky with a sun that travels */}
      <g className="sc-sun" style={{ transformOrigin: "240px 60px" }}>
        <circle cx="300" cy="62" r="14" className="fill-signal-soft" />
        <circle cx="300" cy="62" r="8" className="fill-signal" />
      </g>
      <path d="M86 92c8-18 34-20 44-6 10-10 30-6 32 10 14 0 18 18 4 20H86c-12 0-14-20 0-24z" className="fill-soft sc-rise" style={D(0.3)} />
      {/* satellite sweep */}
      <g className="sc-sweep" style={D(1)}>
        <rect x="90" y="150" width="4" height="130" className="fill-field" opacity="0.5" />
        <rect x="80" y="150" width="24" height="130" fill="url(#tatva-glow)" opacity="0.5" />
      </g>
      <defs>
        <linearGradient id="tatva-glow" x1="0" x2="1">
          <stop offset="0" stopColor="hsl(var(--ks-field))" stopOpacity="0" />
          <stop offset="1" stopColor="hsl(var(--ks-field))" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* field parcel: greens up as the satellite scores it */}
      <polygon points="120,160 330,146 360,250 150,276" fill="hsl(42 40% 86%)" className="sc-green" style={D(1.2)} stroke="hsl(var(--ks-ink))" strokeWidth="1.5" />
      <polyline points="150,276 120,160 330,146 360,250 150,276" className="ink sc-draw" style={{ "--len": "760", "--dur": "1.4s" } as React.CSSProperties} />
      {/* rows */}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={150 + i * 22} y1={276 - i * 28} x2={330 + i * 8} y2={146 + i * 26} className="ln sc-in" style={D(1.6 + i * 0.1)} opacity="0.7" />
      ))}
      {/* rain gauge */}
      <g className="sc-rise" style={D(2)}>
        <rect x="392" y="170" width="22" height="90" rx="6" className="fill-white" stroke="hsl(var(--ks-ink))" strokeWidth="1.5" />
        <rect x="395" y="215" width="16" height="42" rx="4" className="fill-field sc-bar" style={{ "--d": "2.3s", "--dur": "1.8s" } as React.CSSProperties} opacity="0.8" />
        <text x="403" y="282" textAnchor="middle">water</text>
      </g>
      {/* readings */}
      <g className="sc-rise" style={D(2.6)}>
        <text x="120" y="304">hourly weather</text>
        <text x="250" y="304">daily satellite</text>
        <text x="362" y="304">health score</text>
      </g>
      <g className="sc-rise" style={D(3)}>
        <circle cx="240" cy="210" r="18" className="fill-white" stroke="hsl(var(--ks-field))" strokeWidth="2" />
        <text x="240" y="214" textAnchor="middle" className="t-ink">NDVI</text>
        <circle cx="240" cy="210" r="18" className="field sc-pulse" style={D(3.2)} />
      </g>
    </svg>
  );
}

function TarkaScene() {
  const steps = [
    { y: 92, label: "your field's state" },
    { y: 150, label: "your crop's stage" },
    { y: 208, label: "expert-approved guidance" },
  ];
  return (
    <svg className="ks-scene" viewBox="0 0 480 320" aria-hidden>
      {/* question bubble */}
      <g className="sc-rise" style={D(0.2)}>
        <rect x="32" y="40" width="150" height="54" rx="14" className="fill-white" stroke="hsl(var(--ks-ink))" strokeWidth="1.5" />
        <path d="M60 94l-8 14 20-14z" className="fill-white" stroke="hsl(var(--ks-ink))" strokeWidth="1.5" />
        <text x="48" y="62" className="t-ink t-sans" style={{ fontSize: 13 }}>पाने पिवळी पडत आहेत</text>
        <text x="48" y="80" className="t-sans">leaves turning yellow?</text>
      </g>
      {/* path to checks */}
      <path d="M182 68 H 230 V 230" className="ln sc-draw" style={{ "--len": "260", "--d": "0.8s", "--dur": "1s" } as React.CSSProperties} />
      {steps.map((s, i) => (
        <g key={s.label} className="sc-rise" style={D(1.3 + i * 0.55)}>
          <line x1="230" y1={s.y + 14} x2="262" y2={s.y + 14} className="ln" />
          <rect x="262" y={s.y} width="178" height="30" rx="8" className="fill-white" stroke="hsl(var(--ks-line-strong))" />
          <text x="276" y={s.y + 19} className="t-sans t-ink">{s.label}</text>
          <path d={`M416 ${s.y + 15} l5 5 l9 -10`} className="field sc-tick" style={D(1.7 + i * 0.55)} strokeWidth="2" />
        </g>
      ))}
      {/* gate */}
      <g className="sc-rise" style={D(3.1)}>
        <rect x="262" y="246" width="178" height="26" rx="13" className="fill-field-soft" />
        <text x="351" y="263" textAnchor="middle" className="t-sans" style={{ fill: "hsl(var(--ks-field-deep))" }}>safety check passed</text>
      </g>
      {/* answer bubble */}
      <g className="sc-rise" style={D(3.6)}>
        <rect x="32" y="206" width="170" height="66" rx="14" className="fill-field" />
        <text x="48" y="230" className="t-sans" style={{ fill: "hsl(var(--ks-field-ink))", fontSize: 13 }}>Explained in Marathi</text>
        <text x="48" y="248" className="t-sans" style={{ fill: "hsl(var(--ks-field-ink))", opacity: 0.8 }}>what to do, how much,</text>
        <text x="48" y="262" className="t-sans" style={{ fill: "hsl(var(--ks-field-ink))", opacity: 0.8 }}>when, and why</text>
      </g>
      <text x="240" y="304" textAnchor="middle" className="sc-in" style={D(4)}>AI explains · governed guidance decides</text>
    </svg>
  );
}

function RiituScene() {
  const stages = ["sowing", "tillering", "panicle", "flowering", "ripening"];
  return (
    <svg className="ks-scene" viewBox="0 0 480 320" aria-hidden>
      <line x1="40" y1="150" x2="440" y2="150" className="ln sc-draw" style={{ "--len": "400", "--dur": "1.2s" } as React.CSSProperties} />
      {stages.map((s, i) => (
        <g key={s} className="sc-rise" style={D(0.6 + i * 0.2)}>
          <circle cx={60 + i * 95} cy="150" r="6" className={i < 3 ? "fill-field" : "fill-line"} />
          <text x={60 + i * 95} y="178" textAnchor="middle">{s}</text>
          {/* plant height grows with stage */}
          <path d={`M${60 + i * 95} 128 v-${12 + i * 12}`} className="field sc-draw" style={{ "--len": "80", "--d": `${1 + i * 0.2}s`, "--dur": "0.8s" } as React.CSSProperties} />
          <path d={`M${60 + i * 95} ${120 - i * 8} q-10 -6 -14 -16 M${60 + i * 95} ${112 - i * 8} q10 -6 14 -16`} className="field sc-draw" style={{ "--len": "60", "--d": `${1.4 + i * 0.2}s`, "--dur": "0.6s" } as React.CSSProperties} />
        </g>
      ))}
      {/* "today" marker that advances */}
      <g className="sc-slide" style={{ "--sc-dx": "95px", "--dur": "6s", "--d": "2s" } as React.CSSProperties}>
        <line x1="250" y1="60" x2="250" y2="200" className="ink" strokeDasharray="3 4" />
        <rect x="222" y="40" width="56" height="20" rx="10" className="fill-ink" />
        <text x="250" y="54" textAnchor="middle" style={{ fill: "hsl(var(--ks-paper))" }}>today</text>
      </g>
      {/* decisions for today */}
      {[
        { x: 60, label: "Due · top-dress nitrogen", tone: "fill-field-soft", d: 2.6 },
        { x: 230, label: "Watch · leaf colour", tone: "fill-signal-soft", d: 3.1 },
        { x: 300, label: "Blocked · rain expected", tone: "fill-soft", d: 3.6 },
      ].map((c) => (
        <g key={c.label} className="sc-rise" style={D(c.d)}>
          <rect x={c.x} y={c.x === 60 ? 214 : c.x === 230 ? 244 : 274} width="170" height="24" rx="12" className={c.tone} />
          <text x={c.x + 12} y={(c.x === 60 ? 214 : c.x === 230 ? 244 : 274) + 16} className="t-sans t-ink">{c.label}</text>
        </g>
      ))}
      <text x="440" y="304" textAnchor="end" className="sc-in" style={D(4)}>adapts to your field's actual stage</text>
    </svg>
  );
}

function PahraScene() {
  return (
    <svg className="ks-scene" viewBox="0 0 480 320" aria-hidden>
      <polygon points="70,120 300,100 340,230 110,250" className="fill-field-soft sc-in" style={D(0.2)} stroke="hsl(var(--ks-ink))" strokeWidth="1.5" />
      {/* weather trigger */}
      <g className="sc-rise" style={D(0.6)}>
        <path d="M336 58c8-18 34-20 44-6 10-10 30-6 32 10 14 0 18 18 4 20h-80c-12 0-14-20 0-24z" className="fill-soft" stroke="hsl(var(--ks-ink-3))" />
        <text x="378" y="98" textAnchor="middle">humid · 28°C</text>
      </g>
      {/* risk marker pulses on the north plot */}
      <g className="sc-rise" style={D(1.2)}>
        <circle cx="250" cy="150" r="9" className="fill-signal" />
        <circle cx="250" cy="150" r="9" className="sc-pulse" fill="none" stroke="hsl(var(--ks-signal))" strokeWidth="2" style={D(1.4)} />
        <text x="250" y="132" textAnchor="middle" className="t-ink">risk rising</text>
      </g>
      {/* footpath: go and scout */}
      <path d="M120 240 C 160 210, 200 200, 240 160" className="ink sc-draw" strokeDasharray="4 6" style={{ "--len": "160", "--d": "2s", "--dur": "1.4s", strokeDasharray: "4 6" } as React.CSSProperties} />
      <g className="sc-rise" style={D(2.2)}>
        <circle cx="120" cy="240" r="7" className="fill-ink" />
        <text x="120" y="268" textAnchor="middle">scout</text>
      </g>
      {/* confirm with a photo, then decide */}
      <g className="sc-rise" style={D(3.4)}>
        <rect x="286" y="168" width="54" height="40" rx="6" className="fill-white" stroke="hsl(var(--ks-ink))" strokeWidth="1.5" />
        <circle cx="313" cy="188" r="9" className="ink" />
        <text x="313" y="226" textAnchor="middle">confirm</text>
      </g>
      <g className="sc-rise" style={D(4)}>
        <rect x="60" y="284" width="360" height="24" rx="12" className="fill-white" stroke="hsl(var(--ks-line-strong))" />
        <text x="240" y="300" textAnchor="middle" className="t-sans t-ink">An alert asks you to look. It never prescribes a chemical.</text>
      </g>
    </svg>
  );
}

function RukhScene() {
  const pts = [
    [60, 220], [110, 200], [160, 212], [210, 180], [260, 170], [310, 150], [360, 162], [410, 140],
  ];
  const path = pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
  const markets = ["here", "nearby", "state"];
  return (
    <svg className="ks-scene" viewBox="0 0 480 320" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="60" y1={120 + i * 40} x2="420" y2={120 + i * 40} className="ln" opacity="0.5" />
      ))}
      <path d={path} className="field sc-draw" strokeWidth="2" style={{ "--len": "420", "--dur": "2.2s" } as React.CSSProperties} />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3.5" className="fill-field sc-in" style={D(0.3 + i * 0.25)} />
      ))}
      {/* comparison bars for three markets */}
      {markets.map((m, i) => (
        <g key={m} className="sc-rise" style={D(2.4 + i * 0.3)}>
          <rect x={290 + i * 56} y={240 - [52, 70, 40][i]} width="26" height={[52, 70, 40][i]} rx="4" className={i === 1 ? "fill-field sc-bar" : "fill-line sc-bar"} style={{ "--d": `${2.5 + i * 0.3}s` } as React.CSSProperties} />
          <text x={303 + i * 56} y="258" textAnchor="middle">{m}</text>
        </g>
      ))}
      {/* selling advisor window */}
      <g className="sc-rise" style={D(3.6)}>
        <rect x="60" y="248" width="196" height="40" rx="10" className="fill-white" stroke="hsl(var(--ks-ink))" strokeWidth="1.5" />
        <text x="76" y="266" className="t-sans t-ink">Selling advisor</text>
        <text x="76" y="281" className="t-sans">nearby market pays more this week</text>
      </g>
      <text x="60" y="100" className="sc-in" style={D(1)}>price, last 8 weeks</text>
      <text x="420" y="304" textAnchor="end" className="sc-in" style={D(4)}>market insight, not a guarantee</text>
    </svg>
  );
}

const SCENES: Record<TechKey, { C: React.FC; label: string }> = {
  tatva: { C: TatvaScene, label: "Animated diagram: weather, satellite pass and water balance scored for one field" },
  tarka: { C: TarkaScene, label: "Animated diagram: a farmer's question checked against field state, crop stage and expert-approved guidance, then explained in Marathi" },
  riitu: { C: RiituScene, label: "Animated diagram: crop stages on a timeline with today's due, watch and blocked decisions" },
  pahra: { C: PahraScene, label: "Animated diagram: a rising risk on a plot, a scouting path, a photo to confirm, then a decision" },
  rukh: { C: RukhScene, label: "Animated diagram: price trend, comparison across markets and a selling advisor" },
};

export function TechScene({ tech, className }: { tech: TechKey; className?: string }) {
  const { C, label } = SCENES[tech];
  return (
    <div className={className}>
      <div className="aspect-[3/2] w-full overflow-hidden rounded-ks-lg border border-ks-line bg-ks-white shadow-ks-1">
        <SceneFrame label={label}>
          <C />
        </SceneFrame>
      </div>
      <p className="ks-small mt-2 text-center text-[0.75rem]">Illustration</p>
    </div>
  );
}
