export const state = () => ({
  roomId: '',
  name: '',
  faceSwitch: true,
  voiceSwitch: true,
  roomLimit: 0,
  nameState: false,
})

export const getters = {
  getName(state) {
    return state.name
  },
  getNameState(state) {
    return state.nameState
  },
}

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
  updateNameState(state, isNameState) {
    state.nameState = isNameState
  },
}
