<template>
  <div
    class="flex items-center justify-center w-screen h-screen flex-col relative bg-cyan-300"
  >
    <room-setting-modal />
    <nuxt-link
      class="m-12 px-16 py-5 text-3xl shadow-xl bg-orange-50 rounded-2xl font-semibold"
      to="/join"
    >
      参加
    </nuxt-link>
    <room-tool-bar class="opacity-50 pointer-events-none"></room-tool-bar>
  </div>
</template>

<script>
import RoomSettingModal from '../../components/room/RoomSettingModal.vue'
// import BaseButton from '../../components/BaseButton.vue'
import RoomToolBar from '../../components/room/RoomToolBar.vue'

export default {
  components: {
    RoomToolBar,
    RoomSettingModal,
    // BaseButton,
  },
}
</script>
