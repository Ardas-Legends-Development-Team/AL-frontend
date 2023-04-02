<template>
  <div class="flex flex-col content-center basis-2/3 m-4">
    <h3 class="text-2xl my-3">King: Sspoefaspeofasefssess</h3>
    <h3 class="text-2xl my-3">Starting Region: 128</h3>
    <h3 class="text-2xl my-3">Claimed Regions: 500</h3>
    <h3 class="text-2xl my-3">Claimbuilds: 153</h3>
    <h3 class="text-2xl my-3">Armies: 255</h3>
    <h3 class="text-2xl my-3">Players: 153</h3>
  </div>
  <div class="basis-1/3 my-3">
    <div class="w-24 h-48 mx-2">
      <img :src="factionBanner" alt="faction banner" />
    </div>
    <div class="divider"></div>
    <div class="flex flex-row justify-end">
      <div
        v-for="alliedFactionBanner in alliedFactionBanners"
        :key="alliedFactionBanner"
        class="w-8 h-16"
      >
        <img :src="alliedFactionBanner" alt="faction banner" />
      </div>
      <img
        class="w-8 h-8 mt-4 mx-2"
        src="@/assets/peace.png"
        alt="peace dove"
      />
    </div>
    <div class="divider"></div>
    <div class="flex flex-row justify-end">
      <div
        v-for="enemyFactionBanner in enemyFactionBanners"
        :key="enemyFactionBanner"
        class="w-8 h-16"
      >
        <img :src="enemyFactionBanner" alt="faction banner" />
      </div>
      <img class="w-8 h-8 mt-4 mx-2" src="@/assets/swords.png" alt="swords" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { factionNameToBanner } from "@/ts/factionBannersEnum";

const props = defineProps({
  faction: {
    type: String,
    required: true,
  },
});

const factionBanner = ref<string>(factionNameToBanner(props.faction));
const alliedFactions = ref<string[]>([
  "Angmar",
  "Angmar",
  "Gondor",
  "Mordor",
  "Gondor",
]);
const alliedFactionBanners = ref<string[]>([]);
const enemyFactions = ref<string[]>([
  "Durin's Folk",
  "Gondor",
  "Mordor",
  "Gondor",
]);
const enemyFactionBanners = ref<string[]>([]);

function populateDiplomacyBanners() {
  for (let i = 0; i < alliedFactions.value.length; i++) {
    alliedFactionBanners.value[i] = factionNameToBanner(
      alliedFactions.value[i]
    );
  }
  for (let i = 0; i < enemyFactions.value.length; i++) {
    enemyFactionBanners.value[i] = factionNameToBanner(enemyFactions.value[i]);
  }
}

populateDiplomacyBanners();
</script>
