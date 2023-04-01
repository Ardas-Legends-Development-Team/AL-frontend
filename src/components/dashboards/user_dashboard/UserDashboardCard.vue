<template>
  <div class="card w-60 bg-base-100 shadow-xl">
    <div class="items-center card-body">
      <h2 class="card-title">{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
    <figure>
      <img :src="source" :alt="alt" />
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
  description: {
    type: String,
    required: true,
  },
});
</script>
