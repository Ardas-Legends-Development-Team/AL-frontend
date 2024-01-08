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
  </div>
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
