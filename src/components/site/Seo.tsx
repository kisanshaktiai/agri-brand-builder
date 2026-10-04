import { Helmet } from "react-helmet-async";
import { SITE_URL, BRAND } from "@/content/site";
import { LOCALES, localePath, stripLocale, useLocale } from "@/i18n";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  image?: string;
}

const DEFAULT_IMAGE = `${SITE_URL}/og/default.png`;

export function Seo({ title, description, path, type = "website", jsonLd, image = DEFAULT_IMAGE }: SeoProps) {
  const { locale } = useLocale();
  const clean = stripLocale(path);
  const url = `${SITE_URL}${localePath(clean, locale)}`;
  return (
    <Helmet prioritizeSeoTags htmlAttributes={{ lang: locale }}>
      <title>{title}</title>
      {LOCALES.map((l) => (
        <link key={l.code} rel="alternate" hrefLang={l.code} href={`${SITE_URL}${localePath(clean, l.code)}`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${clean}`} />
      <meta property="og:locale" content={locale === "en" ? "en_IN" : locale === "mr" ? "mr_IN" : "hi_IN"} />
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={BRAND} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}

/** Organization + WebSite claims the site substantiates. */
export const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo.png`,
  description: "A complete digital companion for every farmer and every land, built in Maharashtra, India, and brought to farmers by partner organisations under their own brand.",
  address: { "@type": "PostalAddress", addressRegion: "Maharashtra", addressCountry: "IN" },
  sameAs: ["https://www.youtube.com/@kisanshaktiai"],
};

export const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND,
  url: SITE_URL,
  inLanguage: "en",
};

export const SOFTWARE_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "KisanShakti AI Farmer App",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Android, iOS",
  url: "https://app.kisanshaktiai.in",
  description: "A complete digital companion for every farmer and every land, in 14 Indian languages, voice-first and offline-first: understand what nature is doing, know what is changing, talk to your land, follow a crop plan that adapts, know the market, find schemes, and connect with farmers.",
  publisher: { "@type": "Organization", name: BRAND, url: SITE_URL },
};
