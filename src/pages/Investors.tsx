import React from "react";
import { Seo } from "@/components/site/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Container, Section, ButtonLink } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { useContent } from "@/i18n";

export default function Investors() {
  const { INVESTORS_PAGE, CTA, UI } = useContent();
  const p = INVESTORS_PAGE;
  return (
    <>
      <Seo title={p.seo.title} description={p.seo.description} path="/company/investors" />
      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} lead={p.hero.lead} />
      <Section className="!pt-[calc(var(--ks-section)*0.6)]">
        <Container>
          <ol className="divide-y divide-ks-line border-y border-ks-line">
            {p.thesis.map((t) => (
              <Reveal key={t.title} as="li" className="grid gap-3 py-8 md:grid-cols-12">
                <h2 className="ks-h3 md:col-span-4">{t.title}</h2>
                <p className="ks-body md:col-span-8">{t.body}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink to={CTA.partner.to}>{UI.contact}</ButtonLink>
            <ButtonLink to="/founder" variant="secondary">{UI.founder}</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
