<template>
  <div class="modal">
    <div class="modal-box">
      <a
        href="#"
        class="btn btn-primary btn-m btn-circle absolute right-2 top-2"
        >✕</a
      >
      <h3 class="font-bold text-lg">{{ title }}</h3>
      <div class="flex flex-col items-stretch w-full mt-4">
        <div
          class="grid basis-2 flex-grow h-full card bg-base-300 rounded-box place-items-center"
        >
          <p class="font-medium">
            {{ information }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  information: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
