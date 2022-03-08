<template>
  <div class="relative h-screen overflow-hidden">
    <div class="absolute -z-10">
      <p>{{ emotion_list }}</p>
      <p>{{ top }}</p>
      <p>face_detected: {{ face_detected }}</p>
      <p>is_tiny_model: {{ tinyModel }}</p>
      <p>volume: {{ volume }}</p>
    </div>
    <RoomFaceUsers :key="key" :users="room_information.users" />
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
      key: 0,
      width: 0,
      height: 0,
      isEnabledFaceFeature: false,
      isEnabledAudioFeature: false,
      ws: null,
      user_name: '',
      user_id: '',
      prev_status: 'neutral',
      room_information: {},
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

    this.user_name = this.$route.query.user_name
    this.ws = new WebSocket(
      'wss://emomee.pigeons.house/ws/room/' +
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
        if (this.key >= 10) {
          this.key = 1
        }
        const json = JSON.parse(event.data)
        if (
          json.event === 'join_new_user' &&
          this.user_id === '' &&
          json.user.name === this.user_name
        ) {
          this.user_id = json.user.user_id
        } else if (
          json.event === 'join_new_user' &&
          this.user_id !== json.user.user_id
        ) {
          const users = this.room_information.users
          users.push(json.user)
          Object.assign(this.room_information, users)
          this.key++
        } else if (json.event === 'room_info') {
          Object.assign(this.room_information, json.room)
          this.key++
        } else if (json.event === 'changed_user') {
          if (this.room_information)
            for (const index in this.room_information.users) {
              if (
                this.room_information.users[index].user_id ===
                json.changed_user.user_id
              ) {
                Object.assign(
                  this.room_information.users[index],
                  json.changed_user
                )
                this.key++
                break
              }
            }
        } else if (json.event === 'exit_user') {
          if (this.room_information) {
            const deleteUsreIndex = this.room_information.users.indexOf(
              json.user
            )
            this.room_information.users.splice(deleteUsreIndex, 1)
            this.key++
          }
        }
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
        if (this.key >= 10) {
          this.key = 1
        }
        const json = JSON.parse(event.data)
        console.log(JSON.stringify(json))
        if (
          json.event === 'join_new_user' &&
          this.user_id === '' &&
          json.user.name === this.user_name
        ) {
          this.user_id = json.user.user_id
        } else if (
          json.event === 'join_new_user' &&
          this.user_id !== json.user.user_id
        ) {
          const users = this.room_information.users
          users.push(json.user)
          Object.assign(this.room_information, users)
          this.key++
        } else if (json.event === 'room_info') {
          Object.assign(this.room_information, json.room)
          this.key++
        } else if (json.event === 'changed_user') {
          if (this.room_information)
            for (const index in this.room_information.users) {
              if (
                this.room_information.users[index].user_id ===
                json.changed_user.user_id
              ) {
                Object.assign(
                  this.room_information.users[index],
                  json.changed_user
                )
                this.key++
                break
              }
            }
        } else if (json.event === 'exit_user') {
          if (this.room_information) {
            const deleteUsreIndex = this.room_information.users.indexOf(
              json.user
            )
            this.room_information.users.splice(deleteUsreIndex, 1)
            this.key++
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
        this.stream.getVideoTracks().forEach((track) => {
          track.stop()
        })
        this.stream.getAudioTracks().forEach((track) => {
          track.stop()
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
