<template>
  <div class="modal">
    <div class="modal-box">
      <label
        for="regionClaimbuildsModal"
        class="btn btn-primary btn-m btn-circle absolute right-2 top-2"
        >✕</label
      >
      <h3 class="font-bold text-lg">Claimbuilds in region {{ regionId }}</h3>
      <div class="flex flex-col items-stretch space-y-3 w-full mt-4">
        <div
          v-for="claimbuild in claimbuilds"
          class="grid basis-2 flex-grow h-full card bg-base-300 rounded-box place-items-center"
        >
          <div class="flex items-center justify-start w-full space-x-10 pl-10 pt-1 pb-1 pr-5">
            <div class="avatar grow-0 w-8">
              <img :src="bannerMap.get(claimbuild.faction)" alt="faction banner"/>
            </div>
            <div class="flex flex-auto">
              <div class="w-full">
                <div class="font-bold">{{ claimbuild.name }}</div>
                <div class="flex justify-start space-x-10">
                  <div class="text-sm opacity-50">{{ claimbuild.claimBuildType }}</div>
                  <div class="text-sm opacity-50">Stationed armies: {{ claimbuild.armiesStationedCount }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ClaimBuild } from '@/ts/types/ClaimBuild';

defineProps({
  claimbuilds: {
    type: Array<ClaimBuild>,
      required: true,
  },
  bannerMap: {
    type: Map<string, string>,
    required: true
  },
  regionId: {
    type: String,
    required: true
  }
});



</script>

<style scoped></style>
