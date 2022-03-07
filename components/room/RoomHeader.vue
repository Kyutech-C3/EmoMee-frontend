<template>
  <div
    class="absolute flex w-full justify-between items-center bg-blue-900 h-18 px-10 transition-all z-50"
  >
    <img src="@/assets/pigeon/nuetral.png" class="w-10 h-auto" />
    <div class="flex select-none">
      <div
        class="flex items-center text-xs text-gray-300 hover:text-gray-400 mr-5 cursor-pointer"
        @click="copy(url)"
      >
        <p
          class="transition-all"
          :class="successCopy ? 'opacity-100' : 'opacity-0'"
        >
          コピー完了
        </p>
        <font-awesome-icon
          :icon="['fas', 'copy']"
          class="w-5 mx-1 select-none"
        />
        <p>招待リンクをコピー</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
      default() {
        return ''
      },
    },
  },
  data() {
    return {
      successCopy: false,
    }
  },
  updated() {
    setTimeout(() => {
      this.successCopy = false
    }, 3000)
  },
  methods: {
    async copy(url) {
      try {
        await navigator.clipboard.writeText(url)
        // eslint-disable-next-line no-console
        console.log('Success to copy')
        this.successCopy = true
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('Failed to copy', err)
      }
    },
  },
}
</script>
