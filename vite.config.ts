import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  // The site is served from the domain root and every route is prerendered to
  // its own index.html, so asset URLs must be absolute.
  base: "/",

  build: {
    outDir: isSsrBuild ? "dist-ssr" : "dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: isSsrBuild
      ? undefined
      : {
          output: {
            manualChunks: {
              vendor: ["react", "react-dom", "react-router-dom"],
              scroll: ["gsap", "gsap/ScrollTrigger", "lenis"],
            },
            assetFileNames: "assets/[name]-[hash][extname]",
            chunkFileNames: "assets/[name]-[hash].js",
            entryFileNames: "assets/[name]-[hash].js",
          },
        },
    chunkSizeWarningLimit: 1000,
    minify: "esbuild",
  },

  ssr: {
    // Fonts and CSS-only packages must be bundled (not required at runtime by Node).
    noExternal: [/@fontsource/, "lenis"],
  },

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
