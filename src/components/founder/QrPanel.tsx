import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { FOUNDER_URL } from "@/data/founderProfile";
import { copyText, shareProfile } from "@/components/founder/actions";

/**
 * The profile URL never changes, so the QR is a pre-generated static asset in
 * /public rather than a runtime encode — no QR library is shipped to the
 * browser. Regenerate public/founder-qr.svg if FOUNDER_URL ever changes.
 */
export function QrPanel() {
  const [status, setStatus] = useState("");

  return (
    <div className="founder-lift rounded-2xl bg-white p-7 sm:p-8">
      <div className="mx-auto w-full max-w-[220px]">
        <img
          src="/founder-qr.svg"
          alt="QR code that opens this profile at kisanshaktiai.in/founder"
          width={220}
          height={220}
          className="h-auto w-full"
        />
      </div>

      <p className="mt-5 text-center text-[0.95rem] text-founder-muted">
        kisanshaktiai.in/founder
      </p>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
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
          className="founder-press inline-flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-full bg-founder-ink px-6 text-[0.98rem] font-medium text-founder-paper"
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
          className="founder-press inline-flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-full bg-founder-faint px-6 text-[0.98rem] font-medium text-founder-ink"
        >
          {status === "Link copied" ? (
            <Check className="h-[18px] w-[18px]" aria-hidden="true" />
          ) : (
            <Copy className="h-[18px] w-[18px]" aria-hidden="true" />
          )}
          Copy link
        </button>
      </div>

      <p aria-live="polite" className="mt-3 min-h-[20px] text-center text-sm text-founder-muted">
        {status}
      </p>
    </div>
  );
}
