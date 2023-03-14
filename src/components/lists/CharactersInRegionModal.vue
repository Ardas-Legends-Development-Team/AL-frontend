<template>
  <div class="modal">
    <div class="modal-box">
      <label
        for="charactersInRegionModal"
        class="btn btn-primary btn-m btn-circle absolute right-2 top-2"
        >✕</label
      >
      <h3 class="font-bold text-lg">Characters in region</h3>
      <div class="flex flex-col items-stretch w-full mt-4">
        <div
          class="grid basis-2 flex-grow h-full card bg-base-300 rounded-box place-items-center"
        >
          <div class="flex items-center space-x-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img
                  :src="`https://mc-heads.net/avatar/$VernonRoche/36`"
                  alt="Avatar"
                />
              </div>
            </div>
            <div>
              <div class="font-bold">{{ characters }}</div>
              <div class="text-sm opacity-70">Faction here</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  characters: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
