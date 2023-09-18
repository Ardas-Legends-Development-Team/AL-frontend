<template>
  <div class="card w-1/4 bg-base-100 shadow-xl">
    <div class="items-center card-body">
      <h2 class="card-title text-accent">{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
    <figure>
      <LazyLoadedImage
        :inside-classes="'max-w-sm rounded-lg shadow-2xl'"
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
  description: {
    type: String,
    required: true,
  },
});
</script>
