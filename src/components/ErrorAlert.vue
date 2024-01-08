<template>
  <div class="sticky bottom-1 flex flex-row justify-center">
    <div class="alert alert-error h-16 w-1/2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
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

useErrorStore().$subscribe(() => {
  errorMessage.value = useErrorStore().errorMessage;
});
</script>

<style scoped></style>
