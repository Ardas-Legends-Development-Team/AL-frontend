<template>
  <table class="table table-zebra min-w-full divide-y divide-gray-200 relative">
    <!-- head -->
    <thead>
      <tr>
        <th class="sticky top-0">Region ID</th>
        <th class="sticky top-0">Terrain type</th>
        <th class="sticky top-0">Factions with claim</th>
        <th class="sticky top-0">Neighbouring regions</th>
        <th class="sticky top-0">Claimbuilds in region</th>
        <th class="sticky top-0">Characters in region</th>
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
        <th>
          <label
            for="regionClaimbuildsModal"
            class="btn"
            @click="sendInfoToModal(region)"
            >Claimbuilds</label
          >
        </th>
        <th>
          <label
            for="charactersInRegionModal"
            class="btn"
            @click="sendInfoToModal(region)"
            >Characters</label
          >
        </th>
      </tr>
    </tbody>
  </table>
  <input type="checkbox" id="regionClaimbuildsModal" class="modal-toggle" />
  <ClaimbuildsInRegionModal
    title="Claimbuilds in region"
    :claimbuilds="selectedRegion.claimbuildsInRegion"
  />
  <input type="checkbox" id="charactersInRegionModal" class="modal-toggle" />
  <CharactersInRegionModal :characters="selectedRegion.charactersInRegion" />
</template>

<script setup lang="ts">
import axios from "axios";
import { Region } from "@/ts/types/Region";

const regions = ref<Region[]>([]);
const selectedRegion = ref<Region>({
  rowId: 0,
  regionId: "",
  terrainType: "",
  factionsWithClaim: "",
  neighbours: "",
  claimbuildsInRegion: "",
  charactersInRegion: "",
});

async function getMockData(): Promise<Region[]> {
  const params = {
    count: 10,
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

function sendInfoToModal(region: Region) {
  selectedRegion.value = region;
  console.log(selectedRegion.value);
}

getMockData().then((data: any) => {
  regions.value = data;
});
</script>
