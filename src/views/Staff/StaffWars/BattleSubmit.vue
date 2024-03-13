<template>
  <div class="flex flex-col justify-center">
    <div class="my-4 flex flex-row justify-center">
      <button
        class="btn btn-info text-3xl font-bold text-secondary"
        @click="isModalOpen = true"
      >
        Submit Battle Results
      </button>
    </div>
  </div>
  <SubmitBattleModal :is-open="isModalOpen" @close="isModalOpen = false" />
</template>

<script setup lang="ts">
import SubmitBattleModal from "@/views/Staff/StaffWars/SubmitBattleModal.vue";
import { ref } from "vue";

const isModalOpen = ref(false);
</script>
