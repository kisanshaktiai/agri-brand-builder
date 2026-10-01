import { chromium } from "playwright";
import { serve } from "./_serve.mjs";
import { launchOpts } from "./_routes.mjs";
const PORT = 4190; const server = await serve(PORT); const browser = await chromium.launch(launchOpts);
for (const [route, w] of [["/", 360], ["/", 1024], ["/platform", 1024], ["/technology", 768]]) {
  const page = await browser.newPage({ viewport: { width: w, height: 800 } });
  await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: "networkidle" });
  const bad = await page.evaluate(() => { const cw = document.documentElement.clientWidth; const out = []; for (const el of document.querySelectorAll("body *")) { const r = el.getBoundingClientRect(); if (r.right > cw + 1 && r.width > 0) out.push(`${el.tagName.toLowerCase()}.${[...el.classList].slice(0,3).join(".")} right=${Math.round(r.right)} w=${Math.round(r.width)}`); } return out.slice(0, 12); });
  console.log(`\n${route} @${w}:\n  ` + bad.join("\n  "));
  await page.close();
}
await browser.close(); server.close();
