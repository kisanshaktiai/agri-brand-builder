import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { readFileSync, writeFileSync } from "node:fs";
import { serve } from "/home/user/agri-brand-builder/scripts/_serve.mjs";
const PORT = 4185; const server = await serve(PORT);
const chrome = await launch({ chromePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"] });
const orig = readFileSync("/tmp/claude-0/-home-user/a1989076-372a-5540-8fb8-cbce3e2ec336/scratchpad/index.bak.html", "utf8");
const variants = {
  baseline: (h) => h,
  noScripts: (h) => h.replace(/<script type="module"[^>]*><\/script>/g, "").replace(/<link rel="modulepreload"[^>]*>/g, ""),
  noPreloadHints: (h) => h.replace(/<link rel="modulepreload"[^>]*>/g, ""),
  noFontPreload: (h) => h.replace(/<link rel="preload" href="\/fonts[^>]*>/g, ""),
  noCss: (h) => h.replace(/<link rel="stylesheet"[^>]*>/g, ""),
  scriptEndBodyNoHints: (h) => { const m = h.match(/<script type="module"[^>]*><\/script>/)[0]; return h.replace(m, "").replace(/<link rel="modulepreload"[^>]*>/g, "").replace("</body>", m + "</body>"); },
};
for (const [name, fn] of Object.entries(variants)) {
  writeFileSync("/home/user/agri-brand-builder/dist/index.html", fn(orig));
  const res = await lighthouse(`http://127.0.0.1:${PORT}/`, { port: chrome.port, output: "json", logLevel: "error", onlyCategories: ["performance"] });
  const m = res.lhr.audits.metrics.details.items[0];
  console.log(name.padEnd(22), "P", Math.round(res.lhr.categories.performance.score * 100), "FCP", m.firstContentfulPaint, "LCP", m.largestContentfulPaint, "SI", m.speedIndex, "TBT", m.totalBlockingTime);
}
writeFileSync("/home/user/agri-brand-builder/dist/index.html", orig);
await chrome.kill(); server.close();
