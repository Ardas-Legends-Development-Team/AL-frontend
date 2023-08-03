<template>
  <div class="w-28 h-fit rounded-lg bg-base-300">
    <img class="p-3" :src="source" :alt="alt" />
    <div class="px-2 pb-2 flex flex-row justify-end text-sm text-secondary">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
  sourceGood: {
    type: String,
    required: true,
  },
  altGood: {
    type: String,
    required: true,
  },
});
</script>
