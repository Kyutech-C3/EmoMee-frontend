<template>
  <div class="relative h-screen overflow-hidden">
    <RoomDebugModal
      v-if="showDebugLog"
      :contents="[
        { name: 'emotion_list', value: emotionList },
        { name: 'top_emotion', value: top },
        { name: 'face_detected', value: faceDetected },
        { name: 'is_tiny_model', value: tinyModel },
        {
          name: 'inference_interval',
          value: `${interval * faceInferenceTimes}ms`,
        },
        { name: 'volume', value: volume },
      ]"
    />
    <RoomFaceUsers
      :users="roomInformation.users"
      :reaction-info="reactionInfo"
    />
    <RoomToolBar
      :show-debug-log="showDebugLog"
      @sendAfkStatus="sendAfkStatus"
      @sendEmojiSetting="sendEmojiSetting"
      @sendReaction="sendReaction"
      @updateMenuValues="updateMenuValues"
      @showDebugLog="(event) => (showDebugLog = event)"
    />
  </div>
</template>

<script>
import * as faceapi from 'face-api.js'

/*
  type Users = {
      user_id: string
      name: string
      is_speaking: boolean  // 喋っているかどうか
      is_afk: boolean  // 離席中かどうか
      emotion: string  // 表情の種類
      emoji: {
        angry: number
        disgusted: number
        fearful: number
        happy: number
        neutral: number
        sad: number
        surprised: number
      }
    }

  type RoomInfomation = {
    room_id: string
    users: Users[]
  }
*/

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
      isEnabledFaceFeature: false,
      isEnabledAudioFeature: false,
      ws: null,
      userName: '',
      userId: '',
      prevStatus: 'neutral',
      prevSpeakingStatus: false,
      roomInformation: {
        room_id: '',
        users: [],
      },
      reactionInfo: [],
      reactionTimeout: null,
      reactionQueue: [],
      video: null,
      stream: null,
      interval: 100,
      faceInferenceTimes: 5,
      faceInferenceCount: 0,
      showDebugLog: false,
      reactionWaitSeconds: 4,
    }
  },
  created() {
    this.userName = this.$route.query.user_name
    this.showDebugLog = this.$route.query.debug
  },
  mounted() {
    this.loadModels()
    this.video = document.createElement('video')
    this.video.muted = true
    if (this.$route.query.face_enable !== 'false') {
      this.startMedia(true, true)
    }

    this.ws = new WebSocket(
      `${this.$config.webSocketBaseUrl}${this.$route.params.id}?user_name=${this.userName}`
    )

    if (this.ws !== null) {
      this.ws.onopen = (event) => {
        // eslint-disable-next-line no-console
        console.log('🎉 WebSocket is connected')
        // eslint-disable-next-line no-console
        console.log(`🔗 Target URL: ${event.target.url}`)
      }
      this.ws.onerror = (err) => {
        // eslint-disable-next-line no-console
        console.error(err)
      }
      this.ws.onmessage = (event) => {
        const json = JSON.parse(event.data)
        console.log(json)

        switch (json.event) {
          // ルーム入室時
          case 'init_info':
            this.userId = json.user_id
            this.roomInformation = json.room
            this.reactionQueue = Array(this.roomInformation.users.length)
            this.reactionQueue.fill(0)
            break
          // 新規ルームメンバー参加時
          case 'join_user':
            this.roomInformation.users.push(json.user)
            this.reactionQueue.push(0)
            break
          // 表情の変化時
          case 'change_emotion':
            if (this.roomInformation) {
              for (const index in this.roomInformation.users) {
                if (
                  this.roomInformation.users[index].user_id === json.user_id
                ) {
                  this.roomInformation.users[index].emotion = json.emotion
                  break
                }
              }
            }
            break
          // 表情ごとに使用する絵文字の変更時
          case 'change_setting_emoji':
            if (this.roomInformation) {
              for (const index in this.roomInformation.users) {
                if (
                  this.roomInformation.users[index].user_id === json.user_id
                ) {
                  this.roomInformation.users[index].emoji[json.emotion] =
                    json.emoji
                  break
                }
              }
            }
            break
          // 音声認識時
          case 'switch_speaking':
            if (this.roomInformation) {
              for (const index in this.roomInformation.users) {
                if (
                  this.roomInformation.users[index].user_id === json.user_id
                ) {
                  this.roomInformation.users[index].is_speaking =
                    json.is_speaking
                  break
                }
              }
            }
            break
          // リアクション時
          case 'reaction':
            if (this.roomInformation) {
              const { event, ...reaction } = json

              const queueIndex = this.roomInformation.users.findIndex(
                (user) => {
                  return user.user_id === json.user_id
                }
              )
              const reactionIndex = this.reactionInfo.findIndex((reaction) => {
                return reaction.user_id === json.user_id
              })

              if (queueIndex !== -1) {
                this.reactionQueue[queueIndex]++
              }
              if (reactionIndex !== -1) {
                this.reactionInfo.splice(reactionIndex, 1)
              }
              this.reactionInfo.push(reaction)
            }
            break
          // リアクション終了時
          case 'finish_reaction':
            if (this.roomInformation) {
              const queueIndex = this.roomInformation.users.findIndex(
                (user) => {
                  return user.user_id === json.user_id
                }
              )
              const reactionIndex = this.reactionInfo.findIndex((reaction) => {
                return reaction.user_id === json.user_id
              })

              if (queueIndex !== -1) {
                this.reactionQueue[queueIndex]--
              }
              if (
                reactionIndex !== -1 &&
                this.reactionQueue[queueIndex] === 0
              ) {
                this.reactionInfo.splice(reactionIndex, 1)
              }
            }
            break
          // 離席時
          case 'switch_afk':
            if (this.roomInformation) {
              for (const index in this.roomInformation.users) {
                if (
                  this.roomInformation.users[index].user_id === json.user_id
                ) {
                  this.roomInformation.users[index].is_afk = json.is_afk
                  break
                }
              }
            }
            break
          // 他人がルームから退出した時
          case 'exit_user':
            if (this.roomInformation) {
              for (const index in this.roomInformation.users) {
                if (
                  this.roomInformation.users[index].user_id ===
                  json.user.user_id
                ) {
                  this.roomInformation.users.splice(index, 1)
                  break
                }
              }
            }
            break
        }
      }
    }
  },
  beforeDestroy() {
    this.closeWebSocket()
    this.stopMedia()
  },
  methods: {
    // 感情の送信
    sendEmotion(emotion) {
      const message = {
        event: 'change_emotion',
        emotion,
      }
      this.sendWebSocket(message)
    },
    // 絵文字の設定
    sendEmojiSetting({ emotion, emoji }) {
      const message = {
        event: 'change_setting_emoji',
        emotion,
        emoji,
      }
      this.sendWebSocket(message)
    },
    // 離席状態の送信
    sendAfkStatus(isAfk) {
      const message = {
        event: 'switch_afk',
        is_afk: isAfk,
      }
      this.sendWebSocket(message)
    },
    // 発話状態の送信
    sendSpeakingStatus(isSpeaking) {
      const message = {
        event: 'switch_speaking',
        is_speaking: isSpeaking,
      }
      this.sendWebSocket(message)
    },
    // リアクションの送信
    sendReaction({ reactionName, isAnimation }) {
      const message = {
        event: 'reaction',
        reaction: reactionName,
        is_animation: isAnimation,
        wait_seconds: this.reactionWaitSeconds,
      }
      this.sendWebSocket(message)
    },
    // WebSocketでデータを送信する
    sendWebSocket(data) {
      if (this.ws !== null) {
        this.ws.send(JSON.stringify(data))
      }
    },
    // WebSocketの通信を切断する
    closeWebSocket() {
      if (this.ws !== null) {
        this.ws.close()
      }
    },
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
              setInterval(this.analysys, this.interval, this.video)
            })
        } else {
          navigator.mediaDevices
            .getUserMedia({ video: isCamera, audio: false })
            .then((stream) => {
              this.stream = stream
              this.video.srcObject = this.stream
              this.video.play()
              setInterval(this.analysys, this.interval, this.video)
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

      if (
        this.isEnabledFaceFeature &&
        this.faceInferenceCount === this.faceInferenceTimes
      ) {
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
          if (!this.prevSpeakingStatus) {
            this.sendSpeakingStatus(true)
          }
          this.prevSpeakingStatus = true
        } else {
          if (this.prevSpeakingStatus) {
            this.sendSpeakingStatus(false)
          }
          this.prevSpeakingStatus = false
        }
      }

      if (this.faceInferenceCount >= this.faceInferenceTimes) {
        this.faceInferenceCount = 0
      } else {
        this.faceInferenceCount++
      }
    },
    updateMenuValues(isFaceDetectorEnabled, isAudioDetectorEnabled) {
      console.log([isFaceDetectorEnabled, isAudioDetectorEnabled])
      this.startMedia(isFaceDetectorEnabled, isAudioDetectorEnabled)
    },
  },
}
</script>
