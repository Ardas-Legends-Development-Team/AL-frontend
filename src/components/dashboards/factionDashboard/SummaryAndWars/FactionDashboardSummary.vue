<template>
  <div class="flex flex-row justify-evenly text-sm text-secondary">
    <div class="basis-2/3">
      <FactionDashboardSummaryWars :faction="faction" />
    </div>
    <div class="basis-1/3 flex flex-col">
      <div class="flex flex-row bg-base-200 rounded-lg">
        <FactionDashboardSummaryInformation :faction-name="faction" />
      </div>
      <div
        v-if="useCharacterStore().isFactionLeader"
        class="flex flex-row justify-center"
      >
        <div v-for="(card, index) in cardData" :key="index">
          <FactionDashboardActionCard
            :title="card.title"
            :source-good="card.sourceGood"
            :alt-good="card.altGood"
            :source-evil="card.sourceEvil"
            :alt-evil="card.altEvil"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/*TODO
- make the cards actually do something
- create a new api client for declaring war and starting alliances
- create a modal for declaring war and starting alliances (make sure the player gives a war name)
 */
import { ref } from "vue";
import FactionDashboardSummaryWars from "@/components/dashboards/factionDashboard/SummaryAndWars/FactionDashboardSummaryWars.vue";
import FactionDashboardSummaryInformation from "@/components/dashboards/factionDashboard/SummaryAndWars/FactionDashboardSummaryInformation.vue";
import FactionDashboardActionCard from "@/components/dashboards/factionDashboard/SummaryAndWars/FactionDashboardActionCard.vue";
import { useCharacterStore } from "@/stores/playerStores";

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
      "https://ateettea.sirv.com/Background%20and%20layout/527796bf-7941-4732-be4b-58a3b7db9491.jpg",
    altGood: "faction banner",
    sourceEvil:
      "https://ateettea.sirv.com/Background%20and%20layout/527796bf-7941-4732-be4b-58a3b7db9491.jpg",
    altEvil: "faction banner",
  },
  /*{
    title: "Start Alliance",
    sourceGood:
      "https://cdn.discordapp.com/attachments/1080521696479547502/1080521864792780810/Crippler22_the_luxury_golden_life_auf_Sauron_2177b208-737c-4fd5-a534-670288a038d0.png",
    altGood: "faction banner",
    sourceEvil:
      "https://ateettea.sirv.com/Background%20and%20layout/527796bf-7941-4732-be4b-58a3b7db9491.jpg",
    altEvil: "faction banner",
  },*/
]);
</script>
