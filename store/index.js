export const state = () => ({
  roomId: '',
  name: '',
  faceSwitch: true,
  voiceSwitch: true,
  roomLimit: 0,
  nameState: false,
  discordUserId: '',
})

export const getters = {
  getName(state) {
    return state.name
  },
  getNameState(state) {
    return state.nameState
  },
  getDiscordUserId(state) {
    return state.discordUserId
  },
}

export const mutations = {
  setOwnerInfo(state, isRoomId) {
    state.roomId = isRoomId
  },
  inputName(state, isName) {
    state.name = isName
  },
  setDiscordUserId(state, discordUserId) {
    state.discordUserId = discordUserId
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
