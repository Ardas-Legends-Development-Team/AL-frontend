<template>
  <div class="flex flex-row justify-evenly text-sm text-secondary">
    <div class="basis-2/3">
      <FactionDashboardSummaryWars :faction="faction" />
    </div>
    <div class="basis-1/3 flex flex-col">
      <div class="flex flex-row bg-base-200 rounded-lg">
        <FactionDashboardSummaryInformation :faction-name="faction" />
      </div>
      <div class="flex flex-row">
        <div v-for="(card, index) in cardData" :key="index">
          <FactionDashboardActionCard
            :title="card.title"
            :source="card.sourceGood"
            :alt="card.altGood"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FactionDashboardSummaryWars from "@/components/dashboards/factionDashboard/SummaryAndWars/FactionDashboardSummaryWars.vue";
import FactionDashboardSummaryInformation from "@/components/dashboards/factionDashboard/SummaryAndWars/FactionDashboardSummaryInformation.vue";
import FactionDashboardActionCard from "@/components/dashboards/factionDashboard/SummaryAndWars/FactionDashboardActionCard.vue";

defineProps({
  faction: {
    type: String,
    required: true,
  },
});

const cardData = ref([
  {
    title: "Declare War",
    sourceGood:
      "https://cdn.discordapp.com/attachments/1080521696479547502/1080521864792780810/Crippler22_the_luxury_golden_life_auf_Sauron_2177b208-737c-4fd5-a534-670288a038d0.png",
    altGood: "faction banner",
  },
  {
    title: "Start Alliance",
    sourceGood:
      "https://cdn.discordapp.com/attachments/1080521696479547502/1080521864792780810/Crippler22_the_luxury_golden_life_auf_Sauron_2177b208-737c-4fd5-a534-670288a038d0.png",
    altGood: "faction banner",
  },
]);
</script>
