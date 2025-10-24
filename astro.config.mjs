import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sharp from "sharp";
import tailwindcss from "@tailwindcss/vite";
import autoImport from "astro-auto-import";
import lenis from "astro-lenis";
import sitemap from "astro-sitemap";
import robotsTxt from "astro-robots-txt";
import linkValidator from "astro-link-validator";
import astroLLMsGenerator from "astro-llms-generate";
import config from "./src/config/global";

export default defineConfig({
  site: "https://052digital.com",
  base: "/",
  image: { service: sharp() },
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: "esbuild",
    },
  },
  integrations: [
    react(),
    autoImport(),
    lenis(),
    sitemap(),
    robotsTxt(),
    linkValidator(),
    astroLLMsGenerator({
      title: config.seo.defaultTitle,
      description: config.seo.description,
      excludePatterns: ["**/404*"],
    }),
  ],
});
