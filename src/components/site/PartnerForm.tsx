import React, { useRef, useState } from "react";
import { leadsService, type LeadData } from "@/services/LeadsService";
import { useContent } from "@/i18n";
import { Button } from "./primitives";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Partner form. Asks only for name, organisation, work email, phone,
 * organisation type, network size and message, and submits through the
 * existing lead path (LeadsService → submit-lead edge function), unchanged.
 * Organisation types are mapped onto the lead schema's existing values.
 */
const ORG_TYPE_MAP: Record<string, LeadData["organization_type"]> = {
  fpo: "cooperative",
  dealer: "agri_company",
  input: "agri_company",
  enterprise: "agri_company",
  other: "other",
};

const field = "h-11 w-full rounded-ks-sm border border-ks-line-strong bg-ks-white px-3 text-base text-ks-ink placeholder:text-ks-ink-4 focus:border-ks-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ks-field/40";

export function PartnerForm() {
  const f = useContent().CONTACT_PAGE.form;
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const started = useRef(false);

  const onStart = () => {
    if (!started.current) {
      started.current = true;
      track("form_start");
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const orgType = String(fd.get("orgType") || "other");
    const size = f.networkSizes.find((s) => s.value === String(fd.get("networkSize")));
    const typeLabel = f.orgTypes.find((o) => o.value === orgType)?.label ?? orgType;
    const message = String(fd.get("message") || "").trim();
    const lead: LeadData = {
      contact_name: String(fd.get("name") || "").trim(),
      organization_name: String(fd.get("organisation") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      organization_type: ORG_TYPE_MAP[orgType] ?? "other",
      expected_farmers: size?.number,
      requirements: [`Organisation type: ${typeLabel}`, size ? `Network size: ${size.label} farmers` : null, message ? `\n${message}` : null].filter(Boolean).join("\n"),
      how_did_you_hear: "website",
    };
    setState("sending");
    setError(null);
    const res = await leadsService.submitInquiry(lead);
    if (res.success) {
      setState("done");
      track("form_complete", { org_type: orgType });
    } else {
      setState("error");
      setError(res.error || "Something went wrong. Please try again.");
    }
  };

  if (state === "done") {
    return (
      <div role="status" className="rounded-ks-lg border border-ks-field/30 bg-ks-field-soft p-8 text-ks-field-deep">
        <p className="ks-h3">{f.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocusCapture={onStart} className="grid gap-5" noValidate={false} aria-describedby="partner-privacy">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ks-ink">{f.name}</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ks-ink">{f.organisation}</span>
          <input name="organisation" required autoComplete="organization" className={field} />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ks-ink">{f.email}</span>
          <input name="email" type="email" required autoComplete="email" inputMode="email" className={field} />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ks-ink">{f.phone}</span>
          <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={field} />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ks-ink">{f.orgType}</span>
          <select name="orgType" required defaultValue="" className={field}>
            <option value="" disabled>
              Select
            </option>
            {f.orgTypes.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ks-ink">{f.networkSize}</span>
          <select name="networkSize" required defaultValue="" className={field}>
            <option value="" disabled>
              Select
            </option>
            {f.networkSizes.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-1.5 text-sm">
        <span className="font-medium text-ks-ink">{f.message}</span>
        <textarea name="message" rows={5} className={cn(field, "h-auto py-2.5")} />
      </label>
      {error && (
        <p role="alert" className="rounded-ks-sm border border-ks-danger/30 bg-ks-danger/5 px-3 py-2 text-sm text-ks-danger">
          {error}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={state === "sending"} aria-busy={state === "sending"}>
          {state === "sending" ? f.sending : f.submit}
        </Button>
        <p id="partner-privacy" className="ks-small">
          {f.privacy}
        </p>
      </div>
    </form>
  );
}
