import React from "react";
import { SceneFrame } from "./SceneFrame";

/**
 * Animated feature vignettes shown inside the phone frame. They explain what
 * a feature does in the site's diagram language; they are not screenshots and
 * do not imitate the app's interface. viewBox 390×844.
 */
const D = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;

const Header = ({ title }: { title: string }) => (
  <g>
    <text x="32" y="86" className="t-sans t-ink" style={{ fontSize: 22, fontWeight: 500 }}>{title}</text>
    <line x1="32" y1="104" x2="358" y2="104" className="ln" />
  </g>
);

const Pill = ({ x, y, w, text, tone = "fill-soft", d = 0 }: { x: number | string; y: number | string; w: number | string; text: string; tone?: string; d?: number }) => (
  <g className="sc-rise" style={D(d)}>
    <rect x={x} y={y} width={w} height="34" rx="17" className={tone} />
    <text x={Number(x) + 16} y={Number(y) + 22} className="t-sans t-ink" style={{ fontSize: 14 }}>{text}</text>
  </g>
);

function FarmToday() {
  const rows = [
    { tone: "fill-field-soft", k: "Due", t: "Second nitrogen top-dress", d: 0.4 },
    { tone: "fill-signal-soft", k: "Watch", t: "Leaf colour, north plot", d: 0.8 },
    { tone: "fill-soft", k: "Blocked", t: "Spray: rain in 6 hours", d: 1.2 },
    { tone: "fill-soft", k: "Info", t: "Panicle initiation begins", d: 1.6 },
  ];
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="What should I do today?" />
      {rows.map((r, i) => (
        <g key={r.k} className="sc-rise" style={D(r.d)}>
          <rect x="32" y={140 + i * 110} width="326" height="88" rx="14" className="fill-white" stroke="hsl(var(--ks-line))" />
          <rect x="48" y={156 + i * 110} width="78" height="24" rx="12" className={r.tone} />
          <text x="87" y={172 + i * 110} textAnchor="middle" className="t-ink">{r.k}</text>
          <text x="48" y={210 + i * 110} className="t-sans t-ink" style={{ fontSize: 16 }}>{r.t}</text>
          <path d={`M330 ${184 + i * 110} l5 5 l9 -10`} className="field sc-tick" strokeWidth="2" style={D(r.d + 0.3)} />
        </g>
      ))}
      <text x="32" y="640" className="sc-in" style={D(2.2)}>reconciled overnight against your crop's stage</text>
      <g className="sc-rise" style={D(2.6)}>
        <rect x="32" y="680" width="326" height="56" rx="28" className="fill-ink" />
        <text x="195" y="714" textAnchor="middle" className="t-sans" style={{ fill: "hsl(var(--ks-paper))", fontSize: 16 }}>Mark done · ask why</text>
      </g>
    </svg>
  );
}

function Chat() {
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="Ask in your language" />
      <g className="sc-rise" style={D(0.3)}>
        <rect x="90" y="140" width="268" height="96" rx="18" className="fill-field" />
        <text x="110" y="176" className="t-sans" style={{ fill: "hsl(var(--ks-field-ink))", fontSize: 17 }}>माझ्या भाताची पाने</text>
        <text x="110" y="202" className="t-sans" style={{ fill: "hsl(var(--ks-field-ink))", fontSize: 17 }}>पिवळी पडत आहेत</text>
        <text x="110" y="226" className="t-sans" style={{ fill: "hsl(var(--ks-field-ink))", opacity: 0.75, fontSize: 13 }}>+ photo of the leaf</text>
      </g>
      <g className="sc-rise" style={D(1.4)}>
        <rect x="32" y="266" width="300" height="200" rx="18" className="fill-white" stroke="hsl(var(--ks-line))" />
        <text x="52" y="300" className="t-sans t-ink" style={{ fontSize: 16 }}>पॅनिकल सुरू होत आहे.</text>
        <text x="52" y="326" className="t-sans t-ink" style={{ fontSize: 16 }}>युरिया + पोटॅश द्या,</text>
        <text x="52" y="352" className="t-sans t-ink" style={{ fontSize: 16 }}>उभ्या पाण्यात.</text>
        <line x1="52" y1="376" x2="312" y2="376" className="ln" />
        <text x="52" y="402" className="t-sans" style={{ fontSize: 13 }}>checked: field state · crop stage</text>
        <text x="52" y="424" className="t-sans" style={{ fontSize: 13 }}>source: expert-approved guidance</text>
        <text x="52" y="446" className="t-sans" style={{ fontSize: 13, fill: "hsl(var(--ks-field-deep))" }}>why this? ›</text>
      </g>
      {/* voice bars */}
      <g className="sc-rise" style={D(2.2)}>
        <rect x="32" y="700" width="326" height="64" rx="32" className="fill-soft" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={160 + i * 12} y="718" width="6" height="28" rx="3" className="fill-field sc-wave" style={D(i * 0.12)} />
        ))}
        <text x="195" y="790" textAnchor="middle">speak, or type · 14 languages</text>
      </g>
    </svg>
  );
}

function Voice() {
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="Just speak" />
      <g className="sc-in" style={D(0.2)}>
        <circle cx="195" cy="400" r="110" className="fill-field-soft" />
        <circle cx="195" cy="400" r="110" className="sc-pulse" fill="none" stroke="hsl(var(--ks-field))" strokeWidth="2" />
        <circle cx="195" cy="400" r="70" className="fill-field" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={171 + i * 12} y="372" width="6" height="56" rx="3" className="sc-wave" style={{ ...D(i * 0.15), fill: "hsl(var(--ks-field-ink))" }} />
        ))}
      </g>
      <text x="195" y="560" textAnchor="middle" className="t-sans t-ink sc-rise" style={{ ...D(0.8), fontSize: 18 }}>"माझी जमीन नोंदवा"</text>
      <text x="195" y="590" textAnchor="middle" className="sc-rise" style={D(1.2)}>voice onboarding · voice land capture</text>
      <Pill x="60" y="660" w="270" text="Reads answers aloud, too" d={1.8} />
    </svg>
  );
}

function Weather() {
  const hours = [22, 24, 27, 30, 31, 29, 26, 24];
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="Weather for this land" />
      <g className="sc-sun" style={{ transformOrigin: "195px 190px" }}>
        <circle cx="195" cy="200" r="30" className="fill-signal-soft" />
        <circle cx="195" cy="200" r="16" className="fill-signal" />
      </g>
      <text x="32" y="300">next 24 hours</text>
      {hours.map((h, i) => (
        <g key={i}>
          <rect x={40 + i * 40} y={420 - h * 3} width="22" height={h * 3} rx="4" className="fill-field sc-bar" style={D(0.3 + i * 0.1)} opacity={0.4 + i * 0.07} />
          <text x={51 + i * 40} y="440" textAnchor="middle">{h}°</text>
        </g>
      ))}
      <Pill x="32" y="490" w="326" text="Rain likely after 6 pm · spray window closes" tone="fill-signal-soft" d={1.4} />
      <Pill x="32" y="540" w="326" text="Growing-degree-days: on track for stage" tone="fill-field-soft" d={1.8} />
      <text x="32" y="620" className="sc-in" style={D(2.2)}>7-day outlook</text>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <g key={i} className="sc-rise" style={D(2.3 + i * 0.08)}>
          <circle cx={56 + i * 46} cy="660" r="12" className={i === 2 || i === 3 ? "fill-soft" : "fill-signal-soft"} />
          <text x={56 + i * 46} y="700" textAnchor="middle">{["M", "T", "W", "T", "F", "S", "S"][i]}</text>
        </g>
      ))}
    </svg>
  );
}

function Ndvi() {
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="Your field from above" />
      <rect x="32" y="130" width="326" height="300" rx="18" className="fill-soft" />
      <polygon points="80,170 300,160 330,380 90,400" fill="hsl(42 40% 86%)" className="sc-green" style={D(0.4)} stroke="hsl(var(--ks-ink))" strokeWidth="1.5" />
      <polygon points="200,250 300,245 310,330 210,340" className="fill-signal-soft sc-in" style={D(1.6)} />
      <g className="sc-rise" style={D(2)}>
        <circle cx="255" cy="290" r="8" className="fill-signal" />
        <circle cx="255" cy="290" r="8" className="sc-pulse" fill="none" stroke="hsl(var(--ks-signal))" strokeWidth="2" />
      </g>
      <g className="sc-sweep" style={D(0.5)}>
        <rect x="40" y="130" width="3" height="300" className="fill-field" opacity="0.5" />
      </g>
      <g className="sc-rise" style={D(1)}>
        <circle cx="90" cy="520" r="44" className="fill-white" stroke="hsl(var(--ks-field))" strokeWidth="3" />
        <text x="90" y="517" textAnchor="middle" className="t-ink" style={{ fontSize: 20 }}>72</text>
        <text x="90" y="536" textAnchor="middle">health</text>
      </g>
      <g className="sc-rise" style={D(1.3)}>
        <text x="160" y="505" className="t-sans t-ink" style={{ fontSize: 15 }}>Trend: steady this week</text>
        <text x="160" y="530" className="t-sans" style={{ fontSize: 14 }}>Early warning: one patch</text>
        <text x="160" y="552" className="t-sans" style={{ fontSize: 14 }}>greening slower. Go and look.</text>
      </g>
      <Pill x="32" y="610" w="326" text="Irrigation gauge · evapotranspiration" d={2.2} />
      <Pill x="32" y="660" w="326" text="Daily satellite pass, no sensors needed" d={2.5} />
    </svg>
  );
}

function Market() {
  const bars = [{ m: "Pune", v: 2240 }, { m: "Nashik", v: 2410 }, { m: "Sangli", v: 2180 }];
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="Where should I sell?" />
      <text x="32" y="140">onion · ₹ per quintal · today</text>
      {bars.map((b, i) => (
        <g key={b.m} className="sc-rise" style={D(0.3 + i * 0.25)}>
          <text x="32" y={190 + i * 70} className="t-sans t-ink" style={{ fontSize: 16 }}>{b.m}</text>
          <rect x="130" y={172 + i * 70} width={b.v / 11} height="26" rx="6" className={i === 1 ? "fill-field" : "fill-line"} />
          <text x={140 + b.v / 11} y={190 + i * 70} className="t-ink">{b.v}</text>
        </g>
      ))}
      <text x="32" y="420" className="sc-in" style={D(1.2)}>last 8 weeks</text>
      <polyline points="32,520 80,505 128,512 176,490 224,484 272,470 320,476 358,462" className="field sc-draw" strokeWidth="2" style={{ "--len": "360", "--d": "1.4s" } as React.CSSProperties} />
      <g className="sc-rise" style={D(2.4)}>
        <rect x="32" y="580" width="326" height="92" rx="16" className="fill-white" stroke="hsl(var(--ks-ink))" strokeWidth="1.5" />
        <text x="52" y="612" className="t-sans t-ink" style={{ fontSize: 16 }}>Selling advisor</text>
        <text x="52" y="638" className="t-sans" style={{ fontSize: 14 }}>Nashik pays ₹170 more today.</text>
        <text x="52" y="658" className="t-sans" style={{ fontSize: 14 }}>Prices firmed for three weeks.</text>
      </g>
      <text x="32" y="720" className="sc-in" style={D(3)}>market insight · not a guaranteed price</text>
    </svg>
  );
}

function Community() {
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="Farmers connected beyond language" />
      <g className="sc-rise" style={D(0.3)}>
        <rect x="32" y="130" width="326" height="190" rx="16" className="fill-white" stroke="hsl(var(--ks-line))" />
        <text x="52" y="165" className="t-sans t-ink" style={{ fontSize: 15 }}>Marathi farmer</text>
        <rect x="52" y="182" width="245" height="52" rx="14" className="fill-field-soft" />
        <text x="68" y="214" className="t-sans t-ink" style={{ fontSize: 15 }}>“पावसानंतर ऊस कसा दिसतोय?”</text>
        <text x="52" y="260" className="t-sans" style={{ fontSize: 12 }}>shared to the community</text>
        <text x="52" y="288" className="t-sans" style={{ fontSize: 13 }}>read aloud · translate · reply</text>
      </g>
      <g className="sc-rise" style={D(1.2)}>
        <rect x="76" y="355" width="282" height="150" rx="16" className="fill-white" stroke="hsl(var(--ks-line))" />
        <text x="96" y="390" className="t-sans t-ink" style={{ fontSize: 15 }}>Telugu farmer</text>
        <rect x="96" y="410" width="235" height="48" rx="14" className="fill-soft" />
        <text x="112" y="439" className="t-sans t-ink" style={{ fontSize: 15 }}>“వర్షం తర్వాత నా పొలం?”</text>
        <text x="96" y="482" className="t-sans" style={{ fontSize: 12 }}>same conversation · different language</text>
      </g>
      <path d="M195 320 C195 340 214 350 230 364" className="field sc-draw" strokeDasharray="4 6" style={{ "--len": "70", "--d": "1.6s", "--dur": "0.8s" } as React.CSSProperties} />
      <Pill x="32" y="560" w="326" text="Many languages · one farmer community" tone="fill-field-soft" d={1.9} />
      <text x="32" y="650" className="sc-in" style={D(2.3)}>local-language posts · groups · read aloud</text>
    </svg>
  );
}
function Reels() {
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="Watch the season" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="sc-rise" style={D(0.3 + i * 0.3)}>
          <rect x={32 + (i % 2) * 170} y={130 + Math.floor(i / 2) * 290} width="156" height="260" rx="16" className={i === 0 ? "fill-field" : "fill-soft"} />
          <circle cx={110 + (i % 2) * 170} cy={240 + Math.floor(i / 2) * 290} r="22" className="fill-white" />
          <path d={`M${104 + (i % 2) * 170} ${230 + Math.floor(i / 2) * 290} l16 10 l-16 10z`} className="fill-ink" />
          <text x={48 + (i % 2) * 170} y={360 + Math.floor(i / 2) * 290} className="t-sans" style={{ fontSize: 13, fill: i === 0 ? "hsl(var(--ks-field-ink))" : "hsl(var(--ks-ink-2))" }}>
            {["Sugarcane: pre-season", "Sugarcane: planting", "Sugarcane: grand growth", "Sugarcane: ratoon"][i]}
          </text>
        </g>
      ))}
      <text x="32" y="740" className="sc-in" style={D(1.8)}>short reels from the KisanShakti AI channel</text>
    </svg>
  );
}

function Land() {
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="Map your land" />
      <rect x="32" y="130" width="326" height="330" rx="18" className="fill-soft" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="32" y1={190 + i * 60} x2="358" y2={190 + i * 60} className="ln" opacity="0.4" />
      ))}
      <polyline points="90,180 300,170 320,400 110,420 90,180" className="ink sc-draw" strokeWidth="2.5" style={{ "--len": "900", "--dur": "2.4s", "--d": "0.4s" } as React.CSSProperties} />
      {[[90, 180], [300, 170], [320, 400], [110, 420]].map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="7" className="fill-white sc-in" stroke="hsl(var(--ks-ink))" strokeWidth="2" style={D(0.5 + i * 0.6)} />
      ))}
      <polygon points="90,180 300,170 320,400 110,420" className="fill-field-soft sc-in" style={D(3)} opacity="0.8" />
      <g className="sc-rise" style={D(3.2)}>
        <rect x="150" y="270" width="110" height="40" rx="20" className="fill-ink" />
        <text x="205" y="296" textAnchor="middle" className="t-sans" style={{ fill: "hsl(var(--ks-paper))", fontSize: 15 }}>1.84 acres</text>
      </g>
      <Pill x="32" y="490" w="326" text="Season · crop · variety · sowing date" d={3.6} />
      <Pill x="32" y="540" w="326" text="Cultivation method · satellite thumbnail" d={3.9} />
      <Pill x="32" y="590" w="326" text="Land health score updates daily" tone="fill-field-soft" d={4.2} />
    </svg>
  );
}

function Analytics() {
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="This season's numbers" />
      {[["Total area", "4.2 acres"], ["Active crops", "2"], ["Projected revenue", "₹ 1.9 L"], ["Projected profit", "₹ 0.7 L"]].map((k, i) => (
        <g key={k[0]} className="sc-rise" style={D(0.3 + i * 0.2)}>
          <rect x={32 + (i % 2) * 170} y={130 + Math.floor(i / 2) * 96} width="156" height="80" rx="14" className="fill-white" stroke="hsl(var(--ks-line))" />
          <text x={48 + (i % 2) * 170} y={158 + Math.floor(i / 2) * 96} style={{ fontSize: 11 }}>{k[0]}</text>
          <text x={48 + (i % 2) * 170} y={190 + Math.floor(i / 2) * 96} className="t-sans t-ink" style={{ fontSize: 20 }}>{k[1]}</text>
        </g>
      ))}
      <text x="32" y="360" className="sc-in" style={D(1.2)}>expenses logged · expected yield × current price</text>
      {[60, 30, 80, 45, 70].map((h, i) => (
        <rect key={i} x={48 + i * 64} y={480 - h} width="34" height={h} rx="6" className={i === 4 ? "fill-field sc-bar" : "fill-line sc-bar"} style={D(1.4 + i * 0.12)} />
      ))}
      <g className="sc-rise" style={D(2.4)}>
        <rect x="32" y="520" width="326" height="72" rx="14" className="fill-signal-soft" />
        <text x="48" y="548" className="t-sans t-ink" style={{ fontSize: 14 }}>Projection notice</text>
        <text x="48" y="572" className="t-sans" style={{ fontSize: 13 }}>Estimates from your logs and today's prices.</text>
      </g>
      <text x="32" y="640" className="sc-in" style={D(2.8)}>Crop & Stage · Financial · Market Pulse · Soil</text>
      <text x="32" y="662" className="sc-in" style={D(3)}>Task Performance · Water & Weather</text>
    </svg>
  );
}

function Alerts() {
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="What to watch this week" />
      <g className="sc-rise" style={D(0.3)}>
        <rect x="32" y="130" width="326" height="150" rx="16" className="fill-white" stroke="hsl(var(--ks-signal))" strokeWidth="1.5" />
        <circle cx="62" cy="166" r="10" className="fill-signal" />
        <circle cx="62" cy="166" r="10" className="sc-pulse" fill="none" stroke="hsl(var(--ks-signal))" strokeWidth="2" />
        <text x="84" y="171" className="t-sans t-ink" style={{ fontSize: 16 }}>Leaf blast risk rising</text>
        <text x="48" y="206" className="t-sans" style={{ fontSize: 14 }}>Humid nights, 25–28°C. Go and look</text>
        <text x="48" y="228" className="t-sans" style={{ fontSize: 14 }}>for diamond-shaped lesions.</text>
        <text x="48" y="262" className="t-sans" style={{ fontSize: 13, fill: "hsl(var(--ks-field-deep))" }}>Scout → confirm with a photo → decide</text>
      </g>
      <g className="sc-rise" style={D(1)}>
        <rect x="32" y="300" width="326" height="100" rx="16" className="fill-white" stroke="hsl(var(--ks-line))" />
        <text x="48" y="334" className="t-sans t-ink" style={{ fontSize: 16 }}>Heavy rain in 2 days</text>
        <text x="48" y="360" className="t-sans" style={{ fontSize: 14 }}>Check drainage on the low plot.</text>
      </g>
      <Pill x="32" y="440" w="326" text="Early access" tone="fill-signal-soft" d={1.6} />
      <text x="32" y="520" className="sc-in" style={D(2)}>An alert never prescribes a chemical.</text>
      <text x="32" y="542" className="sc-in" style={D(2.2)}>Notification preferences are yours.</text>
    </svg>
  );
}

function Growth() {
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="Is my crop on track?" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="sc-rise" style={D(0.3 + i * 0.3)}>
          <rect x={40 + i * 80} y="140" width="64" height="120" rx="12" className="fill-soft" />
          <path d={`M${72 + i * 80} 250 v-${30 + i * 22}`} className="field sc-draw" strokeWidth="2.5" style={{ "--len": "120", "--d": `${0.5 + i * 0.3}s` } as React.CSSProperties} />
          <text x={72 + i * 80} y="285" textAnchor="middle">{["wk 2", "wk 4", "wk 6", "wk 8"][i]}</text>
        </g>
      ))}
      <Pill x="32" y="330" w="326" text="Photo · 24 Sep · tillering confirmed" tone="fill-field-soft" d={1.6} />
      <Pill x="32" y="380" w="326" text="Field reading · plant height 38 cm" d={1.9} />
      <Pill x="32" y="430" w="326" text="Schedule adjusted to actual stage" d={2.2} />
      <text x="32" y="520" className="sc-in" style={D(2.6)}>your readings keep the schedule honest</text>
    </svg>
  );
}

function Login() {
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="Sign in" />
      <Pill x="32" y="200" w="326" text="Mobile number" d={0.3} />
      <g className="sc-rise" style={D(0.8)}>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={70 + i * 66} y="270" width="54" height="54" rx="12" className="fill-white" stroke="hsl(var(--ks-ink))" strokeWidth="1.5" />
        ))}
        <text x="195" y="350" textAnchor="middle">4-digit PIN</text>
      </g>
      <text x="195" y="440" textAnchor="middle" className="sc-in" style={D(1.4)}>works offline · syncs when back online</text>
    </svg>
  );
}

function TenantPortal() {
  const rows = ["Farmers", "Lands", "Activity", "Branding"];
  return (
    <svg className="ks-scene" viewBox="0 0 1440 900" aria-hidden>
      <rect x="0" y="0" width="300" height="900" className="fill-soft" />
      <rect x="40" y="48" width="36" height="36" rx="8" className="fill-field sc-in" />
      <text x="90" y="72" className="t-sans t-ink" style={{ fontSize: 20 }}>Your organisation</text>
      {rows.map((r, i) => (
        <g key={r} className="sc-rise" style={D(0.2 + i * 0.15)}>
          <rect x="24" y={140 + i * 64} width="252" height="48" rx="12" className={i === 0 ? "fill-white" : "fill-soft"} />
          <text x="48" y={170 + i * 64} className="t-sans t-ink" style={{ fontSize: 18 }}>{r}</text>
        </g>
      ))}
      <text x="360" y="90" className="t-sans t-ink" style={{ fontSize: 30 }}>Farmer network</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="sc-rise" style={D(0.6 + i * 0.15)}>
          <rect x={360 + i * 260} y="130" width="236" height="120" rx="16" className="fill-white" stroke="hsl(var(--ks-line))" />
          <text x={384 + i * 260} y="170" style={{ fontSize: 14 }}>{["farmers onboarded", "lands mapped", "active this week", "villages"][i]}</text>
          <text x={384 + i * 260} y="222" className="t-sans t-ink" style={{ fontSize: 34 }}>{["1,240", "2,018", "870", "46"][i]}</text>
        </g>
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i} className="sc-rise" style={D(1.2 + i * 0.12)}>
          <rect x="360" y={300 + i * 72} width="1040" height="56" rx="12" className="fill-white" stroke="hsl(var(--ks-line))" />
          <circle cx="396" cy={328 + i * 72} r="14" className="fill-field-soft" />
          <text x="424" y={334 + i * 72} className="t-sans t-ink" style={{ fontSize: 18 }}>{["Sunita Patil", "Ramesh Jadhav", "Asha More", "Vikram Shinde", "Meera Kale", "Sanjay Pawar"][i]}</text>
          <text x="760" y={334 + i * 72} className="t-sans" style={{ fontSize: 16 }}>{["Rice · 1.8 acres", "Sugarcane · 3.2 acres", "Onion · 0.9 acres", "Soybean · 2.4 acres", "Rice · 1.1 acres", "Cotton · 2.0 acres"][i]}</text>
          <rect x="1200" y={316 + i * 72} width="160" height="24" rx="12" className={i % 3 === 0 ? "fill-field-soft" : "fill-soft"} />
          <text x="1280" y={333 + i * 72} textAnchor="middle" style={{ fontSize: 13 }}>{i % 3 === 0 ? "active today" : "synced"}</text>
        </g>
      ))}
      <text x="360" y="840" className="sc-in" style={D(2)}>illustration · onboarding, farmers, lands, activity and branding under your own name</text>
    </svg>
  );
}

function AdminPortal() {
  return (
    <svg className="ks-scene" viewBox="0 0 1440 900" aria-hidden>
      <rect x="0" y="0" width="300" height="900" className="fill-ink" />
      <text x="40" y="72" className="t-sans" style={{ fontSize: 20, fill: "hsl(var(--ks-paper))" }}>Control plane</text>
      {["Partners", "Agronomy masters", "Knowledge base", "Monitoring"].map((r, i) => (
        <g key={r} className="sc-rise" style={D(0.2 + i * 0.15)}>
          <rect x="24" y={140 + i * 64} width="252" height="48" rx="12" fill={i === 2 ? "hsl(var(--ks-paper) / 0.14)" : "transparent"} />
          <text x="48" y={170 + i * 64} className="t-sans" style={{ fontSize: 18, fill: "hsl(var(--ks-paper))" }}>{r}</text>
        </g>
      ))}
      <text x="360" y="90" className="t-sans t-ink" style={{ fontSize: 30 }}>Knowledge base governance</text>
      {[["Guidance under review", "38"], ["Approved this month", "112"], ["Sources", "ICAR · state universities"]].map((k, i) => (
        <g key={k[0]} className="sc-rise" style={D(0.6 + i * 0.15)}>
          <rect x={360 + i * 346} y="130" width="320" height="120" rx="16" className="fill-white" stroke="hsl(var(--ks-line))" />
          <text x={384 + i * 346} y="170" style={{ fontSize: 14 }}>{k[0]}</text>
          <text x={384 + i * 346} y="222" className="t-sans t-ink" style={{ fontSize: i === 2 ? 22 : 34 }}>{k[1]}</text>
        </g>
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} className="sc-rise" style={D(1.2 + i * 0.12)}>
          <rect x="360" y={300 + i * 80} width="1040" height="64" rx="12" className="fill-white" stroke="hsl(var(--ks-line))" />
          <text x="384" y={326 + i * 80} className="t-sans t-ink" style={{ fontSize: 17 }}>{["Rice · nitrogen top-dress at panicle initiation", "Sugarcane · early shoot borer scouting", "Onion · purple blotch, humid spell", "Soybean · pod borer threshold", "Cotton · pink bollworm trap count"][i]}</text>
          <text x="384" y={350 + i * 80} className="t-sans" style={{ fontSize: 13 }}>{["dose · interval · expert approved", "scout first · no chemical in alert", "awaiting agronomist review", "expert approved", "expert approved"][i]}</text>
          <rect x="1180" y={320 + i * 80} width="180" height="24" rx="12" className={i === 2 ? "fill-signal-soft" : "fill-field-soft"} />
          <text x="1270" y={337 + i * 80} textAnchor="middle" style={{ fontSize: 13 }}>{i === 2 ? "in review" : "approved"}</text>
        </g>
      ))}
      <text x="360" y="840" className="sc-in" style={D(2)}>illustration · the governance layer, not another farmer app</text>
    </svg>
  );
}

function PhotoScan() {
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="See and understand the crop" />
      <rect x="32" y="130" width="326" height="300" rx="18" className="fill-soft" />
      <path d="M100 420 C 120 300, 160 240, 195 200 C 230 240, 270 300, 290 420" className="field sc-draw" strokeWidth="3" style={{ "--len": "520", "--dur": "1.6s", "--d": "0.3s" } as React.CSSProperties} />
      <ellipse cx="236" cy="300" rx="22" ry="14" className="fill-signal-soft sc-in" style={D(1.6)} />
      <g className="sc-rise" style={D(1.9)}>
        <rect x="196" y="262" width="80" height="76" rx="10" fill="none" stroke="hsl(var(--ks-signal))" strokeWidth="2" strokeDasharray="6 5" />
        <circle cx="236" cy="300" r="26" className="sc-pulse" fill="none" stroke="hsl(var(--ks-signal))" strokeWidth="2" />
      </g>
      {[[48, 146], [318, 146], [48, 390], [318, 390]].map((c, i) => (
        <path key={i} d={`M${c[0]} ${c[1] + (i < 2 ? 20 : 0)} v${i < 2 ? -20 : 20} h${i % 2 ? -20 : 20}`} className="ink sc-in" style={D(0.1)} />
      ))}
      <Pill x="32" y="470" w="326" text="Observed: lesions on older leaves" tone="fill-signal-soft" d={2.4} />
      <Pill x="32" y="520" w="326" text="Connected to this land · rice · panicle stage" tone="fill-field-soft" d={2.8} />
      <text x="32" y="600" className="sc-in" style={D(3.2)}>a photo, read in the context of your field</text>
    </svg>
  );
}

function Schemes() {
  const items = [
    ["PM-Kisan", "Income support information", "Check eligibility"],
    ["Crop insurance", "Coverage and enrolment information", "View details"],
    ["Soil Health Card", "How to obtain and use it", "Learn more"],
  ];
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="Government support, explained" />
      {items.map(([name, detail, action], i) => (
        <g key={name} className="sc-rise" style={D(0.3 + i * 0.4)}>
          <rect x="32" y={130 + i * 130} width="326" height="110" rx="16" className="fill-white" stroke="hsl(var(--ks-line))" />
          <text x="52" y={166 + i * 130} className="t-sans t-ink" style={{ fontSize: 17 }}>{name}</text>
          <text x="52" y={192 + i * 130} className="t-sans" style={{ fontSize: 14 }}>{detail}</text>
          <rect x="52" y={206 + i * 130} width={action === "Check eligibility" ? 118 : 96} height="22" rx="11" className="fill-field-soft" />
          <text x={action === "Check eligibility" ? 111 : 100} y={221 + i * 130} textAnchor="middle" className="t-sans" style={{ fontSize: 11 }}>{action}</text>
        </g>
      ))}
      <text x="32" y="560" className="sc-in" style={D(1.8)}>explained in the farmer's language</text>
      <text x="32" y="582" className="sc-in" style={D(2)}>information service · no government affiliation implied</text>
    </svg>
  );
}
function Services() {
  const items = [
    ["Labour", "Search workers for the task", "Find labour"],
    ["Machinery", "Find equipment near the land", "Find machinery"],
    ["Transport", "Arrange movement to market", "Request service"],
  ];
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="Services for the work ahead" />
      {items.map(([name, detail, action], i) => (
        <g key={name} className="sc-rise" style={D(0.3 + i * 0.4)}>
          <rect x="32" y={130 + i * 150} width="326" height="128" rx="16" className="fill-white" stroke="hsl(var(--ks-line))" />
          <rect x="48" y={146 + i * 150} width="64" height="64" rx="12" className="fill-soft" />
          <text x="128" y={176 + i * 150} className="t-sans t-ink" style={{ fontSize: 17 }}>{name}</text>
          <text x="128" y={200 + i * 150} className="t-sans" style={{ fontSize: 14 }}>{detail}</text>
          <text x="128" y={240 + i * 150} className="t-sans" style={{ fontSize: 13, fill: "hsl(var(--ks-field-deep))" }}>{action} ›</text>
        </g>
      ))}
      <text x="32" y="620" className="sc-in" style={D(1.8)}>services help turn a crop plan into farm work</text>
    </svg>
  );
}
function Economics() {
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="Income and expenses, per land" />
      <Pill x="32" y="124" w="150" text="Beta · in testing" tone="fill-signal-soft" d={0.2} />
      <g className="sc-rise" style={D(0.5)}>
        <text x="32" y="200">rice · north plot · this season</text>
        <text x="32" y="240" className="t-sans t-ink" style={{ fontSize: 15 }}>Income</text>
        <rect x="140" y="226" width="200" height="18" rx="6" className="fill-field sc-bar" style={{ "--d": "0.7s" } as React.CSSProperties} />
        <text x="32" y="276" className="t-sans t-ink" style={{ fontSize: 15 }}>Expenses</text>
        <rect x="140" y="262" width="128" height="18" rx="6" className="fill-line sc-bar" style={{ "--d": "0.9s" } as React.CSSProperties} />
      </g>
      {[["Seed", "₹ 2,400"], ["Fertiliser", "₹ 5,100"], ["Labour", "₹ 7,800"], ["Sale · 18 quintal", "₹ 41,400"]].map((r, i) => (
        <g key={r[0]} className="sc-rise" style={D(1.2 + i * 0.2)}>
          <text x="32" y={340 + i * 40} className="t-sans" style={{ fontSize: 15 }}>{r[0]}</text>
          <text x="358" y={340 + i * 40} textAnchor="end" className="t-sans t-ink" style={{ fontSize: 15 }}>{r[1]}</text>
          <line x1="32" y1={352 + i * 40} x2="358" y2={352 + i * 40} className="ln" />
        </g>
      ))}
      <text x="32" y="540" className="sc-in" style={D(2.2)}>illustrative figures · under development</text>
    </svg>
  );
}


function Schedule() {
  const stages = [
    ["1", "Sowing", "Foundation"],
    ["2", "Vegetative growth", "Build"],
    ["3", "Reproductive stage", "Watch"],
    ["4", "Flowering", "Protect"],
    ["5", "Maturity", "Harvest"],
  ];
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="Your crop plan" />
      <text x="32" y="138" className="t-sans t-ink" style={{ fontSize: 16 }}>This land · this crop · this stage</text>
      <line x1="52" y1="188" x2="338" y2="188" className="ln sc-draw" style={{ "--len": "286", "--dur": "1.2s" } as React.CSSProperties} />
      {stages.map(([n, title, sub], i) => (
        <g key={n} className="sc-rise" style={D(0.4 + i * 0.25)}>
          <circle cx={52 + i * 71} cy="188" r={i === 2 ? 10 : 6} className={i === 2 ? "fill-field" : "fill-line"} />
          <text x={52 + i * 71} y="218" textAnchor="middle">{n}</text>
          <text x={52 + i * 71} y="244" textAnchor="middle" className="t-sans t-ink" style={{ fontSize: 12 }}>{title}</text>
          <text x={52 + i * 71} y="263" textAnchor="middle" style={{ fontSize: 11 }}>{sub}</text>
        </g>
      ))}
      <g className="sc-rise" style={D(2.2)}>
        <rect x="32" y="310" width="326" height="92" rx="16" className="fill-field-soft" />
        <text x="52" y="342" className="t-sans t-ink" style={{ fontSize: 16 }}>Today on this land</text>
        <text x="52" y="368" className="t-sans" style={{ fontSize: 14 }}>1 task due · 1 condition to watch</text>
        <text x="52" y="388" className="t-sans" style={{ fontSize: 13 }}>Plan adjusts when field conditions change.</text>
      </g>
      <Pill x="32" y="442" w="326" text="Updated with crop stage and season" tone="fill-soft" d={2.7} />
      <Pill x="32" y="492" w="326" text="Farm Today · Due · Watch · Blocked · Info" tone="fill-soft" d={3.0} />
      <text x="32" y="574" className="sc-in" style={D(3.5)}>A living plan, not a fixed calendar.</text>
    </svg>
  );
}

function Evidence() {
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title="Why this answer?" />
      {[
        ["01", "This land", "Field conditions"],
        ["02", "This crop", "Current biological stage"],
        ["03", "Trusted guidance", "Agricultural evidence"],
      ].map(([n, title, sub], i) => (
        <g key={n} className="sc-rise" style={D(0.35 + i * 0.45)}>
          <circle cx="58" cy={160 + i * 118} r="18" className="fill-field-soft" />
          <text x="58" y={165 + i * 118} textAnchor="middle" className="t-ink">{n}</text>
          <text x="92" y={157 + i * 118} className="t-sans t-ink" style={{ fontSize: 17 }}>{title}</text>
          <text x="92" y={181 + i * 118} className="t-sans" style={{ fontSize: 13 }}>{sub}</text>
          {i < 2 && <line x1="58" y1={182 + i * 118} x2="58" y2={262 + i * 118} className="ln sc-draw" style={{ "--len": "80", "--d": "0.7s" } as React.CSSProperties} />}
        </g>
      ))}
      <g className="sc-rise" style={D(1.9)}>
        <rect x="32" y="500" width="326" height="110" rx="16" className="fill-white" stroke="hsl(var(--ks-line))" />
        <text x="52" y="534" className="t-sans t-ink" style={{ fontSize: 16 }}>Explained in your language</text>
        <text x="52" y="560" className="t-sans" style={{ fontSize: 14 }}>What to do · what to watch · why</text>
        <text x="52" y="586" className="t-sans" style={{ fontSize: 13 }}>The farmer can see the reason behind the guidance.</text>
      </g>
      <text x="32" y="660" className="sc-in" style={D(2.5)}>Clear enough to act. Honest enough to verify.</text>
    </svg>
  );
}

const VIGNETTES: Record<string, { C: React.FC; label: string }> = {
  "photo-scan": { C: PhotoScan, label: "Illustration of Photo Scan: a crop photo observed in the context of the land" },
  schemes: { C: Schemes, label: "Illustration of government schemes with eligibility" },
  services: { C: Services, label: "Illustration of agri services: labour, machinery and transport" },
  economics: { C: Economics, label: "Illustration of farm economics, in beta: income and expenses per land" },
  "tenant-dashboard": { C: TenantPortal, label: "Illustration of the Partner Portal: farmer network under the organisation's brand" },
  "tenant-farmers": { C: TenantPortal, label: "Illustration of farmer management in the Partner Portal" },
  "tenant-branding": { C: TenantPortal, label: "Illustration of partner branding" },
  "tenant-login": { C: TenantPortal, label: "Illustration of the Partner Portal" },
  "admin-rules": { C: AdminPortal, label: "Illustration of knowledge-base governance in the Admin Portal" },
  "admin-knowledge": { C: AdminPortal, label: "Illustration of knowledge sources in the Admin Portal" },
  "admin-tenants": { C: AdminPortal, label: "Illustration of partner management in the Admin Portal" },
  "admin-login": { C: AdminPortal, label: "Illustration of the Admin Portal" },
  "farm-today": { C: FarmToday, label: "Illustration of Farm Today: due, watch, blocked and info decisions" },
  "chat-marathi": { C: Chat, label: "Illustration of AI chat in Marathi with a photo and an explained answer" },
  voice: { C: Voice, label: "Illustration of the voice assistant" },
  weather: { C: Weather, label: "Illustration of hourly weather for one land" },
  ndvi: { C: Ndvi, label: "Illustration of the satellite view with a land health score" },
  market: { C: Market, label: "Illustration of mandi prices and the selling advisor" },
  community: { C: Community, label: "Illustration of the farmer community feed" },
  reels: { C: Reels, label: "Illustration of short education videos" },
  land: { C: Land, label: "Illustration of land boundary mapping with automatic area" },
  analytics: { C: Analytics, label: "Illustration of Farm Analytics with a projection notice" },
  alerts: { C: Alerts, label: "Illustration of proactive alerts" },
  growth: { C: Growth, label: "Illustration of crop growth tracking" },
  evidence: { C: Evidence, label: "Illustration of how a farmer can understand the reason behind guidance" },
  schedule: { C: Schedule, label: "Illustration of the living crop schedule adapting to the current stage" },
  login: { C: Login, label: "Illustration of mobile number and PIN sign-in" },
};

export function hasVignette(id: string) {
  return id in VIGNETTES;
}

export function FeatureScene({ id }: { id: string }) {
  const v = VIGNETTES[id];
  if (!v) return null;
  return (
    <div className="h-full w-full bg-ks-paper">
      <SceneFrame label={v.label}>
        <v.C />
      </SceneFrame>
    </div>
  );
}
