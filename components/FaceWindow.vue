<template>
  <div
    class="border border-gray-300 bg-color rounded-3xl w-40 h-40 pt-3"
    :class="voiceON ? 'border-green-300 border-2' : ''"
  >
    <span class="text-center">{{ name }}</span>
    <img :src="faceGif" class="mx-auto" />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
      default() {
        return ''
      },
    },
    faceGif: {
      type: String,
      required: true,
      default() {
        return ''
      },
    },
    voiceON: {
      type: Boolean,
      required: true,
      default() {
        return false
      },
    },
  },
}
</script>

<style scoped>
.bg-color {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
