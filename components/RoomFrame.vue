<template>
  <div class="relative h-screen overflow-hidden">
    <div
      v-if="!headerOpen"
      class="h-18 w-full absolute z-20 top-0"
      @mouseover="headerOpen = true"
    ></div>
    <div
      v-if="headerOpen || selectBaseFaceBarOpen"
      class="w-full h-full absolute z-0"
      @mouseover="closeModal"
    ></div>
    <room-header
      :class="
        headerOpen ? 'top-0 opacity-100 visible' : '-top-18 opacity-0 invisible'
      "
    />
    <p>{{ emotion_list }}</p>
    <p>{{ top }}</p>
    <p>face_detected: {{ face_detected }}</p>
    <p>is_tiny_model: {{ tinyModel }}</p>
    <p>volume: {{ volume }}</p>
    <div
      class="w-40 h-full absolute z-10 right-0 top-0"
      @mouseover="selectBaseFaceBarOpen = true"
    ></div>
    <select-base-face-bar
      ref="child"
      class="absolute bottom-0 top-0 z-50"
      :class="
        selectBaseFaceBarOpen
          ? 'right-10 opacity-100 visible'
          : '-right-20 opacity-0 invisible'
      "
    />
    <select-reaction-bar class="absolute bottom-10 left-0 right-0" />
  </div>
</template>

<script>
import * as faceapi from 'face-api.js'
import SelectBaseFaceBar from '@/components/SelectBaseFaceBar.vue'
import RoomHeader from '@/components/RoomHeader.vue'
import SelectReactionBar from '@/components/SelectReactionBar.vue'

export default {
  components: {
    RoomHeader,
    SelectReactionBar,
    SelectBaseFaceBar,
  },
  props: {
    tinyModel: {
      type: Boolean,
      required: true,
      default() {
        return false
      },
    },
  },
  data() {
    return {
      top_history: [],
      top: '',
      face_detected: false,
      emotion_list: {},
      volume: 0,
      analyser: null,
      headerOpen: false,
      selectBaseFaceBarOpen: false,
    }
  },
  mounted() {
    const video = document.createElement('video')
    video.muted = true
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: { echoCancellation: true } })
        .then((stream) => {
          video.srcObject = stream
          video.play()
          this.loadAudioAnalyser(stream)
          this.loadModels(video)
        })
    }
  },
  methods: {
    loadAudioAnalyser(stream) {
      const audioContext = new AudioContext()
      this.analyser = audioContext.createAnalyser()
      const microphone = audioContext.createMediaStreamSource(stream)
      this.analyser.fftSize = 512
      this.analyser.minDecibels = -127
      this.analyser.maxDecibels = 0
      this.analyser.smoothingTimeConstant = 0.4
      microphone.connect(this.analyser)
    },
    async loadModels(img) {
      if (this.tinyModel) {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/weights')
      } else {
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/weights')
      }
      await faceapi.nets.faceExpressionNet.loadFromUri('/weights')
      setInterval(this.analysys, 100, img)
    },
    async analysys(img) {
      let faceDetectorOptions = new faceapi.SsdMobilenetv1Options()
      if (this.tinyModel) {
        faceDetectorOptions = new faceapi.TinyFaceDetectorOptions()
      }

      const detectionWithExpression = await faceapi
        .detectSingleFace(img, faceDetectorOptions)
        .withFaceExpressions()

      if (
        detectionWithExpression != null &&
        'detection' in detectionWithExpression
      ) {
        this.face_detected = true
        if (detectionWithExpression.expressions !== undefined) {
          let pairs = Object.entries(detectionWithExpression.expressions)
          pairs = pairs.filter((pair) => pair[1] >= 0.3)

          pairs.sort((p1, p2) => {
            return p2[1] - p1[1]
          })

          if (pairs.length > 0) {
            this.top_history.push(pairs[0][0])
            if (this.top_history.length > 5) {
              this.top_history.shift()
            }

            const historyCountMap = {}
            for (const history of this.top_history) {
              if (historyCountMap[history] === undefined) {
                historyCountMap[history] = 0
              } else {
                historyCountMap[history] += 1
              }
            }

            const historyPairs = Object.entries(historyCountMap)
            historyPairs.sort((p1, p2) => {
              return p2[1] - p1[1]
            })
            this.top = historyPairs[0][0]
            this.emotion_list = Object.fromEntries(pairs)
          }
        }
      } else {
        this.face_detected = false
      }

      const volumes = new Uint8Array(this.analyser.frequencyBinCount)
      this.analyser.getByteFrequencyData(volumes)
      const volumeSum = volumes.reduce((prev, current) => prev + current)
      const average = volumeSum / volumes.length

      this.volume = Math.min(Math.round(average / 10), 9)
    },
    closeModal() {
      this.headerOpen = false
      this.selectBaseFaceBarOpen = false
      this.$refs.child.openSelectFaceModal('')
    },
  },
}
</script>
