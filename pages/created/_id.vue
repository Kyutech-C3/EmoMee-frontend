<template>
  <div
    class="flex items-center justify-center w-screen h-screen flex-col relative bg-cyan-300"
  >
    <CreatedSettingModal />
    <button
      class="m-12 px-16 py-5 text-3xl shadow-xl bg-orange-50 rounded-2xl font-semibold"
      @click="createRoom()"
    >
      参加
    </button>
    <RoomToolBar class="opacity-50 pointer-events-none" />
  </div>
</template>

<script>
export default {
  setup() {},
  data() {
    return {
      ownerInfo: {
        roomId: '',
      },
      show: false,
    }
  },
  methods: {
    async createRoom() {
      try {
        const response = await this.$axios.$post(
          'https://api.emom.ee/api/v1/room'
        )
        this.ownerInfo.roomId = response.data.room_id
        console.log(response)
        this.$store.commit('setOwnerInfo', this.ownerInfo.roomId)
        console.log(this.$store.state.isOwner)
      } catch (error) {
        this.hasError = true
      }
    },
  },
}
</script>
