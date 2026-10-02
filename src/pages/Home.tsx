import React, { useEffect, useState } from "react";
import { Seo, ORGANIZATION_LD, WEBSITE_LD, SOFTWARE_LD } from "@/components/site/Seo";
import { Container, Section, Eyebrow, Heading, Lead, Body, ButtonLink, TechMark, MaturityBadge } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { Phone, ScreenImage } from "@/components/site/Device";
import { LivingPhone, type LivingStep } from "@/components/moments/LivingPhone";
import { FamilyEmerge } from "@/components/moments/FamilyEmerge";
import { WhyTrust } from "@/components/moments/WhyTrust";
import { PlatformZoom } from "@/components/moments/PlatformZoom";
import { FinalStatement } from "@/components/moments/FinalStatement";
import { HOME } from "@/content/pages";
import { CTA } from "@/content/site";
import { SURFACES } from "@/content/platform";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUpRight, Orbit } from "lucide-react";

function HeroProductStack() {
  const [screen, setScreen] = useState(0);
  const screens = [
    { id: "farm-today", label: "RIITU · Farm Today" },
    { id: "weather", label: "TATVA · Land conditions" },
    { id: "chat-marathi", label: "TARKA · Talk to your land" },
    { id: "alerts", label: "PAHRA · Early access" },
  ];
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setScreen((v) => (v + 1) % screens.length), 4200);
    return () => window.clearInterval(timer);
  }, [screens.length]);
  const active = screens[screen];
  return (
    <Reveal delay={0.12} className="relative mx-auto w-full max-w-[430px]">
      <div className="relative rounded-[28px] border border-ks-line bg-ks-paper-2 p-4 shadow-ks-2 md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="ks-label">KISANSHAKTI AI</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-ks-line bg-ks-white px-2.5 py-1 text-[0.65rem] text-ks-ink-3"><Orbit size={12} /> Living view</span>
        </div>
        <div className="relative mx-auto w-[67%] md:w-[61%]">
          <Phone label={active.label}>
            {screens.map((s, i) => (
              <div key={s.id} className={cn("absolute inset-0 transition-[opacity,transform] duration-700 ease-ks-out", i === screen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2")} aria-hidden={i !== screen}>
                <ScreenImage screen={s.id} priority={i === 0} />
              </div>
            ))}
          </Phone>
        </div>
        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="ks-label mb-1">{String(screen + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}</p>
            <p className="ks-h3 text-base">{active.label}</p>
          </div>
          <div className="flex gap-1.5" aria-hidden>
            {screens.map((_, i) => <span key={i} className={cn("h-1.5 rounded-full transition-all duration-500", i === screen ? "w-8 bg-ks-field" : "w-1.5 bg-ks-line-strong")} />)}
          </div>
        </div>
      </div>
      <div className="absolute -left-3 top-24 hidden rounded-2xl border border-ks-line bg-ks-white/95 p-3 shadow-ks-2 backdrop-blur md:block lg:-left-7">
        <p className="ks-label mb-1">TODAY</p>
        <p className="text-sm font-medium text-ks-ink">One land · one context</p>
      </div>
      <div className="absolute -right-3 bottom-20 hidden rounded-2xl border border-ks-line bg-ks-white/95 p-3 shadow-ks-2 backdrop-blur md:block lg:-right-7">
        <p className="ks-label mb-1 text-ks-field-deep">GOVERNED</p>
        <p className="text-sm font-medium text-ks-ink">AI explains · guidance decides</p>
      </div>
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <Seo title={HOME.seo.title} description={HOME.seo.description} path="/" jsonLd={[ORGANIZATION_LD, WEBSITE_LD, SOFTWARE_LD]} />

      {/* Hero — premium first impression: editorial typography + living product stack */}
      <section className="relative overflow-hidden border-b border-ks-line bg-ks-paper">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_78%_22%,hsl(var(--ks-field-soft))_0,transparent_32%),linear-gradient(to_right,transparent_49.95%,hsl(var(--ks-line)/0.45)_50%,transparent_50.05%)]" />
        <Container className="relative pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)] lg:gap-16">
            <Reveal>
              <Eyebrow className="mb-5">{HOME.hero.eyebrow}</Eyebrow>
              <Heading as="h1" size="display-1" className="max-w-[8ch] text-[clamp(3.2rem,7vw,7.2rem)] leading-[0.92]">
                A companion that
                <span className="block text-ks-field">knows the land.</span>
              </Heading>
              <Lead className="mt-7 max-w-[42rem] text-[1.15rem] md:text-[1.3rem]">{HOME.hero.lead}</Lead>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={CTA.openApp.href} size="lg" onClick={() => track("farmer_app_cta", { where: "hero" })}>
                  {CTA.openApp.label}<ArrowUpRight size={17} strokeWidth={1.8} />
                </ButtonLink>
                <ButtonLink to={CTA.partner.to} variant="secondary" size="lg" onClick={() => track("partner_cta", { where: "hero" })}>
                  {CTA.partner.label}
                </ButtonLink>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ks-ink-3">
                <span className="ks-mono">14 Indian languages</span><span aria-hidden>·</span><span className="ks-mono">Voice-first</span><span aria-hidden>·</span><span className="ks-mono">Offline-first</span>
              </div>
            </Reveal>
            <HeroProductStack />
          </div>
          <div className="mt-12 flex items-center justify-center gap-2 text-xs text-ks-ink-3 md:mt-16">
            <ArrowDown size={15} aria-hidden /> Scroll to follow one land through a season
          </div>
        </Container>
      </section>

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
                  
                  <p className="ks-label mb-2">AI</p>
                  <ul className="ks-body space-y-1 text-sm">
                    <li>Understands your question, in 14 languages</li>
                    <li>Reads your photo</li>
                    <li>Explains the answer and the reason</li>
                  </ul>
                  <p className="mt-4 text-xs text-ks-ink-3">Never decides doses, quantities or timing.</p>
                </div>
                <div className="rounded-ks-md border border-ks-field/30 bg-ks-field-soft p-5">
                  <p className="ks-label mb-2 text-ks-field-deep">Expert-approved guidance</p>
                  <ul className="ks-body space-y-1 text-sm text-ks-field-deep">
                    <li>Checks your field's state</li>
                    <li>Checks your crop's stage</li>
                    <li>Carries its dose, waiting period and approval</li>
                    <li>Safety checks always win</li>
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
        <WhyTrust eyebrow={HOME.evidence.eyebrow} title={HOME.evidence.title} body={HOME.evidence.body} />
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
              <ButtonLink to={CTA.becomePartner.to} size="lg" onClick={() => track("partner_cta", { where: "home" })}>
                {CTA.becomePartner.label}
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
