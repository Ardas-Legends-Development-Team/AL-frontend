<template>
  <div class="flex flex-row justify-evenly my-8">
    <UserDashboardCard
      :title="cardsData.gear.title"
      :description="cardsData.gear.description"
      :alt-evil="cardsData.gear.altEvil"
      :alt-good="cardsData.gear.altGood"
      :source-evil="cardsData.gear.sourceEvil"
      :source-good="cardsData.gear.sourceGood"
    />
    <UserDashboardActions class="-translate-y-48" />
    <UserDashboardCard
      :title="cardsData.pvpStatus.title"
      :description="cardsData.pvpStatus.description"
      :alt-evil="cardsData.pvpStatus.altEvil"
      :alt-good="cardsData.pvpStatus.altGood"
      :source-evil="cardsData.pvpStatus.sourceEvil"
      :source-good="cardsData.pvpStatus.sourceGood"
    />
  </div>
</template>

<script setup lang="ts">
import UserDashboardActions from "@/components/dashboards/userDashboard/UserDashboardActions.vue";
import UserDashboardCard from "@/components/dashboards/userDashboard/UserDashboardCard.vue";
import { PlayerApiClient } from "@/ts/ApiService/PlayerApiClient";
import { ref } from "vue";

const cardsData = ref({
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
  cardsData.value.gear.description = data.gear;
  if (data.pvp) {
    cardsData.value.pvpStatus.description = "Enabled";
  }
});
</script>
