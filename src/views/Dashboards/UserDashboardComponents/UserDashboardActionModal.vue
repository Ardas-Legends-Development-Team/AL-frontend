<template>
  <div class="modal" :class="isOpen ? 'modal-open' : ''">
    <div class="modal-box">
      <label
        class="btn btn-primary btn-m btn-circle absolute right-2 top-2"
        @click="closeModal"
        >✕</label
      >
      <h3 class="font-bold text-lg">{{ description }}</h3>
      <div class="flex flex-col w-full mt-4"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actionInputs: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["close"]);

function closeModal() {
  emit("close");
}
</script>
