<template>
  <div
    id="faceWindows"
    class="flex flex-wrap justify-center h-4/5 place-items-center gap-3 mx-auto pt-5 -z-10"
    :class="[
      { 'vw-1-6': users.length < 7 },
      { 'vw-7-12': users.length >= 7 && users.length < 13 },
    ]"
  >
    <RoomFaceUser
      v-for="user in users"
      :key="user.user_id + generateUUID"
      :name="user.name"
      :face-gif="getFaceGif(user.emotion, user.emoji)"
      :voice-o-n="false"
      :class="[
        { 'w-12-space h-size-1-4': users.length < 5 },
        { 'w-13-space': users.length >= 5 && users.length < 10 },
        { 'w-14-space': users.length >= 10 && users.length < 13 },
        { 'h-size-5-6': users.length >= 5 && users.length < 7 },
        { 'h-size-7-12': users.length >= 7 && users.length < 13 },
      ]"
    />
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import emojiList from '@/assets/emoji-list.json'
export default {
  props: {
    users: {
      type: Array,
      required: true,
      default() {
        return []
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
      const path = this.emojis[emotion][emoji[emotion]].path
      return require('@/assets/' + path)
    },
    generateUUID() {
      return uuidv4()
    },
  },
}
</script>
