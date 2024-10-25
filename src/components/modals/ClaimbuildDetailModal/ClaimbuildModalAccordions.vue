<template>
  <div class="m-6 grid grid-cols-2 gap-4">
    <GenericDropdown
      v-if="sites.length > 0"
      title="Production Sites"
      :items="sites"
    />
    <GenericDropdown
      v-if="stationedArmies.length > 0"
      title="Stationed Armies"
      :items="stationedArmies"
    />
    <GenericDropdown
      v-if="selectedClaimbuild.specialBuildings.length > 0"
      title="Special Buildings"
      :items="selectedClaimbuild.specialBuildings"
    />
    <GenericDropdown
      v-if="selectedClaimbuild.createdArmies.length > 0"
      title="Created Armies"
      :items="createdArmies"
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

const props = defineProps({
  selectedClaimbuild: {
    type: Object as () => Claimbuild,
    required: true,
  },
});

const sites: string[] = generateProductionSiteString(
  props.selectedClaimbuild?.productionSites || [],
);
const stationedArmies: string[] = generateArmyStrings(
  props.selectedClaimbuild?.stationedArmies || [],
);
const createdArmies: string[] = generateArmyStrings(
  props.selectedClaimbuild?.createdArmies || [],
);
</script>
