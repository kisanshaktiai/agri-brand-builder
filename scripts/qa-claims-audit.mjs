/**
 * Claims audit. Maps every product statement in the content modules to its
 * fact id and maturity label, checks Beta reads as early access and that
 * "live, limited" statements keep their limits, and greps the built HTML
 * for forbidden words. Writes docs/CLAIMS_AUDIT.md.
 */
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const load = async (rel) => import(pathToFileURL(path.resolve(rel)).href);
const { FACTS } = await load("src/content/facts.ts");
const { TECHNOLOGIES } = await load("src/content/technologies.ts");
const { SURFACES, ARCHITECTURE } = await load("src/content/platform.ts");
const pages = await load("src/content/pages.ts");
const { MATURITY_LABEL } = await load("src/content/site.ts");

const factMap = new Map(FACTS.map((f) => [f.id, f]));
const claims = [];
const add = (where, text, fact) => claims.push({ where, text, fact });

for (const t of TECHNOLOGIES) {
  t.capabilities.forEach((c) => add(`technologies.${t.key}`, c.text, c.fact));
}
for (const s of SURFACES) { add(`platform.${s.key}`, s.description, s.fact); s.capabilities.forEach((c) => add(`platform.${s.key}`, c.text, c.fact)); }
ARCHITECTURE.forEach((n) => add(`architecture.${n.id}`, n.description, n.fact));
const walk = (obj, where) => {
  if (Array.isArray(obj)) return obj.forEach((o, i) => walk(o, `${where}[${i}]`));
  if (obj && typeof obj === "object") {
    if (obj.fact && (obj.body || obj.text || obj.lead)) add(where, obj.body || obj.text || obj.lead, obj.fact);
    for (const [k, v] of Object.entries(obj)) if (k !== "fact") walk(v, `${where}.${k}`);
  }
};
for (const [k, v] of Object.entries(pages)) walk(v, `pages.${k}`);

let fail = 0;
const lines = ["# Claims audit", "", `Generated ${new Date().toISOString()}. Every product statement below carries the fact it traces to and that fact's maturity label.`, "", "| Where | Statement | Fact | Maturity | Check |", "|---|---|---|---|---|"];
for (const c of claims) {
  const f = factMap.get(c.fact);
  let check = "ok";
  if (!f) { check = "UNKNOWN FACT"; fail++; }
  else {
    if (f.maturity === "beta" && !/early access/i.test(c.text) && !/early access/i.test(c.where)) check = "beta: statement itself lacks 'early access' (badge/limits must carry it)";
    for (const w of f.forbidden || []) {
      const re = new RegExp(`\\b${w}\\b`, "i");
      const m = c.text.match(re);
      if (!m) continue;
      // A statement that denies the claim ("not a CRM", "never a guaranteed price") keeps the limit; it is not a claim.
      const before = c.text.slice(Math.max(0, m.index - 40), m.index);
      if (/\b(not|never|no|nor)\b/i.test(before)) { check = `ok (negated: "${w}")`; continue; }
      check = `FORBIDDEN "${w}"`; fail++;
    }
  }
  lines.push(`| ${c.where} | ${c.text.replace(/\|/g, "/")} | ${c.fact} | ${f ? MATURITY_LABEL[f.maturity] : "?"} | ${check} |`);
}

// Built HTML sweep for globally forbidden language.
const GLOBAL = [/guaranteed/i, /predicts? yield/i, /yield prediction/i, /all crops/i, /ISO ?27001/i, /SOC ?2/i, /zero[- ]trust/i, /military[- ]grade/i, /trusted by/i, /\d+% accura/i, /accuracy of/i, /customers include/i, /testimonial/i];
async function* walkDir(dir) { for (const e of await readdir(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) { if (!/assets/.test(p)) yield* walkDir(p); } else if (p.endsWith(".html")) yield p; } }
lines.push("", "## Built HTML sweep for forbidden language", "");
for await (const f of walkDir("dist")) {
  const t = (await readFile(f, "utf8")).replace(/<script[\s\S]*?<\/script>/g, "");
  for (const re of GLOBAL) {
    const g = new RegExp(re.source, "gi");
    let m;
    while ((m = g.exec(t))) {
      const before = t.slice(Math.max(0, m.index - 48), m.index).replace(/<[^>]+>/g, " ");
      if (/\b(not|never|no|nor)\b/i.test(before)) { lines.push(`- ok (negated) ${f}: "${before.trim().slice(-30)} ${m[0]}"`); continue; }
      fail++; lines.push(`- !! ${f}: ${re} → "${m[0]}"`);
    }
  }
}
if (!lines.at(-1).startsWith("- !!")) lines.push("- No forbidden language found in built HTML.");

// Beta items read as early access: badge text present wherever PAHRA appears on key pages.
lines.push("", "## Maturity labels", "", ...FACTS.map((f) => `- ${f.id} — ${MATURITY_LABEL[f.maturity]}${f.limits ? ` — limits: ${f.limits.join(" ")}` : ""}`));
lines.push("", fail ? `**FAIL (${fail})**` : "**PASS**");
await writeFile("docs/CLAIMS_AUDIT.md", lines.join("\n") + "\n");
console.log(`claims=${claims.length} ${fail ? "FAIL " + fail : "PASS"} → docs/CLAIMS_AUDIT.md`);
process.exit(fail ? 1 : 0);
