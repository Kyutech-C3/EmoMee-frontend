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
            src="@/assets/face/neutral/neutral_face.png"
            alt="NeutralFace"
            class="w-10 h-10 mx-3 cursor-pointer scale-95 hover:scale-100"
            @click="changeBarTranslate('neutral', 'translate-x-0')"
          />
          <img
            src="@/assets/face/happy/happy1.gif"
            alt="SmileFace"
            class="w-12 mx-2 cursor-pointer scale-95 hover:scale-100"
            @click="changeBarTranslate('happy', 'translate-x-[-4rem]')"
          />
          <img
            src="@/assets/face/angry/pouting_face.gif"
            alt="AngryFace"
            class="w-12 mx-2 cursor-pointer scale-95 hover:scale-100"
            @click="changeBarTranslate('angry', 'translate-x-[-8rem]')"
          />
          <img
            src="@/assets/face/disgusted/unamused_face.gif"
            alt="DisgustedFace"
            class="w-12 mx-2 cursor-pointer scale-95 hover:scale-100"
            @click="changeBarTranslate('disgusted', 'translate-x-[-12rem]')"
          />
          <img
            src="@/assets/face/fearful/face_screaming_in_fear.gif"
            alt="FearfulFace"
            class="w-12 mx-2 cursor-pointer scale-95 hover:scale-100"
            @click="changeBarTranslate('fearful', 'translate-x-[-16rem]')"
          />
          <img
            src="@/assets/face/surprised/hushed_face.gif"
            alt="SurpriseFace"
            class="w-12 mx-2 cursor-pointer scale-95 hover:scale-100"
            @click="changeBarTranslate('surprise', 'translate-x-[-20rem]')"
          />
        </div>
      </RoomBaseModal>
      <RoomBaseModal class="absolute bottom-40 w-fit z-10">
        <img
          src="@/assets/face/happy/happy1.gif"
          alt="SmileFace"
          class="w-12 m-2 cursor-pointer scale-95 hover:scale-100"
          @click="(event) => $emit('sendEmojiSetting', selectedEmotion, 0)"
        />
        <img
          src="@/assets/face/happy/happy1.gif"
          alt="SmileFace"
          class="w-12 m-2 cursor-pointer scale-95 hover:scale-100"
          @click="(event) => $emit('sendEmojiSetting', selectedEmotion, 1)"
        />
        <img
          src="@/assets/face/happy/happy1.gif"
          alt="SmileFace"
          class="w-12 m-2 cursor-pointer scale-95 hover:scale-100"
          @click="(event) => $emit('sendEmojiSetting', selectedEmotion, 2)"
        />
      </RoomBaseModal>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  directives: {
    ClickOutside,
  },
  data() {
    return {
      showModal: false,
      translateClass: 'translate-x-0',
      selectedEmotion: '',
    }
  },
  methods: {
    onOutsideClick() {
      if (this.showModal) {
        this.showModal = !this.showModal
      }
    },
    changeBarTranslate(emotion, tailwindClass) {
      this.selectedEmotion = emotion
      this.translateClass = tailwindClass
    },
  },
}
</script>
