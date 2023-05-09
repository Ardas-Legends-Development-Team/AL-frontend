<template>
  <div class="flex flex-row justify-evenly my-8">
    <UserDashboardCard
      :title="cardsData.gear.title"
      :description="cardsData.gear.description"
      :source="cardsData.gear.source"
      :alt="cardsData.gear.alt"
    />
    <UserDashboardActions class="-translate-y-48" />
    <UserDashboardCard
      :title="cardsData.pvpStatus.title"
      :description="cardsData.pvpStatus.description"
      :source="cardsData.pvpStatus.source"
      :alt="cardsData.pvpStatus.alt"
    />
  </div>
</template>

<script setup lang="ts">
import UserDashboardActions from "@/components/dashboards/userDashboard/UserDashboardActions.vue";
import UserDashboardCard from "@/components/dashboards/userDashboard/UserDashboardCard.vue";
import {ApiClient} from "@/ts/ApiClient";

const cardsData = {
  gear: {
    title: "Gear",
    description: "No character gear",
    source:
      "https://cdn.discordapp.com/attachments/1080521696479547502/1080521864792780810/Crippler22_the_luxury_golden_life_auf_Sauron_2177b208-737c-4fd5-a534-670288a038d0.png",
    alt: "gold helmet",
  },
  pvpStatus: {
    title: "PvP",
    description: "Disabled",
    source:
      "https://cdn.discordapp.com/attachments/1080521946397147166/1080522147501457518/Mister_Lonely_art_by_keith_parkinson_dark_lord_morgoth_holds_al_1aebfbeb-b0bd-4705-89ff-c88197520a53.png",
    alt: "morgoth and sauron",
  },
};

ApiClient.loadCharacterInfo().then((data) => {
  cardsData.gear.description = data.gear;
  if (data.pvp) {
    cardsData.pvpStatus.description = "Enabled";
  }
});
</script>
