import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { FOUNDER_URL } from "@/data/founderProfile";
import { copyText, shareProfile } from "@/components/founder/actions";

/**
 * The profile URL never changes, so the QR is a pre-generated static asset in
 * /public rather than a runtime encode. No QR library is shipped to the browser.
 * Regenerate public/founder-qr.svg if FOUNDER_URL ever changes.
 */
export function QrPanel() {
  const [status, setStatus] = useState("");

  return (
    <div className="rounded-xl border border-founder-line bg-founder-surface/60 p-5 text-center sm:p-6">
      <div className="mx-auto w-full max-w-[200px] rounded-lg bg-white p-3">
        <img
          src="/founder-qr.svg"
          alt="QR code that opens this profile at kisanshaktiai.in/founder"
          width={200}
          height={200}
          className="h-auto w-full"
        />
      </div>

      <p className="mt-4 break-all text-sm text-founder-muted">kisanshaktiai.in/founder</p>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={async () => {
            const result = await shareProfile();
            setStatus(
              result === "shared"
                ? "Share sheet opened"
                : result === "copied"
                  ? "Link copied"
                  : "Could not share the link",
            );
          }}
          className="founder-press inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-lg bg-founder-gold px-5 text-[0.95rem] font-semibold text-founder-ground"
        >
          <Share2 className="h-[18px] w-[18px]" aria-hidden="true" />
          Share profile
        </button>
        <button
          type="button"
          onClick={async () => {
            const ok = await copyText(FOUNDER_URL);
            setStatus(ok ? "Link copied" : "Could not copy the link");
          }}
          className="founder-press inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-lg border border-founder-line px-5 text-[0.95rem] font-semibold text-founder-ink"
        >
          {status === "Link copied" ? (
            <Check className="h-[18px] w-[18px]" aria-hidden="true" />
          ) : (
            <Copy className="h-[18px] w-[18px]" aria-hidden="true" />
          )}
          Copy link
        </button>
      </div>

      <p aria-live="polite" className="mt-2 min-h-[20px] text-xs text-founder-muted">
        {status}
      </p>
    </div>
  );
}
