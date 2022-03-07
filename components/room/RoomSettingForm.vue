<template>
  <info-area class="flex items-center justify-center">
    <div class="w-full">
      <div class="mx-auto max-w-fit mb-16 text-xl">ルーム設定</div>
      <div class="mx-auto max-w-fit mb-8">
        <span class="mr-10">有効期限</span>
        <label>
          <select
            class="px-2 bg-inherit border-b-2 border-slate-700 outline-none"
          >
            <option
              v-for="(option, index) in options"
              :key="index"
              :value="option.code"
            >
              {{ option.name }}
            </option>
          </select>
        </label>
      </div>
      <div class="mx-auto max-w-fit flex items-center">
        <span class="mr-10">ユーザー名表示</span>
        <div class="w-16 flex">
          <div
            class="w-8 h-7 flex items-center justify-center cursor-pointer select-none"
            :class="toggleStatus ? 'bg-orange-400' : 'bg-white'"
            @click="toggleStatus = true"
          >
            <p class="">on</p>
          </div>
          <div
            class="w-8 h-7 flex items-center justify-center cursor-pointer select-none"
            :class="!toggleStatus ? 'bg-orange-400' : 'bg-white'"
            @click="toggleStatus = false"
          >
            off
          </div>
        </div>
      </div>
    </div>
  </info-area>
</template>

<script>
import InfoArea from '../InfoArea.vue'
export default {
  components: { InfoArea },
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
}
</script>
