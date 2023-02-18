<template>
  <table class="table table-zebra min-w-full divide-y divide-gray-200 relative">
    <!-- head -->
    <thead>
      <tr>
        <th class="sticky top-0">Region ID</th>
        <th class="sticky top-0">Terrain type</th>
        <th class="sticky top-0">Faction with claim</th>
        <th class="sticky top-0">Neighboring regions</th>
        <th class="sticky top-0">Claimbuilds in region</th>
        <th class="sticky top-0">Characters in region</th>
        <th class="sticky top-0"></th>
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
        <th>
          <a
            href="#neighboursDetails"
            class="btn"
            @click="sendInfoToModal(region)"
            >Details</a
          >
        </th>
        <th>
          <a href="#buildDetails" class="btn" @click="sendInfoToModal(region)"
            >Details</a
          >
        </th>
        <th>
          <a
            href="#characterDetails"
            class="btn"
            @click="sendInfoToModal(region)"
            >Details</a
          >
        </th>
      </tr>
    </tbody>
  </table>
  <RegionModal
    id="neighboursDetails"
    title="Neighbours"
    :information="selectedRegion.neighbours"
  />
  <RegionModal
    id="buildDetails"
    title="Claimbuilds in region"
    :information="selectedRegion.claimbuildsInRegion"
  />
  <RegionModal
    id="characterDetails"
    title="Characters in region"
    :information="selectedRegion.charactersInRegion"
  />
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { Region } from "@/ts/types/Region";
import RegionModal from "@/components/lists/RegionModal.vue";

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
