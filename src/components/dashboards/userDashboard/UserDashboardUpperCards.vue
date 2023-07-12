<template>
  <div class="flex flex-row justify-evenly my-8">
    <UserDashboardCard
      :title="cardsData.boundTo.title"
      :description="cardsData.boundTo.description"
      :source="cardsData.boundTo.source"
      :alt="cardsData.boundTo.alt"
    />
    <UserDashboardCard
      class="-translate-y-48"
      :title="cardsData.currentRegion.title"
      :description="cardsData.currentRegion.description"
      :source="cardsData.currentRegion.source"
      :alt="cardsData.currentRegion.alt"
    />
    <UserDashboardCard
      :title="cardsData.injuredStatus.title"
      :description="cardsData.injuredStatus.description"
      :source="cardsData.injuredStatus.source"
      :alt="cardsData.injuredStatus.alt"
    />
  </div>
</template>

<script setup lang="ts">
import UserDashboardCard from "@/components/dashboards/userDashboard/UserDashboardCard.vue";
import { PlayerApiClient } from "@/ts/ApiService/PlayerApiClient";
import { ref } from "vue";

const cardsData = ref({
  boundTo: {
    title: "Bound To",
    description: "Not bound to army or trading company",
    source:
      "https://cdn.discordapp.com/attachments/1080521696479547502/1080521861940645949/alastor666ds_an_army_of_mysterious_and_dark_warriors_ffb588a6-7d6f-4fb0-8e5a-490f08ecef00.png",
    alt: "umbar numenoreans",
  },
  currentRegion: {
    title: "Current Region",
    description: "0",
    source:
      "https://media.discordapp.net/attachments/1080521946397147166/1080522043533033502/cajur_Medieval_landscape_background_mountains_Lord_of_the_Rings_c4ae9763-78ce-406a-ac6b-11939e7a5e2d.png?width=671&height=671",
    alt: "valley road",
  },
  injuredStatus: {
    title: "Injured",
    description: "You are not injured",
    source:
      "https://cdn.discordapp.com/attachments/1080521696479547502/1080522228191469730/SimonGrey8_Caduceus_of_god_hermes._4k_resolution_1d6b1ea9-e609-4d13-a215-a6b9ff7dc059.png",
    alt: "health symbol",
  },
});

PlayerApiClient.loadCharacterInfo().then((data) => {
  cardsData.value.currentRegion.description = data.currentRegion;
  if (data.boundTo !== "") {
    cardsData.value.boundTo.description = data.boundTo;
  }
  if (data.injured) {
    cardsData.value.injuredStatus.description = "You are injured!";
    if (data.startedHeal !== "") {
      cardsData.value.injuredStatus.description +=
        "\nHealing started at " + data.startedHeal;
      cardsData.value.injuredStatus.description +=
        "\nHealing ends at " + data.healEnds;
    }
  }
});
</script>
