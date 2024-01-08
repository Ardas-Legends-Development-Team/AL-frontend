<template>
  <div class="flex h-20 w-full justify-center bg-base-100">
    <div class="mt-4 text-center text-4xl font-bold text-neutral-content">
      {{ faction }}
    </div>
  </div>
  <div class="flex flex-row justify-evenly bg-base-100">
    <div
      class="btn btn-outline h-16 w-1/3 justify-center bg-base-100 text-center"
      :class="{
        [`btn-primary btn-active`]: currentTab === 0,
      }"
      @click="changeTab(0)"
    >
      <h1 class="mb-1 text-2xl text-secondary">Regions & Claimbuilds</h1>
    </div>
    <div
      class="btn btn-outline h-16 w-1/3 justify-center bg-base-100 text-center"
      :class="{
        [`btn-primary btn-active`]: currentTab === 1,
      }"
      @click="changeTab(1)"
    >
      <h1 class="mb-1 text-2xl text-secondary">Summary</h1>
    </div>
    <div
      class="btn btn-outline h-16 w-1/3 justify-center bg-base-100 text-center"
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
import FactionDashboardSummary from "@/views/Dashboards/FactionDashboardComponents/FactionDashboardSummary.vue";

const FactionDashboardRegions = defineAsyncComponent(
  () =>
    import(
      "@/views/Dashboards/FactionDashboardComponents/FactionDashboardRegions.vue"
    ),
);
const FactionDashboardArmies = defineAsyncComponent(
  () =>
    import(
      "@/views/Dashboards/FactionDashboardComponents/FactionDashboardArmies.vue"
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
