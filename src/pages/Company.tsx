import React from "react";
import { Seo, ORGANIZATION_LD } from "@/components/site/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Container, Section, Eyebrow, Heading, Body, ButtonLink } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { useContent } from "@/i18n";

export default function Company() {
  const { COMPANY_PAGE, UI } = useContent();
  const p = COMPANY_PAGE;
  return (
    <>
      <Seo title={p.seo.title} description={p.seo.description} path="/company" jsonLd={ORGANIZATION_LD} />
      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} lead={p.hero.lead} size="display-1" />
      <Section band>
        <Container>
          <Eyebrow>{p.principles.eyebrow}</Eyebrow>
          <Heading>{p.principles.title}</Heading>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.principles.items.map((it, i) => (
              <Reveal key={it.title} as="li" delay={i * 0.06} className="rounded-ks-md border border-ks-line bg-ks-white p-5">
                <h3 className="font-medium text-ks-ink">{it.title}</h3>
                <p className="ks-body mt-3">{it.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
      <Section>
        <Container className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Eyebrow>{p.vision.eyebrow}</Eyebrow>
            <Heading>{p.vision.title}</Heading>
            <Body className="mt-6">{p.vision.body}</Body>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <Eyebrow>{p.founder.eyebrow}</Eyebrow>
            <Heading size="h3" as="h2">{p.founder.title}</Heading>
            <Body className="mt-4">{p.founder.body}</Body>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to="/founder">{p.founder.cta}</ButtonLink>
              <ButtonLink to="/company/investors" variant="secondary">{UI.investorsPress}</ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
