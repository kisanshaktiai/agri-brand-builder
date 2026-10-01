import React from "react";

/**
 * Route-level code splitting that also prerenders. On the client this is
 * React.lazy. During prerender, preload() loads the module first so the
 * page renders synchronously inside renderToString instead of suspending.
 */
export function lazyPage<P extends object>(loader: () => Promise<{ default: React.ComponentType<P> }>) {
  let mod: { default: React.ComponentType<P> } | null = null;
  const L = React.lazy(loader);
  const Page = (props: P) => (mod ? React.createElement(mod.default, props) : React.createElement(L as React.ComponentType<P>, props));
  Page.preload = async () => {
    mod = await loader();
  };
  return Page;
}
