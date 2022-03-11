export const state = () => ({
  roomId: '',
  name: '',
  faceSwitch: true,
  voiceSwitch: true,
  roomLimit: 0,
  userId: '',
})

export const getters = {
  getName(state) {
    return state.name
  },
  getUserId(state) {
    return state.userId
  },
}

export const mutations = {
  setOwnerInfo(state, isRoomId) {
    state.roomId = isRoomId
  },
  inputName(state, isName) {
    state.name = isName
  },
  updateUserId(state, isUserId) {
    state.userId = isUserId
  },
  updateFaceSwitch(state, isFaceSwitch) {
    state.faceSwitch = isFaceSwitch
  },
  updateVoiceSwitch(state, isVoiceSwitch) {
    state.voiceSwitch = isVoiceSwitch
  },
  updateRoomLimit(state, isRoomLimit) {
    state.roomLimit = isRoomLimit
  },
}
