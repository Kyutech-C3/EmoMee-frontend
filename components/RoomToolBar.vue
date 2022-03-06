<template>
  <div class="flex items-center justify-between mx-8 select-none">
    <RoomStatusButton :is-afk="isAfk" @click="isAfk = !isAfk" />
    <div class="flex items-center">
      <RoomBaseButton class="cursor-pointer hover:bg-gray-100">
        <FontAwesomeIcon :icon="['far', 'face-smile']" class="w-7" />
      </RoomBaseButton>
      <RoomBaseButton class="mx-5">
        <div class="flex">
          <img
            v-for="(reactionIcon, i) in reactionIcons"
            :key="i"
            :src="reactionIcon"
            alt=""
            class="w-14 mx-1 rounded-full cursor-pointer hover:bg-gray-100"
          />
        </div>
      </RoomBaseButton>
      <RoomMenuButton />
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
        require('@/assets/emoji/base/smile/smile1.gif'),
        require('@/assets/emoji/base/smile/smile1.gif'),
        require('@/assets/emoji/base/sad/pleading_face.gif'),
        require('@/assets/emoji/base/angry/pouting_face.gif'),
        require('@/assets/emoji/base/surprise/hushed_face.gif'),
      ],
      isAfk: false,
    }
  },
}
</script>
