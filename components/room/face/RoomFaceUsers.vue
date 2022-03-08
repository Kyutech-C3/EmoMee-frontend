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
          ? require('@/assets/pigeon/riseki_sleep.git.png')
          : getFaceGif(user.emotion, user.emoji)
      "
      :is-speaking="user.is_speaking"
      class="m-2"
    />
  </div>
</template>

<script>
import emojiList from '@/assets/emoji-list.json'

export default {
  props: {
    users: {
      type: Array,
      required: true,
      default() {
        return [
          {
            user_id: '001',
            name: 'テスト',
            emotion: 'neutral',
            is_afk: false,
            emoji: {
              neutral: 0,
              happy: 0,
              sad: 0,
              angry: 0,
              fearful: 0,
              disgusted: 0,
              surprised: 0,
            },
          },
        ]
      },
    },
  },
  data() {
    return {
      emojis: emojiList,
    }
  },
  methods: {
    getFaceGif(emotion, emoji) {
      const path = this.emojis[emotion][emoji[emotion]]
      return require('@/assets/' + path)
    },
  },
}
</script>
