<template>
  <div class="w-28 h-fit rounded-lg bg-base-300">
    <div class="px-2 pb-2 flex flex-row justify-end text-sm text-secondary">
      {{ faction }} armies
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  faction: {
    type: String,
    required: true,
  },
});
</script>
