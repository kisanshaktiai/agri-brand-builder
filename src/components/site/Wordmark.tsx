import React from "react";

/** The leaf mark alone, cropped from the supplied logo. */
export function Mark({ size = 24, className }: { size?: number; className?: string }) {
  return <img src="/brand/mark.png" alt="" aria-hidden="true" width={size} height={size} className={className} decoding="async" />;
}

/** The supplied logo image, used in the header and footer. */
export function Wordmark({ className, height = 40 }: { className?: string; height?: number }) {
  const width = Math.round((198 / 85) * height);
  return <img src="/brand/logo.png" alt="KisanShakti AI" width={width} height={height} className={"w-auto object-contain " + (className ?? "")} style={{ height }} decoding="async" fetchPriority="high" />;
}
