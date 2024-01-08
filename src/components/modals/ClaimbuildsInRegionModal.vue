<template>
  <div class="modal">
    <div class="modal-box">
      <label
        for="regionClaimbuildsModal"
        class="btn-m btn btn-circle btn-primary absolute right-2 top-2"
        >✕</label
      >
      <h3 class="text-lg font-bold">Claimbuilds in region {{ regionId }}</h3>
      <div class="mt-4 flex w-full flex-col items-stretch space-y-3">
        <div
          v-for="claimbuild in claimbuilds"
          :key="claimbuild.name"
          class="card rounded-box grid h-full flex-grow basis-2 place-items-center bg-base-300"
        >
          <div
            class="flex w-full items-center justify-start space-x-10 pb-1 pl-10 pr-5 pt-1"
          >
            <div class="avatar w-8 grow-0">
              <img
                :src="bannerMap.get(claimbuild.faction)"
                alt="faction banner"
              />
            </div>
            <div class="flex flex-auto">
              <div class="w-full">
                <div class="font-bold">{{ claimbuild.name }}</div>
                <div class="flex justify-start space-x-10">
                  <div class="text-sm opacity-50">
                    {{ claimbuild.claimBuildType }}
                  </div>
                  <div class="text-sm opacity-50">
                    Stationed armies: {{ claimbuild.armiesStationedCount }}
                  </div>
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
import { Claimbuild } from "@/ts/types/Claimbuild";

defineProps({
  claimbuilds: {
    type: Array<Claimbuild>,
    required: true,
  },
  bannerMap: {
    type: Map<string, string>,
    required: true,
  },
  regionId: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
