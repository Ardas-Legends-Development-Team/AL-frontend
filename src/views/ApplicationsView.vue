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
    title: "Roleplay Character Application",
    source:
      "https://media.discordapp.net/attachments/1068863871772790865/1068869765176766515/VernonRoche__CA9.io_lord_of_the_rings_painting_of_haradrim_sold_d7f2d6a0-8d57-4fee-a115-d6fd8b4c9c38.png",
    alt: "haradrim soldiers",
    router: "/applications/roleplay_character",
    description: "Create your valiant hero or destructive tyrant here",
  },
];
</script>
