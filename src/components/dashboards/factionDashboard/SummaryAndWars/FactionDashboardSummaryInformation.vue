<template>
  <div class="flex flex-col content-center basis-2/3 m-4">
    <h3 class="text-2xl text-accent my-3">King: {{ faction.leaderIgn }}</h3>
    <h3 class="text-2xl my-3">Home Region: {{ faction.homeRegion }}</h3>
    <h3 class="text-2xl my-3">
      Claimed Regions: {{ faction.countOfClaimedRegions }}
    </h3>
    <h3 class="text-2xl my-3">Claimbuilds: {{ faction.countOfClaimbuilds }}</h3>
    <h3 class="text-2xl my-3">Armies: {{ faction.countOfArmies }}</h3>
    <h3 class="text-2xl my-3">Players: {{ faction.countOfPlayers }}</h3>
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
        src="../../../../assets/peace.png"
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
      <img
        class="w-8 h-8 mt-4 mx-2"
        src="../../../../assets/swords.png"
        alt="swords"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { factionNameToBanner } from "@/ts/factionBannersEnum";
import { FactionApiClient } from "@/ts/ApiService/FactionApiClient";
import { Faction } from "@/ts/types/Faction";

const props = defineProps({
  factionName: {
    type: String,
    required: true,
  },
});

const faction = ref<Faction>({
  id: 0,
  nameOfFaction: "",
  countOfArmies: "",
  countOfClaimbuilds: [],
  countOfClaimedRegions: [],
  countOfPlayers: [],
  homeRegion: "",
  leaderIgn: "",
});

const getPropFactionName = () => props.factionName;
const factionBanner = ref<string>(factionNameToBanner(getPropFactionName()));
const alliedFactions = ref<string[]>([]);
const alliedFactionBanners = ref<string[]>([]);
const enemyFactions = ref<string[]>([]);
const enemyFactionBanners = ref<string[]>([]);

function populateDiplomacyBanners() {
  for (let i = 0; i < alliedFactions.value.length; i++) {
    alliedFactionBanners.value[i] = factionNameToBanner(
      alliedFactions.value[i],
    );
  }
  for (let i = 0; i < enemyFactions.value.length; i++) {
    enemyFactionBanners.value[i] = factionNameToBanner(enemyFactions.value[i]);
  }
}

populateDiplomacyBanners();
FactionApiClient.loadFactions().then((factions: Faction[]) => {
  // Get the faction corresponding to the factionName prop
  faction.value = factions.find(
    (faction) => faction.nameOfFaction === props.factionName,
  )!;
});
</script>
