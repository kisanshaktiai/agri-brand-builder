import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV, CTA, BRAND } from "@/content/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./primitives";
import { Wordmark } from "./Wordmark";

/**
 * Site navigation. Minimal: wordmark, six links, two CTAs. The phone menu is
 * a native <dialog> (modal focus trap, Escape to close, no extra JavaScript).
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const location = useLocation();

  const close = () => dialogRef.current?.open && dialogRef.current.close();
  const open = () => {
    const d = dialogRef.current;
    if (!d) return;
    if (typeof d.showModal === "function") d.showModal();
    else d.setAttribute("open", "");
  };

  useEffect(() => {
    close();
  }, [location.pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    cn("whitespace-nowrap text-sm transition-colors duration-200 hover:text-ks-ink", isActive ? "text-ks-ink" : "text-ks-ink-2");

  return (
    <header className={cn("sticky top-0 z-40 border-b transition-colors duration-300", scrolled ? "border-ks-line bg-ks-paper/85 backdrop-blur-md" : "border-transparent bg-transparent")}>
      <a href="#main" className="ks-skip">
        Skip to content
      </a>
      <div className="ks-container flex h-[68px] items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5 text-ks-ink" aria-label={`${BRAND} home`}>
          <Wordmark height={40} />
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-5 xl:gap-7">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={linkCls}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <ButtonLink to={CTA.partner.to} variant="secondary" className="hidden xl:inline-flex" onClick={() => track("partner_cta", { where: "nav" })}>
            {CTA.partner.label}
          </ButtonLink>
          <ButtonLink href={CTA.openApp.href} variant="primary" onClick={() => track("farmer_app_cta", { where: "nav" })}>
            {CTA.openApp.label}
          </ButtonLink>
        </div>

        <button type="button" onClick={open} className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-ks-ink" aria-label="Open menu" aria-haspopup="dialog">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <dialog
          ref={dialogRef}
          aria-label="Menu"
          className="ks-menu m-0 h-dvh max-h-none w-full max-w-none bg-ks-paper p-0 text-ks-ink backdrop:bg-ks-ink/30 backdrop:backdrop-blur-sm lg:hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="flex h-full flex-col px-[var(--ks-gutter)] pb-8 pt-3">
            <div className="flex h-12 items-center justify-between">
              <Wordmark />
              <button type="button" onClick={close} className="inline-flex h-10 w-10 items-center justify-center rounded-full" aria-label="Close menu" autoFocus>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <nav aria-label="Primary mobile" className="mt-4 flex flex-col">
              {NAV.map((n) => (
                <NavLink key={n.to} to={n.to} onClick={close} className={({ isActive }) => cn("ks-h3 border-b border-ks-line py-4", isActive ? "text-ks-ink" : "text-ks-ink-2")}>
                  {n.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink href={CTA.openApp.href} size="lg" onClick={() => track("farmer_app_cta", { where: "menu" })}>
                {CTA.openApp.label}
              </ButtonLink>
              <ButtonLink to={CTA.partner.to} variant="secondary" size="lg" onClick={() => { close(); track("partner_cta", { where: "menu" }); }}>
                {CTA.partner.label}
              </ButtonLink>
            </div>
          </div>
        </dialog>
      </div>
    </header>
  );
}
