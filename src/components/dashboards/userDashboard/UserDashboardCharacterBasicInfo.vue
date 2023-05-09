<template>
  <div class="bg-base-100 w-full h-16 flex justify-center">
    <div class="text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mt-2 text-4xl">{{ ign }}</h1>
      </div>
    </div>
  </div>
  <div class="flex flex-row justify-evenly">
    <div class="mt-5 shrink">
      <img class="mask mask-circle w-32" :src="avatar" alt="avatar" />
    </div>
    <div
      class="text-center text-neutral-content bg-base-100 justify-center h-20 w-1/2"
    >
      <h1 class="mb-1 text-3xl text-secondary">{{ title }}</h1>
      <div class="badge badge-outline badge-primary">{{ faction }}</div>
    </div>
    <div class="mt-5 w-32 h-64">
      <img :src="factionBanner" alt="faction banner" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {ApiClient} from "@/ts/ApiClient";
import {factionNameToBanner} from "@/ts/factionBannersEnum";

const factionBanner = ref<string>("");
const faction = ref<string>("");
const ign = ref<string>("");
const title = ref<string>("");
const avatar = ref<string>(``);

ApiClient.loadPlayerInfo().then((data) => {
  faction.value = data.faction;
  factionBanner.value = factionNameToBanner(data.faction);
  ign.value = data.ign;
  avatar.value = `https://mc-heads.net/avatar/${ign.value}/100`;
  ApiClient.loadCharacterInfo().then((data) => {
    title.value = data.title;
    // TODO: remove that when we have correct characters
    if (title.value === "") {
      title.value = "No Title";
    }
  });
});
</script>
