<template>
  <div class="flex flex-row">
    <div class="items-center basis-1/5 bg-base-100 py-6">
      <h3 class="text-2xl font-bold text-accent text-center">Owned Regions</h3>
      <div class="divider"></div>
      <regionSearchBar
        class="mb-4"
        :regions="regions"
        @search="updateFilteredRegionsOnSearch"
      />
      <div class="grid grid-cols-3 max-h-screen overflow-y-scroll">
        <button
          class="btn btn-square btn-outline btn-secondary px-8 my-1 mx-3"
          v-for="(region, index) in filteredRegions"
          :key="index"
          @click="showRegionDetails(region)"
        >
          {{ region.regionId }}
        </button>
      </div>
    </div>
    <div class="basis-4/5">
      <div class="flex flex-row my-4 mx-4">
        <div class="basis-1/3">
          <div class="flex flex-row flex-wrap">
            <div
              v-for="factionBanner in factionsWithClaimBanners"
              :key="factionBanner"
              class="w-12 h-16"
            >
              <img :src="factionBanner" alt="faction banner" />
            </div>
          </div>
        </div>
        <div class="basis-1/3 flex flex-col">
          <h3 class="text-2xl font-bold text-accent my-3">
            Region {{ selectedRegion.regionId }}
          </h3>
          <p class="text-lg font-semibold text-secondary">
            Terrain Type: {{ selectedRegion.terrainType }}
          </p>
        </div>
        <div
          class="basis-1/3 bg-base-100/70 p-4 rounded-xl border-dotted border-2 border-primary h-28"
        >
          <p class="text-lg font-semibold text-accent">Neighbouring Regions:</p>
          <span>
            {{ selectedRegion.neighbours.replaceAll(" ", ", ") }}
          </span>
        </div>
      </div>
      <div class="max-h-screen overflow-y-scroll">
        <table class="table w-full table-zebra divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="sticky top-0">Name</th>
              <th class="sticky top-0">Type</th>
              <th class="sticky top-0">Owner</th>
              <th class="sticky top-0">Stationed Armies</th>
              <th class="sticky top-0">
                <searchBar
                  :input-list="testClaimbuilds"
                  @search="filterClaimbuildTable"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="hover"
              v-for="claimbuild in testClaimbuilds"
              :key="claimbuild.name"
            >
              <td>
                <div>
                  <div class="font-bold">{{ claimbuild.name }}</div>
                </div>
              </td>
              <td>
                <div class="font-bold">{{ claimbuild.claimbuildType }}</div>
              </td>
              <td>
                <div class="font-bold">{{ claimbuild.ownerFaction }}</div>
              </td>
              <td>
                <div class="font-bold">{{ claimbuild.stationedArmies }}</div>
              </td>
              <th>
                <label
                  for="rpCharDetailsModal"
                  class="btn"
                  @click="sendInfoToModal(claimbuild)"
                  >Details</label
                >
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <ClaimbuildDetailsModal :selectedClaimbuild="selectedClaimbuild" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { Region } from "@/ts/types/Region";
import { factionNameToBanner } from "@/ts/factionBannersEnum";
import RegionSearchBar from "@/components/dashboards/factionDashboard/regionSearchBar.vue";
import SearchBar from "@/components/searchBar.vue";

defineProps({
  faction: {
    type: String,
    required: true,
  },
});

const regions = ref<Region[]>([]);
const filteredRegions = ref<Region[]>([]);
const selectedRegion = ref<Region>({
  rowId: 2,
  regionId: "string",
  terrainType: "string",
  factionsWithClaim: "string",
  neighbours: "string",
  claimbuildsInRegion: "string",
  charactersInRegion: " string",
});
const selectedClaimbuild = ref<any>();
const factionsWithClaimBanners = ref<string[]>([]);

function showRegionDetails(region: Region) {
  selectedRegion.value = region;
}

function sendInfoToModal(claimbuild: any) {
  selectedClaimbuild.value = claimbuild;
}

function populateDiplomacyBanners() {
  const factions = ["Angmar", "Mordor", "Gondor"];
  for (let i = 0; i < factions.length; i++) {
    factionsWithClaimBanners.value[i] = factionNameToBanner(factions[i]);
  }
}

// When we do a search, we want to filter the regions that are displayed
function updateFilteredRegionsOnSearch(searchResults: Region[]) {
  if (searchResults.length === 0) {
    filteredRegions.value = regions.value;
    return;
  }
  filteredRegions.value = regions.value.filter((region) =>
    searchResults.includes(region)
  );
}

function filterClaimbuildTable(searchResults: any) {
  console.log(searchResults);
}

populateDiplomacyBanners();

const testClaimbuilds = ref([
  {
    name: "test",
    ownerFaction: "test",
    claimbuildType: "test",
    stationedArmies: 1,
  },
  {
    name: "test2",
    ownerFaction: "test2",
    claimbuildType: "test2",
    stationedArmies: 1,
  },
  {
    name: "test5",
    ownerFaction: "test",
    claimbuildType: "test",
    stationedArmies: 1,
  },
  {
    name: "test6",
    ownerFaction: "test2",
    claimbuildType: "test2",
    stationedArmies: 1,
  },
  {
    name: "test3",
    ownerFaction: "test3",
    claimbuildType: "test3",
    stationedArmies: 1,
  },
]);

async function getMockData(): Promise<Region[]> {
  const params = {
    count: 50,
    key: "6100d750",
  };
  return new Promise((resolve, reject) => {
    axios
      .get("https://api.mockaroo.com/api/ce561150", {
        params,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

getMockData().then((data: any) => {
  regions.value = data;
  filteredRegions.value = data;
  selectedRegion.value = data[0];
});
</script>
