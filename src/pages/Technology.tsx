import React from "react";
import { Seo } from "@/components/site/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Container, Section, Eyebrow, Heading, Body, TechMark, TechIcon, MaturityBadge, HairlineList, ButtonLink } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { Phone, ScreenImage } from "@/components/site/Device";
import { FamilyEmerge } from "@/components/moments/FamilyEmerge";
import { WhyTrust } from "@/components/moments/WhyTrust";
import { TechScene } from "@/components/scenes/TechScene";
import { FAMILY_ORDER } from "@/content/technologies";
import { useContent } from "@/i18n";
import { track } from "@/lib/analytics";

export default function Technology() {
  const { TECHNOLOGY_PAGE, HOME, TECHNOLOGIES, HIERARCHY, CTA, UI } = useContent();
  const techByKey = (k: (typeof FAMILY_ORDER)[number]) => TECHNOLOGIES.find((t) => t.key === k)!;
  return (
    <>
      <Seo title={TECHNOLOGY_PAGE.seo.title} description={TECHNOLOGY_PAGE.seo.description} path="/technology" />
      <PageHero eyebrow={TECHNOLOGY_PAGE.hero.eyebrow} title={TECHNOLOGY_PAGE.hero.title} lead={TECHNOLOGY_PAGE.hero.lead} size="display-1" />

      <Section band className="!pt-[calc(var(--ks-section)*0.6)]">
        <FamilyEmerge eyebrow={UI.theFamily} title={UI.fiveTechOneCompanion} linkTo={null} />
      </Section>

      <Section>
        <Container>
          <Reveal>
            <Eyebrow>{TECHNOLOGY_PAGE.hierarchy.eyebrow}</Eyebrow>
            <Heading>{TECHNOLOGY_PAGE.hierarchy.title}</Heading>
          </Reveal>
          <ol className="mt-10 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {HIERARCHY.map((h, i) => (
              <Reveal key={h} as="li" delay={i * 0.06} className="rounded-ks-md border border-ks-line bg-ks-white p-4">
                <p className="ks-mono text-xs text-ks-ink-4">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-sm font-medium text-ks-ink">{h}</p>
              </Reveal>
            ))}
          </ol>
          <p className="ks-small mt-4">{UI.hierarchyNote}</p>
        </Container>
      </Section>

      {FAMILY_ORDER.map((key, idx) => {
        const t = techByKey(key);
        const band = idx % 2 === 0;
        return (
          <Section key={key} id={key} band={band} labelledBy={`${key}-h`} className="scroll-mt-16">
            <Container>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <Reveal>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <TechIcon src={t.icon} name={t.name} size="lg" />
                        <div>
                          <TechMark tech={key} name={t.name} size="lg" />
                          <p className="ks-label mt-1 normal-case tracking-normal text-xs text-ks-ink-3">{t.positioning}</p>
                        </div>
                      </div>
                      <MaturityBadge maturity={t.maturity} />
                    </div>
                    <p className="ks-label mt-4 normal-case tracking-normal text-sm text-ks-ink-2">{t.fullForm}</p>
                    <Heading id={`${key}-h`} className="mt-6">
                      {t.tagline}
                    </Heading>
                    <Body className="mt-6">{t.summary}</Body>
                  </Reveal>
                  <Reveal delay={0.1} className="mt-10">
                    <p className="ks-label mb-3">{UI.whatItDoes}</p>
                    <HairlineList items={t.capabilities.map((c) => ({ body: c.text }))} />
                  </Reveal>
                  <Reveal delay={0.15} className="mt-8">
                    <p className="ks-label mb-3">{t.maturity === "beta" ? UI.earlyAccess : UI.statedLimits}</p>
                    <ul className="ks-body list-disc space-y-1 pl-5 text-sm">
                      {t.limits.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                    <p className="ks-small mt-6">{UI.answers}: “{t.question}”</p>
                  </Reveal>
                </div>
                <div className="lg:col-span-5">
                  <Reveal delay={0.1} className="lg:sticky lg:top-28">
                    <div onMouseEnter={() => track("technology_engaged", { tech: key, where: "technology-page" }, true)}>
                      <TechScene tech={key} />
                    </div>
                    <div className="mt-6 flex justify-center gap-4">
                      {t.screens.filter((s) => s !== "evidence").slice(0, 2).map((s, i) => (
                        <div key={s} className={i === 1 ? "hidden w-[40%] max-w-[180px] sm:block" : "w-[44%] max-w-[200px]"}>
                          <Phone label={`In the Farmer App: ${t.name}`}>
                            <ScreenImage screen={s} />
                          </Phone>
                        </div>
                      ))}
                    </div>
                    <p className="ks-small mt-3 text-center text-[0.75rem]">{UI.inTheApp}</p>
                  </Reveal>
                </div>
              </div>
            </Container>
            {key === "tarka" && (
              <div className="mt-[calc(var(--ks-section)*0.8)]">
                <WhyTrust eyebrow={HOME.evidence.eyebrow} title={HOME.evidence.title} body={HOME.evidence.body} />
              </div>
            )}
          </Section>
        );
      })}

      <Section>
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>{UI.next}</Eyebrow>
            <Heading>{UI.seeFamilyUnderBrand}</Heading>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/platform" size="lg">
              {UI.thePlatform}
            </ButtonLink>
            <ButtonLink to={CTA.partner.to} variant="secondary" size="lg" onClick={() => track("partner_cta", { where: "technology" })}>
              {CTA.partner.label}
            </ButtonLink>
          </div>
        </Container>
      </Section>
      <p className="sr-only">{TECHNOLOGIES.map((t) => `KisanShakti ${t.name} — ${t.fullForm} — ${t.positioning}`).join(". ")}</p>
    </>
  );
}
