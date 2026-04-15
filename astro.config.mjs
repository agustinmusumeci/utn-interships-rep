// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
// import node from "@astrojs/node";
import clerk from "@clerk/astro";
import { esMX } from "@clerk/localizations";
import react from "@astrojs/react";
import { dark } from "@clerk/ui/themes";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  output: "server",
  prefetch: true,

  integrations: [
    clerk({
      localization: esMX,
      appearance: { theme: dark },
    }),
    react(),
  ],
  adapter: vercel(),
});
