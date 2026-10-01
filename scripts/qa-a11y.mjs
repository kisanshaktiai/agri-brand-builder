/** axe-core pass on every route + keyboard walk of nav, architecture diagram and the form. */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { serve } from "./_serve.mjs";
import { ROUTES, slug, launchOpts } from "./_routes.mjs";

const PORT = 4183;
const server = await serve(PORT);
const browser = await chromium.launch(launchOpts);
await mkdir("qa-output/a11y", { recursive: true });
const summary = [];
for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: "networkidle" });
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"]).analyze();
  await writeFile(`qa-output/a11y/${slug(route)}.json`, JSON.stringify(results.violations, null, 2));
  summary.push({ route, violations: results.violations.length, ids: results.violations.map((v) => `${v.id}(${v.nodes.length})`) });
  console.log(`${route.padEnd(20)} violations=${results.violations.length} ${results.violations.map((v) => v.id).join(",")}`);
  await ctx.close();
}

// Keyboard pass: tab through the nav on home, the architecture diagram on /platform, the form on /contact.
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
const describe = () => page.evaluate(() => { const a = document.activeElement; return `${a.tagName.toLowerCase()}${a.id ? "#" + a.id : ""} "${(a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 40)}"`; });
const walk = async (route, n, label) => {
  await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: "networkidle" });
  const seq = [];
  for (let i = 0; i < n; i++) { await page.keyboard.press("Tab"); seq.push(await describe()); }
  console.log(`\n[keyboard] ${label}\n  ` + seq.join("\n  "));
  return seq;
};
const kb = {};
kb.nav = await walk("/", 10, "home: skip link, wordmark, nav, CTAs");
kb.diagram = (async () => { await page.goto(`http://127.0.0.1:${PORT}/platform`, { waitUntil: "networkidle" }); await page.focus('[role="group"][aria-label="Platform architecture"] button'); const seq = []; for (let i = 0; i < 9; i++) { seq.push(await describe()); const pressed = await page.evaluate(() => document.querySelector('[aria-pressed="true"]')?.textContent?.trim().slice(0, 30)); seq[seq.length - 1] += `  → panel shows: ${pressed}`; await page.keyboard.press("Tab"); } console.log("\n[keyboard] platform architecture diagram\n  " + seq.join("\n  ")); return seq; })();
kb.diagram = await kb.diagram;
kb.form = await walk("/contact", 12, "contact: form fields in order");
await writeFile("qa-output/a11y/keyboard.json", JSON.stringify(kb, null, 2));
await writeFile("qa-output/a11y/summary.json", JSON.stringify(summary, null, 2));
await ctx.close();
await browser.close();
server.close();
