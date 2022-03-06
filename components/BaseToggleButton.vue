<template>
  <div class="w-20 h-8 border flex text-sm">
    <button
      class="w-1/2"
      :class="value ? 'bg-slate-300' : 'bg-white'"
      @click="value = true"
    >
      ON
    </button>
    <button
      class="w-1/2"
      :class="value ? 'bg-white' : 'bg-slate-300'"
      @click="value = false"
    >
      OFF
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
    }
  },
}
</script>
