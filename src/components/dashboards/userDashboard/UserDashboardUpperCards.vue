<template>
  <div class="flex flex-row justify-evenly my-8">
    <UserDashboardCard
      :title="cardsData.boundTo.title"
      :description="cardsData.boundTo.description"
      :alt-evil="cardsData.boundTo.altEvil"
      :alt-good="cardsData.boundTo.altGood"
      :source-evil="cardsData.boundTo.sourceEvil"
      :source-good="cardsData.boundTo.sourceGood"
    />
    <UserDashboardCard
      class="-translate-y-48"
      :title="cardsData.currentRegion.title"
      :description="cardsData.currentRegion.description"
      :alt-evil="cardsData.currentRegion.altEvil"
      :alt-good="cardsData.currentRegion.altGood"
      :source-evil="cardsData.currentRegion.sourceEvil"
      :source-good="cardsData.currentRegion.sourceGood"
    />
    <UserDashboardCard
      :title="cardsData.injuredStatus.title"
      :description="cardsData.injuredStatus.description"
      :alt-evil="cardsData.injuredStatus.altEvil"
      :alt-good="cardsData.injuredStatus.altGood"
      :source-evil="cardsData.injuredStatus.sourceEvil"
      :source-good="cardsData.injuredStatus.sourceGood"
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
    sourceGood:
      "https://ateettea.sirv.com/Dashboards/balrogslayer_riders_of_Rohan_renaissance_painting_style_lord_of_233edd5c-9583-47ee-86cf-971eb5545442.png",
    altGood: "dalish horsemen riding calmly in a tundra plain",
    sourceEvil:
      "https://ateettea.sirv.com/Dashboards/alastor666ds_an_army_of_mysterious_and_dark_warriors_ffb588a6-7d6f-4fb0-8e5a-490f08ecef00.png",
    altEvil:
      "elite umbar numenoreans wearing black armor and hoods, covered by an iron mask",
  },
  currentRegion: {
    title: "Current Region",
    description: "0",
    sourceGood:
      "https://ateettea.sirv.com/Dashboards/IbU2LQLma03q7Ncb37eM--4--qhbqo.webp",
    altGood: "ranger standing on top of a hill, looking down a mountain pass",
    sourceEvil:
      "https://ateettea.sirv.com/Dashboards/8NSCPrKwsb3xGWJxs22B--3--3zsy6_4x.jpg",
    altEvil:
      "goblin walking through a plain, with a mountain fort in the background",
  },
  injuredStatus: {
    title: "Health",
    description: "You are not injured",
    sourceGood:
      "https://ateettea.sirv.com/Dashboards/SimonGrey8_Caduceus_of_god_hermes._4k_resolution_1d6b1ea9-e609-4d13-a215-a6b9ff7dc059.png",
    altGood: "health symbol with golden snakes and wings",
    sourceEvil:
      "https://ateettea.sirv.com/Dashboards/cloe_null_nazgul_lord_of_the_rings_epic_86cdb049-8e4b-4fd7-ac83-b3af181ba72b.png",
    altEvil: "book of the dead, with a skeleton sigil on the cover",
  },
});

PlayerApiClient.loadCharacterInfo().then((data) => {
  cardsData.value.currentRegion.description = data.currentRegion;
  if (data.boundTo) {
    cardsData.value.boundTo.description = data.boundTo;
  }
  if (data.injured) {
    cardsData.value.injuredStatus.description = "You are injured!";
    if (data.startedHeal) {
      cardsData.value.injuredStatus.description +=
        "\nHealing started at " + data.startedHeal;
      cardsData.value.injuredStatus.description +=
        "\nHealing ends at " + data.healEnds;
    }
  }
});
</script>
