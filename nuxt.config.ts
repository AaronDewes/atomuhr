import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  nitro: {
    preset: "vercel",
  },
  head: {
    title: 'atomuhr.vercel.app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Die beste Atomuhr dies auf Markt gibt.',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.svg' }],
  },
  modules: [
    '@kevinmarrec/nuxt-pwa'
  ],
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/style/fontfaces.css'],
});