/**
 * Animation checks on / and /platform: fast scroll, slow scroll, reverse,
 * touch (mobile emulation), resize, refresh mid-sequence and reduced motion.
 * For each check it reports horizontal overflow, CTA visibility at the end,
 * document height stability and console errors.
 */
import { chromium, devices } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { serve } from "./_serve.mjs";
import { launchOpts } from "./_routes.mjs";

const PORT = 4184;
const server = await serve(PORT);
const browser = await chromium.launch(launchOpts);
await mkdir("qa-output/motion", { recursive: true });
const report = [];

async function check(name, ctxOpts, run, route = "/") {
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: "networkidle" });
  const h0 = await page.evaluate(() => document.documentElement.scrollHeight);
  await run(page);
  const data = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    height: document.documentElement.scrollHeight,
    scrollY: window.scrollY,
    ctaVisible: !!Array.from(document.querySelectorAll("a")).find((a) => /Open Farmer App/.test(a.textContent) && a.getBoundingClientRect().width > 0),
    pinned: document.querySelectorAll(".pin-spacer").length,
  }));
  const row = { name, route, ...data, heightBefore: h0, errors };
  report.push(row);
  console.log(`${name.padEnd(28)} overflow=${data.overflow} height ${h0}→${data.height} scrollY=${data.scrollY} cta=${data.ctaVisible} pins=${data.pinned} errors=${errors.length}`);
  await page.screenshot({ path: `qa-output/motion/${name.replace(/\W+/g, "-")}.png` });
  await ctx.close();
}

const desktop = { viewport: { width: 1440, height: 900 } };
const scrollBy = async (page, step, pause, dir = 1) => {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  const n = Math.ceil(h / step);
  for (let i = 0; i < n; i++) { await page.mouse.wheel(0, step * dir); await page.waitForTimeout(pause); }
};
await check("desktop fast scroll", desktop, async (p) => { await scrollBy(p, 1600, 20); await p.waitForTimeout(500); });
await check("desktop slow scroll", desktop, async (p) => { await scrollBy(p, 200, 60); await p.waitForTimeout(500); });
await check("desktop reverse scroll", desktop, async (p) => { await scrollBy(p, 1200, 30); await p.waitForTimeout(300); await scrollBy(p, 600, 40, -1); await p.waitForTimeout(500); });
await check("desktop resize mid-sequence", desktop, async (p) => { await scrollBy(p, 800, 40); await p.setViewportSize({ width: 900, height: 800 }); await p.waitForTimeout(400); await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(400); await scrollBy(p, 800, 40); });
await check("desktop refresh mid-sequence", desktop, async (p) => { await scrollBy(p, 700, 30); const y = await p.evaluate(() => window.scrollY); await p.reload({ waitUntil: "networkidle" }); await p.waitForTimeout(600); await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(600); await scrollBy(p, 800, 40); });
await check("desktop reduced motion", { ...desktop, reducedMotion: "reduce" }, async (p) => { await scrollBy(p, 900, 30); await p.waitForTimeout(300); });
await check("mobile touch scroll", { ...devices["Pixel 7"], viewport: { width: 360, height: 780 } }, async (p) => {
  // Synthetic touch drags (touchstart/touchmove/touchend on the document) plus the scroll they would cause.
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 600) {
    await p.evaluate((yy) => {
      const t = (type, cy) => document.dispatchEvent(new TouchEvent(type, { bubbles: true, cancelable: true, touches: type === "touchend" ? [] : [new Touch({ identifier: 1, target: document.body, clientX: 180, clientY: cy })] }));
      t("touchstart", 600); t("touchmove", 300); window.scrollTo({ top: yy }); t("touchend", 300);
    }, y);
    await p.waitForTimeout(40);
  }
  await p.waitForTimeout(400);
});
await check("mobile reduced motion", { ...devices["Pixel 7"], viewport: { width: 360, height: 780 }, reducedMotion: "reduce" }, async (p) => { const h = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < h; y += 900) { await p.evaluate((yy) => window.scrollTo({ top: yy }), y); await p.waitForTimeout(30); } });
await check("platform desktop scroll", desktop, async (p) => { await scrollBy(p, 500, 40); await p.waitForTimeout(400); }, "/platform");
await check("platform mobile scroll", { ...devices["Pixel 7"], viewport: { width: 360, height: 780 } }, async (p) => { const h = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < h; y += 700) { await p.evaluate((yy) => window.scrollTo({ top: yy }), y); await p.waitForTimeout(40); } }, "/platform");
await writeFile("qa-output/motion/report.json", JSON.stringify(report, null, 2));
await browser.close();
server.close();
