// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import preact from "@astrojs/preact";
import vercel from "@astrojs/vercel";
// import node from "@astrojs/node";
import clerk from "@clerk/astro";
import { esMX } from "@clerk/localizations";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  output: "server",
  prefetch: true,

  integrations: [
    preact(),
    clerk({
      localization: esMX,
    }),
  ],
  adapter: vercel(),
});
