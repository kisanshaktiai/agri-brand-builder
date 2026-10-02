import { chromium } from "playwright";
import { serve } from "./_serve.mjs";
import { launchOpts } from "./_routes.mjs";
const PORT = 4192; const server = await serve(PORT); const browser = await chromium.launch(launchOpts);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const shots = [["/technology", "#tatva"], ["/technology", "#tarka"], ["/technology", "#riitu"], ["/technology", "#pahra"], ["/technology", "#rukh"], ["/farmer-app", "#land"], ["/farmer-app", "#ask"], ["/farmer-app", "#today"], ["/farmer-app", "#market"], ["/platform", "main > div:nth-of-type(1)"]];
for (const [route, sel] of shots) {
  await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: "networkidle" });
  await page.mouse.move(5, 5);
  await page.locator(sel).first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(5200);
  const name = `qa-output/scenes/${route.slice(1)}-${sel.replace(/[^a-z]/g, "")}.png`;
  await page.screenshot({ path: name });
  console.log(name);
}
await browser.close(); server.close();
