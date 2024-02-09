<template>
  <div class="my-4 flex flex-row justify-center" v-if="currentWars.length > 0">
    <h2 class="text-3xl font-bold text-secondary">Current Wars</h2>
  </div>
  <div class="flex flex-col justify-center">
    <div
      v-for="(war, index) in currentWars"
      :key="index"
      class="mx-16 my-2 flex flex-row justify-center rounded-lg bg-base-200"
    >
      <FactionDashboardSummaryWar :war="war" />
    </div>
  </div>
  <div class="my-4 flex flex-row justify-center" v-if="pastWars.length > 0">
    <h2 class="text-3xl font-bold text-secondary">Past Wars</h2>
  </div>
  <div class="flex flex-col justify-center">
    <div
      v-for="(war, index) in pastWars"
      :key="index"
      class="mx-16 my-2 flex flex-row justify-center rounded-lg bg-base-200"
    >
      <FactionDashboardSummaryWar :war="war" />
    </div>
    <div class="my-4 flex flex-row justify-center" v-if="hasMorePastWars">
      <button v-if="hasMorePastWars" class="btn btn-accent btn-outline">
        Show More
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { War } from "@/ts/types/War";
import FactionDashboardSummaryWar from "@/views/Dashboards/FactionDashboardComponents/SummaryAndWars/FactionDashboardSummaryWar.vue";
import { WarApiClient } from "@/ts/ApiService/WarApiClient";

//const pastWarsPage = ref(0);
const pastWars = ref<War[]>([]);
const hasMorePastWars = ref(true);

/*function showMore() {
  for (const war of pastWarsMockData[pastWarsPage.value]) {
    pastWars.value.push(war);
  }
  pastWarsPage.value++;
  if (pastWarsPage.value >= pastWarsMockData.value.length) {
    hasMorePastWars.value = false;
  }
}*/

onMounted(() => {
  //showMore();
  hasMorePastWars.value = false;
});

const props = defineProps({
  faction: {
    type: String,
    required: true,
  },
});

const currentWars = ref<War[]>([]);

WarApiClient.loadWars().then((wars) => {
  for (const war of wars) {
    if (
      war.initialAttacker === props.faction ||
      war.initialDefender === props.faction
    ) {
      currentWars.value.push(war);
    }
  }
});
</script>
