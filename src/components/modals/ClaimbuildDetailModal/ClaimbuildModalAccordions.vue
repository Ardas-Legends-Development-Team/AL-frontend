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
    <GenericDropdown title="test" :items="testItems" />
    <GenericDropdown title="test2" :items="testItemsTwo" />
    <GenericDropdown title="test3" :items="testItemsTwo" />
    <GenericDropdown title="test4" :items="testItems" />
    <GenericDropdown title="test5" :items="testItemsTwo" />
    <GenericDropdown title="test6" :items="testItems" />
    <GenericDropdown title="test7" :items="testItemsTwo" />
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
const testItems = ["Fingon", "Fingolfin", "Feanor", "Turgon"];
const testItemsTwo = ["test1", "test2"];

const sites = generateProductionSiteString(
  props.selectedClaimbuild?.productionSites || [],
);
const stationedArmies = generateArmyStrings(
  props.selectedClaimbuild?.stationedArmies || [],
);
const createdArmies = generateArmyStrings(
  props.selectedClaimbuild?.createdArmies || [],
);
</script>
