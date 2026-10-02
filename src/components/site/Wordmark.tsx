import React from "react";

/** Compact icon used where the site needs the standalone mark. */
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

/** Canonical KisanShakti AI wordmark used in header and footer. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/kisanshakti-logo.svg"
      alt="KisanShakti AI"
      width={152}
      height={50}
      className={"h-[42px] w-auto object-contain " + (className ?? "")}
    />
  );
}
