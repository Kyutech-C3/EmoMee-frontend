<template>
  <div>
    {{ emotion_list }}
  </div>
</template>

<script>
import * as faceapi from 'face-api.js'

export default {
  data() {
    return {
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

      this.emotion_list = detectionWithExpression.expressions

      const pairs = Object.entries(this.emotion_list)
      pairs.sort((p1, p2) => {
        const p1Val = p1[1]
        const p2Val = p2[1]
        return p2Val - p1Val
      })

      this.emotion_list = Object.fromEntries(pairs)
      this.emotion_list = this.emotion_list.fromEntries(
        Object.entries(this.emotion_list).map(([key, val]) =>
          val < 0.3 ? delete this.emotion_list[key] : [key, val]
        )
      )
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
