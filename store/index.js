export const state = () => ({
  isOwner: '',
})

export const mutations = {
  setOwnerInfo(state, isOwner) {
    state.isOwner = isOwner
  },
}
