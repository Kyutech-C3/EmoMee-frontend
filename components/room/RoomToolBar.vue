<template>
  <div
    class="w-full flex items-center justify-between px-8 select-none absolute bottom-4"
  >
    <RoomStatusButton :is-afk="isAfk" @click="sendAfkStatus()" />
    <div class="flex items-center">
      <RoomFaceModal
        @sendEmojiSetting="(event) => $emit('sendEmojiSetting', event)"
      />
      <RoomBaseButton class="mx-5">
        <div class="flex">
          <img
            v-for="reaction in reactions"
            :key="reaction.name"
            :src="reaction.icon"
            :alt="reaction.name"
            class="w-14 mx-2 p-1.5 rounded-full cursor-pointer scale-95 hover:bg-gray-100 hover:scale-100"
            @click="
              $emit('sendReaction', {
                reactionName: reaction.name,
                isAnimation: reaction.isAnimation,
              })
            "
          />
          <RoomReactionModal
            @sendReaction="(event) => $emit('sendReaction', event)"
          />
        </div>
      </RoomBaseButton>
      <RoomMenuModal />
    </div>
    <RoomBaseButton
      class="cursor-pointer bg-yellow-100 hover:bg-yellow-200"
      @click="$emit('leavingRoom')"
    >
      <p class="text-xl">退室</p>
    </RoomBaseButton>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reactions: [
        {
          name: 'thumbsup',
          icon: require('@/assets/reaction/png/thumbsup.png'),
          isAnimation: true,
        },
        {
          name: 'raised_hand',
          icon: require('@/assets/reaction/png/raised_hand.png'),
          isAnimation: false,
        },
        {
          name: 'clap',
          icon: require('@/assets/reaction/png/clap.png'),
          isAnimation: true,
        },
        {
          name: 'pray',
          icon: require('@/assets/reaction/png/pray.png'),
          isAnimation: false,
        },
        {
          name: 'heart',
          icon: require('@/assets/reaction/png/heart.png'),
          isAnimation: true,
        },
      ],
      isAfk: false,
    }
  },
  methods: {
    sendAfkStatus() {
      this.isAfk = !this.isAfk
      this.$emit('sendAfkStatus', this.isAfk)
    },
  },
}
</script>
