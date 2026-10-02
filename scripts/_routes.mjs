export const ROUTES = ["/", "/technology", "/platform", "/farmer-app", "/enterprises", "/security", "/company", "/company/investors", "/contact", "/founder", "/lead-form"];
export const LOCALE_ROUTES = ["/mr", "/mr/technology", "/mr/farmer-app", "/mr/contact", "/hi", "/hi/technology", "/hi/farmer-app", "/hi/contact"];
export const WIDTHS = [360, 768, 1024, 1440];
export const slug = (r) => (r === "/" ? "home" : r.replace(/^\//, "").replace(/\//g, "-"));

export const launchOpts = { executablePath: process.env.CHROME_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" };
