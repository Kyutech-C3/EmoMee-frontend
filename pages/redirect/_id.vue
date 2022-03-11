<template>
  <div class="relative h-screen w-full overflow-hidden">
    <div
      class="w-fit border border-gray-300 rounded-xl text-center px-16 py-10 h-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-3xl bg-orange-200 bg-opacity-70 shadow-inner-sm"
    >
      <img
        src="@/assets/face/pigeon/happy.gif"
        alt="sad pigeon"
        class="absolute -bottom-14 -right-14 w-28"
      />
      <p class="w-full text-xl">ルームへGO〜</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async fetch({ store, query, app }) {
    const { data } = await axios.get(
      `${app.$config.baseUrl}user/${query.user_id}`
    )
    store.commit('inputName', data.name)
    store.commit('updateUserId', query.user_id)
  },
  created() {
    if (this.$store.getters.getName !== '') {
      this.$router.push(`/join/${this.$route.params.id}`)
    }
  },
}
</script>
