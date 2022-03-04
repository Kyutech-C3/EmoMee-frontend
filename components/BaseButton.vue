<template>
  <div
    :to="to"
    class="rounded-2xl px-7 py-3 drop-shadow-md bg-white cursor-pointer"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
      default() {
        return ''
      },
    },
  },
}
</script>
