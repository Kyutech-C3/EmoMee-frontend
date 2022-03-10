<template>
  <div
    class="rounded-2xl bg-orange-50 shadow-xl w-192 h-80 z-10 p-9 text-center"
  >
    <p class="my-8 text-3xl font-bold">ルーム設定</p>
    <div class="my-10 text-2xl">
      <span class="font-semibold">有効期限</span>
      <input
        class="mx-5 bg-orange-50 text-xl w-80 text-center text-gray-500"
        value="12時"
      />
      <button @click="copyId()">
        <FontAwesomeIcon :icon="['fas', 'copy']" class="w-5" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  methods: {},
}
</script>
