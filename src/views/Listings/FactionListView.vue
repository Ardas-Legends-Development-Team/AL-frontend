<template>
  <div class="m-6 grid grid-cols-7 gap-4">
    <div v-for="data in cardsData" :key="data">
      <RouterLink :to="`/faction/${data.title}`">
        <FactionListCard
          :title="data.title"
          :source="data.source"
          :alt="data.alt"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FactionApiClient } from "@/ts/ApiService/FactionApiClient";
import { ref } from "vue";
import { factionNameToBanner } from "@/ts/factionBannersEnum";
import FactionListCard from "@/views/Dashboards/FactionDashboardComponents/FactionListCard.vue";
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
