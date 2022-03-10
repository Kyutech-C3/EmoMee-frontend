<template>
  <div
    id="faceWindows"
    class="h-5/6 mx-auto my-2 flex flex-wrap content-center justify-center"
    :class="
      users.length === 5 || users.length === 6 || users.length === 9
        ? 'max-w-[912px]'
        : 'max-w-[1216px]'
    "
  >
    <RoomFaceUser
      v-for="user in users"
      :key="user.user_id"
      :name="user.name"
      :face-image-src="
        user.is_afk
          ? require('@/assets/face/pigeon/riseki_sleep.git.png')
          : getFaceGif(user.user_id, user.emotion, user.emoji)
      "
      :is-speaking="user.is_speaking"
      class="m-2"
    />
  </div>
</template>

<script>
import faceJson from '@/assets/face/faces.json'

export default {
  props: {
    users: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
    reactionInfo: {
      type: Object,
      required: true,
      default() {
        return {
          user_id: '',
          reaction: '',
          is_animation: false,
        }
      },
    },
  },
  data() {
    return {
      faceJson,
    }
  },
  methods: {
    getFaceGif(id, emotion, emoji) {
      if (this.reactionInfo.user_id === id) {
        const type = this.reactionInfo.is_animation ? 'gif' : 'png'
        return require(`@/assets/reaction/${type}/${this.reactionInfo.reaction}.${type}`)
      } else {
        const matchFace = this.faceJson.faces.find(
          (value) => value.title === emotion
        )
        return require(`@/assets/face/${matchFace.paths[emoji[emotion]]}`)
      }
    },
  },
}
</script>
