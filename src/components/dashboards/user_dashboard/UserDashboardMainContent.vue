<template>
  <div class="flex flex-row justify-evenly my-8">
    <UserDashboardCard
      :title="cardsData.gear.title"
      :description="cardsData.gear.description"
      :source="cardsData.gear.source"
      :alt="cardsData.gear.alt"
    />
    <UserDashboardActions class="-translate-y-36" />
    <UserDashboardCard
      :title="cardsData.description.title"
      :description="cardsData.description.description"
      :source="cardsData.description.source"
      :alt="cardsData.description.alt"
    />
  </div>
</template>

<script setup lang="ts">
import UserDashboardActions from "@/components/dashboards/user_dashboard/UserDashboardActions.vue";
import UserDashboardCard from "@/components/dashboards/user_dashboard/UserDashboardCard.vue";

const cardsData = {
  gear: {
    title: "Gear",
    description: "some gear here",
    source:
      "https://cdn.discordapp.com/attachments/1080521696479547502/1080521864792780810/Crippler22_the_luxury_golden_life_auf_Sauron_2177b208-737c-4fd5-a534-670288a038d0.png",
    alt: "umbar numenoreans",
  },
  description: {
    title: "Description",
    description: "character description here",
    source:
      "https://cdn.discordapp.com/attachments/1068863871772790865/1068869767559131136/VernonRoche__CA9.io_lord_of_the_rings_stone_mural_in_the_style__a1f1d601-e177-437e-99ea-2ac0400346a2.png",
    alt: "gondor lake tower",
  },
};
</script>
