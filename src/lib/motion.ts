import type React from "react";
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

/**
 * Pointer glow: writes the pointer position into --mx / --my (percent) on the
 * element so CSS can draw a light that follows the cursor (.ks-spot). Fine
 * pointers only, one update per frame, nothing under reduced motion. The CSS
 * default (centre) is what touch devices and the server render.
 */
export function usePointerGlow<T extends HTMLElement>(ref: React.RefObject<T>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
      });
    };
    el.addEventListener("pointermove", move, { passive: true });
    return () => {
      el.removeEventListener("pointermove", move);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
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
