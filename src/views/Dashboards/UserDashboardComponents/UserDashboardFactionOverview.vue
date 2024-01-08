<template>
  <div class="absolute right-0 z-10">
    <div
      @click="openSidebar(false)"
      class="absolute inset-0 m-auto mr-0 mt-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-r-md bg-gray-800 text-gray-300"
      id="right-sidebar-toggle"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-chevron-left"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <polyline points="15 6 9 12 15 18"></polyline>
      </svg>
    </div>
    <div
      id="right-sidebar"
      class="fixed top-0 z-40 h-screen w-60 overflow-y-scroll bg-base-200 pt-10 lg:sticky lg:h-auto lg:overflow-y-auto"
    >
      <div class="px-8">
        <div
          class="flex flex-col items-center justify-center space-y-2 text-center"
        ></div>
        <div class="flex items-center justify-between">
          <div
            @click="openSidebar(true)"
            class="cursor-pointer rounded-md bg-base-300/50 text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-chevron-right"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </div>
        </div>
        <div class="my-4 flex flex-col items-center justify-between">
          <RouterLink :to="`/faction/${faction}`">
            <button class="btn btn-outline">{{ faction }}</button>
          </RouterLink>
          <img
            class="my-3 h-32 w-16"
            :src="factionBanner"
            alt="faction banner"
          />
          <UserDashboardFactionInformation
            :player-count="playerCount"
            :army-count="armyCount"
            :claimbuild-count="claimbuildCount"
            :region-count="regionCount"
            :faction-leader="factionLeader"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { factionNameToBanner } from "@/ts/factionBannersEnum";
import UserDashboardFactionInformation from "@/views/Dashboards/UserDashboardComponents/UserDashboardFactionInformation.vue";
import { RouterLink } from "vue-router";
import { FactionApiClient } from "@/ts/ApiService/FactionApiClient";

const isSidebarOpen = ref(true);
const faction = ref<string>("");
const factionBanner = ref<string>("");
const playerCount = ref<number>(0);
const armyCount = ref<number>(0);
const claimbuildCount = ref<number>(0);
const regionCount = ref<number>(0);
const factionLeader = ref<string>("");

FactionApiClient.loadPlayerFaction().then((playerFaction) => {
  faction.value = playerFaction.nameOfFaction;
  factionBanner.value = factionNameToBanner(playerFaction.nameOfFaction);
  playerCount.value = playerFaction.countOfPlayers;
  armyCount.value = playerFaction.countOfArmies;
  claimbuildCount.value = playerFaction.countOfClaimbuilds;
  regionCount.value = playerFaction.countOfClaimedRegions;
  factionLeader.value = playerFaction.leaderIgn;
});

function openSidebar(flag: boolean) {
  const sidebar = document.getElementById("right-sidebar");
  const sidebarToggle = document.getElementById("right-sidebar-toggle");
  flag ? sidebar!.classList.add("hidden") : sidebar!.classList.remove("hidden");
  flag
    ? sidebarToggle!.classList.remove("hidden")
    : sidebarToggle!.classList.add("hidden");
  isSidebarOpen.value = flag;
}
</script>
