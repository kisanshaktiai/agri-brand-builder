import type Lenis from "lenis";

let lenis: Lenis | null = null;
let raf = 0;

/**
 * Smooth scroll (Lenis) on fine-pointer devices only; phones keep native
 * scrolling for performance. ScrollTrigger is synced when GSAP loads.
 * Disabled entirely under prefers-reduced-motion.
 */
export async function startSmoothScroll() {
  if (typeof window === "undefined" || lenis) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;
  if (reduced || !fine) return;
  const { default: LenisCtor } = await import("lenis");
  lenis = new LenisCtor({ lerp: 0.12, wheelMultiplier: 1, smoothWheel: true });
  const loop = (t: number) => {
    lenis?.raf(t);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  // Sync with ScrollTrigger if/when it is loaded.
  import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
    lenis?.on("scroll", ScrollTrigger.update);
  });
}

export function stopSmoothScroll() {
  if (raf) cancelAnimationFrame(raf);
  lenis?.destroy();
  lenis = null;
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}
