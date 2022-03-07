<template>
  <info-area class="flex items-center justify-center rounded-2xl">
    <div class="w-full">
      <div class="mx-auto max-w-fit mb-16 text-xl">ルーム情報</div>
      <div class="mx-auto max-w-fit mb-8">
        <span class="mr-10">ルームID</span>
        <input
          id="copy"
          type="text"
          value="sdaf796afsds9a987faofa98"
          readonly
        />
        <span class="ml-3">
          <button @click="cpClick()">
            <img src="../../assets/Icon/copy.png" />
          </button>
        </span>
      </div>
      <div class="mx-auto max-w-fit flex items-center">
        <span class="mr-10">参加URL</span>
        <a class="no-underline hover:underline" href="https://google.com"
          >https://www.figma.com/file/eCJ5OJf4</a
        >
      </div>
    </div>
  </info-area>
</template>

<script>
import InfoArea from '../InfoArea.vue'
export default {
  components: { InfoArea },
  data() {
    return {
      toggleStatus: true,
    }
  },
  methods: {
    cpClick() {
      const txt = document.getElementById('copy')
      txt.select()
      document.execCommand('Copy')
    },
  },
}
</script>
