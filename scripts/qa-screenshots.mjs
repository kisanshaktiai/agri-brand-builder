/** Full-page screenshots of every route at 360, 768, 1024 and 1440 px. */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { serve } from "./_serve.mjs";
import { ROUTES, LOCALE_ROUTES, WIDTHS, slug, launchOpts } from "./_routes.mjs";

const PORT = 4181;
const only = process.argv.slice(2);
const server = await serve(PORT);
const browser = await chromium.launch(launchOpts);
await mkdir("qa-output/screenshots", { recursive: true });
for (const route of only.length ? only : [...ROUTES, ...LOCALE_ROUTES]) {
  for (const w of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: Math.round(w * (w < 768 ? 1.9 : 0.65)) }, deviceScaleFactor: 1, reducedMotion: process.env.REDUCED ? "reduce" : "no-preference" });
    const page = await ctx.newPage();
    await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: "networkidle" });
    // Scroll through so in-view reveals and scroll choreography have run, then return to top.
    await page.evaluate(async () => { const h = () => document.documentElement.scrollHeight; for (let y = 0; y < h(); y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(600);
    const out = `qa-output/screenshots/${slug(route)}-${w}.png`;
    await page.screenshot({ path: out, fullPage: true });
    const sw = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    console.log(`${out}  overflow=${sw[0] > sw[1] ? `YES (${sw[0]}>${sw[1]})` : "no"}`);
    await ctx.close();
  }
}
await browser.close();
server.close();
