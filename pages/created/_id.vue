<template>
  <div
    class="flex items-center justify-center w-screen h-screen flex-col relative bg-cyan-300"
  >
    <CreatedSettingModal />
    <nuxt-link
      class="m-12 px-16 py-5 text-3xl shadow-xl bg-orange-50 rounded-2xl font-semibold"
      to="/join"
    >
      参加
    </nuxt-link>
    <RoomToolBar class="opacity-50 pointer-events-none" />
  </div>
</template>

<script>
export default {}
</script>
