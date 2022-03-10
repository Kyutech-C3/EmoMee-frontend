<template>
  <div v-click-outside="onOutsideClick">
    <RoomBaseButton
      class="cursor-pointer hover:bg-gray-100"
      :class="showModal ? 'bg-gray-100' : 'bg-white'"
      @click="showModal = !showModal"
    >
      <FontAwesomeIcon :icon="['far', 'face-smile']" class="w-7" />
    </RoomBaseButton>
    <div v-if="showModal">
      <RoomBaseModal
        class="absolute bottom-24 w-fit z-20"
        :class="translateClass"
      >
        <div class="flex items-center">
          <img
            v-for="(value, key, index) in myFaceSettings"
            :key="index"
            :src="getFaceGif(faceList.faces[index].paths[value])"
            :alt="`${index}: ${key} face`"
            class="w-10 h-10 mx-3 cursor-pointer scale-95 hover:scale-100"
            @click="
              changeBarTranslate(index, key, `translate-x-[${index * -4}rem]`)
            "
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
      translateClass: 'translate-x-0',
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
  methods: {
    onOutsideClick() {
      if (this.showModal) {
        this.showModal = !this.showModal
      }
    },
    changeBarTranslate(index, emotion, tailwindClass) {
      this.selectedEmotionIndex = index
      this.selectedEmotion = emotion
      this.translateClass = tailwindClass
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
