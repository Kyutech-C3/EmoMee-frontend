<template>
  <div
    class="bg-white bg-opacity-50 w-72 h-52 rounded-3xl select-none overflow-hidden"
    :class="isSpeaking ? 'border-green-500 border-2' : ''"
  >
    <img :src="faceImageSrc" alt="Face Image" class="h-4/5 mx-auto p-5" />
    <p
      class="bg-white bg-opacity-50 w-full h-1/5 mx-auto text-center leading-10"
    >
      {{ name }}
    </p>
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
