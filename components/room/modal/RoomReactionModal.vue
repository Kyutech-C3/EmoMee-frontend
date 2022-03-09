<template>
  <div v-click-outside="onOutsideClick">
    <div
      class="w-14 mx-2 rounded-full cursor-pointer scale-95 hover:bg-gray-100 hover:scale-100"
      @click="showModal = !showModal"
    >
      <FontAwesomeIcon :icon="['fas', 'plus']" class="w-9 mx-auto my-2" />
    </div>
    <RoomBaseModal v-if="showModal" class="absolute bottom-24 w-48">
      <div v-for="(reaction, i) in reactionJson.reactions" :key="i">
        <p class="font-bold">{{ reaction.title }}</p>
        <div class="w-full flex flex-wrap">
          <img
            v-for="(source, j) in reaction.sources"
            :key="j"
            :src="getReactionGif(source)"
            class="w-8 cursor-pointer scale-95 hover:scale-100"
            @click="sendReaction(source)"
          />
        </div>
      </div>
    </RoomBaseModal>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import reactionJson from '@/assets/reaction/reactions.json'

export default {
  directives: {
    ClickOutside,
  },
  data() {
    return {
      showModal: false,
      reactionJson,
      reactionSources: [],
    }
  },
  methods: {
    onOutsideClick() {
      if (this.showModal) {
        this.showModal = !this.showModal
      }
    },
    getReactionGif(reaction) {
      return require(`@/assets/reaction/gif/${reaction}.gif`)
    },
    sendReaction(source) {
      this.$emit('sendReaction', { reactionName: source, isAnimation: true })
      this.showModal = !this.showModal
    },
  },
}
</script>
