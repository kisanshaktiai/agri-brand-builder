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
import { Button } from "@/components/ui/button";

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

/** Compact editorial heading used throughout the profile. */
function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-founder-display text-[0.72rem] font-semibold uppercase text-founder-muted">
      {children}
    </h2>
  );
}

function BrandLogo({ logo, name }: { logo?: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (!logo || failed) return null;
  return (
    <span className="founder-sheen flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-card p-2 founder-row">
      <img src={logo} alt={`${name} logo`} onError={() => setFailed(true)} className="h-full w-full object-contain" />
    </span>
  );
}

export default function Founder() {
  useFounderHead();
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState("");

  const share = async () => {
    const result = await shareProfile();
    setStatus(result === "shared" ? "Share sheet opened" : result === "copied" ? "Link copied" : "Could not share the link");
  };

  return (
    <div className="founder-page min-h-screen bg-founder-paper font-founder text-founder-ink antialiased">
      <a href="#founder-contact" className="founder-press fixed left-4 top-4 z-50 -translate-y-24 rounded-md bg-founder-ink px-5 py-3 text-sm font-medium text-founder-paper focus:translate-y-0">
        Skip to contact
      </a>

      <header className="mx-auto w-full max-w-3xl sm:px-6 sm:pt-6">
        <div className="relative min-h-[78svh] overflow-hidden bg-founder-field sm:min-h-[680px] sm:rounded-lg">
          {founderProfile.portrait ? (
            <img
              src={founderProfile.portrait}
              alt={`${founderProfile.name}, ${founderProfile.title}`}
              width={900}
              height={1125}
              className="founder-portrait-in absolute inset-0 h-full w-full object-cover object-[50%_8%]"
            />
          ) : null}
          <div className="founder-hero-shade absolute inset-0" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-7 sm:px-10 sm:pb-10">
            <div className="founder-rise founder-d1 flex items-center gap-3 text-founder-field-soft">
              <span className="h-px w-8 bg-founder-field-soft/60" aria-hidden="true" />
              <p className="text-[0.72rem] font-semibold uppercase">{founderProfile.title} · KisanShakti AI</p>
            </div>
            <h1 className="founder-rise founder-d2 mt-3 max-w-xl font-founder-display text-[2.75rem] font-semibold leading-[1.02] text-primary-foreground sm:text-6xl">
              {founderProfile.name}
            </h1>
            <p className="founder-rise founder-d3 mt-4 max-w-lg text-[0.98rem] leading-relaxed text-founder-field-soft sm:text-lg">
              {founderProfile.summary}
            </p>
            <div className="founder-rise founder-d4 mt-6 grid grid-cols-[1fr_auto] gap-3 sm:flex">
              <Button
                type="button"
                onClick={() => { downloadVCard(); setSaved(true); }}
                className="founder-press min-h-[52px] rounded-md bg-card px-6 font-semibold text-founder-ink hover:bg-card/90"
              >
                {saved ? <Check aria-hidden="true" /> : <Download aria-hidden="true" />}
                {saved ? "Contact saved" : "Save contact"}
              </Button>
              <Button type="button" onClick={share} aria-label="Share profile" variant="secondary" size="icon" className="founder-press h-[52px] w-[52px] rounded-md bg-card/15 text-primary-foreground hover:bg-card/25">
                <Share2 aria-hidden="true" />
              </Button>
            </div>
            <p aria-live="polite" className="mt-2 min-h-5 text-sm text-founder-field-soft">{saved ? "Contact card downloaded." : status}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl px-5 pb-20 sm:px-8">
        <section aria-labelledby="founder-contact" className="founder-reveal pt-14 sm:pt-20">
          <SectionHeading id="founder-contact">Contact</SectionHeading>
          <div className="mt-5 space-y-2.5">
            {founderProfile.phones.map((phone) => (
              <div key={phone.e164} className="founder-row flex items-center rounded-lg bg-card p-2.5">
                <a href={`tel:${phone.e164}`} className="founder-press flex min-h-[54px] min-w-0 flex-1 items-center gap-3 px-2">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-founder-faint text-founder-accent"><Phone className="h-[18px] w-[18px]" aria-hidden="true" /></span>
                  <span className="min-w-0"><span className="block text-[1rem] font-semibold text-founder-ink">{phone.display}</span><span className="block text-xs text-founder-muted">{phone.label}</span></span>
                </a>
                {phone.whatsapp ? <a href={whatsappUrl(phone.e164)} target="_blank" rel="noopener noreferrer" aria-label={`Message ${phone.display} on WhatsApp`} className="founder-press flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-founder-accent hover:bg-founder-faint"><MessageCircle className="h-5 w-5" aria-hidden="true" /></a> : null}
              </div>
            ))}
            {founderProfile.emails.map((email) => (
              <a key={email.address} href={`mailto:${email.address}`} className="founder-row founder-press flex min-h-[74px] items-center gap-3 rounded-lg bg-card p-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-founder-faint text-founder-accent"><Mail className="h-[18px] w-[18px]" aria-hidden="true" /></span>
                <span className="min-w-0"><span className="block break-all text-[0.92rem] font-semibold text-founder-ink sm:text-base">{email.address}</span><span className="block text-xs text-founder-muted">{email.label}</span></span>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-founder-muted" aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="founder-ventures" className="founder-reveal pt-16 sm:pt-24">
          <SectionHeading id="founder-ventures">Ventures</SectionHeading>
          <div className="mt-6 divide-y divide-founder-faint">
            {founderProfile.brands.map((brand) => (
              <a key={brand.key} href={brand.url} target="_blank" rel="noopener noreferrer" className="founder-press flex gap-4 py-6 first:pt-0">
                <BrandLogo logo={brand.logo} name={brand.name} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2"><span className="font-founder-display text-[1.12rem] font-semibold text-founder-ink">{brand.name}</span><ArrowUpRight className="h-4 w-4 shrink-0 text-founder-muted" aria-hidden="true" /></span>
                  <span className={`mt-1 block text-sm font-semibold ${brandText[brand.key]}`}>{brand.tagline}</span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-founder-muted">{brand.description}</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="founder-technology" className="founder-reveal pt-16 sm:pt-24">
          <SectionHeading id="founder-technology">{founderProfile.techFamily.heading}</SectionHeading>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-founder-muted">{founderProfile.techFamily.intro}</p>
          <div className="mt-5"><TechStrip modules={founderProfile.techFamily.modules} /></div>
        </section>

        <section aria-labelledby="founder-office" className="founder-reveal pt-16 sm:pt-24">
          <SectionHeading id="founder-office">Office</SectionHeading>
          {founderProfile.addresses.map((address) => (
            <a key={address.label} href={mapsUrl(address.mapQuery)} target="_blank" rel="noopener noreferrer" className="founder-row founder-press mt-5 flex items-start gap-3 rounded-lg bg-card p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-founder-faint text-founder-accent"><MapPin className="h-[18px] w-[18px]" aria-hidden="true" /></span>
              <span className="min-w-0 flex-1">{address.lines.map((line) => <span key={line} className="block text-sm leading-relaxed text-founder-ink">{line}</span>)}<span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-founder-accent">Open in Maps <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span></span>
            </a>
          ))}
        </section>

        {founderProfile.socials.length > 0 ? (
          <section aria-labelledby="founder-connect" className="founder-reveal pt-16 sm:pt-24">
            <SectionHeading id="founder-connect">Connect</SectionHeading>
            <div className="mt-5 flex flex-wrap gap-2.5">{founderProfile.socials.map((social) => { const Icon = socialIcons[social.key.toLowerCase()] ?? Link2; return <Button key={social.key} asChild variant="secondary" className="founder-press min-h-[48px] rounded-md bg-founder-faint text-founder-ink"><a href={social.url} target="_blank" rel="noopener noreferrer"><Icon className="text-founder-accent" aria-hidden="true" />{social.label}</a></Button>; })}</div>
          </section>
        ) : null}

        <section aria-labelledby="founder-qr" className="founder-reveal pt-16 sm:pt-24">
          <SectionHeading id="founder-qr">Scan or share this card</SectionHeading>
          <div className="founder-tilt-scene mt-5"><QrPanel /></div>
        </section>

        <footer className="flex items-center justify-between gap-4 pt-14 text-sm text-founder-muted">
          <span>Founder profile</span>
          <a href="https://www.kisanshaktiai.in" className="founder-press inline-flex items-center gap-1 font-medium">kisanshaktiai.in <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
        </footer>
      </main>
    </div>
  );
}
