<template>
  <div>
    <Head>
      <Title>{{ error.statusMessage }}</Title>
    </Head>

    <Component :is="component" :error="error" />
  </div>
</template>

<script lang="ts" setup>
interface ErrorProps {
  error: {
    description?: string
    message?: string
    statusCode: string
    statusMessage: string
    url: string
  }
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { error } = defineProps<ErrorProps>()

const component = computed(() => {
  if (parseInt(error.statusCode) === 403) { return defineAsyncComponent(() => import('~/components/layouts/error/AccessDenied.vue')) }

  return parseInt(error.statusCode) === 404
    ? defineAsyncComponent(() => import('~/components/layouts/error/NotFound.vue'))
    : defineAsyncComponent(() => import('~/components/layouts/error/ServerError.vue'))
})

definePageMeta({
  layout: 'empty',
  title: 'Error'
})
</script>
