<template>
  <div class="flex flex-row justify-evenly text-sm text-secondary">
    <div class="basis-2/3">
      <FactionDashboardSummaryWars :faction="faction" />
    </div>
    <div class="flex basis-1/3 flex-col">
      <div class="flex flex-row rounded-lg bg-base-200">
        <FactionDashboardSummaryInformation :faction-name="faction" />
      </div>
      <FactionDashboardSummaryActions :faction-name="faction" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FactionDashboardSummaryWars from "@/views/Dashboards/FactionDashboardComponents/SummaryAndWars/FactionDashboardSummaryWars.vue";
import FactionDashboardSummaryInformation from "@/views/Dashboards/FactionDashboardComponents/SummaryAndWars/FactionDashboardSummaryInformation.vue";
import FactionDashboardSummaryActions from "@/views/Dashboards/FactionDashboardComponents/SummaryAndWars/FactionDashboardSummaryActions.vue";

defineProps({
  faction: {
    type: String,
    required: true,
  },
});
</script>
