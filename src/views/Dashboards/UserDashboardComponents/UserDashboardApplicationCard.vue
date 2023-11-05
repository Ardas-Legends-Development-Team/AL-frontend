<template>
  <div class="card w-56 bg-base-100 shadow-xl m-4">
    <div class="card-body">
      <h3 class="card-title">
        {{ capitalizeFirstLetter(applicationType) }}: {{ name }}
      </h3>
      <p>Applied at: {{ appliedAt }}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Vote Count: {{ voteCount }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { capitalizeFirstLetter } from "@/ts/utilities";

defineProps({
  applicationType: {
    type: String,
    required: true,
  },
  voteCount: {
    type: Number,
    required: true,
  },
  appliedAt: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
});
</script>
