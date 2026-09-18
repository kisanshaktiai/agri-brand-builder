import { buildVCard, founderProfile, FOUNDER_URL } from "@/data/founderProfile";

/** Builds the vCard in the browser and triggers a download. No network call. */
export function downloadVCard() {
  const blob = new Blob([buildVCard(founderProfile)], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Amarsinh-Patil.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function whatsappUrl(e164: string) {
  return `https://wa.me/${e164.replace(/[^\d]/g, "")}`;
}

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path below */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

/** Web Share API with a clipboard fallback. Reports what actually happened. */
export async function shareProfile(url: string = FOUNDER_URL): Promise<"shared" | "copied" | "failed"> {
  const data = {
    title: `${founderProfile.name} — ${founderProfile.title}`,
    text: `${founderProfile.name} — ${founderProfile.brands.map((b) => b.name).join(" | ")}`,
    url,
  };

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share(data);
      return "shared";
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return "shared";
    }
  }

  return (await copyText(url)) ? "copied" : "failed";
}
