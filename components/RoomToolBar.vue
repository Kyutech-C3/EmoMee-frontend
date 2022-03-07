<template>
  <div
    class="w-full flex items-center justify-between px-8 select-none absolute bottom-4"
  >
    <RoomStatusButton :is-afk="isAfk" @click="isAfk = !isAfk" />
    <div class="flex items-center">
      <RoomFaceModal />
      <RoomBaseButton class="mx-5">
        <div class="flex">
          <img
            v-for="(reactionIcon, i) in reactionIcons"
            :key="i"
            :src="reactionIcon"
            alt=""
            class="w-14 mx-2 p-1.5 rounded-full cursor-pointer scale-95 hover:bg-gray-100 hover:scale-100"
          />
          <RoomReactionModal />
        </div>
      </RoomBaseButton>
      <RoomMenuModal />
    </div>
    <RoomBaseButton class="cursor-pointer bg-yellow-100 hover:bg-yellow-200">
      <p class="text-xl">退室</p>
    </RoomBaseButton>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reactionIcons: [
        require('@/assets/reaction/png/thumbsup.png'),
        require('@/assets/reaction/png/raised-hand.png'),
        require('@/assets/reaction/png/clap.png'),
        require('@/assets/reaction/png/pray.png'),
        require('@/assets/reaction/png/heart.png'),
      ],
      isAfk: false,
    }
  },
}
</script>
