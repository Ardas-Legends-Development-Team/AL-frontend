<template>
  <div class="card w-40 bg-base-100 shadow-xl mx-4 my-4">
    <div class="items-center card-body h-20 mb-2">
      <h2 class="card-title text-base">{{ title }}</h2>
    </div>
    <figure>
      <LazyLoadedImage
        :inside-classes="'h-1/2'"
        :evil-alt="altEvil"
        :good-alt="altGood"
        :evil-src="sourceEvil"
        :good-src="sourceGood"
      />
    </figure>
  </div>
</template>

<script setup lang="ts">
import LazyLoadedImage from "@/components/images/LazyLoadedImage.vue";

defineProps({
  title: {
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
