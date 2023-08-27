<template>
  <div
    v-if="useCharacterStore().isFactionLeader"
    class="flex flex-row justify-center"
  >
    <div v-for="(card, index) in cardData" :key="index">
      <label :for="card.associatedModalRef">
        <FactionDashboardActionCard
          :title="card.title"
          :source-good="card.sourceGood"
          :alt-good="card.altGood"
          :source-evil="card.sourceEvil"
          :alt-evil="card.altEvil"
        />
      </label>
    </div>
  </div>
  <DeclareWarModal
    :target-faction-name="props.factionName"
    @confirm="(e: string) => executeAction(e)"
  />
</template>
<script setup lang="ts">
import { useCharacterStore } from "@/stores/playerStores";
import FactionDashboardActionCard from "@/components/dashboards/factionDashboard/SummaryAndWars/FactionDashboardActionCard.vue";
import { ref } from "vue";
import DeclareWarModal from "@/components/dashboards/factionDashboard/SummaryAndWars/DeclareWarModal.vue";

const props = defineProps({
  factionName: {
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
    associatedModalRef: "declareWarModal",
  },
]);

function executeAction(cardTitle: string) {
  switch (cardTitle) {
    case "Declare War":
      console.log("Declare War");
      // Toggle declareWarModal checkbox
      break;
    default:
      console.log("No action found");
      break;
  }
}
</script>

<style scoped></style>
