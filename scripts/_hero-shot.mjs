import { chromium } from "playwright";
import { serve } from "./_serve.mjs";
import { launchOpts } from "./_routes.mjs";
const PORT = 4193; const server = await serve(PORT); const browser = await chromium.launch(launchOpts);
for (const [w, h, name] of [[1440, 900, "hero-1440"], [390, 844, "hero-390"]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: "networkidle" });
  await page.mouse.move(5, 5); await page.waitForTimeout(3200);
  await page.screenshot({ path: `qa-output/scenes/${name}.png` });
}
await browser.close(); server.close();
