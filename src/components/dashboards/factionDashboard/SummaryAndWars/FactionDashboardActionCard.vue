<template>
  <div class="card w-40 bg-base-100 shadow-xl mx-4 my-4">
    <div class="items-center card-body h-20 mb-2">
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
  sourceGood: {
    type: String,
    required: true,
  },
  altGood: {
    type: String,
    required: true,
  },
});
</script>
