<template>
  <div v-click-outside="onOutsideClick">
    <div
      class="w-14 mx-2 rounded-full cursor-pointer scale-95 hover:bg-gray-100 hover:scale-100"
      @click="showModal = !showModal"
    >
      <FontAwesomeIcon :icon="['fas', 'plus']" class="w-9 mx-auto my-2" />
    </div>
    <transition>
      <RoomBaseModal v-if="showModal" class="absolute bottom-24 w-48">
        <div
          v-for="(reaction, i) in reactionJson.reactions"
          :key="i"
          :class="loadCount >= sourceCount ? 'block' : 'hidden'"
        >
          <p class="font-bold">{{ reaction.title }}</p>
          <div class="w-full flex flex-wrap">
            <img
              v-for="(source, j) in reaction.sources"
              :key="j"
              :src="getReactionGif(source)"
              class="w-8 cursor-pointer scale-95 hover:scale-100"
              @click="sendReaction(source)"
              @load="loadReaction()"
            />
          </div>
        </div>
        <div :class="loadCount < sourceCount ? 'block' : 'hidden'">
          <LoadingAnimation />
        </div>
      </RoomBaseModal>
    </transition>
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
      sourceCount: 0,
      loadCount: 0,
    }
  },
  created() {
    this.reactionJson.reactions.forEach((reaction) => {
      this.sourceCount += reaction.sources.length
    })
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
    loadReaction() {
      if (this.loadCount < this.sourceCount) {
        this.loadCount++
      }
    },
  },
}
</script>

<style scoped>
.v-leave-active {
  transition: opacity 0.25s;
}
.v-leave-to {
  opacity: 0;
}
</style>
