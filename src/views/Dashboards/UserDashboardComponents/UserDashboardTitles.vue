<template>
  <div class="grid grid-cols-3 gap-4">
    <div class="flex flex-row items-center justify-center space-x-2">
      <img class="mask mask-circle my-4 h-24 w-24" :src="avatar" alt="avatar" />
    </div>
    <div
      class="flex flex-col items-center justify-center space-y-2 text-center"
    >
      <h1 class="text-3xl">{{ characterName }}</h1>
      <div class="badge badge-primary badge-outline">{{ title }}</div>
    </div>
    <div
      v-if="numberOfApps > 0"
      class="badge badge-primary mt-5 h-10 cursor-pointer"
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

defineProps<{
  numberOfApps: number;
}>();

const characterName = ref<string>("");
const title = ref<string>("");
const avatar = ref<string>(``);

PlayerApiClient.loadPlayerInfo().then((data) => {
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
