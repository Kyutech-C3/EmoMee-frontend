export const state = () => ({
  roomId: '',
  name: '',
  faceSwitch: false,
  voiceSwitch: false,
  roomLimit: 0,
})

export const mutations = {
  setOwnerInfo(state, isRoomId) {
    state.roomId = isRoomId
  },
  inputName(state, isName) {
    state.name = isName
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