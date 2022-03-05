<template>
  <div class="flex items-center mx-auto w-fit">
    <font-awesome-icon
      class="w-10 cursor-pointer select-none"
      :class="voiceOFF ? 'text-gray-100' : 'text-gray-500 hover:text-gray-100'"
      :icon="['fas', 'microphone-slash']"
      @click="voiceOFF = !voiceOFF"
    />
    <font-awesome-icon
      class="w-10 ml-8 mr-16 cursor-pointer select-none"
      :class="videoOFF ? 'text-gray-100' : 'text-gray-500 hover:text-gray-100'"
      :icon="['fas', 'video-slash']"
      @click="videoOFF = !videoOFF"
    />
    <div
      class="flex border border-gray-300 rounded-full px-8 py-1 w-fit origin-shadow bg-color transition-all"
    >
      <div class="flex">
        <img
          v-for="faceReaction in faceReactions"
          :key="faceReaction.id"
          :src="faceReaction.img"
          :alt="faceReaction.name"
          :title="faceReaction.name"
          class="w-16 h-16 mx-1 cursor-pointer rounded-full select-none hover:bg-black hover:bg-opacity-10"
          @click="selectNoFaceReaction"
        />
      </div>
      <div
        class="border-2 border-gray-400 w-1 my-3 mx-3 select-none rounded"
      ></div>
      <div class="flex">
        <img
          v-for="faceReaction in faceReactions"
          :key="faceReaction.id"
          :src="faceReaction.img"
          :alt="faceReaction.name"
          :title="faceReaction.name"
          class="w-16 h-16 mx-1 cursor-pointer rounded-full hover:bg-black hover:bg-opacity-10 select-none"
          @click="selectFaceReaction"
        />
      </div>
      <font-awesome-icon
        class="w-10 mx-4 text-gray-600 hover:text-gray-800 cursor-pointer select-none"
        :icon="['fas', 'circle-plus']"
        @click="openReactionModal"
      />
    </div>
    <base-button
      class="bg-red-500 ml-16 mr-6 px-8 py-2.5 rounded-lg hover:bg-red-600 hover:drop-shadow-xl select-none"
      :to="''"
      @click="exitRoomWarning"
    >
      退出
    </base-button>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  data() {
    return {
      faceReactions: [
        {
          id: this.generateUUID(),
          name: 'smile face 1',
          img: require('@/assets/emoji/base/smile/smile1.gif'),
        },
        {
          id: this.generateUUID(),
          name: 'smile face 2',
          img: require('@/assets/emoji/base/smile/smile2.gif'),
        },
        {
          id: this.generateUUID(),
          name: 'smile face 3',
          img: require('../assets/emoji/base/smile/smile3.gif'),
        },
        {
          id: this.generateUUID(),
          name: 'smile face 4',
          img: require('../assets/emoji/base/smile/smile4.gif'),
        },
      ],
      activeModal: false,
      voiceOFF: false,
      videoOFF: false,
      warning: false,
    }
  },
  methods: {
    generateUUID() {
      return uuidv4()
    },
    openReactionModal() {
      this.activeModal = !this.activeModal
    },
    selectNoFaceReaction() {},
    selectFaceReaction() {},
    exitRoomWarning() {
      this.warning = !this.warning
    },
    exitRoom() {
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.bg-color {
  background-color: rgba(255, 255, 255, 0.7);
}
.origin-shadow {
  box-shadow: inset 0 0 10px 0 rgba(0, 0, 0, 0.5);
}
</style>
