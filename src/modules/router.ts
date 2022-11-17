import defu from 'defu';
import serialize from 'serialize-javascript';
import { addTemplate, defineNuxtModule, importModule, resolvePath, useLogger } from '@nuxt/kit';
import type { RouteRecordRaw } from 'vue-router';

export interface ModuleOptions {
  path?: string;
  fileName?: string;
  parsePages?: boolean;
}

export type RouteRaw = RouteRecordRaw & {
  file
};

const logger = useLogger('nuxt:router');
const DEFAULTS = {
  fileName: 'routes.ts',
  parsePages: false
};

export function addComponentToRoutes(routes: RouteRaw[]) {
  return routes.map(route => ({
    ...route,
    children: route.children ? addComponentToRoutes(route.children as RouteRaw[]) : [],
    component: `{() => import('${route.file}')}`
  }));
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'router-module',
    configKey: 'routerModule'
  },
  defaults: DEFAULTS,
  hooks: {
    'build:before': function ({ nuxt }) {
      logger.info('Building routes!');
      const options = defu(
        (nuxt.options.routerModule || {}),
        {
          ...DEFAULTS,
          path: nuxt.options.srcDir
        }
      );

      addTemplate({
        filename: 'routes.mjs',
        getContents: async () => {
          const { createRoutes } = await importModule(options.fileName, {
            paths: options.path
          });
          const pages = createRoutes().map((route) => {
            return { ...route, file: route.component };
          });
          await nuxt.callHook('pages:extend', pages);
          const serializedRoutes: Partial<RouteRecordRaw> = addComponentToRoutes(pages);

          return `export default ${serialize(serializedRoutes)}`;
        }
      });
    }
  },
  async setup(options, nuxt) {
    const routerFilePath = await resolvePath(`${options.path}/${options.fileName}`, {
      cwd: nuxt.options.rootDir,
      extensions: ['.mjs', '.ts']
    });

    nuxt.hook('builder:watch', async (event, path) => {
      const pathPattern = new RegExp(`^(${routerFilePath}|${nuxt.options.srcDir}/views)/`);
      if (event !== 'change' && path.match(pathPattern)) {
        await nuxt.callHook('builder:generateApp');
      }
    });
  }
});

declare module '@nuxt/schema' {
  interface NuxtConfig {
    routerModule?: ModuleOptions;
  }
  interface NuxtOptions {
    routerModule?: ModuleOptions;
  }
}
