import React from "react";
import { Seo } from "@/components/site/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Container, Section, Eyebrow, Body } from "@/components/site/primitives";
import { PartnerForm } from "@/components/site/PartnerForm";
import { Link } from "react-router-dom";
import { useContent } from "@/i18n";

export default function Contact() {
  const { CONTACT_PAGE, UI } = useContent();
  return (
    <>
      <Seo title={CONTACT_PAGE.seo.title} description={CONTACT_PAGE.seo.description} path="/contact" />
      <PageHero eyebrow={CONTACT_PAGE.hero.eyebrow} title={CONTACT_PAGE.hero.title} lead={CONTACT_PAGE.hero.lead} />
      <Section className="!pt-[calc(var(--ks-section)*0.6)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <PartnerForm />
            </div>
            <aside className="lg:col-span-4 lg:col-start-9">
              <Eyebrow>{UI.beforeYouWrite}</Eyebrow>
              <Body>{UI.soldToOrgs}</Body>
              <Body className="mt-4">{UI.preferPerson}{" "}
                <Link to="/founder" className="underline underline-offset-4">/founder</Link>.
              </Body>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
