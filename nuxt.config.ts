import { defineNuxtConfig } from "nuxt/config";

// Nuxt 3 конфигурация SPA с Tailwind и Pinia
export default defineNuxtConfig({
  ssr: false,
  typescript: {
    strict: true,
    typeCheck: false,
  },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  css: ["@/assets/styles/tailwind.css"],
  app: {
    head: {
      title: "Ежедневник",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
});
