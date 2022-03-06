<template>
  <div
    class="border border-gray-300 bg-color rounded-3xl relative pt-10 select-none"
    :class="voiceON ? 'border-green-500 border-2' : ''"
  >
    <p class="mx-auto w-fit">{{ name }}</p>
    <img :src="faceGif" class="h-4/5 w-auto mx-auto" />
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
  background-color: rgba(255, 255, 255, 0.6);
}
</style>
