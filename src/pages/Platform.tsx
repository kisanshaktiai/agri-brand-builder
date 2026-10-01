import React from "react";
import { Seo } from "@/components/site/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Container, Section, Eyebrow, Heading, Body, MaturityBadge, ButtonLink } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { Phone, Browser, ScreenImage } from "@/components/site/Device";
import { TenantTransform } from "@/components/moments/TenantTransform";
import { PlatformZoom } from "@/components/moments/PlatformZoom";
import { ArchitectureDiagram } from "@/components/site/ArchitectureDiagram";
import { TwoDays } from "@/components/site/TwoDays";
import { PLATFORM_PAGE, HOME } from "@/content/pages";
import { SURFACES } from "@/content/platform";
import { CTA } from "@/content/site";
import { track } from "@/lib/analytics";

export default function Platform() {
  return (
    <>
      <Seo title={PLATFORM_PAGE.seo.title} description={PLATFORM_PAGE.seo.description} path="/platform" />
      <PageHero eyebrow={PLATFORM_PAGE.hero.eyebrow} title={PLATFORM_PAGE.hero.title} lead={PLATFORM_PAGE.hero.lead} size="display-1" />

      {/* Three surfaces */}
      <Container className="pb-[var(--ks-section)]">
        <ol className="grid gap-5 lg:grid-cols-3">
          {SURFACES.map((s, i) => (
            <Reveal key={s.key} as="li" delay={i * 0.08} className="flex flex-col rounded-ks-lg border border-ks-line bg-ks-white p-6 shadow-ks-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="ks-h3">{s.name}</h2>
                  <p className="ks-small mt-1">{s.role}</p>
                </div>
                <MaturityBadge maturity={s.maturity} />
              </div>
              <div className="my-6">
                {s.key === "farmer-app" ? (
                  <div className="mx-auto w-[50%] max-w-[200px]">
                    <Phone label={s.name}>
                      <ScreenImage screen={s.screen} />
                    </Phone>
                  </div>
                ) : (
                  <Browser url={s.key === "tenant-portal" ? "partner.kisanshaktiai.in" : "admin · control plane"}>
                    <ScreenImage screen={s.screen} />
                  </Browser>
                )}
              </div>
              <p className="ks-label mb-2">Answers</p>
              <p className="font-medium text-ks-ink">“{s.question}”</p>
              <p className="ks-body mt-3 text-sm">{s.description}</p>
              {s.limits && <p className="ks-small mt-4">{s.limits.join(" ")}</p>}
            </Reveal>
          ))}
        </ol>
      </Container>

      {/* 4. Multi-tenant transformation */}
      <Section band>
        <TenantTransform eyebrow={PLATFORM_PAGE.transform.eyebrow} title={PLATFORM_PAGE.transform.title} body={PLATFORM_PAGE.transform.body} layers={PLATFORM_PAGE.transform.layers} />
      </Section>

      {/* Architecture */}
      <Section>
        <ArchitectureDiagram eyebrow={PLATFORM_PAGE.architecture.eyebrow} title={PLATFORM_PAGE.architecture.title} hint={PLATFORM_PAGE.architecture.hint} />
      </Section>

      {/* Zoom-out */}
      <Section band className="!py-0 lg:!py-0">
        <div className="py-[var(--ks-section)] lg:py-0">
          <PlatformZoom eyebrow={HOME.zoom.eyebrow} title={HOME.zoom.title} steps={HOME.zoom.steps} />
        </div>
      </Section>

      {/* Two days */}
      <Section>
        <TwoDays eyebrow={PLATFORM_PAGE.days.eyebrow} title={PLATFORM_PAGE.days.title} farmer={PLATFORM_PAGE.days.farmer} tenant={PLATFORM_PAGE.days.tenant} />
      </Section>

      {/* Governance */}
      <Section band>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-5">
              <Eyebrow>{PLATFORM_PAGE.governance.eyebrow}</Eyebrow>
              <Heading>{PLATFORM_PAGE.governance.title}</Heading>
              <Body className="mt-6">{PLATFORM_PAGE.governance.body}</Body>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink to="/security">Security & Governance</ButtonLink>
                <ButtonLink to={CTA.partner.to} variant="secondary" onClick={() => track("partner_cta", { where: "platform" })}>
                  {CTA.partner.label}
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <Browser url="admin · control plane">
                <ScreenImage screen="admin-knowledge" />
              </Browser>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
