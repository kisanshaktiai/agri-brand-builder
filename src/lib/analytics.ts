/**
 * Privacy-conscious analytics. Only meaningful events are tracked, no page
 * views, no identifiers, no cookies. Events are sent with sendBeacon to the
 * endpoint in VITE_ANALYTICS_ENDPOINT; without one they stay local (and are
 * logged in development). Nothing is stored about the visitor.
 */
export type SiteEvent =
  | "farmer_app_cta"
  | "partner_cta"
  | "tenant_cta"
  | "technology_engaged"
  | "form_start"
  | "form_complete"
  | "video_interaction";

const ENDPOINT = import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined;
const seen = new Set<string>();

export function track(event: SiteEvent, props: Record<string, string> = {}, once = false) {
  if (typeof window === "undefined") return;
  const key = `${event}:${JSON.stringify(props)}`;
  if (once && seen.has(key)) return;
  seen.add(key);
  const payload = JSON.stringify({ event, props, path: window.location.pathname, ts: Date.now() });
  if (ENDPOINT && "sendBeacon" in navigator) {
    try {
      navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: "application/json" }));
    } catch {
      /* ignore */
    }
  } else if (import.meta.env.DEV) {
    console.debug("[analytics]", event, props);
  }
}
