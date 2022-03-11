<template>
  <RoomBaseButton
    class="cursor-pointer hover:bg-gray-100"
    @click="(event) => $emit('click', event)"
  >
    <div class="flex min-w-[110px]">
      <FontAwesomeIcon
        :icon="['fas', 'circle']"
        class="w-5 mr-2"
        :class="isAfk ? status[0].color : status[1].color"
      />
      {{ isAfk ? status[0].text : status[1].text }}
    </div>
  </RoomBaseButton>
</template>

<script>
export default {
  props: {
    isAfk: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      status: [
        {
          text: '離席中',
          color: 'text-red-600',
        },
        {
          text: 'アクティブ',
          color: 'text-green-600',
        },
      ],
    }
  },
}
</script>
