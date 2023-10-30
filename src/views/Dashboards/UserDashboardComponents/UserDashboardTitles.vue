<template>
  <div class="grid grid-cols-3 justify-items-center">
    <div class="mt-5 shrink">
      <img class="mask mask-circle w-20" :src="avatar" alt="avatar" />
    </div>
    <div
      class="text-center text-neutral-content justify-center mt-4 h-20 w-1/2"
    >
      <h1 class="mb-1 text-3xl text-neutral-content">{{ characterName }}</h1>
      <div class="badge badge-outline badge-primary">{{ title }}</div>
    </div>
    <div class="my-2 w-16 h-32">
      <img :src="factionBanner" alt="faction banner" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PlayerApiClient } from "@/ts/ApiService/PlayerApiClient";
import { factionNameToBanner } from "@/ts/factionBannersEnum";

const factionBanner = ref<string>("");
const faction = ref<string>("");
const characterName = ref<string>("");
const title = ref<string>("");
const avatar = ref<string>(``);

PlayerApiClient.loadPlayerInfo().then((data) => {
  faction.value = data.faction;
  factionBanner.value = factionNameToBanner(data.faction);
  characterName.value = data.ign;
  avatar.value = `https://mc-heads.net/avatar/${data.ign}/100`;
  PlayerApiClient.loadCharacterInfo().then((data) => {
    title.value = data.title;
    if (title.value === "") {
      title.value = "No Title";
    }
    if (data.name) {
      characterName.value = data.name;
    }
  });
});
</script>
