<template>
  <div class="grid grid-cols-3">
    <div class="flex flex-row justify-between">
      <figure>
        <img
          class="mb-2 h-48 w-24"
          :src="factionNameToBanner(selectedClaimbuild.faction)"
          :alt="'alt'"
        />
      </figure>
      <div class="mx-auto mt-6 flex flex-col items-center">
        <h2 class="text-3xl font-bold text-accent">
          {{ selectedClaimbuild.name }}
        </h2>
        <p class="text-2xl font-semibold text-primary">
          {{ selectedClaimbuild.claimBuildType }} -
          {{ selectedClaimbuild.faction }}
        </p>
      </div>
    </div>
    <div class="card w-10/12 bg-base-300 shadow-xl">
      <div class="card-body text-center">
        <h2 class="card-title text-2xl font-bold">Location</h2>
        <div class="divider"></div>
        <div class="grid grid-cols-2 justify-items-stretch gap-y-4">
          <p>Region:</p>
          <p>{{ selectedClaimbuild.region }}</p>
          <p>X:</p>
          <p>{{ selectedClaimbuild.coordinates.x }}</p>
          <p>Y:</p>
          <p>{{ selectedClaimbuild.coordinates.y }}</p>
        </div>
      </div>
    </div>
    <div class="card w-10/12 bg-base-300 shadow-xl">
      <div class="card-body text-center">
        <h2 class="card-title text-2xl font-bold">Stationed</h2>
        <div class="divider"></div>
        <div class="grid grid-cols-2 justify-items-stretch gap-y-4">
          <p>Armies:</p>
          <p>{{ selectedClaimbuild.armiesStationedCount }}</p>
          <p>Companies:</p>
          <p>Coming soon</p>
        </div>
      </div>
    </div>
  </div>
  <div class="divider mx-10"></div>
</template>

<script setup lang="ts">
import { factionNameToBanner } from "@/ts/factionBannersEnum";
import { Claimbuild } from "@/ts/types/Claimbuild";

defineProps({
  selectedClaimbuild: {
    type: Object as () => Claimbuild,
    required: true,
  },
});
</script>
