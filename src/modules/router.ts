import { existsSync } from 'fs'
import { resolve } from 'pathe'
import consola from 'consola'
import { addTemplate, defineNuxtModule, templateUtils } from '@nuxt/kit'
import type { ModuleMeta, Nuxt, NuxtModule } from '@nuxt/schema'
import type { RouteRecordRaw } from 'vue-router'

const logger = consola.withTag('nuxt:router')

export interface ModuleOptions {
  path?: string
  fileName?: string
  parsePages?: boolean
}

const moduleMeta: Partial<ModuleMeta> = {
  name: 'router-module',
  configKey: 'routerModule'
}

const options: Record<string, any> = {}

function addComponentToRoutes (routes) {
  return routes.map(route => ({
    ...route,
    children: route.children ? addComponentToRoutes(route.children) : [],
    component: `{() => import('${route.file}')}`
  }))
}

const nuxtModule: NuxtModule<ModuleOptions> = function (nuxt: Nuxt) {
  return {
    defaults: {
      path: nuxt.options.srcDir,
      fileName: 'routes.ts',
      parsePages: false
    },
    setup (resolvedOptions: NuxtModule, nuxt: Nuxt) {
      const routerFilePath = resolve(resolvedOptions.path, resolvedOptions.fileName)

      // Check if router file path is defined
      if (!existsSync(routerFilePath)) {
        logger.warn(`No \`${resolvedOptions.fileName}\` file found in \`${resolvedOptions.path}\`.`)
        return
      }
      options.routerFilePath = routerFilePath

      nuxt.hook('build:before', () => {
        addTemplate({
          filename: 'routes.mjs',
          getContents: async () => {
            const { createRoutes } = await import(routerFilePath)
            const pages = createRoutes().map((route) => {
              return { ...route, file: route.component }
            })
            await nuxt.callHook('pages:extend', pages)
            const serializedRoutes: Partial<RouteRecordRaw> = addComponentToRoutes(pages)

            return `export default ${templateUtils.serialize(serializedRoutes)}`
          }
        })
      })

      nuxt.hook('builder:watch', async (event, path) => {
        const pathPattern = new RegExp(`^(${routerFilePath}|${nuxt.options.srcDir}/views)/`)
        if (event !== 'change' && path.match(pathPattern)) {
          await nuxt.callHook('builder:generateApp')
        }
      })
    }
  }
}

;(nuxtModule as any).meta = moduleMeta

declare module '@nuxt/schema' {
  interface NuxtConfig {
    routerModule?: ModuleOptions
  }
  interface NuxtOptions {
    routerModule?: ModuleOptions
  }
}

export default defineNuxtModule(nuxtModule)
