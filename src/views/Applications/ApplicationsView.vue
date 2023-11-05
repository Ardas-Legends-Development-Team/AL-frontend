<template>
  <div class="flex flex-wrap">
    <div v-for="(data, index) in cardsData" :key="index">
      <GenericMediumCard
        :title="data.title"
        :router="data.router"
        :description="data.description"
        :alt-good="data.altGood"
        :source-good="data.sourceGood"
        :alt-evil="data.altEvil"
        :source-evil="data.sourceEvil"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import GenericMediumCard from "@/components/GenericMediumCard.vue";

const cardsData = [
  {
    title: "Roleplay Character Application",
    sourceGood: "https://ateettea.sirv.com/Cards/W9soJbE.jpeg",
    altGood: "dwarven warrior thinking after battle",
    sourceEvil:
      "https://ateettea.sirv.com/Cards/Baareth_black_warhammer_orc_front_portrait_prominent_jaw_helmet_6217b8e5-b85b-406f-a247-6a5799fca94e.png",
    altEvil: "black orc with horned circlet and heavy armour",
    router: "/applications/roleplay_character",
    description: "Create your valiant hero or destructive tyrant here",
  },
  {
    title: "Claimbuild Application",
    sourceGood:
      "https://ateettea.sirv.com/Cards/MfeWlbPTwPCZl4B4EOmW--1--xvrsl_4x.jpg",
    altGood: "elven mountain hall main entrance",
    sourceEvil:
      "https://ateettea.sirv.com/Cards/BlueOrigin_flying_ancient_Castle_above_an_army_of_Orcs__Gothic__9da9b1c3-af31-4d3c-a368-ec13cd347031.png",
    altEvil: "angmar castle with flying ravens in the snow",
    router: "/applications/claimbuilds",
    description: "Create your claimbuilds here",
  },
];
</script>
