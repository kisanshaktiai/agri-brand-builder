import React from "react";
import { Seo } from "@/components/site/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Container, Section, Eyebrow, Body } from "@/components/site/primitives";
import { PartnerForm } from "@/components/site/PartnerForm";
import { CONTACT_PAGE } from "@/content/pages";
import { Link } from "react-router-dom";

export default function Contact() {
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
              <Eyebrow>Before you write</Eyebrow>
              <Body>KisanShakti AI is sold to organisations, not directly to farmers. Farmers can open the app directly.</Body>
              <Body className="mt-4">Prefer to talk to a person? The founder's contact card is at{" "}
                <Link to="/founder" className="underline underline-offset-4">/founder</Link>.
              </Body>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
