<template>
  <div class="modal">
    <div class="modal-box">
      <label
        for="regionClaimbuildsModal"
        class="btn btn-primary btn-m btn-circle absolute right-2 top-2"
        >✕</label
      >
      <h3 class="font-bold text-lg">Claimbuilds in region</h3>
      <div class="flex flex-col items-stretch w-full mt-4">
        <div
          class="grid basis-2 flex-grow h-full card bg-base-300 rounded-box place-items-center"
        >
          <div class="flex items-center space-x-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <p>banner here</p>
              </div>
            </div>
            <div>
              <div class="font-bold">{{ claimbuilds }}</div>
              <div class="text-sm opacity-50">Type of claimbuild</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  claimbuilds: {
    type: Array<String>,
    required: true,
  },
});
</script>

<style scoped></style>
