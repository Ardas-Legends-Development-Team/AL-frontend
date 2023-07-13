<template>
  <div
    class="flex flex-row justify-center my-4"
    v-if="currentWarsMockData.length > 0"
  >
    <h2 class="text-3xl text-secondary font-bold">Current Wars</h2>
  </div>
  <div class="flex flex-col justify-center">
    <div
      v-for="(war, index) in currentWarsMockData"
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
      :class="{
        [`bg-green-900`]: war.outcome === 'win',
        [`bg-red-950`]: war.outcome === 'loss',
      }"
    >
      <FactionDashboardSummaryWar :war="war" />
    </div>
    <div class="my-4 flex flex-row justify-center" v-if="hasMorePastWars">
      <button
        v-if="hasMorePastWars"
        class="btn btn-accent btn-outline"
        @click="showMore"
      >
        Show More
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { War } from "@/ts/types/War";
import FactionDashboardSummaryWar from "@/components/dashboards/factionDashboard/SummaryAndWars/FactionDashboardSummaryWar.vue";

const pastWarsPage = ref(0);
const pastWars = ref<War[]>([]);
const hasMorePastWars = ref(true);

function showMore() {
  for (const war of pastWarsMockData[pastWarsPage.value]) {
    pastWars.value.push(war);
  }
  pastWarsPage.value++;
  if (pastWarsPage.value >= pastWarsMockData.value.length) {
    hasMorePastWars.value = false;
  }
}

onMounted(() => {
  //showMore();
  hasMorePastWars.value = false;
});

defineProps({
  faction: {
    type: String,
    required: true,
  },
});

const currentWarsMockData = ref([]);

const pastWarsMockData = ref([]);
</script>
