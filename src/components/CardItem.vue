<template>
  <router-link :to="router">
    <div class="card w-96 bg-base-100 shadow-xl mx-10 my-10">
      <div class="card-body h-36">
        <h2 class="card-title">{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
      <figure>
        <img :src="source" :alt="alt" />
      </figure>
    </div>
  </router-link>
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
  router: {
    type: String,
    required: true,
  },
});
</script>
