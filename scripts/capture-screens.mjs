/**
 * Captures real product screens with Playwright from the three product apps
 * and writes them to public/screens/<surface>/<id>.webp, then marks them
 * `captured: true` in src/content/screens.ts. Nothing is drawn by hand.
 *
 * Run the apps first (read-only checkouts, dev servers):
 *   farmer app   kisanshaktiai/kisanshakti-ai-v1        branch kisanshakti-ai-update   → FARMER_URL  (default http://127.0.0.1:5180)
 *   tenant portal kisanshaktiai/kisanshaktiai-tenant-dash branch local-update-1208      → TENANT_URL  (default http://127.0.0.1:5181)
 *   admin portal kisanshaktiai/kisan-command-center-nexus branch SaaS-dashboard-3007    → ADMIN_URL   (default http://127.0.0.1:5182)
 *
 * Credentials come from the environment and are never written anywhere:
 *   FARMER_MOBILE, FARMER_PIN            (test farmer account)
 *   TENANT_EMAIL, TENANT_PASSWORD        (tenant portal user)
 *   ADMIN_EMAIL, ADMIN_PASSWORD          (admin portal user)
 * The apps must be able to reach the shared Supabase project from this machine.
 *
 * Usage: node scripts/capture-screens.mjs [screenId ...]   (no ids = all)
 */
import { chromium } from "playwright";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { launchOpts } from "./_routes.mjs";

const FARMER = process.env.FARMER_URL || "http://127.0.0.1:5180";
const TENANT = process.env.TENANT_URL || "http://127.0.0.1:5181";
const ADMIN = process.env.ADMIN_URL || "http://127.0.0.1:5182";
const only = new Set(process.argv.slice(2));

/** Each capture: where to go and what must be visible before the shot. */
const PLAN = [
  // Farmer App (mobile viewport). `lang: "mr"` switches the app to Marathi first.
  { id: "login", surface: "farmer-app", url: `${FARMER}/auth`, auth: false, file: "farmer/login.webp" },
  { id: "chat-marathi", surface: "farmer-app", url: `${FARMER}/ai-chat`, lang: "mr", file: "farmer/chat-marathi.webp", settle: 4000 },
  { id: "voice", surface: "farmer-app", url: `${FARMER}/ai-chat`, lang: "mr", file: "farmer/voice.webp", action: async (p) => { const b = p.getByRole("button", { name: /mic|voice|बोला/i }).first(); if (await b.count()) await b.click(); } },
  { id: "farm-today", surface: "farmer-app", url: `${FARMER}/`, file: "farmer/farm-today.webp", settle: 5000 },
  { id: "schedule", surface: "farmer-app", url: `${FARMER}/schedule`, file: "farmer/schedule.webp", settle: 5000 },
  { id: "analytics", surface: "farmer-app", url: `${FARMER}/analytics`, file: "farmer/analytics-financial.webp", settle: 6000, action: async (p) => { const t = p.getByRole("tab", { name: /financial|आर्थिक/i }).first(); if (await t.count()) await t.click(); } },
  { id: "weather", surface: "farmer-app", url: `${FARMER}/weather`, file: "farmer/weather.webp", settle: 5000 },
  { id: "ndvi", surface: "farmer-app", url: `${FARMER}/ndvi-analysis`, file: "farmer/ndvi.webp", settle: 8000 },
  { id: "market", surface: "farmer-app", url: `${FARMER}/market`, file: "farmer/market.webp", settle: 5000 },
  { id: "community", surface: "farmer-app", url: `${FARMER}/community`, file: "farmer/community.webp", settle: 5000 },
  { id: "reels", surface: "farmer-app", url: `${FARMER}/reels`, file: "farmer/reels.webp", settle: 6000 },
  { id: "land", surface: "farmer-app", url: `${FARMER}/land-management`, file: "farmer/land-boundary.webp", settle: 6000 },
  { id: "alerts", surface: "farmer-app", url: `${FARMER}/proactive-alerts`, file: "farmer/alerts.webp", settle: 5000 },
  { id: "growth", surface: "farmer-app", url: `${FARMER}/crop-growth-tracking`, file: "farmer/growth.webp", settle: 5000 },
  { id: "evidence", surface: "farmer-app", url: `${FARMER}/ai-chat`, lang: "mr", file: "farmer/evidence.webp", settle: 4000, action: async (p) => { const b = p.getByText(/why|evidence|कारण|का\?/i).first(); if (await b.count()) await b.click(); } },
  // Tenant SaaS Portal (desktop viewport)
  { id: "tenant-login", surface: "tenant-portal", url: `${TENANT}/auth`, auth: false, file: "tenant/login.webp" },
  { id: "tenant-dashboard", surface: "tenant-portal", url: `${TENANT}/app/dashboard`, file: "tenant/dashboard.webp", settle: 6000 },
  { id: "tenant-farmers", surface: "tenant-portal", url: `${TENANT}/app/farmers`, file: "tenant/farmers.webp", settle: 6000 },
  { id: "tenant-branding", surface: "tenant-portal", url: `${TENANT}/app/settings/white-label`, file: "tenant/branding.webp", settle: 6000 },
  // SaaS Admin Portal (desktop viewport)
  { id: "admin-login", surface: "admin-portal", url: `${ADMIN}/auth`, auth: false, file: "admin/login.webp" },
  { id: "admin-rules", surface: "admin-portal", url: `${ADMIN}/governance/rules`, file: "admin/rules.webp", settle: 6000 },
  { id: "admin-knowledge", surface: "admin-portal", url: `${ADMIN}/governance/knowledge`, file: "admin/knowledge.webp", settle: 6000 },
  { id: "admin-tenants", surface: "admin-portal", url: `${ADMIN}/tenant-management`, file: "admin/tenants.webp", settle: 6000 },
];

const VIEWPORT = { "farmer-app": { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, "tenant-portal": { viewport: { width: 1440, height: 900 } }, "admin-portal": { viewport: { width: 1440, height: 900 } } };

async function loginFarmer(page) {
  const { FARMER_MOBILE, FARMER_PIN } = process.env;
  if (!FARMER_MOBILE || !FARMER_PIN) throw new Error("FARMER_MOBILE and FARMER_PIN are required for authenticated farmer screens");
  await page.goto(`${FARMER}/auth`, { waitUntil: "networkidle" });
  const mobile = page.locator('input[type="tel"], input[inputmode="numeric"], input[placeholder*="98"]').first();
  await mobile.fill(FARMER_MOBILE);
  await page.getByRole("button", { name: /continue|next|login|आगे|पुढे/i }).first().click();
  await page.waitForTimeout(1500);
  const pin = page.locator('input[type="password"], input[inputmode="numeric"]');
  const n = await pin.count();
  if (n >= 4) for (let i = 0; i < Math.min(n, FARMER_PIN.length); i++) await pin.nth(i).fill(FARMER_PIN[i]);
  else await pin.first().fill(FARMER_PIN);
  await page.getByRole("button", { name: /login|verify|continue|सुरू|पुढे/i }).first().click().catch(() => {});
  await page.waitForTimeout(4000);
}
async function loginEmail(page, base, email, password) {
  if (!email || !password) throw new Error(`credentials required for ${base}`);
  await page.goto(`${base}/auth`, { waitUntil: "networkidle" });
  await page.locator('input[type="email"]').first().fill(email);
  await page.locator('input[type="password"]').first().fill(password);
  await page.getByRole("button", { name: /sign in|login/i }).first().click();
  await page.waitForTimeout(5000);
}
async function setLanguage(page, lang) {
  // The farmer app persists the chosen language; set it the way the app does and reload.
  await page.evaluate((l) => { try { localStorage.setItem("i18nextLng", l); localStorage.setItem("kisanshakti-language", l); } catch {} }, lang);
}
async function toWebp(page, pngBuffer) {
  return page.evaluate(async (b64) => {
    const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
    const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; c.getContext("2d").drawImage(img, 0, 0);
    return c.toDataURL("image/webp", 0.86).split(",")[1];
  }, pngBuffer.toString("base64"));
}

const browser = await chromium.launch(launchOpts);
const done = [];
for (const surface of ["farmer-app", "tenant-portal", "admin-portal"]) {
  const items = PLAN.filter((x) => x.surface === surface && (!only.size || only.has(x.id)));
  if (!items.length) continue;
  const ctx = await browser.newContext(VIEWPORT[surface]);
  const page = await ctx.newPage();
  let authed = false;
  for (const it of items) {
    try {
      if (it.auth !== false && !authed) {
        if (surface === "farmer-app") await loginFarmer(page);
        else if (surface === "tenant-portal") await loginEmail(page, TENANT, process.env.TENANT_EMAIL, process.env.TENANT_PASSWORD);
        else await loginEmail(page, ADMIN, process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
        authed = true;
      }
      if (it.lang) await setLanguage(page, it.lang);
      await page.goto(it.url, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(it.settle || 2500);
      if (it.action) { await it.action(page); await page.waitForTimeout(1500); }
      const png = await page.screenshot({ type: "png" });
      const webp = Buffer.from(await toWebp(page, png), "base64");
      const out = path.join("public/screens", it.file);
      await mkdir(path.dirname(out), { recursive: true });
      await writeFile(out, webp);
      await mkdir("qa-output/captures", { recursive: true });
      await writeFile(path.join("qa-output/captures", `${it.id}.png`), png);
      done.push(it.id);
      console.log(`captured ${it.id} → ${out} (${webp.length} bytes)`);
    } catch (e) {
      console.log(`FAILED ${it.id}: ${e.message.split("\n")[0]}`);
    }
  }
  await ctx.close();
}
await browser.close();

// Mark captured screens in the manifest.
if (done.length && !process.env.NO_MANIFEST) {
  const p = "src/content/screens.ts";
  let src = await readFile(p, "utf8");
  for (const id of done) src = src.replace(new RegExp(`(\\{ id: "${id}",[^\\n]*?captured: )false`), "$1true");
  await writeFile(p, src);
  console.log(`manifest updated for: ${done.join(", ")}`);
}
