/** After scrolling each route top to bottom, reports elements still hidden by reveal/emerge classes or zero opacity text. */
import { chromium } from "playwright";
import { serve } from "./_serve.mjs";
import { ROUTES, launchOpts } from "./_routes.mjs";
const PORT = 4194; const server = await serve(PORT); const browser = await chromium.launch(launchOpts);
for (const w of [1440, 390]) {
  for (const route of ROUTES) {
    const page = await browser.newPage({ viewport: { width: w, height: w > 1000 ? 900 : 844 } });
    const errors = []; page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: "networkidle" });
    await page.mouse.move(5, 5);
    await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 70)); } });
    await page.waitForTimeout(1200);
    const res = await page.evaluate(() => {
      const hidden = [...document.querySelectorAll(".ks-reveal:not(.is-in), .ks-emerge-out")].map((e) => e.tagName + "." + [...e.classList].slice(0, 2).join("."));
      const invisible = [...document.querySelectorAll("h1,h2,h3,p")].filter((e) => { const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return r.width > 0 && Number(cs.opacity) < 0.05 && !e.closest("[aria-hidden=true]"); }).map((e) => e.tagName + ": " + (e.textContent || "").trim().slice(0, 50));
      return { hidden: hidden.slice(0, 8), invisible: invisible.slice(0, 8), overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth };
    });
    console.log(`${w} ${route.padEnd(20)} hidden=${res.hidden.length} invisible=${res.invisible.length} overflow=${res.overflow} errors=${errors.length}` + (res.hidden.length || res.invisible.length ? "\n   " + [...res.hidden, ...res.invisible].join("\n   ") : ""));
    await page.close();
  }
}
await browser.close(); server.close();
