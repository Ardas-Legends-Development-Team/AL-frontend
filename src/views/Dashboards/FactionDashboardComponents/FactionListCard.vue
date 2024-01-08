<template>
  <div class="card mx-4 my-4 w-40 bg-base-100 shadow-xl">
    <div class="card-body mb-2 h-20 items-center">
      <h2 class="card-title text-base">{{ title }}</h2>
    </div>
    <figure>
      <img class="mb-2 h-48 w-24" :src="source" :alt="alt" />
    </figure>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});
</script>
