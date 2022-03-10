<template>
  <div
    class="rounded-3xl bg-orange-50 shadow-2xl w-1/3 h-90 z-10 p-9 text-center text-shadow-sm"
  >
    <p class="my-8 text-3xl font-bold">ルーム設定</p>

    <!-- 設定項目部分 -->
    <div class="my-9 text-3xl">
      <!-- <span class="font-semibold">名前</span> -->
      <input
        v-model="name"
        type="text"
        placeholder="名前を入力"
        class="border-b-2 border-gray-500 bg-orange-50 text-2xl px-1 py-1 text-center text-gray-700"
        @input="inputNameValue"
      />
    </div>
    <div class="my-10 text-3xl flex justify-center">
      <span class="font-semibold mr-18">表情検知</span>
      <div
        class="relative inline-block w-14 mr-2 mt-1 align-middle select-none transition duration-200 ease-in"
      >
        <input
          id="toggle"
          v-model="faceSwitch"
          type="checkbox"
          name="toggle"
          class="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-2 appearance-none cursor-pointer"
          @input="changeFaceSwitch"
        />
        <label
          for="toggle"
          class="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"
        ></label>
      </div>
    </div>
    <div class="my-10 text-3xl flex justify-center">
      <span class="font-semibold mr-18">音声検知</span>
      <div
        class="relative inline-block w-14 mr-2 mt-1 align-middle select-none transition duration-200 ease-in"
      >
        <input
          id="toggle2"
          v-model="voiceSwitch"
          type="checkbox"
          name="toggle"
          class="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-2 appearance-none cursor-pointer"
          @input="changeVoiceSwitch"
        />
        <label
          for="toggle2"
          class="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"
        ></label>
      </div>
    </div>

    <!-- Ownerか参加者かで表示を変える． -->
    <div
      v-if="!isowner"
      class="mt-8 pt-8 mb-8 text-3xl border-t-4 border-gray-400 border-dotted"
    >
      <span class="font-semibold">ルームID</span>
      <input
        id="copyId"
        :value="roomid"
        class="mx-5 bg-orange-50 text-2xl w-80 text-center text-gray-500"
        readonly
      />
      <button @click="copyId()">
        <FontAwesomeIcon :icon="['fas', 'copy']" class="w-5" />
      </button>
    </div>
    <div
      v-if="isowner"
      class="mt-8 pt-8 mb-8 text-3xl border-t-4 border-gray-400 border-dotted"
    >
      <span class="font-semibold">共有URL</span>
      <input
        id="copyUrl"
        :value="url"
        class="mx-5 bg-orange-50 text-2xl w-80 text-center text-gray-500"
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
  data() {
    return {
      name: '',
      faceSwitch: true,
      voiceSwitch: true,
    }
  },
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
    inputNameValue() {
      this.$store.commit('inputName', this.name)
    },
    changeFaceSwitch() {
      this.$store.commit('updateFaceSwitch', this.faceSwitch)
    },
    changeVoiceSwitch() {
      this.$store.commit('updateVoiceSwitch', this.voiceSwitch)
    },
  },
}
</script>

<style scoped>
.toggle-checkbox:checked {
  @apply: right-0 border-green-400;
  right: 0;
  border-color: #68d391;
}
.toggle-checkbox:checked + .toggle-label {
  @apply: bg-green-400;
  background-color: #68d391;
}
</style>
