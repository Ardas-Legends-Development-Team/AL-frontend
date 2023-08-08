<template>
  <div class="bg-base-100 w-full h-20 flex justify-center">
    <div class="text-center text-neutral-content text-4xl font-bold mt-4">
      {{ faction }}
    </div>
  </div>
  <div class="flex flex-row justify-evenly bg-base-100">
    <div
      class="btn btn-outline text-center bg-base-100 justify-center h-16 w-1/3"
      :class="{
        [`btn-primary btn-active`]: currentTab === 0,
      }"
      @click="changeTab(0)"
    >
      <h1 class="mb-1 text-2xl text-secondary">Regions & Claimbuilds</h1>
    </div>
    <div
      class="btn btn-outline text-center bg-base-100 justify-center h-16 w-1/3"
      :class="{
        [`btn-primary btn-active`]: currentTab === 1,
      }"
      @click="changeTab(1)"
    >
      <h1 class="mb-1 text-2xl text-secondary">Summary</h1>
    </div>
    <div
      class="btn btn-outline text-center bg-base-100 justify-center h-16 w-1/3"
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
import { defineAsyncComponent, ref } from "vue";
import FactionDashboardSummary from "@/components/dashboards/factionDashboard/SummaryAndWars/FactionDashboardSummary.vue";

const FactionDashboardRegions = defineAsyncComponent(
  () =>
    import(
      "@/components/dashboards/factionDashboard/FactionDashboardRegions.vue"
    ),
);
const FactionDashboardArmies = defineAsyncComponent(
  () =>
    import(
      "@/components/dashboards/factionDashboard/FactionDashboardArmies.vue"
    ),
);

const currentTab = ref(1);
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
