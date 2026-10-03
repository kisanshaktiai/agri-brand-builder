import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps an animated SVG scene. The scene restarts each time it enters the
 * viewport so a visitor scrolling back sees the explanation again. Animations
 * are never paused, so a scene is never caught blank.
 */
export function SceneFrame({ children, className, label }: { children: React.ReactNode; className?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [gen, setGen] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setLive(true);
            setGen((g) => g + 1);
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("ks-scene-wrap h-full w-full", live && "is-live", className)} role="img" aria-label={label}>
      <div key={gen} className={cn("h-full w-full", !live && "scene-static")}>
        {children}
      </div>
    </div>
  );
}
