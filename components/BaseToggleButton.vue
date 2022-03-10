<template>
  <div class="w-20 h-8 border flex text-sm">
    <button
      class="w-1/2"
      :class="currentValue ? 'bg-slate-300' : 'bg-white'"
      @click="$emit('changeValue', true)"
    >
      ON
    </button>
    <button
      class="w-1/2"
      :class="currentValue ? 'bg-white' : 'bg-slate-300'"
      @click="$emit('changeValue', false)"
    >
      OFF
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentValue: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
}
</script>
