<template>
  <div class="card w-32 bg-base-100 shadow-xl mx-4 my-4">
    <div class="items-center card-body h-24">
      <h2 class="card-title text-base">{{ title }}</h2>
    </div>
    <figure>
      <img class="w-24 h-48 mb-2" :src="source" :alt="alt" />
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
