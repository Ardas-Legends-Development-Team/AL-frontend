<template>
  <div class="card w-56 bg-base-100 shadow-xl">
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
  sourceGood: {
    type: String,
    required: true,
  },
  altGood: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
