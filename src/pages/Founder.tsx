import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
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
import {
  founderProfile,
  FOUNDER_URL,
  FOUNDER_OG_IMAGE,
  type BrandKey,
} from "@/data/founderProfile";
import { downloadVCard, mapsUrl, shareProfile, whatsappUrl } from "@/components/founder/actions";
import { TechStrip } from "@/components/founder/TechStrip";
import { QrPanel } from "@/components/founder/QrPanel";

const PAGE_TITLE = `${founderProfile.name} — Founder, KisanShakti AI`;
const PAGE_DESCRIPTION =
  "Founder of KisanShakti AI, AP-TECH and LearniXa. Save the contact card, call, message on WhatsApp, email or find the office.";

const brandText: Record<BrandKey, string> = {
  kisanshakti: "text-founder-leaf",
  aptech: "text-founder-aptech",
  learnixa: "text-founder-learnixa",
};

const socialIcons: Record<string, typeof Linkedin> = {
  linkedin: Linkedin,
  x: Twitter,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
};

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
    addMeta("property", "og:image", FOUNDER_OG_IMAGE);
    addMeta("property", "og:image:alt", `${founderProfile.name}, ${founderProfile.title}`);
    addMeta("name", "twitter:card", "summary_large_image");
    addMeta("name", "twitter:image", FOUNDER_OG_IMAGE);
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

/** Quiet section heading. Small and muted so the content below carries the weight. */
function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-[0.95rem] font-medium text-founder-muted">
      {children}
    </h2>
  );
}

/** Brand logo on a white tile. Renders nothing if the file is missing. */
function BrandLogo({ logo, name }: { logo?: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (!logo || failed) return null;
  return (
    <span className="founder-lift flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-2.5">
      <img
        src={logo}
        alt={`${name} logo`}
        onError={() => setFailed(true)}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

export default function Founder() {
  useFounderHead();
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState("");

  return (
    <div className="founder-page min-h-screen bg-founder-paper text-founder-ink antialiased">
      <a
        href="#founder-contact"
        className="founder-press fixed left-4 top-4 z-50 -translate-y-24 rounded-full bg-founder-ink px-5 py-3 text-sm font-medium text-founder-paper focus:translate-y-0"
      >
        Skip to contact
      </a>

      {/* ── Field block ─────────────────────────────────────────────
          Full-bleed deep green. The colour change where it ends is
          itself the signal that the page continues. */}
      <header className="founder-field relative flex min-h-[74svh] flex-col justify-end overflow-hidden px-6 pb-14 pt-20 sm:px-10 sm:pb-16">
        <div className="mx-auto w-full max-w-2xl">
          {founderProfile.portrait ? (
            <img
              src={founderProfile.portrait}
              alt={`${founderProfile.name}, ${founderProfile.title}`}
              width={900}
              height={1125}
              className="founder-rise founder-d1 mb-9 aspect-[4/5] w-36 rounded-2xl object-cover object-top ring-1 ring-white/20 sm:w-44"
            />
          ) : null}

          <p className="founder-rise founder-d1 text-[0.95rem] font-medium text-founder-field-soft">
            {founderProfile.title}
          </p>

          <h1 className="founder-rise founder-d2 mt-3 font-display text-[clamp(2.9rem,14vw,5rem)] font-semibold leading-[0.92] tracking-tight text-white">
            {founderProfile.name}
          </h1>

          <p className="founder-rise founder-d3 mt-6 max-w-md text-[1.15rem] leading-relaxed text-founder-field-soft">
            {founderProfile.summary}
          </p>

          <div className="founder-rise founder-d4 mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                downloadVCard();
                setSaved(true);
              }}
              className="founder-press inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full bg-white px-8 text-[1.02rem] font-semibold text-founder-ink"
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
              className="founder-press inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full bg-white/[0.12] px-8 text-[1.02rem] font-medium text-white"
            >
              <Share2 className="h-5 w-5" aria-hidden="true" />
              Share
            </button>
          </div>

          <p aria-live="polite" className="mt-3 min-h-[20px] text-sm text-founder-field-soft">
            {saved ? "Contact card downloaded." : status}
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl px-6 pb-24 sm:px-10">
        {/* ── Contact ───────────────────────────────────────────────
            No rules, no boxes. Spacing and type weight do the work. */}
        <section aria-labelledby="founder-contact" className="pt-16 sm:pt-20">
          <SectionHeading id="founder-contact">Contact</SectionHeading>

          <div className="mt-8 space-y-7">
            {founderProfile.phones.map((phone) => (
              <div key={phone.e164} className="flex items-center gap-4">
                <a href={`tel:${phone.e164}`} className="founder-press flex min-h-[48px] flex-1 items-center gap-4">
                  <Phone className="h-[18px] w-[18px] shrink-0 text-founder-accent" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-[1.3rem] font-medium tracking-tight text-founder-ink">
                      {phone.display}
                    </span>
                    <span className="mt-0.5 block text-[0.9rem] text-founder-muted">{phone.label}</span>
                  </span>
                </a>
                {phone.whatsapp ? (
                  <a
                    href={whatsappUrl(phone.e164)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Message ${phone.display} on WhatsApp`}
                    className="founder-press flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-founder-faint text-founder-accent"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            ))}

            {founderProfile.emails.map((email) => (
              <a
                key={email.address}
                href={`mailto:${email.address}`}
                className="founder-press flex min-h-[48px] items-center gap-4"
              >
                <Mail className="h-[18px] w-[18px] shrink-0 text-founder-accent" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block truncate text-[1.15rem] font-medium tracking-tight text-founder-ink">
                    {email.address}
                  </span>
                  <span className="mt-0.5 block text-[0.9rem] text-founder-muted">{email.label}</span>
                </span>
              </a>
            ))}

            {founderProfile.addresses.map((address) => (
              <a
                key={address.label}
                href={mapsUrl(address.mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="founder-press flex items-start gap-4 pt-1"
              >
                <MapPin className="mt-1.5 h-[18px] w-[18px] shrink-0 text-founder-accent" aria-hidden="true" />
                <span className="min-w-0">
                  {address.lines.map((line) => (
                    <span key={line} className="block text-[1.08rem] leading-snug text-founder-ink">
                      {line}
                    </span>
                  ))}
                  <span className="mt-2 inline-flex items-center gap-1 text-[0.95rem] font-medium text-founder-accent">
                    Open in Maps
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Ventures ─────────────────────────────────────────────── */}
        <section aria-labelledby="founder-ventures" className="pt-20">
          <SectionHeading id="founder-ventures">Ventures</SectionHeading>

          <div className="mt-8 space-y-10">
            {founderProfile.brands.map((brand) => (
              <a
                key={brand.key}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="founder-press flex gap-5"
              >
                <BrandLogo logo={brand.logo} name={brand.name} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[1.5rem] font-semibold tracking-tight text-founder-ink">
                    {brand.name}
                  </span>
                  <span className={`mt-1 block text-[1.02rem] font-medium ${brandText[brand.key]}`}>
                    {brand.tagline}
                  </span>
                  <span className="mt-2 block text-[1rem] leading-relaxed text-founder-muted">
                    {brand.description}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-[0.95rem] font-medium text-founder-ink">
                    {brand.urlLabel}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Technology family ────────────────────────────────────── */}
        <section aria-labelledby="founder-technology" className="pt-20">
          <SectionHeading id="founder-technology">{founderProfile.techFamily.heading}</SectionHeading>
          <div className="mt-6">
            <TechStrip modules={founderProfile.techFamily.modules} />
          </div>
        </section>

        {/* ── Connect (renders only when socials exist) ────────────── */}
        {founderProfile.socials.length > 0 ? (
          <section aria-labelledby="founder-connect" className="pt-20">
            <SectionHeading id="founder-connect">Connect</SectionHeading>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {founderProfile.socials.map((social) => {
                const Icon = socialIcons[social.key.toLowerCase()] ?? Link2;
                return (
                  <a
                    key={social.key}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="founder-press inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-founder-faint px-5 text-[0.98rem] font-medium text-founder-ink"
                  >
                    <Icon className="h-[18px] w-[18px] text-founder-accent" aria-hidden="true" />
                    {social.label}
                  </a>
                );
              })}
            </div>
          </section>
        ) : null}

        {/* ── QR ───────────────────────────────────────────────────── */}
        <section aria-labelledby="founder-qr" className="pt-20">
          <SectionHeading id="founder-qr">Scan or share this card</SectionHeading>
          <div className="mt-6">
            <QrPanel />
          </div>
        </section>

        <footer className="pt-16">
          <a
            href="https://www.kisanshaktiai.in"
            className="founder-press inline-flex items-center gap-1 text-[0.95rem] text-founder-muted"
          >
            kisanshaktiai.in
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </footer>
      </main>
    </div>
  );
}
