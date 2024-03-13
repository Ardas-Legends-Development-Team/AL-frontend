<template>
  <div class="modal" :class="isOpen ? 'modal-open' : ''">
    <div class="modal-box">
      <label
        class="btn-m btn btn-circle btn-primary btn-outline absolute right-2 top-2"
        @click="closeModal"
        >✕</label
      >
      <h3 class="text-lg font-bold">Submit battle results</h3>
      <div class="mt-4 flex w-full flex-col"></div>
      <button
        v-if="!isConfirming"
        class="btn btn-primary btn-outline mt-4"
        @click="askForConfirmation"
      >
        Submit
      </button>
      <button
        v-else
        class="btn btn-error btn-outline mt-4"
        @click="submitAction"
      >
        Are you sure ?
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AlertHandler } from "@/ts/AlertHandler";

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);
const isConfirming = ref(false);

function closeModal() {
  emit("close");
}

async function askForConfirmation(): Promise<void> {
  isConfirming.value = true;
}

async function submitAction(): Promise<void> {
  // API CALL HERE

  AlertHandler.showSuccessAlert("Battle logged successfully");
  closeModal();
}
</script>
