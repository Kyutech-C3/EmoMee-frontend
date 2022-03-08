<template>
  <div
    class="flex items-center justify-center rounded-2xl bg-orange-50 shadow-xl w-192 h-80 z-10"
  >
    <div class="w-full">
      <div class="mx-auto max-w-fit mb-16 text-3xl font-bold">ルーム情報</div>
      <div class="mx-auto max-w-fit mb-8 text-2xl">
        <span class="mr-10 font-semibold">ルームID</span>
        <input
          id="copyId"
          class="bg-orange-50"
          type="text"
          value="sdaf796afsds9a987faofa98"
          readonly
        />
        <span class="ml-4">
          <button @click="cpId()">
            <img src="../../assets/Icon/copy.png" />
          </button>
        </span>
      </div>
      <div class="mx-auto max-w-fit flex items-center text-2xl">
        <span class="mr-10 font-semibold">参加URL</span>
        <input
          id="copyUrl"
          class="bg-orange-50"
          type="text"
          value="https://emomee.netlify.app/join"
          readonly
        />
        <span class="ml-4">
          <button @click="cpUrl()">
            <img src="../../assets/Icon/copy.png" />
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggleStatus: true,
    }
  },
  methods: {
    cpId() {
      const txt = document.getElementById('copyId')
      txt.select()
      document.execCommand('Copy')
    },
    cpUrl() {
      const txt = document.getElementById('copyUrl')
      txt.select()
      document.execCommand('Copy')
    },
  },
}
</script>
