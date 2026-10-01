import React from "react";
import { Seo, ORGANIZATION_LD, WEBSITE_LD, SOFTWARE_LD } from "@/components/site/Seo";
import { Container, Section, Eyebrow, Heading, Lead, Body, ButtonLink, TechMark, MaturityBadge } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { Phone, ScreenImage } from "@/components/site/Device";
import { LivingPhone, type LivingStep } from "@/components/moments/LivingPhone";
import { FamilyEmerge } from "@/components/moments/FamilyEmerge";
import { EvidenceChain } from "@/components/moments/EvidenceChain";
import { PlatformZoom } from "@/components/moments/PlatformZoom";
import { FinalStatement } from "@/components/moments/FinalStatement";
import { HOME } from "@/content/pages";
import { CTA } from "@/content/site";
import { SURFACES } from "@/content/platform";
import { track } from "@/lib/analytics";

export default function Home() {
  return (
    <>
      <Seo title={HOME.seo.title} description={HOME.seo.description} path="/" jsonLd={[ORGANIZATION_LD, WEBSITE_LD, SOFTWARE_LD]} />

      {/* Hero */}
      <Container className="pt-[calc(var(--ks-section)*0.55)] pb-[calc(var(--ks-section)*0.5)]">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <Reveal>
            <Eyebrow>{HOME.hero.eyebrow}</Eyebrow>
            <Heading as="h1" size="display-1">
              {HOME.hero.title}
            </Heading>
            <Lead>{HOME.hero.lead}</Lead>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={CTA.openApp.href} size="lg" onClick={() => track("farmer_app_cta", { where: "hero" })}>
                {CTA.openApp.label}
              </ButtonLink>
              <ButtonLink to={CTA.partner.to} variant="secondary" size="lg" onClick={() => track("partner_cta", { where: "hero" })}>
                {CTA.partner.label}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="hidden lg:block">
            <div className="mx-auto w-[300px]">
              <Phone label="Farmer App, Farm Today">
                <ScreenImage screen="farm-today" priority />
              </Phone>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Thesis */}
      <Section band labelledBy="thesis-h">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Eyebrow>{HOME.thesis.eyebrow}</Eyebrow>
              <Heading id="thesis-h">{HOME.thesis.title}</Heading>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <Lead className="mt-0">{HOME.thesis.body}</Lead>
              <ul className="mt-10 divide-y divide-ks-line border-y border-ks-line">
                {SURFACES.map((s) => (
                  <li key={s.key} className="flex items-start justify-between gap-6 py-4">
                    <div>
                      <p className="font-medium text-ks-ink">{s.name}</p>
                      <p className="ks-small">{s.role}</p>
                    </div>
                    <MaturityBadge maturity={s.maturity} />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 1. Living Farmer App */}
      <Section labelledBy="living-h">
        <LivingPhone eyebrow={HOME.living.eyebrow} title={HOME.living.title} steps={HOME.living.steps as LivingStep[]} />
      </Section>

      {/* 2. Family */}
      <Section band>
        <FamilyEmerge eyebrow={HOME.family.eyebrow} title={HOME.family.title} body={HOME.family.body} />
      </Section>

      {/* Separation */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Eyebrow>{HOME.separation.eyebrow}</Eyebrow>
              <Heading>{HOME.separation.title}</Heading>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <Body>{HOME.separation.body}</Body>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-ks-md border border-ks-line bg-ks-white p-5">
                  <p className="ks-label mb-2">Language intelligence</p>
                  <ul className="ks-body space-y-1 text-sm">
                    <li>Understands 14 languages</li>
                    <li>Turns questions into canonical intent</li>
                    <li>Explains governed results</li>
                  </ul>
                  <p className="mt-4 text-xs text-ks-ink-3">Never decides doses, quantities or timing.</p>
                </div>
                <div className="rounded-ks-md border border-ks-field/30 bg-ks-field-soft p-5">
                  <p className="ks-label mb-2 text-ks-field-deep">Decision intelligence</p>
                  <ul className="ks-body space-y-1 text-sm text-ks-field-deep">
                    <li>Evaluates observations and hypotheses</li>
                    <li>Checks crop stage and land state</li>
                    <li>Applies governed rules with evidence</li>
                    <li>Enforces safety and servability gates</li>
                  </ul>
                  <p className="mt-4">
                    <TechMark tech="tarka" name="TARKA" size="sm" />
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 3. Evidence chain */}
      <Section band>
        <EvidenceChain eyebrow={HOME.evidence.eyebrow} title={HOME.evidence.title} body={HOME.evidence.body} />
      </Section>

      {/* 5. Platform zoom-out */}
      <Section className="!py-0 lg:!py-0">
        <div className="py-[var(--ks-section)] lg:py-0">
          <PlatformZoom eyebrow={HOME.zoom.eyebrow} title={HOME.zoom.title} steps={HOME.zoom.steps} />
        </div>
      </Section>

      {/* Enterprise */}
      <Section band>
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <Eyebrow>{HOME.enterprise.eyebrow}</Eyebrow>
              <Heading>{HOME.enterprise.title}</Heading>
              <Lead>{HOME.enterprise.body}</Lead>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-wrap gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
              <ButtonLink to={CTA.tenant.to} size="lg" onClick={() => track("tenant_cta", { where: "home" })}>
                {CTA.tenant.label}
              </ButtonLink>
              <ButtonLink to={CTA.partner.to} variant="secondary" size="lg" onClick={() => track("partner_cta", { where: "home-enterprise" })}>
                {CTA.partner.label}
              </ButtonLink>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 6. Final statement */}
      <FinalStatement lines={[HOME.final.line1, HOME.final.line2, HOME.final.line3, HOME.final.line4]} />
    </>
  );
}
