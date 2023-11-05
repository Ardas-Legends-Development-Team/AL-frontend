<template>
  <div class="w-28 h-fit rounded-lg bg-base-300">
    <LazyLoadedImage
      :evil-alt="altEvil"
      :good-alt="altGood"
      :evil-src="sourceEvil"
      :good-src="sourceGood"
    />
    <div class="px-2 pb-2 flex flex-row justify-end text-sm text-secondary">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import LazyLoadedImage from "@/components/images/LazyLoadedImage.vue";

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
  sourceEvil: {
    type: String,
    required: true,
  },
  altEvil: {
    type: String,
    required: true,
  },
});
</script>
