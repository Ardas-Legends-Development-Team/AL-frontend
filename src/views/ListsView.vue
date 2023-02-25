<template>
  <div class="flex flex-wrap">
    <div v-for="(data, index) in cardsData" :key="index">
      <CardItem
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
import CardItem from "@/components/CardItem.vue";

const cardsData = [
  {
    title: "Roleplay Characters",
    source:
      "https://media.discordapp.net/attachments/1068863871772790865/1068869734365409322/VernonRoche__CA9.io_lord_of_the_rings_painting_of_durins_folk_d_c674282e-c208-4509-9760-a5e1fe77e6ab.png?width=671&height=671",
    alt: "dwarven lords",
    router: "/lists/roleplay_characters",
    description: "Heroes, monsters and legends of all sorts can be found here",
  },
  {
    title: "Regions",
    source:
      "https://media.discordapp.net/attachments/1068863871772790865/1070856116394786837/EleventyFive_fantasy_theme_dungeon_and_dragon_destroyed_wooden__2eae6ee5-ef49-456b-b537-5f86d41ed14c.png",
    alt: "cart in mountains",
    router: "/lists/regions",
    description:
      "From the peaks of the Misty Mountains to the desserts of Harad, find all regions here",
  },
];
</script>
