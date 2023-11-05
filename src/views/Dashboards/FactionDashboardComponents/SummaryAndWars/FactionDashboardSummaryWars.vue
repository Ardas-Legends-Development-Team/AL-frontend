<template>
  <div class="flex flex-row justify-center my-4" v-if="currentWars.length > 0">
    <h2 class="text-3xl text-secondary font-bold">Current Wars</h2>
  </div>
  <div class="flex flex-col justify-center">
    <div
      v-for="(war, index) in currentWars"
      :key="index"
      class="flex flex-row justify-center bg-base-200 rounded-lg my-2 mx-16"
    >
      <FactionDashboardSummaryWar :war="war" />
    </div>
  </div>
  <div class="flex flex-row justify-center my-4" v-if="pastWars.length > 0">
    <h2 class="text-3xl text-secondary font-bold">Past Wars</h2>
  </div>
  <div class="flex flex-col justify-center">
    <div
      v-for="(war, index) in pastWars"
      :key="index"
      class="flex flex-row justify-center bg-base-200 rounded-lg my-2 mx-16"
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
      war.nameOfAttacker === props.faction ||
      war.nameOfDefender === props.faction
    ) {
      currentWars.value.push(war);
    }
  }
});
</script>
