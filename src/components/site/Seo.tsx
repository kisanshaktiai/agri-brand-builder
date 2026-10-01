import { Helmet } from "react-helmet-async";
import { SITE_URL, BRAND } from "@/content/site";

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
  const url = `${SITE_URL}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
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
  logo: `${SITE_URL}/brand/kisanshakti-mark.svg`,
  description: "A white-label, multi-tenant agricultural intelligence platform built in Maharashtra, India.",
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
  description: "Voice-first, offline-first farm companion in 14 languages with land mapping, Farm Today, AI chat, weather, satellite, market, community, videos, schemes, soil health, alerts and analytics.",
  publisher: { "@type": "Organization", name: BRAND, url: SITE_URL },
};
