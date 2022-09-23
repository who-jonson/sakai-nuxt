import { fileURLToPath } from 'url'
import { resolve } from 'pathe'
import { defineNuxtConfig } from 'nuxt/config'

const resolvePath = (...paths: string[]) => resolve(fileURLToPath(new URL('./', import.meta.url)), ...paths)

export default defineNuxtConfig({
  alias: {
    public: resolvePath('./public/')
  },

  build: {
    transpile: [
      'primevue'
    ]
  },

  css: [
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeflex/primeflex.css',
    'primeicons/primeicons.css',
    'prismjs/themes/prism-coy.css',
    '~/assets/styles/layout.scss',
    '~/assets/demo/flags/flags.css'
  ],

  dir: {
    public: resolvePath('./public/')
  },

  experimental: {
    reactivityTransform: true,
    viteNode: false
  },

  meta: {
    meta: [
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/themes/lara-light-indigo/theme.css' }
    ]
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],

  nitro: {
    preset: 'vercel'
  },

  srcDir: 'src/',

  vite: {
    clearScreen: true,
    logLevel: 'info'
  }
})
