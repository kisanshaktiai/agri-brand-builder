import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Download,
  Facebook,
  Instagram,
  Link2,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Twitter,
  Youtube,
} from "lucide-react";
import { founderProfile, FOUNDER_URL, type BrandKey } from "@/data/founderProfile";
import { downloadVCard, mapsUrl, shareProfile, whatsappUrl } from "@/components/founder/actions";
import { TechStrip } from "@/components/founder/TechStrip";
import { QrPanel } from "@/components/founder/QrPanel";

const PAGE_TITLE = `${founderProfile.name} — Founder, KisanShakti AI`;
const PAGE_DESCRIPTION =
  "Founder of KisanShakti AI, AP-TECH and LearniXa. Save the contact card, call, message on WhatsApp, email or find the office.";

const brandAccent: Record<BrandKey, string> = {
  kisanshakti: "text-founder-leaf",
  aptech: "text-founder-aptech",
  learnixa: "text-founder-learnixa",
};

const brandRule: Record<BrandKey, string> = {
  kisanshakti: "bg-founder-leaf",
  aptech: "bg-founder-aptech",
  learnixa: "bg-founder-learnixa",
};

const socialIcons: Record<string, typeof Linkedin> = {
  linkedin: Linkedin,
  x: Twitter,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
};

const initials = founderProfile.name
  .split(" ")
  .map((part) => part[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

/** Sets head tags for this page and removes them again on unmount. */
function useFounderHead() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    const created: Element[] = [];

    const addMeta = (attr: "name" | "property", key: string, content: string) => {
      const el = document.createElement("meta");
      el.setAttribute(attr, key);
      el.setAttribute("content", content);
      document.head.appendChild(el);
      created.push(el);
    };

    addMeta("name", "description", PAGE_DESCRIPTION);
    addMeta("property", "og:title", PAGE_TITLE);
    addMeta("property", "og:description", PAGE_DESCRIPTION);
    addMeta("property", "og:type", "profile");
    addMeta("property", "og:url", FOUNDER_URL);
    addMeta("name", "twitter:card", "summary_large_image");
    addMeta("name", "theme-color", "#0d2a1c");

    const canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", FOUNDER_URL);
    document.head.appendChild(canonical);
    created.push(canonical);

    const jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: founderProfile.name,
      jobTitle: founderProfile.title,
      url: FOUNDER_URL,
      telephone: founderProfile.phones.map((p) => p.e164),
      email: founderProfile.emails.map((e) => e.address),
      sameAs: founderProfile.socials.map((s) => s.url),
      address: founderProfile.addresses.map((a) => ({
        "@type": "PostalAddress",
        streetAddress: a.full,
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      })),
      worksFor: founderProfile.brands.map((b) => ({
        "@type": "Organization",
        name: b.name,
        url: b.url,
        slogan: b.tagline,
      })),
    });
    document.head.appendChild(jsonLd);
    created.push(jsonLd);

    return () => {
      document.title = previousTitle;
      created.forEach((el) => el.remove());
    };
  }, []);
}

/** Brand logo with a typographic fallback if the image is missing. */
function BrandMark({ name, logo, accent }: { name: string; logo?: string; accent: string }) {
  const [failed, setFailed] = useState(false);

  if (!logo || failed) {
    return (
      <span
        aria-hidden="true"
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-founder-line bg-founder-ground text-sm font-semibold ${accent}`}
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/95 p-1.5">
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        onError={() => setFailed(true)}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

function SectionLabel({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-display text-2xl font-semibold text-founder-ink sm:text-[1.75rem]">
      {children}
    </h2>
  );
}

export default function Founder() {
  useFounderHead();
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState("");

  return (
    <div className="founder-page min-h-screen bg-founder-ground text-founder-ink">
      <a
        href="#founder-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-founder-gold focus:px-4 focus:py-2 focus:text-founder-ground"
      >
        Skip to content
      </a>

      <main id="founder-main" className="mx-auto w-full max-w-xl px-5 pb-20 sm:px-8">
        {/* ── Identity ─────────────────────────────────────────────── */}
        <header className="founder-enter relative flex min-h-[86svh] flex-col justify-center py-14">
          <div className="founder-enter-1 flex items-center gap-4">
            {founderProfile.portrait ? (
              <img
                src={founderProfile.portrait}
                alt={`${founderProfile.name}, ${founderProfile.title}`}
                className="h-20 w-20 shrink-0 rounded-full object-cover ring-1 ring-founder-line sm:h-24 sm:w-24"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-founder-line bg-founder-surface font-display text-2xl font-semibold text-founder-gold sm:h-24 sm:w-24 sm:text-3xl"
              >
                {initials}
              </span>
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium text-founder-gold">{founderProfile.title}</p>
              <p className="mt-1 text-sm text-founder-muted">
                {founderProfile.brands.map((b) => b.name).join(" · ")}
              </p>
            </div>
          </div>

          <h1 className="founder-enter-2 mt-8 font-display text-[clamp(2.75rem,13vw,4.5rem)] font-semibold leading-[0.95] tracking-tight text-founder-ink">
            {founderProfile.name}
          </h1>

          <div className="founder-enter-2 mt-6 flex items-center gap-1" aria-hidden="true">
            {founderProfile.brands.map((b) => (
              <span key={b.key} className={`h-[3px] w-12 rounded-full ${brandRule[b.key]}`} />
            ))}
          </div>

          <p className="founder-enter-3 mt-6 max-w-md text-[1.05rem] leading-relaxed text-founder-muted">
            {founderProfile.summary}
          </p>

          <div className="founder-enter-4 mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                downloadVCard();
                setSaved(true);
              }}
              className="founder-press inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg bg-founder-gold px-6 text-base font-semibold text-founder-ground sm:flex-1"
            >
              {saved ? (
                <Check className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Download className="h-5 w-5" aria-hidden="true" />
              )}
              {saved ? "Contact saved" : "Save contact"}
            </button>
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
              className="founder-press inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border border-founder-line px-6 text-base font-medium text-founder-ink sm:flex-1"
            >
              <Share2 className="h-5 w-5" aria-hidden="true" />
              Share
            </button>
          </div>

          <p aria-live="polite" className="mt-3 min-h-[20px] text-sm text-founder-muted">
            {saved ? "Contact card downloaded." : status}
          </p>

          <span
            aria-hidden="true"
            className="founder-cue absolute bottom-5 left-0 flex items-center gap-2 text-xs text-founder-muted"
          >
            <ChevronDown className="h-4 w-4" />
            Contact, ventures and technology below
          </span>
        </header>

        {/* ── Contact ──────────────────────────────────────────────── */}
        <section aria-labelledby="founder-contact" className="pt-6">
          <SectionLabel id="founder-contact">Contact</SectionLabel>

          <ul className="mt-6 divide-y divide-founder-line border-y border-founder-line">
            {founderProfile.phones.map((phone) => (
              <li key={phone.e164} className="flex items-center gap-2">
                <a
                  href={`tel:${phone.e164}`}
                  className="founder-row flex min-h-[64px] flex-1 items-center gap-4"
                >
                  <Phone className="h-[18px] w-[18px] shrink-0 text-founder-gold" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-[1.05rem] font-medium text-founder-ink">
                      {phone.display}
                    </span>
                    <span className="block text-sm text-founder-muted">{phone.label}</span>
                  </span>
                </a>
                {phone.whatsapp ? (
                  <a
                    href={whatsappUrl(phone.e164)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Message ${phone.display} on WhatsApp`}
                    className="founder-press flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-founder-line text-founder-leaf"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  </a>
                ) : null}
              </li>
            ))}

            {founderProfile.emails.map((email) => (
              <li key={email.address}>
                <a
                  href={`mailto:${email.address}`}
                  className="founder-row flex min-h-[64px] items-center gap-4"
                >
                  <Mail className="h-[18px] w-[18px] shrink-0 text-founder-gold" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block truncate text-[1.05rem] font-medium text-founder-ink">
                      {email.address}
                    </span>
                    <span className="block text-sm text-founder-muted">{email.label}</span>
                  </span>
                </a>
              </li>
            ))}

            {founderProfile.addresses.map((address) => (
              <li key={address.label}>
                <a
                  href={mapsUrl(address.mapQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="founder-row flex min-h-[64px] items-start gap-4 py-4"
                >
                  <MapPin
                    className="mt-1 h-[18px] w-[18px] shrink-0 text-founder-gold"
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    {address.lines.map((line) => (
                      <span key={line} className="block text-[1.05rem] leading-snug text-founder-ink">
                        {line}
                      </span>
                    ))}
                    <span className="mt-1.5 inline-flex items-center gap-1 text-sm text-founder-gold">
                      Open in Maps
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Ventures ─────────────────────────────────────────────── */}
        <section aria-labelledby="founder-ventures" className="pt-16">
          <SectionLabel id="founder-ventures">Ventures</SectionLabel>

          <ul className="mt-6 space-y-3">
            {founderProfile.brands.map((brand) => (
              <li key={brand.key}>
                <a
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="founder-press flex items-start gap-4 rounded-xl border border-founder-line bg-founder-surface/60 p-4"
                >
                  <BrandMark
                    name={brand.name}
                    logo={brand.logo}
                    accent={brandAccent[brand.key]}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[1.05rem] font-semibold text-founder-ink">
                      {brand.name}
                    </span>
                    <span className={`mt-0.5 block text-sm font-medium ${brandAccent[brand.key]}`}>
                      {brand.tagline}
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-founder-muted">
                      {brand.description}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm text-founder-muted">
                      {brand.urlLabel}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Technology family ────────────────────────────────────── */}
        <section aria-labelledby="founder-technology" className="pt-16">
          <SectionLabel id="founder-technology">{founderProfile.techFamily.heading}</SectionLabel>
          <p className="mt-2 text-sm leading-relaxed text-founder-muted">
            {founderProfile.techFamily.intro}
          </p>
          <div className="mt-6">
            <TechStrip modules={founderProfile.techFamily.modules} />
          </div>
        </section>

        {/* ── Connect (renders only when socials exist) ────────────── */}
        {founderProfile.socials.length > 0 ? (
          <section aria-labelledby="founder-connect" className="pt-16">
            <SectionLabel id="founder-connect">Connect</SectionLabel>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {founderProfile.socials.map((social) => {
                const Icon = socialIcons[social.key.toLowerCase()] ?? Link2;
                return (
                  <li key={social.key}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="founder-press flex min-h-[56px] items-center gap-3 rounded-lg border border-founder-line bg-founder-surface/60 px-4"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-founder-gold" aria-hidden="true" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.95rem] font-medium text-founder-ink">
                          {social.label}
                        </span>
                        <span className="block truncate text-sm text-founder-muted">
                          {social.handle}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-founder-muted" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {/* ── QR ───────────────────────────────────────────────────── */}
        <section aria-labelledby="founder-qr" className="pt-16">
          <SectionLabel id="founder-qr">Scan to open this card</SectionLabel>
          <div className="mt-6">
            <QrPanel />
          </div>
        </section>

        <footer className="mt-16 border-t border-founder-line pt-6">
          <a
            href="https://www.kisanshaktiai.in"
            className="inline-flex items-center gap-1 text-sm text-founder-muted hover:text-founder-ink"
          >
            kisanshaktiai.in
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </footer>
      </main>
    </div>
  );
}
