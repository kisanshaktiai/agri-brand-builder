import { useEffect, useState } from "react";

/** True when the visitor prefers reduced motion. SSR-safe (false on the server). */
export function useReducedMotion(): boolean {
  // Starts false on server and client alike so hydration matches; updated on mount.
  const [reduced, setReduced] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** True at or above a Tailwind-aligned breakpoint. SSR-safe (false on the server). */
export function useMinWidth(px: number): boolean {
  const [ok, setOk] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia(`(min-width: ${px}px)`);
    const on = () => setOk(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [px]);
  return ok;
}

/** Shared motion tokens (mirror of CSS custom properties). */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const DUR = { fast: 0.16, base: 0.24, slow: 0.42, slower: 0.72 } as const;

let gsapPromise: Promise<typeof import("gsap").gsap> | null = null;

/** Lazily loads GSAP + ScrollTrigger so the core bundle stays small. */
export function loadGsap() {
  if (!gsapPromise) {
    gsapPromise = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, st]) => {
      g.gsap.registerPlugin(st.ScrollTrigger);
      return g.gsap;
    });
  }
  return gsapPromise;
}

export function useGsap(enabled: boolean) {
  const [gsap, setGsap] = useState<typeof import("gsap").gsap | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    loadGsap().then((g) => alive && setGsap(g));
    return () => {
      alive = false;
    };
  }, [enabled]);
  return gsap;
}
