import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'emomee',
    storage: window.sessionStorage,
  })(store)
}
