/**
 * Proves the five names, full forms, positioning lines and the house mark
 * are exact everywhere: greps source + built HTML for every locked string,
 * and for near-miss misspellings.
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const LOCKED = [
  ["TARKA", "Trusted Agricultural Reasoning & Knowledge Architecture", "Neuro-Symbolic AI Decision Intelligence"],
  ["TATVA", "Terrain, Atmosphere, Thermal & Vegetation Assessment", "Multimodal AI Land-State Intelligence"],
  ["RIITU", "Responsive Intelligence for Integrated Temporal Agriculture", "Dynamic AI Crop Scheduling & Prescription"],
  ["PAHRA", "Proactive Agricultural Hazard & Risk Assessment", "Proactive AI Farm-Risk Intelligence"],
  ["RUKH", "Regional Understanding, Knowledge & Harvest", "Predictive AI Market Intelligence"],
];
const NEAR_MISS = [/\bTarka\b/, /\bTatva\b/, /\bRiitu\b/, /\bRitu\b/, /\bPahra\b/, /\bRukh\b/, /\bRIITU\s*5/, /Panchatatva/i, /Pancha ?Tatva/i, /KisanShaktiAI\b/, /Kisan Shakti AI/, /KisanShakti Ai\b/, /TATVA5/];

async function* walk(dir, exts) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!/node_modules|dist-ssr|assets|founder-assets|screens/.test(p)) yield* walk(p, exts); }
    else if (exts.includes(path.extname(e.name))) yield p;
  }
}
let fail = 0;
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
for (const root of [["src", [".ts", ".tsx"]], ["dist", [".html"]]]) {
  const files = [];
  for await (const f of walk(root[0], root[1])) files.push(f);
  console.log(`\n== ${root[0]} (${files.length} files)`);
  for (const [name, full, pos] of LOCKED) {
    let n = 0, nf = 0, np = 0, nh = 0;
    for (const f of files) {
      const t = decode(await readFile(f, "utf8"));
      n += (t.match(new RegExp(`\\b${name}\\b`, "g")) || []).length;
      nf += t.split(full).length - 1;
      np += t.split(pos).length - 1;
      nh += (t.match(new RegExp(`KisanShakti(?:<[^>]*>|\\s|&nbsp;)+${name}\\b`, "g")) || []).length;
    }
    console.log(`${name.padEnd(6)} name×${n}  fullForm×${nf}  positioning×${np}  houseMark×${nh}`);
    if (root[0] === "dist" && (nf === 0 || np === 0 || nh === 0)) { fail++; console.log(`   !! missing in built HTML`); }
  }
  for (const f of files) {
    const t = await readFile(f, "utf8");
    for (const re of NEAR_MISS) {
      const m = t.match(re);
      if (m && !/founderProfile|Founder\.tsx|LeadForm|forms\//.test(f)) { fail++; console.log(`   !! near-miss ${re} in ${f}: "${m[0]}"`); }
    }
  }
}
console.log(fail ? `\nFAIL (${fail})` : "\nPASS: locked strings exact, no near-misses");
process.exit(fail ? 1 : 0);
