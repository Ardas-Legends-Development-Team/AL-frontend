<template>
  <div class="m-4 flex basis-2/3 flex-col content-center">
    <h3 class="my-3 text-2xl text-accent">King: {{ faction.leaderIgn }}</h3>
    <h3 class="my-3 text-2xl">Home Region: {{ faction.homeRegion }}</h3>
    <h3 class="my-3 text-2xl">
      Claimed Regions: {{ faction.countOfClaimedRegions }}
    </h3>
    <h3 class="my-3 text-2xl">Claimbuilds: {{ faction.countOfClaimbuilds }}</h3>
    <h3 class="my-3 text-2xl">Armies: {{ faction.countOfArmies }}</h3>
    <h3 class="my-3 text-2xl">Players: {{ faction.countOfPlayers }}</h3>
  </div>
  <div class="my-3 basis-1/3">
    <div class="mx-2 h-48 w-24">
      <img :src="factionBanner" alt="faction banner" />
    </div>
    <div class="divider"></div>
    <div class="flex flex-row justify-end">
      <div
        v-for="alliedFactionBanner in alliedFactionBanners"
        :key="alliedFactionBanner"
        class="h-16 w-8"
      >
        <img :src="alliedFactionBanner" alt="faction banner" />
      </div>
      <img
        class="mx-2 mt-4 h-8 w-8"
        src="../../../../assets/peace.png"
        alt="peace dove"
      />
    </div>
    <div class="divider"></div>
    <div class="flex flex-row justify-end">
      <div
        v-for="enemyFactionBanner in enemyFactionBanners"
        :key="enemyFactionBanner"
        class="h-16 w-8"
      >
        <img :src="enemyFactionBanner" alt="faction banner" />
      </div>
      <img
        class="mx-2 mt-4 h-8 w-8"
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
  countOfArmies: 0,
  countOfClaimbuilds: 0,
  countOfClaimedRegions: 0,
  countOfPlayers: 0,
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
