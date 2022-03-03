<template>
  <nuxt-link :to="to" class="rounded-2xl px-7 py-3 drop-shadow-md bg-white">
    <slot></slot>
  </nuxt-link>
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
