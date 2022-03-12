<template>
  <div
    class="flex flex-col justify-center rounded-2xl bg-orange-50 shadow-inner-xl w-192 h-80 z-10 p-9 text-center text-shadow-sm"
  >
    <p class="mb-8 text-3xl font-bold">ルーム設定</p>
    <div class="mt-10 text-2xl">
      <span class="font-semibold mr-3">有効期限</span>
      <label>
        <select
          class="px-2 bg-inherit border-b-2 border-slate-700 outline-none"
          @input="setRoomLimit"
        >
          <option
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
          >
            {{ option.name }}
          </option>
        </select>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      options: [
        {
          name: '12時間',
          value: 12,
        },
        {
          name: '24時間',
          value: 24,
        },
        {
          name: '36時間',
          value: 36,
        },
        {
          name: '48時間',
          value: 48,
        },
      ],
      toggleStatus: true,
    }
  },
  methods: {
    setRoomLimit($event) {
      this.$store.commit('updateRoomLimit', $event.target.value)
      // console.log('event')
    },
  },
}
</script>
