<template>
  <RoomBaseModal class="absolute -z-10 opacity-50 hover:opacity-100">
    <p v-for="content in contents" :key="content.name">
      {{ content.name }}: {{ content.value }}
    </p>
  </RoomBaseModal>
</template>

<script>
export default {
  props: {
    contents: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
}
</script>
