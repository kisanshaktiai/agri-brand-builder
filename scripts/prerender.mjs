/**
 * Prerenders every public route to static HTML after `vite build`.
 * - Builds the SSR bundle (dist-ssr) with Vite's API.
 * - Renders each route with React and writes dist/<route>/index.html.
 * - Leaves dist/index.html as the SPA fallback for unknown routes.
 * Fails soft: if anything throws, the SPA build is left intact and the
 * process exits 0 with a warning, so a deploy never breaks on prerender.
 */
import { build } from "vite";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const distSsr = path.join(root, "dist-ssr");

export const ROUTES = [
  "/",
  "/technology",
  "/platform",
  "/farmer-app",
  "/enterprises",
  "/security",
  "/company",
  "/company/investors",
  "/contact",
  "/founder",
  // /lead-form is served by the SPA fallback: its form reads browser state during render.
];

async function main() {
  const template = await readFile(path.join(dist, "index.html"), "utf8");
  if (!template.includes("<!--app-html-->")) throw new Error("dist/index.html has no <!--app-html--> marker");

  // Keep a pristine SPA fallback; the prerendered "/" replaces dist/index.html.
  await writeFile(path.join(dist, "spa.html"), template);

  await build({ root, configFile: path.join(root, "vite.config.ts"), logLevel: "warn", build: { ssr: "src/entry-server.tsx", outDir: distSsr, emptyOutDir: true } });

  const mod = await import(pathToFileURL(path.join(distSsr, "entry-server.js")).href);
  await mod.preload();

  // Strip Vite's module-less duplicate of index.css link? Not needed; template already links built CSS.
  for (const route of ROUTES) {
    const { html, head } = mod.render(route);
    let page = template.replace("<!--app-head-->", head).replace('<div id="root"><!--app-html--></div>', `<div id="root" data-prerendered="true">${html}</div>`);
    // The template carries a default <title> and description; Helmet supplies the real ones.
    if (/<title data-rh="true">[^<]+<\/title>/.test(head)) {
      page = page.replace(/<title>[^<]*<\/title>\s*/, "").replace(/<meta name="description" content="[^"]*" \/>\s*/, "");
    }
    if (html.includes("<!--$!-->")) throw new Error(`route ${route} rendered a Suspense fallback`);
    // Move the entry module to the end of <body> and drop modulepreload hints so
    // first paint of the static HTML never waits on JavaScript on slow phones.
    page = page.replace(/\s*<link rel="modulepreload"[^>]*>/g, "");
    // The founder profile uses its own typefaces; do not preload the site's display fonts there.
    if (route === "/founder") page = page.replace(/\s*<link rel="preload" href="\/fonts[^>]*>/g, "");
    // The static HTML is complete on its own, so the app bundle is loaded on
    // the first interaction (scroll, touch, key, pointer) or when the browser
    // is idle, whichever comes first. Readers on slow phones get the page
    // immediately; the menu, form and choreography arrive moments later.
    const entry = page.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/);
    if (entry) {
      const loader = `<script>(function(){var s=${JSON.stringify(entry[1])},d=0;function go(){if(d)return;d=1;var e=document.createElement("script");e.type="module";e.crossOrigin="";e.src=s;document.head.appendChild(e);}["scroll","touchstart","pointerdown","keydown","mousemove"].forEach(function(n){addEventListener(n,go,{once:true,passive:true})});if("requestIdleCallback"in window){requestIdleCallback(go,{timeout:2500})}else{setTimeout(go,1200)}})();</script>`;
      page = page.replace(entry[0], "").replace("</body>", `${loader}\n  </body>`);
    }
    const outDir = route === "/" ? dist : path.join(dist, route.replace(/^\//, ""));
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "index.html"), page);
    console.log(`prerendered ${route}`);
  }
  await rm(distSsr, { recursive: true, force: true });
}

main().catch((err) => {
  console.warn("[prerender] skipped:", err?.message ?? err);
  if (process.env.PRERENDER_STRICT) process.exit(1);
});
