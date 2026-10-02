import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes, AppProviders, preloadPages } from "./App";
import "./index.css";
import "./styles/tokens.css";
import "./styles/scenes.css";

export interface RenderResult {
  html: string;
  head: string;
}

/**
 * Prerender entry. Lazy pages are imported eagerly here so Suspense never
 * suspends during renderToString.
 */
export async function preload() {
  await preloadPages();
}

export function render(url: string): RenderResult {
  const helmetContext: Record<string, any> = {};
  const html = renderToString(
    <AppProviders helmetContext={helmetContext}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>,
  );
  const h = helmetContext.helmet;
  const head = h ? [h.title.toString(), h.meta.toString(), h.link.toString(), h.script.toString()].join("\n") : "";
  return { html, head };
}
