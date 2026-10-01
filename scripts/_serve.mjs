/** Serves dist/ as a static site with per-route index.html and SPA fallback. */
import http from "node:http";
import { gzipSync } from "node:zlib";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".json": "application/json", ".webmanifest": "application/manifest+json", ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml" };

export function serve(port = 4173) {
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://x");
    let p = decodeURIComponent(url.pathname);
    let file = path.join(root, p);
    try {
      const s = await stat(file).catch(() => null);
      if (s?.isDirectory()) file = path.join(file, "index.html");
      else if (!s) file = path.join(root, "spa.html");
      let data = await readFile(file);
      const ext = path.extname(file);
      const headers = { "content-type": TYPES[ext] || "application/octet-stream", "cache-control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable" };
      // Text assets are gzipped, as every production host does.
      if (/\.(html|js|css|svg|json|webmanifest|txt|xml)$/.test(ext) && /gzip/.test(req.headers["accept-encoding"] || "")) { data = gzipSync(data); headers["content-encoding"] = "gzip"; }
      res.writeHead(200, headers);
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("not found");
    }
  });
  return new Promise((resolve) => server.listen(port, "127.0.0.1", () => resolve(server)));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  serve(Number(process.env.PORT || 4173)).then(() => console.log("serving dist on http://127.0.0.1:" + (process.env.PORT || 4173)));
}
