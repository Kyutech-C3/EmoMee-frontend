<template>
  <div
    class="flex items-center justify-center w-full h-screen flex-col relative"
  >
    <div class="absolute bg-red-200 w-2/5 h-80 right-0 top-0 z-0"></div>
    <div class="absolute bg-orange-200 w-2/4 h-80 left-0 z-0"></div>
    <room-setting-form class="w-192 h-80 z-10" />
    <base-button class="m-12 px-16 py-5 text-3xl">作成</base-button>
  </div>
</template>

<script>
import RoomSettingForm from '../../components/room/RoomSettingForm.vue'
import BaseButton from '../../components/BaseButton.vue'

export default {
  components: {
    RoomSettingForm,
    BaseButton,
  },
}
</script>
