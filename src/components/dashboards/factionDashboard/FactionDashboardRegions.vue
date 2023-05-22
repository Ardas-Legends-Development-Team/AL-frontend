<template>
  <div class="flex flex-row">
    <div
      class="flex flex-col items-center basis-1/5 bg-base-100 py-6 max-h-screen overflow-y-scroll"
    >
      <button class="btn">test</button>
      <button
        class="btn btn-square btn-outline btn-secondary px-12 my-1"
        v-for="(region, index) in regions"
        :key="index"
        @click="showRegionDetails(region)"
      >
        test
        {{ region.regionId }}
      </button>
    </div>
    <div class="basis-4/5">
      <div class="flex flex-row my-4 mx-4">
        <div class="basis-1/3">
          <div class="flex flex-row flex-wrap">
            <div
              v-for="factionBanner in factionsWithClaimBanners"
              :key="factionBanner"
              class="w-8 h-16"
            >
              <img :src="factionBanner" alt="faction banner" />
            </div>
          </div>
        </div>
        <h3 class="basis-1/3">Region "ID"</h3>
        <div class="basis-1/3 bg-base-200">
          105 203 193 293 182 382 17382 13293
        </div>
      </div>
      <div class="max-h-screen overflow-y-scroll">
        <table class="table w-full table-zebra divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="sticky top-0">Region ID</th>
              <th class="sticky top-0">Terrain type</th>
              <th class="sticky top-0">Factions with claim</th>
              <th class="sticky top-0">Neighbouring regions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover" v-for="region in regions" :key="region.rowId">
              <td>
                <div>
                  <div class="font-bold">{{ region.regionId }}</div>
                </div>
              </td>
              <td>
                <div class="font-bold">{{ region.terrainType }}</div>
              </td>
              <td>
                <div class="font-bold">{{ region.factionsWithClaim }}</div>
              </td>
              <td>
                <div class="font-bold">{{ region.neighbours }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { Region } from "@/ts/types/Region";
import { factionNameToBanner } from "@/ts/factionBannersEnum";

defineProps({
  faction: {
    type: String,
    required: true,
  },
});

const regions = ref<Region[]>([]);
const selectedRegion = ref<Region>();
const factionsWithClaimBanners = ref<string[]>([]);

function showRegionDetails(region: Region) {
  selectedRegion.value = region;
}

function populateDiplomacyBanners() {
  const factions = ["Angmar", "Mordor", "Gondor"];
  for (let i = 0; i < factions.length; i++) {
    factionsWithClaimBanners.value[i] = factionNameToBanner(factions[i]);
  }
}

populateDiplomacyBanners();

const testClaimbuilds = ref([
  [
    {
      name: "test",
      faction: "test",
      type: "test",
    },
    {
      name: "test2",
      faction: "test2",
      type: "test2",
    },
    {
      name: "test5",
      faction: "test",
      type: "test",
    },
    {
      name: "test6",
      faction: "test2",
      type: "test2",
    },
  ],
  [
    {
      name: "test3",
      faction: "test3",
      type: "test3",
    },
  ],
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
});
</script>
