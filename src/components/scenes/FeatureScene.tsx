import React from "react";
import { useT } from "@/i18n";
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
  const S = useT().SCENE;
  const rows = [
    { tone: "fill-field-soft", k: S[108], t: S[109], d: 0.4 },
    { tone: "fill-signal-soft", k: S[110], t: S[111], d: 0.8 },
    { tone: "fill-soft", k: S[112], t: S[113], d: 1.2 },
    { tone: "fill-soft", k: S[114], t: S[115], d: 1.6 },
  ];
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[70]} />
      {rows.map((r, i) => (
        <g key={r.k} className="sc-rise" style={D(r.d)}>
          <rect x="32" y={140 + i * 110} width="326" height="88" rx="14" className="fill-white" stroke="hsl(var(--ks-line))" />
          <rect x="48" y={156 + i * 110} width="78" height="24" rx="12" className={r.tone} />
          <text x="87" y={172 + i * 110} textAnchor="middle" className="t-ink">{r.k}</text>
          <text x="48" y={210 + i * 110} className="t-sans t-ink" style={{ fontSize: 16 }}>{r.t}</text>
          <path d={`M330 ${184 + i * 110} l5 5 l9 -10`} className="field sc-tick" strokeWidth="2" style={D(r.d + 0.3)} />
        </g>
      ))}
      <text x="32" y="640" className="sc-in" style={D(2.2)}>{S[0]}</text>
      <g className="sc-rise" style={D(2.6)}>
        <rect x="32" y="680" width="326" height="56" rx="28" className="fill-ink" />
        <text x="195" y="714" textAnchor="middle" className="t-sans" style={{ fill: "hsl(var(--ks-paper))", fontSize: 16 }}>{S[1]}</text>
      </g>
    </svg>
  );
}

function Chat() {
  const S = useT().SCENE;
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[71]} />
      <g className="sc-rise" style={D(0.3)}>
        <rect x="90" y="140" width="268" height="96" rx="18" className="fill-field" />
        <text x="110" y="176" className="t-sans" style={{ fill: "hsl(var(--ks-field-ink))", fontSize: 17 }}>माझ्या पिकाची पाने</text>
        <text x="110" y="202" className="t-sans" style={{ fill: "hsl(var(--ks-field-ink))", fontSize: 17 }}>पिवळी पडत आहेत</text>
        <text x="110" y="226" className="t-sans" style={{ fill: "hsl(var(--ks-field-ink))", opacity: 0.75, fontSize: 13 }}>{S[2]}</text>
      </g>
      <g className="sc-rise" style={D(1.4)}>
        <rect x="32" y="266" width="300" height="200" rx="18" className="fill-white" stroke="hsl(var(--ks-line))" />
        <text x="52" y="300" className="t-sans t-ink" style={{ fontSize: 16 }}>{S[3]}</text>
        <text x="52" y="326" className="t-sans t-ink" style={{ fontSize: 16 }}>{S[4]}</text>
        <text x="52" y="352" className="t-sans t-ink" style={{ fontSize: 16 }}>{S[5]}</text>
        <line x1="52" y1="376" x2="312" y2="376" className="ln" />
        <text x="52" y="402" className="t-sans" style={{ fontSize: 13 }}>{S[6]}</text>
        <text x="52" y="424" className="t-sans" style={{ fontSize: 13 }}>{S[7]}</text>
        <text x="52" y="446" className="t-sans" style={{ fontSize: 13, fill: "hsl(var(--ks-field-deep))" }}>{S[8]}</text>
      </g>
      {/* voice bars */}
      <g className="sc-rise" style={D(2.2)}>
        <rect x="32" y="700" width="326" height="64" rx="32" className="fill-soft" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={160 + i * 12} y="718" width="6" height="28" rx="3" className="fill-field sc-wave" style={D(i * 0.12)} />
        ))}
        <text x="195" y="790" textAnchor="middle">{S[9]}</text>
      </g>
    </svg>
  );
}

function Voice() {
  const S = useT().SCENE;
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[72]} />
      <g className="sc-in" style={D(0.2)}>
        <circle cx="195" cy="400" r="110" className="fill-field-soft" />
        <circle cx="195" cy="400" r="110" className="sc-pulse" fill="none" stroke="hsl(var(--ks-field))" strokeWidth="2" />
        <circle cx="195" cy="400" r="70" className="fill-field" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={171 + i * 12} y="372" width="6" height="56" rx="3" className="sc-wave" style={{ ...D(i * 0.15), fill: "hsl(var(--ks-field-ink))" }} />
        ))}
      </g>
      <text x="195" y="560" textAnchor="middle" className="t-sans t-ink sc-rise" style={{ ...D(0.8), fontSize: 18 }}>"माझी जमीन नोंदवा"</text>
      <text x="195" y="590" textAnchor="middle" className="sc-rise" style={D(1.2)}>{S[10]}</text>
      <Pill x="60" y="660" w="270" text={S[73]} d={1.8} />
    </svg>
  );
}

function Weather() {
  const S = useT().SCENE;
  const hours = [22, 24, 27, 30, 31, 29, 26, 24];
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[74]} />
      <g className="sc-sun" style={{ transformOrigin: "195px 190px" }}>
        <circle cx="195" cy="200" r="30" className="fill-signal-soft" />
        <circle cx="195" cy="200" r="16" className="fill-signal" />
      </g>
      <text x="32" y="300">{S[11]}</text>
      {hours.map((h, i) => (
        <g key={i}>
          <rect x={40 + i * 40} y={420 - h * 3} width="22" height={h * 3} rx="4" className="fill-field sc-bar" style={D(0.3 + i * 0.1)} opacity={0.4 + i * 0.07} />
          <text x={51 + i * 40} y="440" textAnchor="middle">{h}°</text>
        </g>
      ))}
      <Pill x="32" y="490" w="326" text={S[75]} tone="fill-signal-soft" d={1.4} />
      <Pill x="32" y="540" w="326" text={S[76]} tone="fill-field-soft" d={1.8} />
      <text x="32" y="620" className="sc-in" style={D(2.2)}>{S[12]}</text>
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
  const S = useT().SCENE;
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[77]} />
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
        <text x="90" y="536" textAnchor="middle">{S[13]}</text>
      </g>
      <g className="sc-rise" style={D(1.3)}>
        <text x="160" y="505" className="t-sans t-ink" style={{ fontSize: 15 }}>{S[14]}</text>
        <text x="160" y="530" className="t-sans" style={{ fontSize: 14 }}>{S[15]}</text>
        <text x="160" y="552" className="t-sans" style={{ fontSize: 14 }}>{S[16]}</text>
      </g>
      <Pill x="32" y="610" w="326" text={S[78]} d={2.2} />
      <Pill x="32" y="660" w="326" text={S[79]} d={2.5} />
    </svg>
  );
}

function Market() {
  const S = useT().SCENE;
  const bars = [{ m: S[116], v: 2240 }, { m: S[117], v: 2410 }, { m: S[118], v: 2180 }];
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[80]} />
      <text x="32" y="140">{S[17]}</text>
      {bars.map((b, i) => (
        <g key={b.m} className="sc-rise" style={D(0.3 + i * 0.25)}>
          <text x="32" y={190 + i * 70} className="t-sans t-ink" style={{ fontSize: 16 }}>{b.m}</text>
          <rect x="130" y={172 + i * 70} width={b.v / 11} height="26" rx="6" className={i === 1 ? "fill-field" : "fill-line"} />
          <text x={140 + b.v / 11} y={190 + i * 70} className="t-ink">{b.v}</text>
        </g>
      ))}
      <text x="32" y="420" className="sc-in" style={D(1.2)}>{S[18]}</text>
      <polyline points="32,520 80,505 128,512 176,490 224,484 272,470 320,476 358,462" className="field sc-draw" strokeWidth="2" style={{ "--len": "360", "--d": "1.4s" } as React.CSSProperties} />
      <g className="sc-rise" style={D(2.4)}>
        <rect x="32" y="580" width="326" height="92" rx="16" className="fill-white" stroke="hsl(var(--ks-ink))" strokeWidth="1.5" />
        <text x="52" y="612" className="t-sans t-ink" style={{ fontSize: 16 }}>{S[19]}</text>
        <text x="52" y="638" className="t-sans" style={{ fontSize: 14 }}>{S[20]}</text>
        <text x="52" y="658" className="t-sans" style={{ fontSize: 14 }}>{S[21]}</text>
      </g>
      <text x="32" y="720" className="sc-in" style={D(3)}>{S[22]}</text>
    </svg>
  );
}

function Community() {
  const S = useT().SCENE;
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[81]} />
      <g className="sc-rise" style={D(0.3)}>
        <rect x="32" y="130" width="326" height="190" rx="16" className="fill-white" stroke="hsl(var(--ks-line))" />
        <text x="52" y="165" className="t-sans t-ink" style={{ fontSize: 15 }}>{S[23]}</text>
        <rect x="52" y="182" width="245" height="52" rx="14" className="fill-field-soft" />
        <text x="68" y="214" className="t-sans t-ink" style={{ fontSize: 15 }}>“पावसानंतर ऊस कसा दिसतोय?”</text>
        <text x="52" y="260" className="t-sans" style={{ fontSize: 12 }}>{S[24]}</text>
        <text x="52" y="288" className="t-sans" style={{ fontSize: 13 }}>{S[25]}</text>
      </g>
      <g className="sc-rise" style={D(1.2)}>
        <rect x="76" y="355" width="282" height="150" rx="16" className="fill-white" stroke="hsl(var(--ks-line))" />
        <text x="96" y="390" className="t-sans t-ink" style={{ fontSize: 15 }}>{S[26]}</text>
        <rect x="96" y="410" width="235" height="48" rx="14" className="fill-soft" />
        <text x="112" y="439" className="t-sans t-ink" style={{ fontSize: 15 }}>“వర్షం తర్వాత నా పొలం?”</text>
        <text x="96" y="482" className="t-sans" style={{ fontSize: 12 }}>{S[27]}</text>
      </g>
      <path d="M195 320 C195 340 214 350 230 364" className="field sc-draw" strokeDasharray="4 6" style={{ "--len": "70", "--d": "1.6s", "--dur": "0.8s" } as React.CSSProperties} />
      <Pill x="32" y="560" w="326" text={S[82]} tone="fill-field-soft" d={1.9} />
      <text x="32" y="650" className="sc-in" style={D(2.3)}>{S[28]}</text>
    </svg>
  );
}
function Reels() {
  const S = useT().SCENE;
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[83]} />
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
      <text x="32" y="740" className="sc-in" style={D(1.8)}>{S[29]}</text>
    </svg>
  );
}

function Land() {
  const S = useT().SCENE;
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[84]} />
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
        <text x="205" y="296" textAnchor="middle" className="t-sans" style={{ fill: "hsl(var(--ks-paper))", fontSize: 15 }}>{S[30]}</text>
      </g>
      <Pill x="32" y="490" w="326" text={S[85]} d={3.6} />
      <Pill x="32" y="540" w="326" text={S[86]} d={3.9} />
      <Pill x="32" y="590" w="326" text={S[87]} tone="fill-field-soft" d={4.2} />
    </svg>
  );
}

function Analytics() {
  const S = useT().SCENE;
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[88]} />
      {[["Land area", "Example"], ["Crop count", "2"], ["Revenue view", "Example"], ["Profit view", "Example"]].map((k, i) => (
        <g key={k[0]} className="sc-rise" style={D(0.3 + i * 0.2)}>
          <rect x={32 + (i % 2) * 170} y={130 + Math.floor(i / 2) * 96} width="156" height="80" rx="14" className="fill-white" stroke="hsl(var(--ks-line))" />
          <text x={48 + (i % 2) * 170} y={158 + Math.floor(i / 2) * 96} style={{ fontSize: 11 }}>{k[0]}</text>
          <text x={48 + (i % 2) * 170} y={190 + Math.floor(i / 2) * 96} className="t-sans t-ink" style={{ fontSize: 20 }}>{k[1]}</text>
        </g>
      ))}
      <text x="32" y="360" className="sc-in" style={D(1.2)}>{S[31]}</text>
      {[60, 30, 80, 45, 70].map((h, i) => (
        <rect key={i} x={48 + i * 64} y={480 - h} width="34" height={h} rx="6" className={i === 4 ? "fill-field sc-bar" : "fill-line sc-bar"} style={D(1.4 + i * 0.12)} />
      ))}
      <g className="sc-rise" style={D(2.4)}>
        <rect x="32" y="520" width="326" height="72" rx="14" className="fill-signal-soft" />
        <text x="48" y="548" className="t-sans t-ink" style={{ fontSize: 14 }}>{S[32]}</text>
        <text x="48" y="572" className="t-sans" style={{ fontSize: 13 }}>{S[33]}</text>
      </g>
      <text x="32" y="640" className="sc-in" style={D(2.8)}>{S[34]}</text>
      <text x="32" y="662" className="sc-in" style={D(3)}>{S[35]}</text>
    </svg>
  );
}

function Alerts() {
  const S = useT().SCENE;
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[89]} />
      <g className="sc-rise" style={D(0.3)}>
        <rect x="32" y="130" width="326" height="150" rx="16" className="fill-white" stroke="hsl(var(--ks-signal))" strokeWidth="1.5" />
        <circle cx="62" cy="166" r="10" className="fill-signal" />
        <circle cx="62" cy="166" r="10" className="sc-pulse" fill="none" stroke="hsl(var(--ks-signal))" strokeWidth="2" />
        <text x="84" y="171" className="t-sans t-ink" style={{ fontSize: 16 }}>{S[36]}</text>
        <text x="48" y="206" className="t-sans" style={{ fontSize: 14 }}>{S[37]}</text>
        <text x="48" y="228" className="t-sans" style={{ fontSize: 14 }}>{S[38]}</text>
        <text x="48" y="262" className="t-sans" style={{ fontSize: 13, fill: "hsl(var(--ks-field-deep))" }}>{S[39]}</text>
      </g>
      <g className="sc-rise" style={D(1)}>
        <rect x="32" y="300" width="326" height="100" rx="16" className="fill-white" stroke="hsl(var(--ks-line))" />
        <text x="48" y="334" className="t-sans t-ink" style={{ fontSize: 16 }}>{S[40]}</text>
        <text x="48" y="360" className="t-sans" style={{ fontSize: 14 }}>{S[41]}</text>
      </g>
      <Pill x="32" y="440" w="326" text={S[90]} tone="fill-signal-soft" d={1.6} />
      <text x="32" y="520" className="sc-in" style={D(2)}>{S[42]}</text>
      <text x="32" y="542" className="sc-in" style={D(2.2)}>{S[43]}</text>
    </svg>
  );
}

function Growth() {
  const S = useT().SCENE;
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[91]} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="sc-rise" style={D(0.3 + i * 0.3)}>
          <rect x={40 + i * 80} y="140" width="64" height="120" rx="12" className="fill-soft" />
          <path d={`M${72 + i * 80} 250 v-${30 + i * 22}`} className="field sc-draw" strokeWidth="2.5" style={{ "--len": "120", "--d": `${0.5 + i * 0.3}s` } as React.CSSProperties} />
          <text x={72 + i * 80} y="285" textAnchor="middle">{["wk 2", "wk 4", "wk 6", "wk 8"][i]}</text>
        </g>
      ))}
      <Pill x="32" y="330" w="326" text={S[92]} tone="fill-field-soft" d={1.6} />
      <Pill x="32" y="380" w="326" text={S[93]} d={1.9} />
      <Pill x="32" y="430" w="326" text={S[94]} d={2.2} />
      <text x="32" y="520" className="sc-in" style={D(2.6)}>{S[44]}</text>
    </svg>
  );
}

function Login() {
  const S = useT().SCENE;
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[95]} />
      <Pill x="32" y="200" w="326" text={S[96]} d={0.3} />
      <g className="sc-rise" style={D(0.8)}>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={70 + i * 66} y="270" width="54" height="54" rx="12" className="fill-white" stroke="hsl(var(--ks-ink))" strokeWidth="1.5" />
        ))}
        <text x="195" y="350" textAnchor="middle">{S[45]}</text>
      </g>
      <text x="195" y="440" textAnchor="middle" className="sc-in" style={D(1.4)}>{S[46]}</text>
    </svg>
  );
}

function TenantPortal() {
  const S = useT().SCENE;
  const rows = ["Farmers", "Lands", "Activity", "Branding"];
  return (
    <svg className="ks-scene" viewBox="0 0 1440 900" aria-hidden>
      <rect x="0" y="0" width="300" height="900" className="fill-soft" />
      <rect x="40" y="48" width="36" height="36" rx="8" className="fill-field sc-in" />
      <text x="90" y="72" className="t-sans t-ink" style={{ fontSize: 20 }}>{S[47]}</text>
      {rows.map((r, i) => (
        <g key={r} className="sc-rise" style={D(0.2 + i * 0.15)}>
          <rect x="24" y={140 + i * 64} width="252" height="48" rx="12" className={i === 0 ? "fill-white" : "fill-soft"} />
          <text x="48" y={170 + i * 64} className="t-sans t-ink" style={{ fontSize: 18 }}>{r}</text>
        </g>
      ))}
      <text x="360" y="90" className="t-sans t-ink" style={{ fontSize: 30 }}>{S[48]}</text>
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
      <text x="360" y="840" className="sc-in" style={D(2)}>{S[49]}</text>
    </svg>
  );
}

function AdminPortal() {
  const S = useT().SCENE;
  return (
    <svg className="ks-scene" viewBox="0 0 1440 900" aria-hidden>
      <rect x="0" y="0" width="300" height="900" className="fill-ink" />
      <text x="40" y="72" className="t-sans" style={{ fontSize: 20, fill: "hsl(var(--ks-paper))" }}>{S[50]}</text>
      {["Partners", "Agronomy masters", "Knowledge base", "Monitoring"].map((r, i) => (
        <g key={r} className="sc-rise" style={D(0.2 + i * 0.15)}>
          <rect x="24" y={140 + i * 64} width="252" height="48" rx="12" fill={i === 2 ? "hsl(var(--ks-paper) / 0.14)" : "transparent"} />
          <text x="48" y={170 + i * 64} className="t-sans" style={{ fontSize: 18, fill: "hsl(var(--ks-paper))" }}>{r}</text>
        </g>
      ))}
      <text x="360" y="90" className="t-sans t-ink" style={{ fontSize: 30 }}>{S[51]}</text>
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
      <text x="360" y="840" className="sc-in" style={D(2)}>{S[52]}</text>
    </svg>
  );
}

function PhotoScan() {
  const S = useT().SCENE;
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[97]} />
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
      <Pill x="32" y="470" w="326" text={S[98]} tone="fill-signal-soft" d={2.4} />
      <Pill x="32" y="520" w="326" text={S[99]} tone="fill-field-soft" d={2.8} />
      <text x="32" y="600" className="sc-in" style={D(3.2)}>{S[53]}</text>
    </svg>
  );
}

function Schemes() {
  const S = useT().SCENE;
  const items = [
    ["PM-Kisan", "Income support information", "Check eligibility"],
    ["Crop insurance", "Coverage and enrolment information", "View details"],
    ["Soil Health Card", "How to obtain and use it", "Learn more"],
  ];
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[100]} />
      {items.map(([name, detail, action], i) => (
        <g key={name} className="sc-rise" style={D(0.3 + i * 0.4)}>
          <rect x="32" y={130 + i * 130} width="326" height="110" rx="16" className="fill-white" stroke="hsl(var(--ks-line))" />
          <text x="52" y={166 + i * 130} className="t-sans t-ink" style={{ fontSize: 17 }}>{name}</text>
          <text x="52" y={192 + i * 130} className="t-sans" style={{ fontSize: 14 }}>{detail}</text>
          <rect x="52" y={206 + i * 130} width={action === "Check eligibility" ? 118 : 96} height="22" rx="11" className="fill-field-soft" />
          <text x={action === "Check eligibility" ? 111 : 100} y={221 + i * 130} textAnchor="middle" className="t-sans" style={{ fontSize: 11 }}>{action}</text>
        </g>
      ))}
      <text x="32" y="560" className="sc-in" style={D(1.8)}>{S[54]}</text>
      <text x="32" y="582" className="sc-in" style={D(2)}>{S[55]}</text>
    </svg>
  );
}
function Services() {
  const S = useT().SCENE;
  const items = [
    ["Labour", "Search workers for the task", "Find labour"],
    ["Machinery", "Find equipment near the land", "Find machinery"],
    ["Transport", "Arrange movement to market", "Request service"],
  ];
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[101]} />
      {items.map(([name, detail, action], i) => (
        <g key={name} className="sc-rise" style={D(0.3 + i * 0.4)}>
          <rect x="32" y={130 + i * 150} width="326" height="128" rx="16" className="fill-white" stroke="hsl(var(--ks-line))" />
          <rect x="48" y={146 + i * 150} width="64" height="64" rx="12" className="fill-soft" />
          <text x="128" y={176 + i * 150} className="t-sans t-ink" style={{ fontSize: 17 }}>{name}</text>
          <text x="128" y={200 + i * 150} className="t-sans" style={{ fontSize: 14 }}>{detail}</text>
          <text x="128" y={240 + i * 150} className="t-sans" style={{ fontSize: 13, fill: "hsl(var(--ks-field-deep))" }}>{action} ›</text>
        </g>
      ))}
      <text x="32" y="620" className="sc-in" style={D(1.8)}>{S[56]}</text>
    </svg>
  );
}
function Economics() {
  const S = useT().SCENE;
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[102]} />
      <Pill x="32" y="124" w="150" text={S[103]} tone="fill-signal-soft" d={0.2} />
      <g className="sc-rise" style={D(0.5)}>
        <text x="32" y="200">{S[57]}</text>
        <text x="32" y="240" className="t-sans t-ink" style={{ fontSize: 15 }}>{S[58]}</text>
        <rect x="140" y="226" width="200" height="18" rx="6" className="fill-field sc-bar" style={{ "--d": "0.7s" } as React.CSSProperties} />
        <text x="32" y="276" className="t-sans t-ink" style={{ fontSize: 15 }}>{S[59]}</text>
        <rect x="140" y="262" width="128" height="18" rx="6" className="fill-line sc-bar" style={{ "--d": "0.9s" } as React.CSSProperties} />
      </g>
      {[["Seed", "₹ 2,400"], ["Fertiliser", "₹ 5,100"], ["Labour", "₹ 7,800"], ["Sale · 18 quintal", "₹ 41,400"]].map((r, i) => (
        <g key={r[0]} className="sc-rise" style={D(1.2 + i * 0.2)}>
          <text x="32" y={340 + i * 40} className="t-sans" style={{ fontSize: 15 }}>{r[0]}</text>
          <text x="358" y={340 + i * 40} textAnchor="end" className="t-sans t-ink" style={{ fontSize: 15 }}>{r[1]}</text>
          <line x1="32" y1={352 + i * 40} x2="358" y2={352 + i * 40} className="ln" />
        </g>
      ))}
      <text x="32" y="540" className="sc-in" style={D(2.2)}>{S[60]}</text>
    </svg>
  );
}


function Schedule() {
  const S = useT().SCENE;
  const stages = [
    ["1", "Sowing", "Foundation"],
    ["2", "Vegetative growth", "Build"],
    ["3", "Reproductive stage", "Watch"],
    ["4", "Flowering", "Protect"],
    ["5", "Maturity", "Harvest"],
  ];
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[104]} />
      <text x="32" y="138" className="t-sans t-ink" style={{ fontSize: 16 }}>{S[61]}</text>
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
        <text x="52" y="342" className="t-sans t-ink" style={{ fontSize: 16 }}>{S[62]}</text>
        <text x="52" y="368" className="t-sans" style={{ fontSize: 14 }}>{S[63]}</text>
        <text x="52" y="388" className="t-sans" style={{ fontSize: 13 }}>{S[64]}</text>
      </g>
      <Pill x="32" y="442" w="326" text={S[105]} tone="fill-soft" d={2.7} />
      <Pill x="32" y="492" w="326" text={S[106]} tone="fill-soft" d={3.0} />
      <text x="32" y="574" className="sc-in" style={D(3.5)}>{S[65]}</text>
    </svg>
  );
}

function Evidence() {
  const S = useT().SCENE;
  return (
    <svg className="ks-scene" viewBox="0 0 390 844" aria-hidden>
      <Header title={S[107]} />
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
        <text x="52" y="534" className="t-sans t-ink" style={{ fontSize: 16 }}>{S[66]}</text>
        <text x="52" y="560" className="t-sans" style={{ fontSize: 14 }}>{S[67]}</text>
        <text x="52" y="586" className="t-sans" style={{ fontSize: 13 }}>{S[68]}</text>
      </g>
      <text x="32" y="660" className="sc-in" style={D(2.5)}>{S[69]}</text>
    </svg>
  );
}

const VIGNETTES: Record<string, { C: React.FC; label: number }> = {
  "photo-scan": { C: PhotoScan, label: 119 },
  schemes: { C: Schemes, label: 120 },
  services: { C: Services, label: 121 },
  economics: { C: Economics, label: 122 },
  "tenant-dashboard": { C: TenantPortal, label: 123 },
  "tenant-farmers": { C: TenantPortal, label: 124 },
  "tenant-branding": { C: TenantPortal, label: 125 },
  "tenant-login": { C: TenantPortal, label: 126 },
  "admin-rules": { C: AdminPortal, label: 127 },
  "admin-knowledge": { C: AdminPortal, label: 128 },
  "admin-tenants": { C: AdminPortal, label: 129 },
  "admin-login": { C: AdminPortal, label: 130 },
  "farm-today": { C: FarmToday, label: 131 },
  "chat-marathi": { C: Chat, label: 132 },
  voice: { C: Voice, label: 133 },
  weather: { C: Weather, label: 134 },
  ndvi: { C: Ndvi, label: 135 },
  market: { C: Market, label: 136 },
  community: { C: Community, label: 137 },
  reels: { C: Reels, label: 138 },
  land: { C: Land, label: 139 },
  analytics: { C: Analytics, label: 140 },
  alerts: { C: Alerts, label: 141 },
  growth: { C: Growth, label: 142 },
  evidence: { C: Evidence, label: 143 },
  schedule: { C: Schedule, label: 144 },
  login: { C: Login, label: 145 },
};

export function hasVignette(id: string) {
  return id in VIGNETTES;
}

export function FeatureScene({ id }: { id: string }) {
  const S = useT().SCENE;
  const v = VIGNETTES[id];
  if (!v) return null;
  return (
    <div className="h-full w-full bg-ks-paper">
      <SceneFrame label={S[v.label]}>
        <v.C />
      </SceneFrame>
    </div>
  );
}
