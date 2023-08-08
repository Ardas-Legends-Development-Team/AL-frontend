<template>
  <div class="flex flex-row">
    <div class="items-center basis-1/5 bg-base-100 py-6">
      <h3 class="text-2xl font-bold text-accent text-center">Owned Regions</h3>
      <div class="divider"></div>
      <RegionSearchBar
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
          {{ region.id }}
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
            Region {{ selectedRegion.id }}
          </h3>
          <p class="text-lg font-semibold text-secondary">
            Terrain Type: {{ selectedRegion.regionType }}
          </p>
        </div>
        <div
          class="basis-1/3 bg-base-100/70 p-4 rounded-xl border-dotted border-2 border-primary h-28"
        >
          <p class="text-lg font-semibold text-accent">Neighbouring Regions:</p>
          <span>
            {{ selectedRegion.neighbours.join(", ") }}
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
                <SearchBar
                  :input-list="allClaimbuilds"
                  @search="updateFilteredClaimbuildsOnSearch"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="hover"
              v-for="claimbuild in filteredClaimbuilds"
              :key="claimbuild.name"
            >
              <td>
                <div>
                  <div class="font-bold">{{ claimbuild.name }}</div>
                </div>
              </td>
              <td>
                <div class="font-bold">{{ claimbuild.claimBuildType }}</div>
              </td>
              <td>
                <div class="font-bold">{{ claimbuild.faction }}</div>
              </td>
              <td>
                <div class="font-bold">
                  {{ claimbuild.armiesStationedCount }}
                </div>
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Region } from "@/ts/types/Region";
import { factionNameToBanner } from "@/ts/factionBannersEnum";
import RegionSearchBar from "@/components/dashboards/factionDashboard/regionSearchBar.vue";
import SearchBar from "@/components/SearchBar.vue";
import { RegionApiClient } from "@/ts/ApiService/RegionApiClient";
import { ClaimbuildApiClient } from "@/ts/ApiService/ClaimbuildApiClient";
import { ClaimBuild } from "@/ts/types/ClaimBuild";

const props = defineProps({
  faction: {
    type: String,
    required: true,
  },
});

const regions = ref<Region[]>([]);
const filteredRegions = ref<Region[]>([]);
const selectedRegion = ref<Region>({
  id: "",
  name: "",
  regionType: "",
  claimedBy: [],
  neighbours: [],
  claimbuilds: [],
  characters: [],
});
const allClaimbuilds = ref<ClaimBuild[]>([]);
const selectedRegionClaimbuilds = ref<ClaimBuild[]>([]);
const filteredClaimbuilds = ref<ClaimBuild[]>([]);
const selectedClaimbuild = ref<ClaimBuild>();
const factionsWithClaimBanners = ref<string[]>([]);

function showRegionDetails(region: Region) {
  selectedRegion.value = region;
  showRegionClaimbuilds();
}

function sendInfoToModal(claimbuild: any) {
  selectedClaimbuild.value = claimbuild;
}

function populateDiplomacyBanners() {
  const factions = [props.faction];
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
    searchResults.includes(region),
  );
}

function showRegionClaimbuilds() {
  selectedRegionClaimbuilds.value = allClaimbuilds.value.filter((cb) =>
    selectedRegion.value.claimbuilds.includes(cb.name),
  );
  filteredClaimbuilds.value = selectedRegionClaimbuilds.value;
}

function updateFilteredClaimbuildsOnSearch(searchResults: ClaimBuild[]) {
  if (searchResults.length === 0) {
    filteredClaimbuilds.value = selectedRegionClaimbuilds.value;
    return;
  }
  filteredClaimbuilds.value = selectedRegionClaimbuilds.value.filter((cb) =>
    searchResults.includes(cb),
  );
}

populateDiplomacyBanners();

RegionApiClient.loadRegions().then((regionList: Region[]) => {
  // Get only the regions owned by the faction
  regionList = regionList.filter((region) =>
    region.claimedBy.includes(props.faction),
  );
  regions.value = regionList;
  filteredRegions.value = regionList;
  selectedRegion.value = regionList[0];

  const allCbNames = regions.value
    .map((region) => region.claimbuilds)
    .reduce((acc, param) => {
      return acc.concat(param);
    });

  ClaimbuildApiClient.loadClaimbuildsByNames(allCbNames).then(
    (fetchedCbs: ClaimBuild[]) => {
      allClaimbuilds.value = fetchedCbs;

      showRegionClaimbuilds();
    },
  );
});
</script>
