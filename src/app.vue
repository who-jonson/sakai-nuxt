<template>
  <NuxtLayout v-show="ready">
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const ready = useTimeout(500)
</script>
