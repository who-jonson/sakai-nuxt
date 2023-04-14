import defu from 'defu';
import type { PathLike } from 'fs';
import serialize from 'serialize-javascript';
import type { RouteRecordRaw } from 'vue-router';
import { addTemplate, defineNuxtModule, resolvePath, useLogger, useNuxt } from '@nuxt/kit';

export interface ModuleOptions {
  path?: string;
  fileName?: string;
  parsePages?: boolean;
}

export type RouteRaw = RouteRecordRaw & {
  file: string | PathLike
};

const logger = useLogger('nuxt:router');
const DEFAULTS = {
  fileName: 'routes.ts',
  parsePages: false
};

export function addComponentToRoutes(routes: RouteRaw[]): RouteRecordRaw[] {
  return routes.map(route => ({
    ...route,
    children: route.children ? addComponentToRoutes(route.children as RouteRaw[]) : [],
    component: (() => import(`${route.file}`)) as any
  }));
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'router-module',
    configKey: 'routerModule'
  },
  defaults: DEFAULTS,
  hooks: {
    'build:before': function () {
      logger.info('Building routes!');
      const nuxt = useNuxt();
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
          const { createRoutes } = await import(options.fileName /** vite-ignore */);
          const pages = createRoutes().map((route: RouteRaw) => {
            return { ...route, file: route.component };
          });
          await nuxt.callHook('pages:extend', pages);
          const serializedRoutes: Partial<RouteRecordRaw>[] = addComponentToRoutes(pages);

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
