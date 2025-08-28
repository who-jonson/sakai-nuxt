import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({

  app: {
    head: {
      meta: [
        { 'http-equiv': 'x-ua-compatible', 'content': 'IE=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' }
      ]
    }
  },

  build: {
    transpile: [
      'chart.js'
    ]
  },

  components: {
    dirs: [
      {
        extensions: ['vue'],
        global: true,
        path: '~/components/common/',
        pathPrefix: false
      }
    ]
  },

  css: [
    'primeflex/primeflex.css',
    'primeicons/primeicons.css',
    'prismjs/themes/prism-coy.css',
    '~/assets/styles/layout.scss',
    '~/assets/demo/flags/flags.css'
  ],

  dir: {
    public: './public/'
  },

  experimental: {
    asyncContext: true,
    headNext: true,
    typedPages: true,
    typescriptBundlerResolution: true,
    watcher: 'chokidar'
  },

  // @ts-ignore
  googleFonts: {
    families: {
      Inter: true
    }
  },

  imports: {
    autoImport: true,
    addons: {
      vueTemplate: true
    }
  },

  modules: [
    '@nuxt/icon',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    // '@vite-pwa/nuxt', // Disabled for Nuxt 4 compatibility 
    '@nuxtjs/google-fonts',
    '@primevue/nuxt-module'
  ],

  primevue: {
    components: {
      include: '*'
    },
    directives: {
      include: ['Ripple', 'Tooltip', 'StyleClass', 'Badge']
    },
    options: {
      ripple: true,
      inputVariant: 'outlined',
      theme: {
        preset: 'Lara',
        options: {
          prefix: 'p',
          darkModeSelector: '.dark'
        }
      }
    }
  },

  nitro: {
    experimental: {
      asyncContext: true
    },

    future: {
      nativeSWR: true
    }
  },

  postcss: {
    plugins: {
      autoprefixer: {}
    }
  },

  srcDir: 'src/',

  typescript: {
    shim: false
  },

  vite: {
    build: {
      sourcemap: false,
      rollupOptions: {
        external: false
      }
    },
    clearScreen: true,
    logLevel: 'info',
    assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg', '**/*.gif']
  },

  pwa: {
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
});
