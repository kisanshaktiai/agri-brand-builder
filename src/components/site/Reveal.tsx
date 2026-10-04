import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * In-view reveal. Server HTML is fully visible (no inline hidden styles),
 * so first paint never waits for JavaScript. After mount, elements below the
 * fold are hidden with a class and revealed by IntersectionObserver.
 * Under reduced motion nothing is hidden.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: { children: React.ReactNode; delay?: number; className?: string; as?: "div" | "li" | "section" | "p" | "figure" | "article"; y?: number }) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<"ssr" | "hidden" | "in">("ssr");
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) return; // on screen or already scrolled past: leave visible
    setState("hidden");
    let raf = 0;
    const done = () => {
      setState("in");
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && done(), { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    // A jump past the element (anchor link, restored scroll) never intersects it; reveal it anyway.
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (el.getBoundingClientRect().bottom < 0) done();
      });
    };
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={cn(className, state !== "ssr" && "ks-reveal", state === "in" && "is-in")} style={state === "in" && delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </Tag>
  );
}

export function Stagger({ children, className, step = 0.06 }: { children: React.ReactNode; className?: string; step?: number }) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, i) => (
        <Reveal delay={i * step}>{child}</Reveal>
      ))}
    </div>
  );
}
