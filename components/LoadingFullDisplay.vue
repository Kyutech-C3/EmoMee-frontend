<template>
  <transition name="parent">
    <div
      v-if="showLoading"
      class="fixed w-full h-full bg-slate-500 z-50 overflow-hidden"
    >
      <transition name="logo" appear>
        <div v-if="showLogo" class="w-100 absolute top-1/2 left-1/2">
          <img
            src="@/assets/top/EmoMee_logo.png"
            alt="logo"
            class="-translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      showLoading: true,
      showLogo: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.showLogo = true
    }, 100)
    setTimeout(() => {
      this.showLoading = false
    }, 2000)
  },
}
</script>

<style scoped>
.parent-leave-active {
  transition: opacity 1s;
}
.parent-leave-to {
  opacity: 0;
}
.logo-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 1s;
}
.logo-enter {
  opacity: 0;
  transform: translateY(100px);
}
</style>
