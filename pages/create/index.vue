<template>
  <div
    class="flex items-center justify-center w-screen h-screen flex-col relative"
  >
    <CreateModal />
    <button
      class="m-12 px-16 py-5 text-3xl shadow-xl bg-orange-50 rounded-2xl font-semibold"
      @click="createRoom()"
    >
      参加
    </button>
    <div v-if="hasError" class="text-red-600 font-semibold text-xl">
      ルームを作成出来ませんでした．
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  setup() {},
  data() {
    return {
      roomId: '',
      timeLimit: 0,
      isOwner: true,
      hasError: false,
      responseCopy: {},
    }
  },
  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    async createRoom() {
      try {
        // API叩く
        console.log('test')
        const response = await axios.post(
          'https://api.emom.ee/api/v1/room',
          null,
          { limit: this.timeLimit }
        )
        console.log(response)
        // データ確認
        this.roomId = response.data.room_id
        this.responseCopy = response
        this.isOwner = true
        // ストアに保存
        this.$store.commit('setOwnerInfo', this.roomId)
        console.log(this.$store.roomId)
        this.$router.push({ path: 'join/' + this.roomId })
      } catch (error) {
        this.hasError = true
        await this.sleep(2000)
        this.hasError = this.$nuxt.error({
          message: 'サーバーエラー　後ほどお試しください',
        })
      }
    },
  },
}
</script>
