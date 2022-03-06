<template>
  <div class="relative h-screen overflow-hidden">
    <div class="absolute -z-10">
      <p>{{ emotion_list }}</p>
      <p>{{ top }}</p>
      <p>face_detected: {{ face_detected }}</p>
      <p>is_tiny_model: {{ tinyModel }}</p>
      <p>volume: {{ volume }}</p>
    </div>
    <RoomFaceUsers :users="users" />
    <RoomToolBar />
  </div>
</template>

<script>
import * as faceapi from 'face-api.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  data() {
    return {
      tinyModel: false,
      top_history: [],
      top: '',
      face_detected: false,
      emotion_list: {},
      volume: 0,
      analyser: null,
      headerOpen: false,
      selectBaseFaceBarOpen: false,
      selectReactionBarOpen: true,
      smallWind: false,
      users: [
        {
          id: this.generateUUID(),
          name: 'hoge',
          faceGif: require('@/assets/pigeon/nuetral.png'),
          voiceON: true,
        },
        {
          id: this.generateUUID(),
          name: 'hoge1',
          faceGif: require('@/assets/pigeon/riseki_sleep.png'),
          voiceON: true,
        },
        {
          id: this.generateUUID(),
          name: 'hoge1',
          faceGif: require('@/assets/emoji/base/smile/smile3.gif'),
          voiceON: false,
        },
        {
          id: this.generateUUID(),
          name: 'hoge1',
          faceGif: require('@/assets/emoji/base/smile/smile3.gif'),
          voiceON: false,
        },
        {
          id: this.generateUUID(),
          name: 'hoge1',
          faceGif: require('@/assets/emoji/base/smile/smile3.gif'),
          voiceON: false,
        },
        {
          id: this.generateUUID(),
          name: 'hoge1',
          faceGif: require('@/assets/emoji/base/smile/smile3.gif'),
          voiceON: false,
        },
      ],
      width: 0,
      height: 0,
      isEnabledFaceFeature: true,
      ws: null,
      user_name: '',
      user_id: '',
      prev_status: 'neutral',
      room_information: {},
    }
  },
  mounted() {
    if (this.isEnabledFaceFeature) {
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
    }

    this.user_name = this.$route.query.user_name
    this.ws = new WebSocket(
      'ws://emomee.pigeons.house:6060/ws/room/' +
        this.$route.params.id +
        '?user_name=' +
        this.user_name
    )

    if (this.ws !== null) {
      this.ws.onerror = (err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      }
      this.ws.onmessage = (event) => {
        const json = JSON.parse(event.data)
        if (
          json.event === 'join_new_user' &&
          this.user_id === '' &&
          json.user.name === this.user_name
        ) {
          this.user_id = json.user.user_id
        } else if (json.event === 'room_info') {
          this.room_information = json.room
        } else if (json.event === 'changed_user') {
          if (this.room_information)
            for (const index in this.room_information.users) {
              if (
                this.room_information.users[index].user_id ===
                json.changed_user.user_id
              ) {
                this.room_information.users[index] = json.changed_user
                break
              }
            }
        }
      }
    }

    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  beforeMount() {
    this.updateWindowSize()
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
            if (this.user_id !== '') {
              if (this.prev_status !== this.top) {
                this.sendEmotion(this.top)
              }
            }
            this.prev_status = this.top
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
    closeWebSocket() {
      if (this.ws !== null) {
        this.ws.close()
      }
    },
    sendEmotion(emotion) {
      const message = {
        event: 'change_emotion',
        emotion,
      }
      if (this.ws !== null) {
        this.ws.send(JSON.stringify(message))
      }
    },
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
    sendAfkStatus(isAfk) {
      const message = {
        event: 'switch_afk',
        isAfk,
      }
      if (this.ws !== null) {
        this.ws.send(JSON.stringify(message))
      }
    },
    closeModal() {
      this.headerOpen = false
      this.selectBaseFaceBarOpen = false
      this.$refs.child.openSelectFaceModal('')
      if (this.smallWind) {
        this.selectReactionBarOpen = false
      }
    },
    generateUUID() {
      return uuidv4()
    },
    updateWindowSize() {
      this.width = window.innerWidth
      this.height = window.innerHeight
    },
    handleResize() {
      this.updateWindowSize()
      if (this.height <= 730) {
        document.getElementById('selectBaseFaceBer').classList.add('faceBar')
      } else {
        document.getElementById('selectBaseFaceBer').classList.remove('faceBar')
      }
      if (this.height <= 590) {
        this.smallWind = true
        this.selectReactionBarOpen = false
        document.getElementById('faceWindows').classList.add('windows')
        document
          .getElementById('hoverReactionBarId')
          .classList.add('hoverReactionBar')
      } else {
        this.smallWind = false
        this.selectReactionBarOpen = true
        document.getElementById('faceWindows').classList.remove('windows')
        document
          .getElementById('hoverReactionBarId')
          .classList.remove('hoverReactionBar')
      }
      // eslint-disable-next-line no-console
      console.log(this.width + ',' + this.height)
    },
  },
}
</script>
