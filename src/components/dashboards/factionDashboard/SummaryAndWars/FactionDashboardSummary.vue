<template>
  <div class="flex flex-row justify-evenly text-sm text-secondary">
    <div class="basis-2/3">
      <FactionDashboardSummaryWars :faction="faction" />
    </div>
    <div class="basis-1/3 flex flex-col">
      <div class="flex flex-row bg-base-200 rounded-lg">
        <FactionDashboardSummaryInformation :faction="faction" />
      </div>
      <div v-for="(card, index) in cardData" :key="index">
        <FactionDashboardActionCard
          :title="card.title"
          :source="card.source"
          :alt="card.alt"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps({
  faction: {
    type: String,
    required: true,
  },
});

const cardData = ref([
  {
    title: "Declare War",
    source: "https://i.imgur.com/1ZQ3Z9C.png",
    alt: "faction banner",
  },
  {
    title: "Start Alliance",
    source: "https://i.imgur.com/1ZQ3Z9C.png",
    alt: "faction banner",
  },
]);
</script>
