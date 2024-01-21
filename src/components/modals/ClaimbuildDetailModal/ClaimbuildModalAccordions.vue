<template>
  <div class="m-6 grid grid-cols-2 gap-4">
    <div
      tabindex="0"
      class="collapse-arrow collapse bg-base-300"
      v-if="selectedClaimbuild.productionSites.length > 0"
    >
      <div class="collapse-title text-xl font-medium">Production Sites</div>
      <div class="collapse-content">
        <p
          v-for="productionSite in selectedClaimbuild.productionSites"
          :key="productionSite.productionSite.type"
        >
          {{ productionSite.amount }}
          {{ productionSite.productionSite.resource }}
          {{ productionSite.productionSite.type }}
        </p>
      </div>
    </div>
    <div
      tabindex="0"
      class="collapse-arrow collapse bg-base-300"
      v-if="selectedClaimbuild.stationedArmies.length > 0"
    >
      <div class="collapse-title text-xl font-medium">Stationed Armies</div>
      <div class="collapse-content">
        <p
          v-for="stationedArmy in selectedClaimbuild.stationedArmies"
          :key="stationedArmy.name"
        >
          {{ stationedArmy.faction }} {{ stationedArmy.armyType }}:
          {{ stationedArmy.name }}, bound to {{ stationedArmy.boundTo }}
        </p>
      </div>
    </div>
    <div
      tabindex="0"
      class="collapse-arrow collapse bg-base-300"
      v-if="selectedClaimbuild.specialBuildings.length > 0"
    >
      <div class="collapse-title text-xl font-medium">Special Buildings</div>
      <div class="collapse-content">
        <p
          v-for="specialBuilding in selectedClaimbuild.specialBuildings"
          :key="specialBuilding"
        >
          {{ specialBuilding }}
        </p>
      </div>
    </div>
    <div
      tabindex="0"
      class="collapse-arrow collapse bg-base-300"
      v-if="selectedClaimbuild.createdArmies.length > 0"
    >
      <div class="collapse-title text-xl font-medium">Created Armies</div>
      <div class="collapse-content">
        <p
          v-for="stationedArmy in selectedClaimbuild.createdArmies"
          :key="stationedArmy.name"
        >
          {{ stationedArmy.armyType }}: {{ stationedArmy.name }}, bound to
          {{ stationedArmy.boundTo }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Claimbuild } from "@/ts/types/Claimbuild";

defineProps({
  selectedClaimbuild: {
    type: Object as () => Claimbuild,
    required: true,
  },
});
</script>
