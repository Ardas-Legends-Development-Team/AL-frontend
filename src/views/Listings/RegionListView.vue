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
            {{ region.claimedBy.length > 0 ? region.claimedBy.join(", ") : "" }}
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
    :claimbuilds="selectedRegionClaimbuilds"
    :banner-map="selectedRegionClaimbuildBanners"
    :region-id="selectedRegion.id" 
  />
  <input type="checkbox" id="charactersInRegionModal" class="modal-toggle" />
  <CharactersInRegionModal :characters="selectedRegionChars" :region-id="selectedRegion.id" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Region } from "@/ts/types/Region";
import ClaimbuildsInRegionModal from "@/components/lists/ClaimbuildsInRegionModal.vue";
import CharactersInRegionModal from "@/components/lists/CharactersInRegionModal.vue";
import { RegionApiClient } from "@/ts/ApiService/RegionApiClient";
import { ClaimBuild } from "@/ts/types/ClaimBuild";
import { ClaimbuildApiClient } from "@/ts/ApiService/ClaimbuildApiClient";
import { factionNameToBanner } from "@/ts/factionBannersEnum";
import { RoleplayCharacter } from "@/ts/types/RoleplayCharacter";
import { RpCharApiClient } from "@/ts/ApiService/RpCharApiClient";

// TODO: Build the strings to show because we got arrays instead of one string
// TODO: Get missing info from API to complete the table
const regions = ref<Region[]>([]);
const selectedRegionClaimbuilds = ref<ClaimBuild[]>([]);
const selectedRegionClaimbuildBanners = ref<Map<string, string>>(new Map());
const selectedRegionChars = ref<RoleplayCharacter[]>([]);
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
  ClaimbuildApiClient.loadClaimbuildsByNames(selectedRegion.value.claimbuilds)
    .then((claimbuilds) => {
      selectedRegionClaimbuilds.value = claimbuilds

      //Getting the banners for the claimbuilds inside the selected region
      const allFactions = selectedRegionClaimbuilds.value.map(cb => cb.faction);
      const factionsUnique = allFactions.filter((faction, pos) => {
        return allFactions.indexOf(faction) == pos;
      })
    
      factionsUnique.forEach(faction => {
      
      selectedRegionClaimbuildBanners.value.set(faction, factionNameToBanner(faction))
    });

    console.log("Selected region chars:");
    console.log(selectedRegion.value);
    
    RpCharApiClient.loadRpCharsByNames(selectedRegion.value.characters)
      .then((rpchars) => {
        selectedRegionChars.value = rpchars;
      })
});
  
}

RegionApiClient.loadRegions().then((data: any) => {
  regions.value = data;
});
</script>
