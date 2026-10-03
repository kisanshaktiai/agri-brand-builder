import React from "react";
import { Seo } from "@/components/site/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Container, Section, Eyebrow, Heading, Body, ButtonLink } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { PartnerPortalSimulation } from "@/components/site/PartnerPortalSimulation";
import { useContent } from "@/i18n";
import { track } from "@/lib/analytics";

export default function Enterprises() {
  const { ENTERPRISES_PAGE, CTA } = useContent();
  const p = ENTERPRISES_PAGE;
  return (
    <>
      <Seo title={p.seo.title} description={p.seo.description} path="/enterprises" />
      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} lead={p.hero.lead} size="display-1">
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to={CTA.partner.to} size="lg" onClick={() => track("partner_cta", { where: "enterprises-hero" })}>
            {CTA.partner.label}
          </ButtonLink>
        </div>
      </PageHero>
      <Container className="pb-[var(--ks-section)] pt-[calc(var(--ks-section)*0.6)]">
        <Reveal>
          <PartnerPortalSimulation tenantIndex={0} />
          <p className="ks-small mt-3 text-center">Illustrative Partner Portal simulation — concept only, not a live product screenshot.</p>
        </Reveal>
      </Container>
      <Section band>
        <Container>
          <Eyebrow>{p.journey.eyebrow}</Eyebrow>
          <Heading>{p.journey.title}</Heading>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {p.journey.steps.map((s, i) => (
              <Reveal key={s.title} as="li" delay={i * 0.06} className="rounded-ks-md border border-ks-line bg-ks-white p-5">
                <p className="ks-mono text-xs text-ks-ink-4">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-medium text-ks-ink">{s.title}</h3>
                <p className="ks-body mt-2 text-sm">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>
      <Section band>
        <Container>
          <Eyebrow>{p.capabilities.eyebrow}</Eyebrow>
          <Heading>{p.capabilities.title}</Heading>
          <Body className="mt-5 max-w-3xl">{p.capabilities.body}</Body>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {p.capabilities.groups.map((group) => (
              <Reveal key={group.title} className="rounded-ks-md border border-ks-line bg-ks-white p-6">
                <h3 className="ks-h3 text-[1.0625rem]">{group.title}</h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-ks-ink-2">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ks-ink-3" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <Eyebrow>{p.fit.eyebrow}</Eyebrow>
          <Heading>{p.fit.title}</Heading>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {p.fit.types.map((t) => (
              <Reveal key={t.title} as="li" className="border-t border-ks-line pt-5">
                <h3 className="ks-h3 text-[1.0625rem]">{t.title}</h3>
                <p className="ks-body mt-2">{t.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
      <Section band>
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow>{p.honest.eyebrow}</Eyebrow>
            <Heading>{p.honest.title}</Heading>
            <Body className="mt-6">{p.honest.body}</Body>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <ButtonLink to={CTA.partner.to} size="lg" onClick={() => track("partner_cta", { where: "enterprises" })}>
              {CTA.partner.label}
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
