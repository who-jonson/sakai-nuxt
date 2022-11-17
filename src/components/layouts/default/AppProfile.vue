<script lang="ts">
export default {
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    onClick(event) {
      this.expanded = !this.expanded;
      event.preventDefault();
    }
  }
};
</script>

<template>
  <div class="layout-profile">
    <div>
      <img src="/images/avatar/profile.jpg" alt="">
    </div>
    <button class="p-link layout-profile-link" @click="onClick">
      <span class="username">Claire Williams</span>
      <i class="pi pi-fw pi-cog" />
    </button>
    <transition name="layout-submenu-wrapper">
      <ul v-show="expanded">
        <li>
          <button class="p-link">
            <i class="pi pi-fw pi-user" /><span>Account</span>
          </button>
        </li>
        <li>
          <button class="p-link">
            <i class="pi pi-fw pi-inbox" /><span>Notifications</span><span class="menuitem-badge">2</span>
          </button>
        </li>
        <li>
          <button class="p-link">
            <i class="pi pi-fw pi-power-off" /><span>Logout</span>
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>

</style>
