export const state = () => ({
  roomId: '',
})

export const mutations = {
  setOwnerInfo(state, isRoomId) {
    state.roomId = isRoomId
  },
}
