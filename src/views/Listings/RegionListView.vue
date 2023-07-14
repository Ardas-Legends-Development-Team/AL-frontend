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
      <tr class="hover" v-for="region in regions" :key="region.id">
        <td>
          <div>
            <div class="font-bold">{{ region.id }}</div>
          </div>
        </td>
        <td>
          <div class="font-bold">{{ region.regionType }}</div>
        </td>
        <td>
          <div class="font-bold">
            {{ region.claimedBy.length > 0 ? region.claimedBy : "" }}
          </div>
        </td>
        <td>
          <div class="font-bold">{{ region.neighbours.join(", ") }}</div>
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
    :claimbuilds="selectedRegion.claimbuilds"
  />
  <input type="checkbox" id="charactersInRegionModal" class="modal-toggle" />
  <CharactersInRegionModal :characters="selectedRegion.characters" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Region } from "@/ts/types/Region";
import ClaimbuildsInRegionModal from "@/components/lists/ClaimbuildsInRegionModal.vue";
import CharactersInRegionModal from "@/components/lists/CharactersInRegionModal.vue";
import { ApiClient } from "@/ts/ApiClient";

// TODO: Build the strings to show because we got arrays instead of one string
// TODO: Get missing info from API to complete the table
const regions = ref<Region[]>([]);
const selectedRegion = ref<Region>({
  id: "",
  name: "",
  regionType: "",
  claimedBy: [],
  neighbours: [],
  claimbuilds: [],
  characters: [],
});

function sendInfoToModal(region: Region) {
  selectedRegion.value = region;
  console.log(selectedRegion.value);
}

ApiClient.loadRegions().then((data: Region[]) => {
  regions.value = data;
})
</script>
