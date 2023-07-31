<template>
  <table
    class="table table-pin-rows min-w-full divide-y divide-gray-200 relative"
  >
    <!-- head -->
    <thead>
      <tr class="bg-base-200">
        <th class="text-accent">Region ID</th>
        <th class="text-accent">Terrain type</th>
        <th class="text-accent">Factions with claim</th>
        <th class="text-accent">Neighbouring regions</th>
        <th>
          <SearchBar
            :input-list="allRegions"
            @search="updateFilteredRegionsOnSearch"
          />
        </th>
        <th class="sticky top-0"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="bg-base-100 hover:bg-base-300"
        v-for="region in filteredRegions"
        :key="region.id"
      >
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
          <button
            class="btn"
            onclick="regionClaimbuildsModal.showModal()"
            @click="sendInfoToClaimbuildModal(region)"
          >
            {{ region.claimbuilds.length }} Claimbuilds
          </button>
        </th>
        <th>
          <button
            class="btn"
            onclick="charactersInRegionModal.showModal()"
            @click="sendInfoToCharacterModal(region)"
          >
            {{ region.characters.length }} Characters
          </button>
        </th>
      </tr>
    </tbody>
  </table>
  <ClaimbuildsInRegionModal
    title="Claimbuilds in region"
    :claimbuilds="selectedRegionClaimbuilds"
    :banner-map="selectedRegionClaimbuildBanners"
    :region-id="selectedRegion.id"
  />
  <CharactersInRegionModal
    :characters="selectedRegionChars"
    :region-id="selectedRegion.id"
    :banner-map="selectedRegionCharacterBanners"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Region } from "@/ts/types/Region";
import { RegionApiClient } from "@/ts/ApiService/RegionApiClient";
import { ClaimBuild } from "@/ts/types/ClaimBuild";
import { ClaimbuildApiClient } from "@/ts/ApiService/ClaimbuildApiClient";
import { RoleplayCharacter } from "@/ts/types/RoleplayCharacter";
import { RpCharApiClient } from "@/ts/ApiService/RpCharApiClient";
import { factionNamesToBannerMap } from "@/ts/factionBannersEnum";
import SearchBar from "@/components/SearchBar.vue";
import ClaimbuildsInRegionModal from "@/components/lists/ClaimbuildsInRegionModal.vue";
import CharactersInRegionModal from "@/components/lists/CharactersInRegionModal.vue";

const allRegions = ref<Region[]>([]);
const filteredRegions = ref<Region[]>([]);
const selectedRegionClaimbuilds = ref<ClaimBuild[]>([]);
const selectedRegionClaimbuildBanners = ref<Map<string, string>>(new Map());
const selectedRegionChars = ref<RoleplayCharacter[]>([]);
const selectedRegionCharacterBanners = ref<Map<string, string>>(new Map());
const selectedRegion = ref<Region>({
  id: "",
  name: "",
  regionType: "",
  claimedBy: [],
  neighbours: [],
  claimbuilds: [],
  characters: [],
});

function sendInfoToCharacterModal(region: Region) {
  selectedRegion.value = region;
  RpCharApiClient.loadRpCharsByNames(region.characters).then((rpchars) => {
    selectedRegionChars.value = rpchars;
    const allFactionsChars = selectedRegionChars.value.map((rp) => rp.faction);
    selectedRegionCharacterBanners.value =
      factionNamesToBannerMap(allFactionsChars);
  });
}

function sendInfoToClaimbuildModal(region: Region) {
  selectedRegion.value = region;
  ClaimbuildApiClient.loadClaimbuildsByNames(region.claimbuilds).then(
    (claimbuilds) => {
      selectedRegionClaimbuilds.value = claimbuilds;
      const allFactions = selectedRegionClaimbuilds.value.map(
        (cb) => cb.faction,
      );
      selectedRegionClaimbuildBanners.value =
        factionNamesToBannerMap(allFactions);
    },
  );
}

function updateFilteredRegionsOnSearch(searchResults: Region[]) {
  if (searchResults.length === 0) {
    filteredRegions.value = allRegions.value;
    return;
  }
  filteredRegions.value = allRegions.value.filter((region) =>
    searchResults.includes(region),
  );
}

RegionApiClient.loadRegions().then((data: Region[]) => {
  allRegions.value = data;
  filteredRegions.value = data;
});
</script>
