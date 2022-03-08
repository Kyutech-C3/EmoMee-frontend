<template>
  <div
    class="rounded-2xl bg-orange-50 shadow-xl w-192 h-80 z-10 p-9 text-center"
  >
    <p class="my-8 text-3xl font-bold">ルーム情報</p>
    <div class="my-10 text-2xl">
      <span class="font-semibold">ルームID</span>
      <input
        id="copyId"
        class="mx-5 bg-orange-50 text-xl w-80 text-center text-gray-500"
        type="text"
        value="sdaf796afsds9a987faofa98"
        readonly
      />
      <button @click="copyId()">
        <FontAwesomeIcon :icon="['fas', 'copy']" class="w-5" />
      </button>
    </div>
    <div class="my-10 text-2xl">
      <span class="font-semibold">参加URL</span>
      <input
        id="copyUrl"
        class="mx-5 bg-orange-50 text-xl w-80 text-center text-gray-500"
        type="text"
        value="https://emom.ee/join"
        readonly
      />
      <button @click="copyUrl()">
        <FontAwesomeIcon :icon="['fas', 'copy']" class="w-5" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    copyId() {
      const txt = document.getElementById('copyId')
      txt.select()
      document.execCommand('Copy')
    },
    copyUrl() {
      const txt = document.getElementById('copyUrl')
      txt.select()
      document.execCommand('Copy')
    },
  },
}
</script>
