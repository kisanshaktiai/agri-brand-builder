import { chromium } from "playwright";
const base = process.argv[2] || "http://127.0.0.1:5180";
const routes = process.argv.slice(3).length ? process.argv.slice(3) : ["/", "/auth"];
const mobile = base.includes("5180");
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const ctx = await browser.newContext(mobile ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } : { viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const logs = [];
page.on("console", (m) => logs.push(`${m.type()}: ${m.text().slice(0, 160)}`));
page.on("pageerror", (e) => logs.push("pageerror: " + String(e).slice(0, 200)));
for (const route of routes) {
  await page.goto(base + route, { waitUntil: "load", timeout: 60000 }).catch((e) => logs.push("nav: " + e.message));
  await page.waitForTimeout(6000);
  const out = `/tmp/claude-0/-home-user/a1989076-372a-5540-8fb8-cbce3e2ec336/scratchpad/cap/${mobile ? "farmer" : new URL(base).port}${route.replace(/\//g, "_") || "_root"}.png`;
  await page.screenshot({ path: out });
  console.log(out, "url=", page.url(), "text=", (await page.evaluate(() => document.body.innerText.slice(0, 240))).replace(/\n/g, " | "));
}
console.log(logs.filter((l) => /error|pageerror/i.test(l)).slice(0, 12).join("\n"));
await browser.close();
