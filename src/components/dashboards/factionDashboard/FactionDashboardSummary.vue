<template>
  <div class="flex flex-row justify-evenly text-sm text-secondary">
    <div class="basis-2/3">
      <FactionDashboardSummaryWars :faction="faction" />
    </div>
    <div class="basis-1/3 flex flex-col">
      <div class="flex flex-row bg-base-200 rounded-lg">
        <FactionDashboardSummaryInformation :faction-name="faction" />
      </div>
      <FactionDashboardSummaryActions :faction-name="faction" />
    </div>
  </div>
</template>

<script setup lang="ts">
/*TODO
- make the cards actually do something
- create a modal for declaring war and starting alliances (make sure the player gives a war name)
 */
import FactionDashboardSummaryWars from "@/components/dashboards/factionDashboard/SummaryAndWars/FactionDashboardSummaryWars.vue";
import FactionDashboardSummaryInformation from "@/components/dashboards/factionDashboard/SummaryAndWars/FactionDashboardSummaryInformation.vue";
import FactionDashboardSummaryActions from "@/components/dashboards/factionDashboard/SummaryAndWars/FactionDashboardSummaryActions.vue";

defineProps({
  faction: {
    type: String,
    required: true,
  },
});
</script>
