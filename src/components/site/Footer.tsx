import React from "react";
import { Link } from "react-router-dom";
import { BRAND } from "@/content/site";
import { track } from "@/lib/analytics";
import { ButtonLink } from "./primitives";
import { Wordmark } from "./Wordmark";
import { LOCALES, useLocale } from "@/i18n";
import { LanguageSwitch } from "./LanguageSwitch";

export function Footer() {
  const { content, href } = useLocale();
  const { FOOTER, CTA, UI } = content;
  return (
    <footer className="border-t border-ks-line bg-ks-paper">
      <div className="ks-container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Wordmark height={48} />
            <p className="ks-lead mt-5 max-w-sm text-ks-ink">{FOOTER.statement}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <ButtonLink href={CTA.openApp.href} onClick={() => track("farmer_app_cta", { where: "footer" })}>
                {CTA.openApp.label}
              </ButtonLink>
              <ButtonLink to={CTA.partner.to} variant="secondary" onClick={() => track("partner_cta", { where: "footer" })}>
                {CTA.partner.label}
              </ButtonLink>
            </div>
          </div>
          {FOOTER.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="ks-label mb-4">{col.title}</p>
              <ul className="space-y-0">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={href(l.to)} className="inline-flex min-h-[44px] items-center text-sm text-ks-ink-2 transition-colors hover:text-ks-ink [@media(pointer:fine)]:min-h-[32px]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-ks-line pt-6 text-xs text-ks-ink-3 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND}. {FOOTER.legal}
          </p>
          <LanguageSwitch />
        </div>
      </div>
    </footer>
  );
}
