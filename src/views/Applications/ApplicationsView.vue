<template>
  <div class="flex flex-wrap">
    <div v-for="(data, index) in cardsData" :key="index">
      <ListCard
        :title="data.title"
        :router="data.router"
        :description="data.description"
        :alt="data.alt"
        :source="data.source"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ListCard from "@/components/lists/ListCard.vue";

const cardsData = [
  {
    title: "Roleplay Character Application",
    source:
      "https://media.discordapp.net/attachments/1068863871772790865/1068869765176766515/VernonRoche__CA9.io_lord_of_the_rings_painting_of_haradrim_sold_d7f2d6a0-8d57-4fee-a115-d6fd8b4c9c38.png",
    alt: "haradrim soldiers",
    router: "/applications/roleplay_character",
    description: "Create your valiant hero or destructive tyrant here",
  },
  {
    title: "Claimbuilds Application",
    source:
      "https://media.discordapp.net/attachments/1068863871772790865/1068869733966942258/VernonRoche__CA9.io_lord_of_the_rings_painting_of_an_elven_army_a48b17a6-23f0-4f03-8af6-07282d3b1aa1.png",
    alt: "elf army with general",
    router: "/applications/claimbuilds",
    description: "Create your claimbuilds here",
  },
];
</script>
