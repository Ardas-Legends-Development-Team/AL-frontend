<template>
  <div class="grid grid-cols-3 gap-4">
    <div class="flex flex-row items-center justify-center space-x-2">
      <img class="my-3 w-16 h-32" :src="factionBanner" alt="faction banner" />
      <img class="mask mask-circle w-24 h-24" :src="avatar" alt="avatar" />
    </div>
    <div
      class="flex flex-col items-center justify-center space-y-2 text-center"
    >
      <h1 class="text-3xl">{{ characterName }}</h1>
      <div class="badge badge-outline badge-primary">{{ title }}</div>
    </div>
    <div
      v-if="numberOfApps > 0"
      class="badge badge-primary h-10 mt-5 cursor-pointer"
      @click="scrollToBottom"
    >
      Scroll to {{ numberOfApps }} open application{{
        numberOfApps > 1 ? "s" : ""
      }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PlayerApiClient } from "@/ts/ApiService/PlayerApiClient";
import { factionNameToBanner } from "@/ts/factionBannersEnum";

defineProps<{
  numberOfApps: number;
}>();

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

const scrollToBottom = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
};
</script>
