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
            src="@/assets/face/neutral/1f610.png"
            alt="NeutralFace"
            class="w-10 h-10 mx-3 cursor-pointer scale-95 hover:scale-100"
            @click="translateClass = 'translate-x-0'"
          />
          <img
            src="@/assets/face/smile/smile1.gif"
            alt="SmileFace"
            class="w-12 mx-2 cursor-pointer scale-95 hover:scale-100"
            @click="translateClass = 'translate-x-[-4rem]'"
          />
          <img
            src="@/assets/face/angry/pouting_face.gif"
            alt="AngryFace"
            class="w-12 mx-2 cursor-pointer scale-95 hover:scale-100"
            @click="translateClass = 'translate-x-[-8rem]'"
          />
          <img
            src="@/assets/face/disgusted/unamused_face.gif"
            alt="DisgustedFace"
            class="w-12 mx-2 cursor-pointer scale-95 hover:scale-100"
            @click="translateClass = 'translate-x-[-12rem]'"
          />
          <img
            src="@/assets/face/fearful/face_screaming_in_fear.gif"
            alt="FearfulFace"
            class="w-12 mx-2 cursor-pointer scale-95 hover:scale-100"
            @click="translateClass = 'translate-x-[-16rem]'"
          />
          <img
            src="@/assets/face/surprise/hushed_face.gif"
            alt="SurpriseFace"
            class="w-12 mx-2 cursor-pointer scale-95 hover:scale-100"
            @click="translateClass = 'translate-x-[-20rem]'"
          />
        </div>
      </RoomBaseModal>
      <RoomBaseModal class="absolute bottom-40 w-fit z-10">
        <img
          src="@/assets/face/smile/smile1.gif"
          alt="SmileFace"
          class="w-12 m-2 cursor-pointer scale-95 hover:scale-100"
        />
        <img
          src="@/assets/face/smile/smile1.gif"
          alt="SmileFace"
          class="w-12 m-2 cursor-pointer scale-95 hover:scale-100"
        />
        <img
          src="@/assets/face/smile/smile1.gif"
          alt="SmileFace"
          class="w-12 m-2 cursor-pointer scale-95 hover:scale-100"
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
    }
  },
  methods: {
    onOutsideClick() {
      if (this.showModal) {
        this.showModal = !this.showModal
      }
    },
  },
}
</script>
