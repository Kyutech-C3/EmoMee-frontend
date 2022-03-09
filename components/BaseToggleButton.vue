<template>
  <div class="w-20 h-8 border flex text-sm">
    <button
      class="w-1/2"
      :class="value ? 'bg-slate-300' : 'bg-white'"
      @click="updateValue(true)"
    >
      ON
    </button>
    <button
      class="w-1/2"
      :class="value ? 'bg-white' : 'bg-slate-300'"
      @click="updateValue(false)"
    >
      OFF
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: this.parentValue,
    }
  },
  props: {
    parentValue: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  methods: {
    updateValue(v) {
      this.value = v
      this.$emit('updateValue', v)
    },
  },
}
</script>
