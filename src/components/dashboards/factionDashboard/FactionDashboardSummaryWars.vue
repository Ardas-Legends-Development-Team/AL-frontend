<template>
  <div class="flex flex-row justify-center my-4" v-if="currentWars.length > 0">
    <h2 class="text-3xl text-secondary font-bold">Current Wars</h2>
  </div>
  <div class="flex flex-col justify-center">
    <div
      v-for="war in currentWars"
      :key="war"
      class="flex flex-row justify-center bg-base-200 rounded-lg my-2 mx-16"
    >
      <FactionDashboardSummaryWar :war="war" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FactionDashboardSummaryWar from "@/components/dashboards/factionDashboard/FactionDashboardSummaryWar.vue";

const currentWars = ref([
  {
    allies: ["Gondor", "Gondor", "Mordor", "Angmar", "Angmar"],
    enemies: ["Mordor", "Angmar", "Angmar", "Durin's Folk", "Gondor", "Gondor"],
    faction: "Gondor",
    mainEnemy: "Mordor",
    outcome: "",
  },
  {
    allies: ["Gondor", "Angmar", "Angmar"],
    enemies: ["Mordor", "Angmar", "Angmar", "Durin's Folk", "Gondor", "Gondor"],
    faction: "Gondor",
    mainEnemy: "Mordor",
    outcome: "",
  },
]);
defineProps({
  faction: {
    type: String,
    required: true,
  },
});
</script>
