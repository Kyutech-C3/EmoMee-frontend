<template>
  <div v-click-outside="onOutsideClick">
    <div
      class="w-14 mx-2 rounded-full cursor-pointer scale-95 hover:bg-gray-100 hover:scale-100"
      @click="showModal = !showModal"
    >
      <FontAwesomeIcon :icon="['fas', 'plus']" class="w-9 mx-auto my-2" />
    </div>
    <RoomBaseModal v-if="showModal" class="absolute bottom-24 w-56">
      <p class="font-bold">リアクション1</p>
      <ul>
        <li>
          <div class="w-full flex flex-wrap">
            <img
              src="@/assets/reaction/png/clap.png"
              class="w-8 mx-1 cursor-pointer scale-95 hover:scale-100"
            />
            <img
              src="@/assets/reaction/png/clap.png"
              class="w-8 mx-1 cursor-pointer scale-95 hover:scale-100"
            />
            <img
              src="@/assets/reaction/png/clap.png"
              class="w-8 mx-1 cursor-pointer scale-95 hover:scale-100"
            />
            <img
              src="@/assets/reaction/png/clap.png"
              class="w-8 mx-1 cursor-pointer scale-95 hover:scale-100"
            />
            <img
              src="@/assets/reaction/png/clap.png"
              class="w-8 mx-1 cursor-pointer scale-95 hover:scale-100"
            />
            <img
              src="@/assets/reaction/png/clap.png"
              class="w-8 mx-1 cursor-pointer scale-95 hover:scale-100"
            />
          </div>
        </li>
      </ul>
      <p class="font-bold mt-2">リアクション2</p>
      <ul>
        <li>
          <div class="w-full flex flex-wrap">
            <img
              src="@/assets/reaction/png/clap.png"
              class="w-8 mx-1 cursor-pointer scale-95 hover:scale-100"
            />
            <img
              src="@/assets/reaction/png/clap.png"
              class="w-8 mx-1 cursor-pointer scale-95 hover:scale-100"
            />
            <img
              src="@/assets/reaction/png/clap.png"
              class="w-8 mx-1 cursor-pointer scale-95 hover:scale-100"
            />
            <img
              src="@/assets/reaction/png/clap.png"
              class="w-8 mx-1 cursor-pointer scale-95 hover:scale-100"
            />
          </div>
        </li>
      </ul>
    </RoomBaseModal>
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
