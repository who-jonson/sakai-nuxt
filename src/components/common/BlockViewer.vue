<script lang="ts">
export default {
  props: {
    header: {
      type: String,
      default: null
    },
    code: {
      type: String,
      default: null
    },
    recent: {
      type: Boolean,
      default: false
    },
    containerClass: {
      type: [Array, Object, String],
      default: null
    },
    previewStyle: {
      type: [Array, Object, String],
      default: null
    }
  },
  data() {
    return {
      BlockView: {
        PREVIEW: 0,
        CODE: 1
      },
      blockView: 0
    };
  },
  methods: {
    activateView(event, blockView) {
      this.blockView = blockView;
      event.preventDefault();
    },
    async copyCode(event) {
      await navigator.clipboard.writeText(this.code);
      event.preventDefault();
    }
  }
};
</script>

<template>
  <div class="block-section">
    <div class="block-header">
      <span class="block-title">
        <span>{{ header }}</span>
        <span v-if="recent" class="badge-new">New</span>
      </span>
      <div class="block-actions">
        <a tabindex="0" :class="{ 'block-action-active': blockView === BlockView.PREVIEW }" @click="activateView($event, BlockView.PREVIEW)"><span>Preview</span></a>
        <a tabindex="0" :class="{ 'block-action-active': blockView === BlockView.CODE }" @click="activateView($event, BlockView.CODE)">
          <span>Code</span>
        </a>
        <a
          v-tooltip.focus.bottom="{ value: 'Copied to clipboard' }"
          :tabindex="0"
          class="block-action-copy"
          @click="copyCode($event)"
        ><i class="pi pi-copy" /></a>
      </div>
    </div>
    <div class="block-content">
      <div v-if="blockView === BlockView.PREVIEW" :class="containerClass" :style="previewStyle">
        <slot />
      </div>
      <div v-if="blockView === BlockView.CODE">
        <pre v-code>
          <code>{{ code }}</code>
        </pre>
      </div>
    </div>
  </div>
</template>
