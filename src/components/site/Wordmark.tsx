import React from "react";

/**
 * Canonical KisanShakti AI brand mark.
 * Uses the repository's supplied asset so the website never drifts from the
 * approved identity artwork.
 */
export function Mark({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <img
      src="/brand/kisanshakti-mark.svg"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={className}
    />
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={"inline-flex items-center gap-2.5 whitespace-nowrap " + (className ?? "")}>
      <Mark size={26} />
      <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-ks-ink" style={{ fontVariationSettings: '"opsz" 24' }}>
        KisanShakti <span className="font-medium text-ks-ink-3">AI</span>
      </span>
    </span>
  );
}
