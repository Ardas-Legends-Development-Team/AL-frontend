<template>
  <div class="flex flex-row justify-center m-3">
    <div class="flex flex-row basis-1/3 flex-wrap">
      <img
        v-for="alliedFactionBanner in alliedFactionBanners"
        :key="alliedFactionBanner"
        class="w-16 h-32"
        :src="alliedFactionBanner"
        alt="faction banner"
      />
    </div>
    <h3 class="basis-1/3 text-xl text-accent font-bold text-center my-10 mx-2">
      {{ war.faction }} VS {{ war.mainEnemy }}
    </h3>
    <div class="flex flex-row basis-1/3 flex-wrap">
      <img
        v-for="enemyFactionBanner in enemyFactionBanners"
        :key="enemyFactionBanner"
        class="w-16 h-32"
        :src="enemyFactionBanner"
        alt="faction banner"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { factionNameToBanner } from "@/ts/factionBannersEnum";
import { ref } from "vue";
import { War } from "@/ts/types/War";

const props = defineProps({
  war: {
    type: Object as () => War,
    required: true,
  },
});

const alliedFactionBanners = ref<string[]>([]);
const enemyFactionBanners = ref<string[]>([]);

function populateWarBanners() {
  for (let i = 0; i < props.war.allies.length; i++) {
    alliedFactionBanners.value[i] = factionNameToBanner(props.war.allies[i]);
  }
  for (let i = 0; i < props.war.enemies.length; i++) {
    enemyFactionBanners.value[i] = factionNameToBanner(props.war.enemies[i]);
  }
}

populateWarBanners();
</script>
