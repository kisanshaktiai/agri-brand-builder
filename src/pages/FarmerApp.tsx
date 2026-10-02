import React from "react";
import { Seo, SOFTWARE_LD } from "@/components/site/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Container, Section, Eyebrow, Heading, Body, ButtonLink, MaturityBadge } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { Phone, ScreenImage } from "@/components/site/Device";
import { type Maturity } from "@/content/site";
import { useContent } from "@/i18n";
import { track } from "@/lib/analytics";

export default function FarmerApp() {
  const { FARMER_APP_PAGE, CTA, UI } = useContent();
  return (
    <>
      <Seo title={FARMER_APP_PAGE.seo.title} description={FARMER_APP_PAGE.seo.description} path="/farmer-app" jsonLd={SOFTWARE_LD} />
      <PageHero eyebrow={FARMER_APP_PAGE.hero.eyebrow} title={FARMER_APP_PAGE.hero.title} lead={FARMER_APP_PAGE.hero.lead} size="display-1">
        <div className="mt-8">
          <ButtonLink href={CTA.openApp.href} size="lg" onClick={() => track("farmer_app_cta", { where: "farmer-app-hero" })}>
            {CTA.openApp.label}
          </ButtonLink>
        </div>
      </PageHero>
      {FARMER_APP_PAGE.sections.map((s, i) => (
        <Section key={s.id} id={s.id} band={i % 2 === 0} className="!py-[calc(var(--ks-section)*0.6)]">
          <Container>
            <div className={"grid items-center gap-10 lg:grid-cols-12 " + (i % 2 ? "lg:[&>*:first-child]:order-2" : "")}>
              <Reveal className="lg:col-span-4">
                <div className="mx-auto w-[60%] max-w-[260px]">
                  <Phone label={s.title}>
                    <ScreenImage screen={s.screen} />
                  </Phone>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-6">
                <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
                <Heading>{s.title}</Heading>
                {"maturity" in s && s.maturity && <div className="mt-4"><MaturityBadge maturity={s.maturity as Maturity} /></div>}
                <Body className="mt-5">{s.body}</Body>
              </Reveal>
            </div>
          </Container>
        </Section>
      ))}
      <Section>
        <Container>
          <Eyebrow>{UI.alsoInCompanion}</Eyebrow>
          <ul className="grid gap-4 md:grid-cols-2">
            {FARMER_APP_PAGE.more.map((m) => (
              <Reveal key={m.title} as="li" className="rounded-ks-md border border-ks-line bg-ks-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="ks-h3 text-[1.0625rem]">{m.title}</h3>
                  <MaturityBadge maturity={m.maturity as Maturity} />
                </div>
                <p className="ks-body mt-2 text-sm">{m.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
