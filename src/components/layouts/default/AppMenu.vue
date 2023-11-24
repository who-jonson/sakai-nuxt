<script lang="ts">
import AppSubmenu from './AppSubmenu.vue';

export default {
  components: {
    AppSubmenu
  },
  props: {
    model: {
      type: Array,
      default: () => ([])
    }
  },
  emits: ['menuitemClick'],
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    }
  },
  methods: {
    bannerImage() {
      return this.$appState.darkTheme ? '/images/banner-primeblocks-dark.png' : '/images/banner-primeblocks.png';
    }
  }
};
</script>

<template>
  <div class="layout-menu-container">
    <AppSubmenu :items="model" class="layout-menu" :root="true" @menuitem-click="$emit('menuitemClick', $event)" />
  </div>
</template>

<style scoped>

</style>
