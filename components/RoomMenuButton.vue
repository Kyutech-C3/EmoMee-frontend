<template>
  <div v-click-outside="onOutsideClick">
    <RoomBaseButton
      class="cursor-pointer hover:bg-gray-100"
      :class="showModal ? 'bg-gray-100' : 'bg-white'"
      @click="showModal = !showModal"
    >
      <FontAwesomeIcon :icon="['fas', 'ellipsis-vertical']" class="w-2" />
    </RoomBaseButton>
    <RoomBaseModal v-if="showModal" class="absolute bottom-32 w-56">
      <ul>
        <li class="flex justify-between items-center my-3">
          <p>表情検知</p>
          <BaseToggleButton />
        </li>
        <li class="flex justify-between items-center my-3">
          <p>音声検知</p>
          <BaseToggleButton />
        </li>
        <li class="flex justify-between items-center my-3">
          <p>リンクのコピー</p>
          <div
            class="px-5 py-1 hover:bg-gray-100 cursor-pointer"
            @click="copyLink(linkUrl)"
          >
            <FontAwesomeIcon :icon="['fas', 'copy']" class="w-5" />
          </div>
        </li>
      </ul>
    </RoomBaseModal>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  directives: {
    ClickOutside,
  },
  props: {
    linkUrl: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      showModal: false,
    }
  },
  methods: {
    async copyLink(linkUrl) {
      try {
        await navigator.clipboard.writeText(linkUrl)
        alert('リンクをコピーしました')
      } catch (err) {
        alert('コピーに失敗しました')
      }
    },
    onOutsideClick() {
      if (this.showModal) {
        this.showModal = !this.showModal
      }
    },
  },
}
</script>
