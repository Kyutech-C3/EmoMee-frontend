<template>
  <div
    class="border border-gray-300 rounded-full px-1 py-5 w-fit drop-shadow-md bg-color"
  >
    <div v-for="face in faceList" :key="face.id" class="my-5">
      <span>{{ face.type }}</span>
      <img
        :src="face.img"
        :alt="face.name"
        :title="face.name"
        class="w-16 h-16 cursor-pointer rounded-full hover:bg-gray-200 select-none"
        @click="openSelectFaceModal"
      />
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  data() {
    return {
      faceList: [
        {
          id: this.generateUUID(),
          name: 'smile face 1',
          type: 'neutral',
          img: require('@/assets/emoji/base/smile/smile1.gif'),
        },
        {
          id: this.generateUUID(),
          name: 'smile face 2',
          type: 'smile',
          img: require('@/assets/emoji/base/smile/smile2.gif'),
        },
        {
          id: this.generateUUID(),
          name: 'smile face 3',
          type: 'sad',
          img: require('../assets/emoji/base/smile/smile3.gif'),
        },
        {
          id: this.generateUUID(),
          name: 'smile face 4',
          type: 'angry',
          img: require('../assets/emoji/base/smile/smile4.gif'),
        },
        {
          id: this.generateUUID(),
          name: 'smile face 5',
          type: 'surprise',
          img: require('../assets/emoji/base/smile/smile5.gif'),
        },
      ],
      activeModal: false,
    }
  },
  methods: {
    generateUUID() {
      return uuidv4()
    },
    openSelectFaceModal() {
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
