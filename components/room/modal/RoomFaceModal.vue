<template>
  <div v-click-outside="onOutsideClick">
    <RoomBaseButton
      class="cursor-pointer hover:bg-gray-100"
      :class="showModal ? 'bg-gray-100' : 'bg-white'"
      @click="showModal = !showModal"
    >
      <FontAwesomeIcon :icon="['far', 'face-smile']" class="w-7" />
    </RoomBaseButton>
    <transition>
      <div v-if="showModal">
        <RoomBaseModal
          class="absolute bottom-24 w-fit z-20 transition-transform"
          :class="faceBarTranslate"
        >
          <div class="flex items-center">
            <img
              v-for="(value, key, index) in myFaceSettings"
              :key="index"
              :src="getFaceGif(faceList.faces[index].paths[value])"
              :alt="`${index}: ${key} face`"
              class="w-10 h-10 mx-3 cursor-pointer scale-95 hover:scale-100"
              @click="changeBarTranslate(index, key)"
            />
          </div>
        </RoomBaseModal>
        <div v-for="(faces, i) in faceList.faces" :key="i">
          <RoomBaseModal
            v-if="selectedEmotionIndex === i"
            class="absolute bottom-40 w-fit z-10 flex flex-col-reverse"
          >
            <img
              v-for="(path, j) in faces.paths"
              :key="j"
              :src="getFaceGif(path)"
              alt="SmileFace"
              class="w-12 m-2 cursor-pointer scale-95 hover:scale-100"
              @click="sendEmojiSetting(faces.title, j)"
            />
          </RoomBaseModal>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import faceList from '@/assets/face/faces.json'

export default {
  directives: {
    ClickOutside,
  },
  data() {
    return {
      showModal: false,
      selectedEmotion: '',
      selectedEmotionIndex: 0,
      faceList,
      myFaceSettings: {
        neutral: 0,
        happy: 0,
        sad: 0,
        surprised: 0,
        disgusted: 0,
        angry: 0,
        fearful: 0,
      },
    }
  },
  computed: {
    faceBarTranslate() {
      switch (this.selectedEmotionIndex) {
        case 1:
          return '-translate-x-16'
        case 2:
          return '-translate-x-32'
        case 3:
          return '-translate-x-48'
        case 4:
          return '-translate-x-64'
        case 5:
          return '-translate-x-80'
        case 6:
          return '-translate-x-96'
        default:
          return 'translate-x-0'
      }
    },
  },
  methods: {
    onOutsideClick() {
      if (this.showModal) {
        this.showModal = !this.showModal
      }
    },
    changeBarTranslate(index, emotion) {
      this.selectedEmotionIndex = index
      this.selectedEmotion = emotion
    },
    getFaceGif(path) {
      return require(`@/assets/face/${path}`)
    },
    sendEmojiSetting(emotion, index) {
      this.myFaceSettings[emotion] = index
      this.$emit('sendEmojiSetting', { emotion, emoji: index })
    },
  },
}
</script>

<style scoped>
.v-leave-active {
  transition: opacity 0.25s;
}
.v-leave-to {
  opacity: 0;
}
</style>
