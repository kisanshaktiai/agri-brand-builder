import { chromium } from "playwright";
import { serve } from "./_serve.mjs";
import { launchOpts } from "./_routes.mjs";
const PORT = 4191; const server = await serve(PORT); const browser = await chromium.launch(launchOpts);
for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport: vp });
  const errs = [];
  page.on("pageerror", (e) => errs.push("pageerror: " + e.message + "\n" + (e.stack || "").split("\n").slice(0, 4).join("\n")));
  page.on("console", (m) => m.type() === "error" && errs.push("console: " + m.text().slice(0, 200)));
  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: "networkidle" });
  await page.mouse.move(10, 10); await page.waitForTimeout(1500);
  for (const label of ["Technology", "Platform", "Farmer App", "For Partners", "Security & Governance", "Company", "Partner with us"]) {
    if (vp.width < 1024) { await page.getByRole("button", { name: "Open menu" }).click(); await page.waitForTimeout(300); }
    const link = page.getByRole("link", { name: label, exact: true }).first();
    await link.click({ timeout: 5000 }).catch((e) => errs.push("click " + label + ": " + e.message.split("\n")[0]));
    await page.waitForTimeout(1200);
    const txt = await page.evaluate(() => document.body.innerText.slice(0, 80).replace(/\n/g, " | "));
    console.log(vp.width, label, "→", page.url().replace(/^.*4191/, ""), "|", txt);
  }
  console.log(errs.join("\n") || "no errors");
  await page.close();
}
await browser.close(); server.close();
