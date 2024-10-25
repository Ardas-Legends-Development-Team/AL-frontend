<template>
  <div class="m-6 grid grid-cols-2 gap-4">
    <GenericDropdown
      v-if="selectedClaimbuild.productionSites.length > 0"
      title="Production Sites"
      :items="generateProductionSiteString(selectedClaimbuild.productionSites)"
    />
    <GenericDropdown
      v-if="selectedClaimbuild.stationedArmies.length > 0"
      title="Stationed Armies"
      :items="generateArmyStrings(selectedClaimbuild.stationedArmies)"
    />
    <GenericDropdown
      v-if="selectedClaimbuild.specialBuildings.length > 0"
      title="Special Buildings"
      :items="selectedClaimbuild.specialBuildings"
    />
    <GenericDropdown
      v-if="selectedClaimbuild.createdArmies.length > 0"
      title="Created Armies"
      :items="generateArmyStrings(selectedClaimbuild.createdArmies)"
    />
  </div>
</template>

<script setup lang="ts">
import { Claimbuild } from "@/ts/types/Claimbuild";
import GenericDropdown from "@/components/GenericDropdown.vue";
import {
  generateArmyStrings,
  generateProductionSiteString,
} from "@/components/modals/modalUtils";

defineProps({
  selectedClaimbuild: {
    type: Object as () => Claimbuild,
    required: true,
  },
});
</script>
