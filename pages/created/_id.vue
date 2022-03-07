<template>
  <div
    class="flex items-center justify-center w-screen h-screen flex-col relative"
  >
    <room-info class="w-192 h-80 z-10" />
    <base-button class="m-12 px-16 py-5 text-3xl shadow-xl">作成</base-button>
    <select-base-face-bar></select-base-face-bar>
    <select-reaction-bar></select-reaction-bar>
  </div>
</template>

<script>
import RoomInfo from '../../components/RoomInfo.vue'
import BaseButton from '../../components/BaseButton.vue'
import SelectReactionBar from '../../components/SelectReactionBar.vue'
import SelectBaseFaceBar from '~/components/SelectBaseFaceBar.vue'

export default {
  components: {
    SelectReactionBar,
    RoomInfo,
    BaseButton,
    SelectBaseFaceBar,
  },
}
</script>
