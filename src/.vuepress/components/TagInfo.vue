<script>
export default {
  props: {
    tag: {
      type: String,
      required: true
    }
  },
  computed: {
    tagInfo() {
      const TAG_INFO = {
        'low-level': 'This section contains in-depth technical information.',
        'api': 'This section contains component API information.'
      }

      return TAG_INFO[this.tag]
    }
  }
}
</script>

<template>
  <div
    v-if="tagInfo"
    class="tag-info-block"
  >
    {{ tagInfo }}
  </div>
</template>

<style>
</style>