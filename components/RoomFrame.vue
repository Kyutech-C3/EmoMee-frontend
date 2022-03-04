<template>
  <div>
    <p>{{ emotion_list }}</p>
    <p>{{ top }}</p>
    <p>face_detected: {{ face_detected }}</p>
    <p>is_tiny_model: {{ tinyModel }}</p>
    <p>volume: {{ volume }}</p>
  </div>
</template>

<script>
import * as faceapi from 'face-api.js'

export default {
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
}
</script>
