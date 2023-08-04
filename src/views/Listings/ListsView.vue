<template>
  <div class="flex flex-wrap">
    <div v-for="(data, index) in cardsData" :key="index">
      <ListCard
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
import ListCard from "@/components/lists/ListCard.vue";

const cardsData = [
  {
    title: "Roleplay Characters",
    sourceGood:
      "https://ateettea.sirv.com/Cards/mbahamirianwork_legolas_aragorn_gimli_gandulf_full_body_full_HD_37dcf8d9-ca93-4481-ad0d-20a9bfd7783a.png",
    altGood: "four human heroes and lords",
    sourceEvil:
      "https://ateettea.sirv.com/Cards/dmtphoto_Lord_of_the_Rings_Ring_Wraiths_on_black_horses_Greg_Ru_67643b9c-072f-44cd-ae65-b6571828261e.png",
    altEvil: "the nazgul on black horses in the night with a full moon behind",
    router: "/lists/roleplay_characters",
    description: "Heroes, monsters and legends of all sorts can be found here",
  },
  {
    title: "Regions",
    sourceGood:
      "https://ateettea.sirv.com/Cards/4708f418-766d-419b-9b8a-ad2754861856.jpg",
    altGood:
      "misty mountains in the background with small river surrounded by lothlorien trees",
    sourceEvil:
      "https://ateettea.sirv.com/Cards/WcB3G92lGCX7hSLmKvCE--4--c2js3_4x.jpg",
    altEvil:
      "moria mines with huge natural stone pillars, with a small goblin camp in the foreground",
    router: "/lists/regions",
    description:
      "From the peaks of the Misty Mountains to the desserts of Harad, find all regions here",
  },
  {
    title: "Factions",
    sourceGood:
      "https://ateettea.sirv.com/Cards/Zv0T5yBDB3HUbcIE8BmNmrOC_q5NfmfZEw5274uUykY.webp",
    altGood: "rohirrim lord sitting on wooden throne",
    sourceEvil:
      "https://ateettea.sirv.com/Cards/Dark_1988_The_Dark_Lord_Sauron_sits_on_the_throne_in_the_fortre_c8af9024-051f-4eef-81fd-24f3d2ece103.png",
    altEvil: "black numenorean on throne",
    router: "/lists/factions",
    description:
      "Here lie the great factions of Arda, from the black legions of Mordor to the blacksmiths of Ered Luin",
  },
];
</script>
