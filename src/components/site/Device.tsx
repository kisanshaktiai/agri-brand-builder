import React from "react";
import { cn } from "@/lib/utils";
import { screenById, type Screen } from "@/content/screens";
import { FeatureScene, hasVignette } from "@/components/scenes/FeatureScene";
import { useT } from "@/i18n";

/** Real product screen or an explicit "capture pending" tile. Never a mock. */
export function ScreenImage({ screen, priority = false, className, sizes }: { screen: Screen | string; priority?: boolean; className?: string; sizes?: string }) {
  const s = typeof screen === "string" ? screenById(screen) : screen;
  const UI = useT();
  if (!s.captured && hasVignette(s.id)) {
    // Until a real capture exists, an animated illustration explains the feature.
    return <FeatureScene id={s.id} />;
  }
  if (!s.captured) {
    return (
      <div className={cn("ks-screen-pending", className)} role="img" aria-label={`${s.title}: real screen capture pending`}>
        <span className="ks-label text-[0.625rem]">{UI.capturePending}</span>
        <span className="text-sm font-medium text-ks-ink-2">{s.title}</span>
        <span className="text-xs">{s.question}</span>
      </div>
    );
  }
  return (
    <img
      src={`/screens/${s.file}`}
      alt={s.alt}
      width={s.width}
      height={s.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      sizes={sizes}
      className={cn("block h-full w-full object-cover object-top", className)}
    />
  );
}

export function Phone({ children, className, label }: { children: React.ReactNode; className?: string; label?: string }) {
  return (
    <figure className={cn("ks-phone mx-auto", className)} aria-label={label}>
      <div className="ks-phone-screen">{children}</div>
    </figure>
  );
}

export function Browser({ children, url = "app.kisanshaktiai.in", className, style }: { children: React.ReactNode; url?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <figure className={cn("ks-browser", className)} style={style}>
      <div className="ks-browser-bar" aria-hidden>
        <i /> <i /> <i />
        <span className="ks-browser-url">{url}</span>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ks-white">{children}</div>
    </figure>
  );
}
