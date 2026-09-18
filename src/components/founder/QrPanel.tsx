import { useEffect, useRef, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { FOUNDER_URL } from "@/data/founderProfile";
import { copyText, shareProfile } from "@/components/founder/actions";
import { Button } from "@/components/ui/button";


/**
 * Pointer-driven 3D tilt written straight into CSS custom properties.
 * Fine pointers only, and it never runs when the visitor has asked for
 * reduced motion — on a phone this is inert.
 */
function useTilt(max = 6) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.setProperty("--founder-ry", `${px * max * 2}deg`);
      node.style.setProperty("--founder-rx", `${-py * max * 2}deg`);
    };

    const reset = () => {
      node.style.setProperty("--founder-ry", "0deg");
      node.style.setProperty("--founder-rx", "0deg");
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", reset);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", reset);
    };
  }, [max]);

  return ref;
}

/**
 * The profile URL never changes, so the QR is a pre-generated static asset in
 * /public rather than a runtime encode — no QR library is shipped to the
 * browser. Regenerate public/founder-qr.svg if FOUNDER_URL ever changes.
 */
export function QrPanel() {
  const [status, setStatus] = useState("");
  const tiltRef = useTilt();

  return (
    <div ref={tiltRef} className="founder-tilt founder-lift rounded-lg bg-card p-7 sm:p-8">
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
        <Button
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
          className="founder-press min-h-[50px] flex-1 rounded-md bg-founder-ink px-6 text-[0.98rem] text-founder-paper hover:bg-founder-ink/90"
        >
          <Share2 className="h-[18px] w-[18px]" aria-hidden="true" />
          Share profile
        </Button>
        <Button
          type="button"
          onClick={async () => {
            const ok = await copyText(FOUNDER_URL);
            setStatus(ok ? "Link copied" : "Could not copy the link");
          }}
          className="founder-press min-h-[50px] flex-1 rounded-md bg-founder-faint px-6 text-[0.98rem] text-founder-ink hover:bg-founder-faint/80"
        >
          {status === "Link copied" ? (
            <Check className="h-[18px] w-[18px]" aria-hidden="true" />
          ) : (
            <Copy className="h-[18px] w-[18px]" aria-hidden="true" />
          )}
          Copy link
        </Button>
      </div>

      <p aria-live="polite" className="mt-3 min-h-[20px] text-center text-sm text-founder-muted">
        {status}
      </p>
    </div>
  );
}
