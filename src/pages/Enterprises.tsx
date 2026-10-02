import React from "react";
import { Seo } from "@/components/site/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Container, Section, Eyebrow, Heading, Body, ButtonLink } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { Browser, ScreenImage } from "@/components/site/Device";
import { ENTERPRISES_PAGE } from "@/content/pages";
import { CTA } from "@/content/site";
import { track } from "@/lib/analytics";

export default function Enterprises() {
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
          <Browser url="partner.kisanshaktiai.in">
            <ScreenImage screen="tenant-dashboard" priority />
          </Browser>
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
