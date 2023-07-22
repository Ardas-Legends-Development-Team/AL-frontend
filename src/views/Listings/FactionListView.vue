<template>
  <div class="grid grid-cols-7 gap-4 m-6">
    <div v-for="data in cardsData" :key="data">
      <RouterLink :to="`/faction/${data.title}`">
        <FactionListCard
          :title="data.title"
          :alt="data.alt"
          :source="data.source"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FactionApiClient } from "@/ts/ApiService/FactionApiClient";
import { ref } from "vue";
import { factionNameToBanner } from "@/ts/factionBannersEnum";
import FactionListCard from "@/components/dashboards/factionDashboard/FactionListCard.vue";
import { RouterLink } from "vue-router";

const cardsData = ref<any[]>([]);

FactionApiClient.loadFactionNames().then((factionNames) => {
  factionNames.forEach((factionName) => {
    cardsData.value.push({
      title: factionName,
      source: factionNameToBanner(factionName),
      alt: factionName + " banner",
    });
  });
});
</script>
