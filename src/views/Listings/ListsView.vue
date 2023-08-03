<template>
  <div class="flex flex-wrap">
    <div v-for="(data, index) in cardsData" :key="index">
      <ListCard
        :title="data.title"
        :router="data.router"
        :description="data.description"
        :altGood="data.altGood"
        :sourceGood="data.sourceGood"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ListCard from "@/components/lists/ListCard.vue";

const cardsData = [
  {
    title: "Roleplay Characters",
    sourceGood:
      "https://media.discordapp.net/attachments/1068863871772790865/1068869734365409322/VernonRoche__CA9.io_lord_of_the_rings_painting_of_durins_folk_d_c674282e-c208-4509-9760-a5e1fe77e6ab.png?width=671&height=671",
    altGood: "dwarven lords",
    router: "/lists/roleplay_characters",
    description: "Heroes, monsters and legends of all sorts can be found here",
  },
  {
    title: "Regions",
    sourceGood:
      "https://cdn.discordapp.com/attachments/1080521696479547502/1080521863278645298/BlueOrigin_flying_ancient_Castle_above_an_army_of_Orcs__Gothic__9da9b1c3-af31-4d3c-a368-ec13cd347031.png",
    altGood: "castle with ravens",
    router: "/lists/regions",
    description:
      "From the peaks of the Misty Mountains to the desserts of Harad, find all regions here",
  },
  {
    title: "Factions",
    sourceGood:
      "https://cdn.discordapp.com/attachments/1080521696479547502/1080521882945728512/Dark_1988_The_Dark_Lord_Sauron_sits_on_the_throne_in_the_fortre_c8af9024-051f-4eef-81fd-24f3d2ece103.png",
    altGood: "black numenorean on throne",
    router: "/lists/factions",
    description:
      "Here lie the great factions of Arda, from the black legions of Mordor to the blacksmiths of Ered Luin",
  },
];
</script>
