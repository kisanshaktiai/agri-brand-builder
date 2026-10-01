import React from "react";

/** Brand mark: a field-plot quartered by two paths, with the wordmark. */
export function Mark({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect x="1" y="1" width="22" height="22" rx="6" fill="hsl(var(--ks-field))" />
      <path d="M6 12h12M12 6v12" stroke="hsl(var(--ks-field-ink))" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.2" fill="hsl(var(--ks-field-ink))" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={"inline-flex items-center gap-2.5 " + (className ?? "")}>
      <Mark />
      <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-ks-ink" style={{ fontVariationSettings: '"opsz" 24' }}>
        KisanShakti <span className="font-medium text-ks-ink-3">AI</span>
      </span>
    </span>
  );
}
