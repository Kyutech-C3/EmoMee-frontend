<template>
  <div
    class="rounded-2xl bg-orange-50 shadow-xl w-1/3 h-90 z-10 p-9 text-center"
  >
    <p class="my-8 text-3xl font-bold">ルーム設定</p>
    <div class="my-10 text-2xl">
      <span class="font-semibold">有効期限</span>
      <input
        class="mx-5 bg-orange-50 text-xl w-80 text-center text-gray-500"
        value="12時"
      />
      <!-- <button @click="copyId()">
        <FontAwesomeIcon :icon="['fas', 'copy']" class="w-5" />
      </button> -->
    </div>
    <div class="my-10 text-2xl">
      <span class="font-semibold">有効期限</span>
      <input
        class="mx-5 bg-orange-50 text-xl w-80 text-center text-gray-500"
        value="12時"
      />
    </div>
    <div class="my-10 text-2xl">
      <span class="font-semibold">有効期限</span>
      <input
        class="mx-5 bg-orange-50 text-xl w-80 text-center text-gray-500"
        value="12時"
      />
    </div>

    <!-- Ownerか参加者かで表示を変える． -->
    <div
      v-if="!isowner"
      class="mt-8 pt-8 mb-8 text-2xl border-t-4 border-gray-400 border-dotted"
    >
      <span class="font-semibold">ルームID</span>
      <input
        id="copyId"
        :value="roomid"
        class="mx-5 bg-orange-50 text-xl w-80 text-center text-gray-500"
        readonly
      />
      <button @click="copyId()">
        <FontAwesomeIcon :icon="['fas', 'copy']" class="w-5" />
      </button>
    </div>
    <div
      v-if="isowner"
      class="mt-8 pt-8 mb-8 text-2xl border-t-4 border-gray-400 border-dotted"
    >
      <span class="font-semibold">共有URL</span>
      <input
        id="copyUrl"
        :value="url"
        class="mx-5 bg-orange-50 text-xl w-80 text-center text-gray-500"
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
  // eslint-disable-next-line vue/require-prop-types
  props: ['roomid', 'isowner', 'url'],
  data() {},
  methods: {
    async copyId() {
      try {
        await navigator.clipboard.writeText(this.roomid)
        alert('リンクをコピーしました')
      } catch (err) {
        alert('コピーに失敗しました')
      }
    },
    async copyUrl() {
      try {
        await navigator.clipboard.writeText(this.url)
        alert('リンクをコピーしました')
      } catch (err) {
        alert('コピーに失敗しました')
      }
    },
  },
}
</script>
