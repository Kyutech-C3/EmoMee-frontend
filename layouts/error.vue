<template>
  <div class="w-full h-screen overflow-hidden relative bg-orange-200">
    <div
      class="w-fit border border-gray-300 rounded-xl text-center px-16 py-10 h-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-3xl bg-white bg-opacity-70 shadow-inner-xl"
    >
      <img
        src="@/assets/face/pigeon/sad.gif"
        alt="sad pigeon"
        class="absolute -bottom-20 -right-10 w-28"
      />
      <p class="w-full">{{ error.statusCode }}</p>
      <p class="break-words w-full">{{ error.message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>
