<template>
  <div
    id="faceWindows"
    class="flex flex-wrap justify-center h-4/5 place-items-center gap-3 mx-auto m-5"
    :class="[
      { 'vw-1-6': users.length < 7 },
      { 'vw-7-12': users.length >= 7 && users.length < 13 },
    ]"
  >
    <RoomFaceUser
      v-for="user in users"
      :key="user.id"
      :name="user.name"
      :face-image-src="user.faceGif"
      :is-speaking="user.voiceON"
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
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
}
</script>
