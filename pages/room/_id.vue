<template>
  <div class="relative h-screen overflow-hidden">
    <div class="absolute -z-10">
      <p>{{ emotionList }}</p>
      <p>{{ top }}</p>
      <p>face_detected: {{ faceDetected }}</p>
      <p>is_tiny_model: {{ tinyModel }}</p>
      <p>volume: {{ volume }}</p>
    </div>
    <RoomFaceUsers :key="key" :users="roomInformation.users" />
    <RoomToolBar
      @sendAfkStatus="sendAfkStatus"
      @sendEmojiSetting="sendEmojiSetting"
      @sendReaction="sendReaction"
      @leavingRoom="leavingRoom"
    />
  </div>
</template>

<script>
import * as faceapi from 'face-api.js'

export default {
  data() {
    return {
      tinyModel: false,
      topHistory: [],
      top: '',
      faceDetected: false,
      emotionList: {},
      volume: 0,
      analyser: null,
      key: 0,
      isEnabledFaceFeature: false,
      isEnabledAudioFeature: false,
      ws: null,
      userName: '',
      userId: '',
      prevStatus: 'neutral',
      roomInformation: {},
      video: null,
      stream: null,
    }
  },
  mounted() {
    this.loadModels()
    this.video = document.createElement('video')
    this.video.muted = true
    if (this.$route.query.face_enable !== 'false') {
      this.startMedia(true, true)
    }

    this.userName = this.$route.query.user_name
    this.ws = new WebSocket(
      `${this.$config.webSocketBaseUrl}${this.$route.params.id}?user_name=${this.userName}`
    )

    if (this.ws !== null) {
      this.ws.onerror = (err) => {
        // eslint-disable-next-line no-console
        console.error(err)
      }
      this.ws.onmessage = (event) => {
        if (this.key >= 10) {
          this.key = 1
        }
        const json = JSON.parse(event.data)
        if (json.event === 'join_new_user') {
          if (this.userId === '' && json.user.name === this.userName) {
            this.userId = json.user.user_id
          } else if (this.userId !== json.user.user_id) {
            const users = this.roomInformation.users
            users.push(json.user)
            Object.assign(this.roomInformation, users)
            this.key++
          }
        }
        if (json.event === 'room_info') {
          Object.assign(this.roomInformation, json.room)
          this.key++
        }
        if (json.event === 'changed_user') {
          if (this.roomInformation)
            for (const index in this.roomInformation.users) {
              if (
                this.roomInformation.users[index].user_id ===
                json.changed_user.user_id
              ) {
                Object.assign(
                  this.roomInformation.users[index],
                  json.changed_user
                )
                this.key++
                break
              }
            }
        }
        if (json.event === 'exit_user') {
          if (this.roomInformation) {
            const deleteUsreIndex = this.roomInformation.users.indexOf(
              json.user
            )
            this.roomInformation.users.splice(deleteUsreIndex, 1)
            this.key++
          }
        }
      }
    }
  },
  methods: {
    startMedia(isCamera, isMicrophone) {
      this.stopMedia()
      this.isEnabledFaceFeature = isCamera
      this.isEnabledAudioFeature = isMicrophone
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        if (isMicrophone) {
          navigator.mediaDevices
            .getUserMedia({
              video: isCamera,
              audio: { echoCancellation: true },
            })
            .then((stream) => {
              this.stream = stream
              this.video.srcObject = this.stream
              this.video.play()
              this.loadAudioAnalyser(this.stream)
              setInterval(this.analysys, 100, this.video)
            })
        } else {
          navigator.mediaDevices
            .getUserMedia({ video: isCamera, audio: false })
            .then((stream) => {
              this.stream = stream
              this.video.srcObject = this.stream
              this.video.play()
              setInterval(this.analysys, 100, this.video)
            })
        }
      }
    },
    stopMedia() {
      clearInterval(null)
      this.isEnabledFaceFeature = false
      this.isEnabledAudioFeature = false
      if (this.stream !== null) {
        this.stream.getVideoTracks().forEach(async (track) => {
          await track.stop()
        })
        this.stream.getAudioTracks().forEach(async (track) => {
          await track.stop()
        })
      }
    },
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
    async loadModels() {
      if (this.tinyModel) {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/weights')
      } else {
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/weights')
      }
      await faceapi.nets.faceExpressionNet.loadFromUri('/weights')
    },
    async analysys(img) {
      let faceDetectorOptions = new faceapi.SsdMobilenetv1Options()
      if (this.tinyModel) {
        faceDetectorOptions = new faceapi.TinyFaceDetectorOptions()
      }

      if (this.isEnabledFaceFeature) {
        const detectionWithExpression = await faceapi
          .detectSingleFace(img, faceDetectorOptions)
          .withFaceExpressions()

        if (
          detectionWithExpression != null &&
          'detection' in detectionWithExpression
        ) {
          this.faceDetected = true
          if (detectionWithExpression.expressions !== undefined) {
            let pairs = Object.entries(detectionWithExpression.expressions)
            pairs = pairs.filter((pair) => pair[1] >= 0.3)

            pairs.sort((p1, p2) => {
              return p2[1] - p1[1]
            })

            if (pairs.length > 0) {
              this.topHistory.push(pairs[0][0])
              if (this.topHistory.length > 5) {
                this.topHistory.shift()
              }

              const historyCountMap = {}
              for (const history of this.topHistory) {
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
              if (this.userId !== '') {
                if (this.prevStatus !== this.top) {
                  this.sendEmotion(this.top)
                }
              }
              this.prevStatus = this.top
              this.emotionList = Object.fromEntries(pairs)
            }
          }
        } else {
          this.faceDetected = false
        }
      }

      if (this.isEnabledAudioFeature) {
        const volumes = new Uint8Array(this.analyser.frequencyBinCount)
        this.analyser.getByteFrequencyData(volumes)
        const volumeSum = volumes.reduce((prev, current) => prev + current)
        const average = volumeSum / volumes.length

        this.volume = Math.min(Math.round(average / 10), 9)

        if (this.volume > 5) {
          this.sendSpeakingStatus(true)
        } else {
          this.sendSpeakingStatus(false)
        }
      }
    },
    closeWebSocket() {
      if (this.ws !== null) {
        this.ws.close()
      }
    },
    // 感情の送信
    sendEmotion(emotion) {
      const message = {
        event: 'change_emotion',
        emotion,
      }
      if (this.ws !== null) {
        this.ws.send(JSON.stringify(message))
      }
    },
    // 絵文字の設定
    sendEmojiSetting(emotion, emoji) {
      const message = {
        event: 'change_setting_emoji',
        emotion,
        emoji,
      }
      if (this.ws !== null) {
        this.ws.send(JSON.stringify(message))
      }
    },
    // 離席状態の送信
    sendAfkStatus(isAfk) {
      const message = {
        event: 'switch_afk',
        is_afk: isAfk,
      }
      if (this.ws !== null) {
        this.ws.send(JSON.stringify(message))
      }
    },
    // 発話状態の送信
    sendSpeakingStatus(isSpeaking) {
      const message = {
        event: 'switch_speaking',
        is_speaking: isSpeaking,
      }
      if (this.ws !== null) {
        this.ws.send(JSON.stringify(message))
      }
    },
    // リアクションの送信
    sendReaction(reactionName) {
      const message = {
        event: 'reaction',
        reaction: reactionName,
      }
      if (this.ws !== null) {
        this.ws.send(JSON.stringify(message))
      }
    },
    // 退室
    leavingRoom() {
      this.stopMedia()
      this.$router.push('/')
    },
  },
}
</script>
