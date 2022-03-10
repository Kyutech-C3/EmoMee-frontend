<template>
  <div v-click-outside="onOutsideClick">
    <RoomBaseButton
      class="cursor-pointer hover:bg-gray-100"
      :class="showModal ? 'bg-gray-100' : 'bg-white'"
      @click="showModal = !showModal"
    >
      <FontAwesomeIcon :icon="['fas', 'ellipsis-vertical']" class="w-2" />
    </RoomBaseButton>
    <RoomBaseModal v-if="showModal" class="absolute bottom-20 w-60">
      <ul>
        <li class="flex justify-between items-center my-3">
          <p>表情検知</p>
          <BaseToggleButton
            :parentValue="isFaceDetectorEnabled"
            @updateValue="
              (v) => {
                isFaceDetectorEnabled = v
                updateMenuValues()
              }
            "
          />
        </li>
        <li class="flex justify-between items-center my-3">
          <p>音声検知</p>
          <BaseToggleButton
            :parentValue="isAudioDetectorEnabled"
            @updateValue="
              (v) => {
                isAudioDetectorEnabled = v
                updateMenuValues()
              }
            "
          />
        </li>
        <li class="flex justify-between items-center my-3">
          <p>招待リンクのコピー</p>
          <div
            class="px-5 py-1 hover:bg-gray-100 cursor-pointer"
            @click="copyLink()"
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
      isFaceDetectorEnabled: true,
      isAudioDetectorEnabled: true,
    }
  },
  methods: {
    async copyLink() {
      // console.log(window.location.host)
      try {
        const url = `join/${this.$route.params.id}`
        const { protocol, hostname, host } = window.location
        if (hostname !== 'localhost') {
          await navigator.clipboard.writeText(`https://emom.ee/${url}`)
        } else {
          await navigator.clipboard.writeText(`${protocol}//${host}/${url}`)
        }
        alert('リンクをコピーしました')
      } catch (err) {
        console.error(err)
        alert('コピーに失敗しました')
      }
    },
    onOutsideClick() {
      if (this.showModal) {
        this.showModal = !this.showModal
      }
    },
    updateMenuValues() {
      this.$emit(
        'updateMenuValues',
        this.isFaceDetectorEnabled,
        this.isAudioDetectorEnabled
      )
    },
  },
}
</script>
