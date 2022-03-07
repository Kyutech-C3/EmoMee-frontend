<template>
  <div class="transition-all overflow-visible">
    <div
      id="selectBaseFaceBer"
      class="border border-gray-300 rounded-full px-1 py-5 w-20 origin-shadow bg-color m-0"
    >
      <div v-for="face in baseFace" :key="face.id" class="select-none h-24">
        <p class="text-center">{{ face.type }}</p>
        <img
          :src="face.img"
          :alt="face.name"
          :title="face.name"
          class="w-16 h-16 mx-auto cursor-pointer rounded-full hover:bg-black hover:bg-opacity-10 select-none z-50"
          @click="openSelectFaceModal(face.type)"
        />
        <div
          class="flex justify-center border border-gray-300 rounded-full px-8 py-1 mx-auto origin-shadow bg-color relative bottom-18 transition-all z-50"
          :class="
            activeModal === face.type
              ? 'w-96 opacity-100 visible right-100'
              : 'w-0 opacity-0 invisible right-20'
          "
        >
          <img
            v-for="faceReaction in faceList"
            :key="faceReaction.id"
            :src="faceReaction.img"
            :alt="faceReaction.name"
            :title="faceReaction.name"
            class="w-16 h-16 mx-1 cursor-pointer rounded-full hover:bg-black hover:bg-opacity-10 select-none block"
            @click="selectNoFaceReaction"
          />
        </div>
      </div>
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
          img: require('@/assets/pigeon/nuetral.png'),
        },
        // {
        //   id: this.generateUUID(),
        //   name: 'smile face 2',
        //   img: require('@/assets/emoji/base/smile/smile2.gif'),
        // },
        // {
        //   id: this.generateUUID(),
        //   name: 'smile face 3',
        //   img: require('../assets/emoji/base/smile/smile3.gif'),
        // },
        // {
        //   id: this.generateUUID(),
        //   name: 'smile face 4',
        //   img: require('../assets/emoji/base/smile/smile4.gif'),
        // },
        // {
        //   id: this.generateUUID(),
        //   name: 'smile face 5',
        //   img: require('../assets/emoji/base/smile/smile5.gif'),
        // },
      ],
      baseFace: {
        neutral: {
          id: this.generateUUID(),
          name: 'smile face 1',
          type: 'neutral',
          img: require('@/assets/pigeon/nuetral.png'),
        },
        // smile: {
        //   id: this.generateUUID(),
        //   name: 'smile face 2',
        //   type: 'smile',
        //   img: require('@/assets/emoji/base/smile/smile2.gif'),
        // },
        // sad: {
        //   id: this.generateUUID(),
        //   name: 'smile face 3',
        //   type: 'sad',
        //   img: require('../assets/emoji/base/smile/smile3.gif'),
        // },
        // angry: {
        //   id: this.generateUUID(),
        //   name: 'smile face 4',
        //   type: 'angry',
        //   img: require('../assets/emoji/base/smile/smile4.gif'),
        // },
        // surprise: {
        //   id: this.generateUUID(),
        //   name: 'smile face 5',
        //   type: 'surprise',
        //   img: require('../assets/emoji/base/smile/smile5.gif'),
        // },
      },
      activeModal: '',
    }
  },
  methods: {
    generateUUID() {
      return uuidv4()
    },
    openSelectFaceModal(faceType) {
      if (this.activeModal === faceType) {
        this.activeModal = ''
      } else {
        this.activeModal = faceType
      }
      // eslint-disable-next-line no-console
      console.log(this.activeModal)
    },
    selectNoFaceReaction() {
      this.openSelectFaceModal('')
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
