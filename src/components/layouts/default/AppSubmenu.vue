<template>
  <ul v-if="items">
    <template v-for="(item,i) of items">
      <li v-if="visible(item) && !item.separator" :key="item.label || i" :class="[{'layout-menuitem-category': root, 'active-menuitem': activeIndex === i && !item.to && !item.disabled}]" role="none">
        <template v-if="root">
          <div class="layout-menuitem-root-text">
            {{ item.label }}
          </div>
          <AppSubmenu :items="visible(item) && item.items" @menuitem-click="$emit('menuitem-click', $event)" />
        </template>
        <template v-else>
          <NuxtLink
            v-if="item.to"
            v-ripple
            :to="item.to"
            :class="[item.class, 'p-ripple', {'p-disabled': item.disabled}]"
            :style="item.style"
            :target="item.target"
            exact
            role="menuitem"
            @click="onMenuItemClick($event,item,i)"
          >
            <i :class="item.icon" />
            <span>{{ item.label }}</span>
            <i v-if="item.items" class="pi pi-fw pi-angle-down menuitem-toggle-icon" />
            <Badge v-if="item.badge" :value="item.badge" />
          </NuxtLink>
          <a
            v-if="!item.to"
            v-ripple
            :href="item.url||'#'"
            :style="item.style"
            :class="[item.class, 'p-ripple', {'p-disabled': item.disabled}]"
            :target="item.target"
            role="menuitem"
            @click="onMenuItemClick($event,item,i)"
          >
            <i :class="item.icon" />
            <span>{{ item.label }}</span>
            <i v-if="item.items" class="pi pi-fw pi-angle-down menuitem-toggle-icon" />
            <Badge v-if="item.badge" :value="item.badge" />
          </a>
          <transition name="layout-submenu-wrapper">
            <AppSubmenu v-show="activeIndex === i" :items="visible(item) && item.items" @menuitem-click="$emit('menuitem-click', $event)" />
          </transition>
        </template>
      </li>
      <li v-if="visible(item) && item.separator" :key="'separator' + i" class="p-menu-separator" :style="item.style" role="separator" />
    </template>
  </ul>
</template>
<script>
export default {
  name: 'AppSubmenu',
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    root: {
      type: Boolean,
      default: false
    }
  },
  emits: ['menuitem-click'],
  data () {
    return {
      activeIndex: null
    }
  },
  methods: {
    onMenuItemClick (event, item, index) {
      if (item.disabled) {
        event.preventDefault()
        return
      }

      if (!item.to && !item.url) {
        event.preventDefault()
      }

      // execute command
      if (item.command) {
        item.command({ originalEvent: event, item })
      }

      this.activeIndex = index === this.activeIndex ? null : index

      this.$emit('menuitem-click', {
        originalEvent: event,
        item
      })
    },
    visible (item) {
      return (typeof item.visible === 'function' ? item.visible() : item.visible !== false)
    }
  }
}
</script>

<style scoped>

</style>
