import {
  addComponent,
  addPluginTemplate,
  defineNuxtModule,
  normalizeTemplate
} from '@nuxt/kit'
import serialize from 'serialize-javascript'
import { isObject, isArray } from '@whoj/utils'
import { usePrimeVue } from 'primevue/config'

const primevueComponents = [
  'Accordion',
  'AccordionTab',
  'AutoComplete',
  'Avatar',
  'AvatarGroup',
  'Badge',
  'BlockUI',
  'Breadcrumb',
  'Button',
  'Calendar',
  'Card',
  'Carousel',
  'CascadeSelect',
  'Chart',
  'Checkbox',
  'Chip',
  'Chips',
  'ColorPicker',
  'Column',
  'ColumnGroup',
  'ConfirmDialog',
  'ConfirmPopup',
  'ContextMenu',
  'DataTable',
  'DataView',
  'DataViewLayoutOptions',
  'DeferredContent',
  'Dialog',
  'Divider',
  'Dock',
  'Dropdown',
  // 'Editor',
  'Fieldset',
  'FileUpload',
  // 'FullCalendar',
  'Galleria',
  'Image',
  'InlineMessage',
  'Inplace',
  'InputMask',
  'InputNumber',
  'InputSwitch',
  'InputText',
  'Knob',
  'Listbox',
  'MegaMenu',
  'Menu',
  'Menubar',
  'Message',
  'MultiSelect',
  'OrderList',
  'OrganizationChart',
  'OverlayPanel',
  'Paginator',
  'Panel',
  'PanelMenu',
  'Password',
  'PickList',
  'ProgressBar',
  'ProgressSpinner',
  'RadioButton',
  'Rating',
  'ScrollPanel',
  'ScrollTop',
  'SelectButton',
  'Sidebar',
  'Skeleton',
  'Slider',
  'SpeedDial',
  'SplitButton',
  'Splitter',
  'SplitterPanel',
  'Steps',
  'TabMenu',
  'TabPanel',
  'TabView',
  'Tag',
  'Terminal',
  'TerminalService',
  'Textarea',
  'TieredMenu',
  'Timeline',
  'Toast',
  'ToggleButton',
  'Toolbar',
  'Tree',
  'TreeSelect',
  'TreeTable',
  'TriStateCheckbox',
  'VirtualScroller'
] as const

type PrimeVueConfig = ReturnType<typeof usePrimeVue>['config']

type PrimevueComponents = typeof primevueComponents[number]

export interface PrimeVueOptions extends PrimeVueConfig {
  components?: {
    exclude?: Array<PrimevueComponents>
    include?: Array<PrimevueComponents | { name: PrimevueComponents, global?: boolean }>
    global?: boolean
  }
}

async function registerComponent (name: PrimevueComponents, global = true) {
  await addComponent({
    export: 'default',
    filePath: `primevue/${name.toLowerCase()}`,
    global: (['ConfirmDialog', 'ConfirmPopup', 'Toast', 'Tooltip'].includes(name) || global),
    name
  })
}

export default defineNuxtModule<PrimeVueOptions>({
  meta: {
    configKey: 'primevue'
  },
  defaults: {
    components: {
      global: true
    },
    ripple: true,
    inputStyle: 'outlined'
  },
  async setup (options, nuxt) {
    addPluginTemplate(normalizeTemplate({
      filename: 'primevue.config.mjs',
      getContents () {
        return [
          'import PrimeVue from \'primevue/config\';',
          'import { defineNuxtPlugin } from \'#app\';',
          '',
          'export default defineNuxtPlugin(({ vueApp }) => {',
          `  vueApp.use(PrimeVue, ${serialize({ ...options, components: undefined })})`,
          '})'
        ].join('\n')
      }
    }))

    if (options.components.include) {
      for (const component of options.components.include) {
        if (isObject(component)) {
          await registerComponent(component.name, (component.global || options.components.global))
        } else {
          await registerComponent(component, options.components.global)
        }
      }
    } else {
      for (const component of primevueComponents) {
        if (!isArray(options.components.exclude) || !options.components.exclude.includes(component)) {
          await registerComponent(component, options.components.global)
        }
      }
    }
  }
})
