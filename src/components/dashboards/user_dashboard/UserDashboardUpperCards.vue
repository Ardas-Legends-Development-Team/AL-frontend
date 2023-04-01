<template>
  <div class="flex flex-row justify-evenly">
    <UserDashboardCard
      class="-translate-y-40"
      :title="cardsData.currentRegion.title"
      :description="cardsData.currentRegion.description"
      :source="cardsData.currentRegion.source"
      :alt="cardsData.currentRegion.alt"
    />
    <UserDashboardCard
      class="-translate-y-40"
      :title="cardsData.pvpStatus.title"
      :description="cardsData.pvpStatus.description"
      :source="cardsData.pvpStatus.source"
      :alt="cardsData.pvpStatus.alt"
    />
  </div>
</template>

<script setup lang="ts">
import UserDashboardCard from "@/components/dashboards/user_dashboard/UserDashboardCard.vue";

const cardsData = {
  currentRegion: {
    title: "Current Region",
    description: "region here",
    source:
      "https://media.discordapp.net/attachments/1068863871772790865/1070856198821257216/maxBen_lothlorien_lord_of_the_rings_d172e7a3-1c36-425c-9004-7e0910a898c1.png?width=671&height=671",
    alt: "gondor lake tower",
  },
  pvpStatus: {
    title: "PvP",
    description: "on or off",
    source:
      "https://cdn.discordapp.com/attachments/1080521946397147166/1080522147501457518/Mister_Lonely_art_by_keith_parkinson_dark_lord_morgoth_holds_al_1aebfbeb-b0bd-4705-89ff-c88197520a53.png",
    alt: "morgoth and sauron",
  },
};
</script>
