import type { NuxtPage } from '@nuxt/schema'

export default function (pages: NuxtPage[]) {
  pages.push(
    {
      path: '/demo/dashboard',
      name: 'demo-dashboard',
      file: '~/components/demo/dashboard.vue'
    },
    {
      path: '/demo/formlayout',
      name: 'demo-formlayout',
      file: '~/components/demo/formlayout.vue'
    },
    {
      path: '/demo/input',
      name: 'demo-input',
      file: '~/components/demo/input.vue'
    },
    {
      path: '/demo/floatlabel',
      name: 'demo-floatlabel',
      file: '~/components/demo/floatlabel.vue'
    },
    {
      path: '/demo/invalidstate',
      name: 'demo-invalidstate',
      file: '~/components/demo/invalidstate.vue'
    },
    {
      path: '/demo/button',
      name: 'demo-button',
      file: '~/components/demo/button.vue'
    },
    {
      path: '/demo/table',
      name: 'demo-table',
      file: '~/components/demo/table.vue'
    },
    {
      path: '/demo/list',
      name: 'demo-list',
      file: '~/components/demo/list.vue'
    },
    {
      path: '/demo/tree',
      name: 'demo-tree',
      file: '~/components/demo/tree.vue'
    },
    {
      path: '/demo/panel',
      name: 'demo-panel',
      file: '~/components/demo/panel.vue'
    },
    {
      path: '/demo/overlay',
      name: 'demo-overlay',
      file: '~/components/demo/overlay.vue'
    },
    {
      path: '/demo/menu',
      file: '~/components/demo/menu.vue',
      children: [
        {
          path: '',
          file: '~/components/demo/menu/personal.vue'
        },
        {
          path: 'seat',
          file: '~/components/demo/menu/seat.vue'
        },
        {
          path: 'payment',
          file: '~/components/demo/menu/payment.vue'
        },
        {
          path: 'confirmation',
          file: '~/components/demo/menu/confirmation.vue'
        }
      ]
    },
    {
      path: '/demo/messages',
      name: 'demo-messages',
      file: '~/components/demo/messages.vue'
    },
    {
      path: '/demo/file',
      name: 'demo-file',
      file: '~/components/demo/file.vue'
    },
    {
      path: '/demo/chart',
      name: 'demo-chart',
      file: '~/components/demo/chart.vue'
    },
    {
      path: '/demo/misc',
      name: 'demo-misc',
      file: '~/components/demo/misc.vue'
    },
    {
      path: '/demo/pages/crud',
      name: 'demo-crud',
      file: '~/components/demo/pages/crud.vue'
    },
    {
      path: '/demo/pages/timeline',
      name: 'demo-timeline',
      file: '~/components/demo/pages/timeline.vue'
    },
    {
      path: '/demo/pages/empty',
      name: 'demo-empty',
      file: '~/components/demo/pages/empty.vue'
    },
    {
      path: '/demo/blocks',
      name: 'demo-blocks',
      file: '~/components/demo/blocks.vue'
    }
  )
}
