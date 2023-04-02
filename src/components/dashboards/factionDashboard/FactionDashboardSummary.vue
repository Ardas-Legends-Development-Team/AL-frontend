<template>
  <div class="flex flex-row justify-evenly text-sm text-secondary">
    <div class="basis-2/3">
      <FactionDashboardSummaryWars :faction="faction" />
    </div>
    <div class="basis-1/3 flex flex-row bg-base-200 rounded-lg">
      <FactionDashboardSummaryInformation :faction="faction" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FactionDashboardSummaryInformation from "@/components/dashboards/factionDashboard/FactionDashboardSummaryInformation.vue";
import FactionDashboardSummaryWars from "@/components/dashboards/factionDashboard/FactionDashboardSummaryWars.vue";

defineProps({
  faction: {
    type: String,
    required: true,
  },
});
</script>
