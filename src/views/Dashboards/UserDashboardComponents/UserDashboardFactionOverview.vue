<template>
  <div class="absolute z-10 right-0">
    <div
      @click="openSidebar(false)"
      class="flex items-center justify-center rounded-r-md bg-gray-800 text-gray-300 mr-0 cursor-pointer absolute inset-0 mt-10 m-auto w-8 h-8"
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
      class="overflow-y-scroll lg:overflow-y-auto fixed lg:sticky h-screen lg:h-auto z-40 top-0 bg-base-200 pt-10 w-60"
    >
      <div class="px-8">
        <div
          class="flex flex-col items-center justify-center space-y-2 text-center"
        ></div>
        <div class="flex items-center justify-between">
          <div
            @click="openSidebar(true)"
            class="bg-base-300/50 rounded-md text-gray-700 cursor-pointer"
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
        <div class="flex flex-col items-center justify-between my-4">
          <RouterLink :to="`/faction/${faction}`">
            <button class="btn btn-outline">{{ faction }}</button>
          </RouterLink>
          <img
            class="my-3 w-16 h-32"
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
