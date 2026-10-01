import { useEffect, useRef, useState } from "react";

/** IntersectionObserver hook. Reports true once by default, which is what reveals need. */
export function useInView<T extends HTMLElement>(options: IntersectionObserverInit = { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }, once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once]);
  return { ref, inView };
}
