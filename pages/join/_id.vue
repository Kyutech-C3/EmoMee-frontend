<template>
  <div
    class="flex items-center justify-center w-screen h-screen flex-col relative bg-cyan-300"
  >
    <JoinModal :roomid="roomId" :isowner="isOwner" :url="url" />
    <button
      class="m-12 px-18 py-7 text-3xl shadow-xl bg-orange-50 rounded-2xl font-semibold"
      @click="getRoomUrl()"
    >
      参加
    </button>
    <RoomToolBar class="opacity-50 pointer-events-none" />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  setup() {},
  data() {
    return {
      roomId: '',
      ownerRoomId: '',
      timeLimit: 0,
      hasError: false,
      responseCopy: {},
      isOwner: false,
      url: 'https://emom.ee/join/',
      getRoomInfoUrl: 'https://api.emom.ee/api/v1/room/',
    }
  },
  computed: {
    getOwnerInfo() {
      return this.$store.state.roomId
    },
    getName() {
      return this.$store.state.name
    },
    getFaseSwitch() {
      return this.$store.state.faceSwitch
    },
    getVoiceSwitch() {
      return this.$store.state.voiceSwitch
    },
  },
  async mounted() {
    this.getInfo()
    await this.getRoomInfo()
  },
  methods: {
    getInfo() {
      this.roomId = this.$route.params.id
      this.url = this.url + this.roomId
      this.ownerRoomId = this.getOwnerInfo
      if (this.roomId === this.ownerRoomId) {
        this.isOwner = true
      }
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    async getRoomInfo() {
      try {
        // API叩く
        console.log('test')
        this.getRoomInfoUrl = this.getRoomInfoUrl + this.roomId
        const response = await axios.get(this.getRoomInfoUrl)
        // データ確認
        console.log(response)
      } catch (error) {
        this.hasError = true
        await this.sleep(2000)
        this.hasError = this.$nuxt.error({
          message: 'サーバーエラー　後ほどお試しください',
        })
      }
    },
    getRoomUrl() {
      this.$router.push(`/room/${this.roomId}`)
    },
  },
}
</script>
