<template>
  <div class="card w-96 bg-base-100 shadow-xl mx-10 my-10">
    <router-link :to="router">
      <div class="card-body">
        <h2 class="card-title">{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
      <figure>
        <img :src="source" :alt="alt" />
      </figure>
    </router-link>
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
  router: {
    type: String,
    required: true,
  },
});
</script>
