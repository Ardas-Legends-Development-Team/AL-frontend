<template>
  <div class="flex flex-row justify-center bottom-1 sticky">
    <div
      class="alert w-1/2 h-16"
      :class="isSuccessAlert ? 'alert-success' : 'alert-info'"
    >
      <svg
        v-if="isSuccessAlert"
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-current shrink-0 w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>

      <span>{{ alertMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAlertStore } from "@/stores/systemStores";

const alertMessage = ref(
  useAlertStore().hasSuccessAlert
    ? useAlertStore().successAlertMessage
    : useAlertStore().alertMessage,
);
const isSuccessAlert = ref(useAlertStore().hasSuccessAlert);

useAlertStore().$subscribe(() => {
  if (useAlertStore().hasSuccessAlert) {
    isSuccessAlert.value = true;
    alertMessage.value = useAlertStore().successAlertMessage;
  } else {
    isSuccessAlert.value = false;
    alertMessage.value = useAlertStore().alertMessage;
  }
});
</script>

<style scoped></style>
