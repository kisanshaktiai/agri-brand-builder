import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { startSmoothScroll, scrollToTop } from "@/lib/scroll";
import { useLocale } from "@/i18n";

export function SiteLayout() {
  const { pathname, hash } = useLocation();
  const { locale } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  useEffect(() => {
    startSmoothScroll();
  }, []);
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }
    }
    scrollToTop();
  }, [pathname, hash]);
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main id="main" key={locale} className="ks-locale-in flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
