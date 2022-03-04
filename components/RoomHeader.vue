<template>
  <div
    class="absolute flex w-full justify-between items-center bg-blue-900 h-18 px-10 transition-all z-50"
  >
    <img src="@/assets/c3_logo.png" class="w-10 h-auto" />
    <div class="flex">
      <base-button
        class="bg-red-500 mx-5 px-6 py-1.5 rounded-lg hover:bg-red-600 hover:drop-shadow-xl"
        @click="exitRoomWarning"
      >
        退出
      </base-button>
      <font-awesome-icon
        :icon="['fas', 'gear']"
        class="w-7 mx-4 text-gray-300 hover:text-gray-400 cursor-pointer select-none"
        @click="openReactionModal"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      warning: false,
    }
  },
  methods: {
    exitRoomWarning() {
      this.warning = !this.warning
    },
    exitRoom() {
      this.$router.push('/')
    },
  },
}
</script>
