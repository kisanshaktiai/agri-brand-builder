export const ROUTES = ["/", "/technology", "/platform", "/farmer-app", "/enterprises", "/security", "/company", "/company/investors", "/contact", "/founder", "/lead-form"];
export const WIDTHS = [360, 768, 1024, 1440];
export const slug = (r) => (r === "/" ? "home" : r.replace(/^\//, "").replace(/\//g, "-"));

export const launchOpts = { executablePath: process.env.CHROME_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" };
