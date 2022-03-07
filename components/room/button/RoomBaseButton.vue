<template>
  <div
    class="w-fit px-7 py-2.5 border border-gray-300 rounded-full drop-shadow bg-white"
    @click="(event) => $emit('click', event)"
  >
    <slot />
  </div>
</template>

<script>
export default {}
</script>
