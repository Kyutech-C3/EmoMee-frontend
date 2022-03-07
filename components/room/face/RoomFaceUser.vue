<template>
  <div
    class="border border-gray-300 rounded-3xl pt-10 select-none"
    :class="isSpeaking ? 'border-green-500 border-2' : ''"
  >
    <img :src="faceImageSrc" alt="Face Image" class="h-4/5 mx-auto" />
    <p class="mx-auto w-full text-center leading-8 bg-gray-100">{{ name }}</p>
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
    faceImageSrc: {
      type: String,
      required: true,
      default() {
        return ''
      },
    },
    isSpeaking: {
      type: Boolean,
      required: true,
      default() {
        return false
      },
    },
  },
}
</script>
