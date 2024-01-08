<template>
  <div
    v-if="
      useFactionsStore().isPlayerFactionLeader &&
      usePlayerStore().faction !== props.factionName
    "
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
    @confirm="(e) => executeAction(e.name, e.value)"
  />
</template>
<script setup lang="ts">
import FactionDashboardActionCard from "@/views/Dashboards/FactionDashboardComponents/SummaryAndWars/FactionDashboardActionCard.vue";
import { ref } from "vue";
import DeclareWarModal from "@/views/Dashboards/FactionDashboardComponents/SummaryAndWars/DeclareWarModal.vue";
import { usePlayerStore } from "@/stores/playerStores";
import { WarApiClient } from "@/ts/ApiService/WarApiClient";
import { useFactionsStore } from "@/stores/generalInfoStores";

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
      "https://ateettea.sirv.com/Dashboards/svarthol_melkor_and_sauron_playing_chess_in_the_left_side_of_a__eaf08da4-5f78-4023-a04a-80b18ce8e3d0.png",
    altGood: "Elf playing chess against a nazgul",
    sourceEvil:
      "https://ateettea.sirv.com/Dashboards/svarthol_melkor_and_sauron_playing_chess_in_the_left_side_of_a__18f119ee-fb49-48b1-88e1-1233104b87c5.png",
    altEvil: "Nazgul playing chess against a gondor captain",
    associatedModalRef: "declareWarModal",
  },
]);

function executeAction(cardTitle: string, actionValue: any) {
  switch (cardTitle) {
    case "Declare War":
      WarApiClient.declareWarToFaction(
        props.factionName,
        actionValue as string,
      );
      break;
    default:
      break;
  }
}
</script>

<style scoped></style>
