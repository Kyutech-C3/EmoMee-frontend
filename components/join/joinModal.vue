<template>
  <div
    class="rounded-3xl bg-orange-50 shadow-inner-xl w-192 h-100 z-10 py-6 px-9 text-center text-shadow-sm flex flex-col items-center justify-center"
  >
    <p class="mb-8 text-3xl font-semibold">ルーム設定</p>

    <!-- 設定項目部分 -->
    <div class="mt-2 text-3xl">
      <span v-if="$store.getters.getNameState" class="text-red-500">*</span>
      <input
        v-model="_isName"
        type="text"
        placeholder="名前を入力"
        class="outline-none border-b-2 bg-orange-50 text-2xl py-2 my-1 text-center text-gray-700 font-semibold"
        :class="
          $store.getters.getNameState ? 'border-red-400' : 'border-gray-700'
        "
        @input="inputNameValue"
      />
    </div>
    <div class="my-5 text-xl flex justify-center">
      <span class="font-semibold mr-18">表情検知</span>
      <div
        class="relative inline-block w-12 mr-2 mt-1 align-middle select-none transition duration-200 ease-in"
      >
        <input
          id="toggle"
          v-model="faceSwitch"
          type="checkbox"
          name="toggle"
          class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 appearance-none cursor-pointer"
          @input="changeFaceSwitch"
        />
        <label
          for="toggle"
          class="toggle-label block overflow-hidden h-6 w-12 rounded-full bg-gray-300 cursor-pointer"
        ></label>
      </div>
    </div>
    <div class="my-5 text-xl flex justify-center">
      <span class="font-semibold mr-18">音声検知</span>
      <div
        class="relative inline-block w-12 mr-2 mt-1 align-middle select-none transition duration-200 ease-in"
      >
        <input
          id="toggle2"
          v-model="voiceSwitch"
          type="checkbox"
          name="toggle"
          class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 appearance-none cursor-pointer"
          @input="changeVoiceSwitch"
        />
        <label
          for="toggle2"
          class="toggle-label block overflow-hidden h-6 w-12 rounded-full bg-gray-300 cursor-pointer"
        ></label>
      </div>
    </div>

    <!-- Ownerか参加者かで表示を変える． -->
    <div
      v-if="!isowner"
      class="pt-4 text-xl border-t-4 border-gray-400 border-dotted flex justify-center"
    >
      <span class="font-semibold">ルームID</span>
      <input
        id="copyId"
        :value="roomid"
        class="outline-none mx-5 font-semibold bg-orange-50 text-sm w-80 text-center text-gray-500"
        readonly
      />
      <button @click="copyId()">
        <FontAwesomeIcon :icon="['fas', 'copy']" class="w-5" />
      </button>
    </div>
    <div
      v-if="isowner"
      class="pt-4 text-xl border-t-4 border-gray-400 border-dotted flex justify-center"
    >
      <span class="font-semibold">共有URL</span>
      <input
        id="copyUrl"
        :value="url"
        class="outline-none mx-5 font-semibold bg-orange-50 text-sm w-80 text-center text-gray-500"
        readonly
      />
      <button @click="copyUrl()">
        <FontAwesomeIcon
          :icon="['fas', 'copy']"
          class="w-5 text-gray-500 hover:text-gray-800"
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'isName',
    event: 'change',
  },
  // eslint-disable-next-line vue/require-prop-types
  // props: ['roomid', 'isowner', 'url'],
  props: {
    isName: {
      type: String,
      default: '',
    },
    roomid: {
      type: String,
      default: '',
    },
    isowner: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      user_name: '',
      faceSwitch: true,
      voiceSwitch: true,
    }
  },
  computed: {
    _isName: {
      get() {
        return this.isName
      },
      set(value) {
        this.$emit('change', value)
      },
    },
  },
  created() {
    if (this.$store.getters.getDiscordUserId !== '') {
      this.user_name = this.$store.getters.getName
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
      this.$store.commit('inputName', this.user_name)
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
