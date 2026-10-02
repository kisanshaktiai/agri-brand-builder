import { chromium } from "playwright";
import { serve } from "./_serve.mjs";
import { launchOpts } from "./_routes.mjs";
const PORT = 4195; const server = await serve(PORT); const browser = await chromium.launch(launchOpts);
for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport: vp });
  const errs = []; page.on("pageerror", (e) => errs.push(e.message));
  await page.goto(`http://127.0.0.1:${PORT}/technology`, { waitUntil: "networkidle" });
  await page.mouse.move(5, 5); await page.waitForTimeout(1500);
  if (vp.width < 1024) { await page.getByRole("button", { name: /menu|मेनू/ }).first().click(); await page.waitForTimeout(300); }
  await page.getByRole("link", { name: "मराठी" }).first().click();
  await page.waitForTimeout(900);
  const h1 = await page.locator("h1").first().innerText();
  const lang = await page.evaluate(() => document.documentElement.lang);
  console.log(vp.width, "→", page.url().replace(/^.*4195/, ""), "| lang", lang, "| h1:", h1.slice(0, 40), "| errors", errs.length);
  if (vp.width < 1024) { await page.getByRole("button", { name: /menu|मेनू/ }).first().click(); await page.waitForTimeout(300); }
  await page.getByRole("link", { name: "हिन्दी" }).first().click(); await page.waitForTimeout(900);
  console.log("   →", page.url().replace(/^.*4195/, ""), "| h1:", (await page.locator("h1").first().innerText()).slice(0, 40));
  await page.screenshot({ path: `qa-output/scenes/lang-${vp.width}.png` });
  await page.close();
}
// direct load of a prerendered Marathi page
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(`http://127.0.0.1:${PORT}/mr/farmer-app`, { waitUntil: "networkidle" });
console.log("direct /mr/farmer-app h1:", (await page.locator("h1").first().innerText()).slice(0, 40), "| lang", await page.evaluate(() => document.documentElement.lang));
await page.screenshot({ path: `qa-output/scenes/mr-farmer-app-390.png`, fullPage: false });
await browser.close(); server.close();
