<template>
  <div>
    <p>{{ emotion_list }}</p>
    <p>{{ top }}</p>
  </div>
</template>

<script>
import * as faceapi from 'face-api.js'

export default {
  data() {
    return {
      top_history: [],
      top: '',
      emotion_list: {},
    }
  },
  methods: {
    async loadModels(img) {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/weights')
      await faceapi.nets.faceExpressionNet.loadFromUri('/weights')
      setInterval(this.analysys, 100, img)
    },
    async analysys(img) {
      const detectionWithExpression = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions()

      if ('expressions' in detectionWithExpression) {
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
    },
  },
  mounted() {
    const video = document.createElement('video')
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream
        video.play()
        this.loadModels(video)
      })
    }
  },
}
</script>
