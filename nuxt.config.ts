import { resolve } from 'path'
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  alias: {
    public: resolve(__dirname, './public/')
  },

  srcDir: 'src/',

  dir: {
    public: resolve(__dirname, './public/')
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

  buildModules: [
    '@vueuse/nuxt'
  ],

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

  generate: {
    routes: ['/'],
    subFolders: true
  },

  ssr: false,

  vite: {
    logLevel: 'info'
  }
})
