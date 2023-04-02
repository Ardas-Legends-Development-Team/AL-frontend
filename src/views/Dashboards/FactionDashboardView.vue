<template>
  <div class="bg-base-100 w-full h-20 flex justify-center">
    <div class="text-center text-neutral-content"></div>
  </div>
  <div class="flex flex-row justify-evenly bg-base-100">
    <div
      class="btn text-center bg-base-100 justify-center h-20 w-1/3"
      :class="{
        [`btn-primary btn-active`]: currentTab === 0,
      }"
      @click="changeTab(0)"
    >
      <h1 class="mb-1 text-2xl text-secondary">Regions & Claimbuilds</h1>
    </div>
    <div
      class="btn text-center bg-base-100 justify-center h-20 w-1/3"
      :class="{
        [`btn-primary btn-active`]: currentTab === 1,
      }"
      @click="changeTab(1)"
    >
      <h1 class="mb-1 text-2xl text-secondary">Summary</h1>
    </div>
    <div
      class="btn text-center bg-base-100 justify-center h-20 w-1/3"
      :class="{
        [`btn-primary btn-active`]: currentTab === 2,
      }"
      @click="changeTab(2)"
    >
      <h1 class="mb-1 text-2xl text-secondary">Armies & Characters</h1>
    </div>
  </div>
  <component :is="tabs[currentTab]" :faction="faction"></component>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref } from "vue";
import FactionDashboardSummary from "@/components/dashboards/factionDashboard/FactionDashboardSummary.vue";
import FactionDashboardRegions from "@/components/dashboards/factionDashboard/FactionDashboardRegions.vue";
import FactionDashboardArmies from "@/components/dashboards/factionDashboard/FactionDashboardArmies.vue";

const currentTab = ref(0);
const faction = useRoute().params.factionName;
const tabs: any = [
  FactionDashboardRegions,
  FactionDashboardSummary,
  FactionDashboardArmies,
];

function changeTab(index: number) {
  currentTab.value = index;
}
</script>
