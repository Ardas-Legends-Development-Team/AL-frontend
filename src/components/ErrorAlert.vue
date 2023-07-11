<template>
  <div class="flex flex-row justify-center bottom-1 absolute sticky">
    <div class="alert alert-error w-1/2 h-16">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useErrorStore } from "@/stores/systemStores";

const errorMessage = ref(useErrorStore().errorMessage);
</script>

<style scoped></style>
