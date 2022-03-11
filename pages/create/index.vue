<template>
  <div
    class="background-image flex items-center justify-center w-screen h-screen flex-col relative"
  >
    <img src="../../assets/top/EmoMee_logo.png" class="w-1/4 mb-10" />
    <CreateModal />
    <button
      class="m-12 px-18 py-7 text-3xl shadow-inner-xl text-shadow-sm bg-orange-50 rounded-2xl font-semibold"
      @click="createRoom()"
    >
      ルーム作成
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
  computed: {
    getRoomLimitInfo() {
      return this.$store.state.roomLimit
    },
  },
  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    async createRoom() {
      try {
        // API叩く
        this.timeLimit = this.getRoomLimitInfo
        console.log(this.getRoomLimitInfo)
        console.log('test')
        const response = await axios.post('https://api.emom.ee/api/v1/room', {
          limit: this.timeLimit,
        })
        console.log(response)
        // データ確認
        this.roomId = response.data.room_id
        this.responseCopy = response
        this.isOwner = true
        // ストアに保存
        this.$store.commit('setOwnerInfo', this.roomId)
        console.log(this.$store.roomId)
        this.$router.push({ path: '../join/' + this.roomId })
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

<style scoped>
.background-image {
  /* background-image: url('../../assets/face/pigeon/happy.gif'); */
  /* background-image: url('../../assets/reaction/gif/middle_finger.gif'); */
  /* background-repeat: repeat; */
  /* background-size: 3%; */
  /* background-color: rgba(255, 255, 255, 0.8); */
  /* background-attachment: fixed; */
  /* background-position: right bottom; */
}
</style>
