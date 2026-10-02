import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { DebugPanel } from "@/components/DebugPanel";
import { logger } from "@/utils/logger";
import { LocaleProvider, LOCALES, localeFromPath } from "@/i18n";
import { SiteLayout } from "@/components/site/SiteLayout";
import { lazyPage } from "@/lib/lazyPage";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const Technology = lazyPage(() => import("./pages/Technology"));
const Platform = lazyPage(() => import("./pages/Platform"));
const FarmerApp = lazyPage(() => import("./pages/FarmerApp"));
const Enterprises = lazyPage(() => import("./pages/Enterprises"));
const Security = lazyPage(() => import("./pages/Security"));
const Company = lazyPage(() => import("./pages/Company"));
const Investors = lazyPage(() => import("./pages/Investors"));
const Contact = lazyPage(() => import("./pages/Contact"));
const LeadForm = lazyPage(() => import("./pages/LeadForm"));
const Founder = lazyPage(() => import("./pages/Founder"));

/** Called by the prerender entry so every route renders synchronously. */
export const preloadPages = () => Promise.all([Technology, Platform, FarmerApp, Enterprises, Security, Company, Investors, Contact, LeadForm, Founder].map((p) => p.preload()));

/**
 * Loads the page module for a path before hydration, so prerendered HTML is
 * hydrated in place instead of being swapped for a Suspense fallback while
 * the route's chunk downloads.
 */
export const preloadRoute = (pathname: string) => {
  const map: Record<string, { preload: () => Promise<void> }> = {
    "/technology": Technology, "/platform": Platform, "/farmer-app": FarmerApp, "/enterprises": Enterprises, "/security": Security,
    "/company": Company, "/company/investors": Investors, "/contact": Contact, "/lead-form": LeadForm, "/founder": Founder,
  };
  const page = map[pathname.replace(/^\/(mr|hi)(?=\/|$)/, "").replace(/\/+$/, "") || "/"];
  return page ? page.preload() : Promise.resolve();
};

const RouteTracker = () => {
  const location = useLocation();
  useEffect(() => {
    logger.info(`Route changed: ${location.pathname}${location.search}`);
  }, [location]);
  return null;
};

/**
 * Routes are declared once and rendered inside BrowserRouter (client) or
 * StaticRouter (prerender). Lazy pages are preloaded by the prerender step
 * so the static HTML is complete.
 */
export function AppRoutes() {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  return (
    <LocaleProvider locale={locale}>
      <Suspense fallback={<div className="ks-container ks-section" aria-busy="true" />}>
        <Routes>
          {LOCALES.map((l) => (
            <Route key={l.code} path={l.prefix || "/"} element={<SiteLayout />}>
              <Route index element={<Home />} />
              <Route path="technology" element={<Technology />} />
              <Route path="platform" element={<Platform />} />
              <Route path="farmer-app" element={<FarmerApp />} />
              <Route path="enterprises" element={<Enterprises />} />
              <Route path="security" element={<Security />} />
              <Route path="company" element={<Company />} />
              <Route path="company/investors" element={<Investors />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          ))}
          {/* Existing routes kept exactly as they were. */}
          <Route path="/lead-form" element={<LeadForm />} />
          <Route path="/founder" element={<Founder />} />
          {/* Legacy personal-name URL kept alive for cards already shared */}
          <Route path="/amarsinh" element={<Navigate to="/founder" replace />} />
        </Routes>
      </Suspense>
    </LocaleProvider>
  );
}

export function AppProviders({ children, helmetContext }: { children: React.ReactNode; helmetContext?: Record<string, unknown> }) {
  return (
    <ErrorBoundary>
      <HelmetProvider context={helmetContext}>{children}</HelmetProvider>
    </ErrorBoundary>
  );
}

const App = () => {
  useEffect(() => {
    logger.info('App component mounted');
    return () => {
      logger.info('App component unmounting');
    };
  }, []);

  return (
    <>
      <RouteTracker />
      <DebugPanel />
      <AppRoutes />
    </>
  );
};

export default App;
