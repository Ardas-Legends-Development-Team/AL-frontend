<template>
  <div class="grid grid-cols-8 gap-4 m-6">
    <div v-for="data in cardsData" :key="data">
      <FactionListCard
        :title="data.title"
        :alt="data.alt"
        :source="data.source"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ApiClient from "@/ts/ApiClient";
import { ref } from "vue";
import { factionNameToBanner } from "@/ts/factionBannersEnum";
import FactionListCard from "@/components/dashboards/factionDashboard/FactionListCard.vue";

const cardsData = ref<any[]>([]);

ApiClient.loadFactions().then((factions) => {
  console.log(factions);
  factions.forEach((faction) => {
    cardsData.value.push({
      title: faction,
      source: factionNameToBanner(faction),
      alt: faction + " banner",
    });
  });
});
</script>
