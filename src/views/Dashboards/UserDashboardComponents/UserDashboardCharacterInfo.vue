<template>
  <h2 class="mb-1 text-3xl text-neutral-content font-bold ml-16 mt-8 pb-4">
    Character Information
  </h2>
  <div class="flex flex-row flex-wrap justify-evenly my-8">
    <UserDashboardCard
      v-for="(data, index) in cardsData"
      :key="index"
      class="m-2"
      :title="data.title"
      :description="data.description"
      :alt-evil="data.altEvil"
      :alt-good="data.altGood"
      :source-evil="data.sourceEvil"
      :source-good="data.sourceGood"
    />
  </div>
</template>

<script setup lang="ts">
import UserDashboardCard from "@/views/Dashboards/UserDashboardComponents/UserDashboardInfoCard.vue";
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
      "https://ateettea.sirv.com/Dashboards/vitoriasoares_m_Lord_of_the_Rings_movie_directed_by_HR_Geiger_s_489979d9-ecf7-42d3-b116-5dc2f617bb5f.png",
    altGood: "grey wizard in a marsh with a big stone tower in the distance",
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
  gear: {
    title: "Gear",
    description: "No character gear",
    sourceGood:
      "https://ateettea.sirv.com/Dashboards/Crippler22_the_luxury_golden_life_auf_Sauron_2177b208-737c-4fd5-a534-670288a038d0.png",
    altGood: "luxurious golden helmet of an elven general",
    sourceEvil:
      "https://ateettea.sirv.com/Dashboards/20c3172f-ac60-453e-a2ff-c65817c4e124.jpg",
    altEvil: "dwarven ring of power with a blue gem in the center",
  },
  pvpStatus: {
    title: "PvP",
    description: "Disabled",
    sourceGood:
      "https://ateettea.sirv.com/Dashboards/Mister_Lonely_art_by_keith_parkinson_dark_lord_morgoth_holds_al_1aebfbeb-b0bd-4705-89ff-c88197520a53.png",
    altGood:
      "mage fighting a huge balrog while preparing to launch a fireball at it, with black mountains surrounding them in the night",
    sourceEvil:
      "https://ateettea.sirv.com/Dashboards/darkbrandon_uruk-hai_orcs_in_battle_in_the_style_of_paul_bonner_d2b64444-250c-4960-a61b-0994342e8198%20(copy).png",
    altEvil: "band of uruks walking out ready for a battle",
  },
});

PlayerApiClient.loadCharacterInfo().then((data) => {
  if (data.boundTo) {
    cardsData.value.boundTo.description = data.boundTo;
  }
  cardsData.value.currentRegion.description = data.currentRegion;
  if (data.injured) {
    cardsData.value.injuredStatus.description = data.healEnds;
  }
  cardsData.value.gear.description = data.gear;
  if (data.pvp) {
    cardsData.value.pvpStatus.description = "Enabled";
  }
});
</script>
