import React from "react";
import { Seo } from "@/components/site/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Container, Section, Eyebrow, Heading, Body } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { useContent } from "@/i18n";

export default function Security() {
  const { SECURITY_PAGE, UI } = useContent();
  const p = SECURITY_PAGE;
  return (
    <>
      <Seo title={p.seo.title} description={p.seo.description} path="/security" />
      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} lead={p.hero.lead} size="display-1" />
      <Section className="!pt-[calc(var(--ks-section)*0.6)]">
        <Container>
          <ol className="divide-y divide-ks-line border-y border-ks-line">
            {p.principles.map((pr, i) => (
              <Reveal key={pr.title} as="li" delay={i * 0.05} className="grid gap-3 py-8 md:grid-cols-12">
                <p className="ks-mono text-xs text-ks-ink-4 md:col-span-1">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="ks-h3 md:col-span-4">{pr.title}</h2>
                <p className="ks-body md:col-span-7">{pr.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>
      <Section band>
        <Container>
          <Reveal className="max-w-3xl">
            <Eyebrow>{UI.pending}</Eyebrow>
            <Heading>{p.pending.title}</Heading>
            <Body className="mt-6">{p.pending.body}</Body>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
