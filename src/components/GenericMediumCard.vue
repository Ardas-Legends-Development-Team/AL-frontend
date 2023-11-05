<template>
  <router-link :to="router">
    <div class="card w-96 bg-base-100 shadow-xl mx-10 my-10">
      <div class="card-body h-36">
        <h2 class="card-title">{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
      <LazyLoadedImage
        :inside-classes="'max-w-sm rounded-lg shadow-2xl'"
        :evil-alt="altEvil"
        :good-alt="altGood"
        :evil-src="sourceEvil"
        :good-src="sourceGood"
      />
    </div>
  </router-link>
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
  router: {
    type: String,
    required: true,
  },
});
</script>
