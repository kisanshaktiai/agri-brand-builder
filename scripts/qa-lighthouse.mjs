/** Lighthouse mobile + desktop for every route. Writes JSON + HTML reports and a summary table. */
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";
import { serve } from "./_serve.mjs";
import { ROUTES, slug } from "./_routes.mjs";

const PORT = 4182;
const server = await serve(PORT);
const chrome = await launch({ chromePath: process.env.CHROME_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"] });
await mkdir("qa-output/lighthouse", { recursive: true });
const rows = [];
const only = process.argv.slice(2);
for (const route of only.length ? only : ROUTES) {
  for (const preset of ["mobile", "desktop"]) {
    const opts = { port: chrome.port, output: ["json", "html"], logLevel: "error", onlyCategories: ["performance", "accessibility", "best-practices", "seo"] };
    const config = preset === "desktop" ? (await import("lighthouse/core/config/desktop-config.js")).default : undefined;
    const res = await lighthouse(`http://127.0.0.1:${PORT}${route}`, opts, config);
    const c = res.lhr.categories;
    const s = (k) => Math.round(c[k].score * 100);
    const row = { route, preset, performance: s("performance"), accessibility: s("accessibility"), bestPractices: s("best-practices"), seo: s("seo"), lcp: res.lhr.audits["largest-contentful-paint"].displayValue, cls: res.lhr.audits["cumulative-layout-shift"].displayValue, tbt: res.lhr.audits["total-blocking-time"].displayValue };
    rows.push(row);
    await writeFile(`qa-output/lighthouse/${slug(route)}-${preset}.json`, res.report[0]);
    await writeFile(`qa-output/lighthouse/${slug(route)}-${preset}.html`, res.report[1]);
    console.log(`${route.padEnd(20)} ${preset.padEnd(8)} P${row.performance} A${row.accessibility} BP${row.bestPractices} SEO${row.seo}  LCP ${row.lcp} CLS ${row.cls} TBT ${row.tbt}`);
  }
}
await writeFile("qa-output/lighthouse/summary.json", JSON.stringify(rows, null, 2));
await chrome.kill();
server.close();
