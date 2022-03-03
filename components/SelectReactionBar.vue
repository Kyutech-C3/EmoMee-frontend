<template>
  <div
    class="flex justify-center border border-gray-300 rounded-full px-8 py-1 w-fit mx-auto drop-shadow-md bg-color"
  >
    <div class="flex">
      <img
        v-for="faceReaction in faceReactions"
        :key="faceReaction.id"
        :src="faceReaction.img"
        :alt="faceReaction.name"
        :title="faceReaction.id"
        class="w-16 h-16 mx-1 cursor-pointer rounded-full hover:bg-gray-200 select-none"
        @click="selectNoFaceReaction"
      />
    </div>
    <div class="border-2 border-gray-300 w-1 my-3 mx-3 select-none"></div>
    <div class="flex">
      <img
        v-for="faceReaction in faceReactions"
        :key="faceReaction.id"
        :src="faceReaction.img"
        :alt="faceReaction.name"
        :title="faceReaction.id"
        class="w-16 h-16 mx-1 cursor-pointer rounded-full hover:bg-gray-200 select-none"
        @click="selectFaceReaction"
      />
    </div>
    <font-awesome-icon
      class="w-10 mx-4 text-gray-500 hover:text-gray-700 cursor-pointer select-none"
      :icon="['fas', 'circle-plus']"
      @click="openReactionModal"
    />
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
    }
  },
  methods: {
    generateUUID() {
      return uuidv4()
    },
    openReactionModal() {
      this.activeModal = !this.activeModal
    },
  },
}
</script>

<style scoped>
.bg-color {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
