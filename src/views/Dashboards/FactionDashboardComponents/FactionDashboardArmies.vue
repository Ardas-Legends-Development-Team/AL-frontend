<template>
  <!--Armies list-->
  <div class="text-center text-neutral-content text-2xl font-bold my-4">
    Armies
  </div>
  <div
    class="flex justify-end text-center text-neutral-content text-2xl font-bold my-4 mx-4"
  >
    <SearchBar :input-list="allArmies" @search="updateFilteredArmyOnSearch" />
  </div>
  <div
    class="mx-4 flex flex-row justify-end text-sm text-secondary overflow-auto max-h-64 scrollbar scrollbar-thumb-red-500 scrollbar-track-red-100"
  >
    <table
      class="table table-pin-rows table-zebra min-w-full divide-y divide-gray-200 relative"
    >
      <!-- head -->
      <thead>
        <tr class="bg-base-200">
          <th class="text-accent">Name</th>
          <th class="text-accent">Type</th>
          <th class="text-accent">Current Region</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-base-100 hover:bg-base-300"
          v-for="army in filtredArmies"
          :key="army.id"
        >
          <td>
            <div class="flex items-center space-x-3">
              <div class="text-sm opacity-70">
                {{ army.nameOfArmy }}
              </div>
            </div>
          </td>
          <td>
            <div class="flex items-center space-x-3">
              <div class="text-sm opacity-70">
                {{ army.armyType }}
              </div>
            </div>
          </td>
          <td>
            <div class="flex items-center space-x-3">
              <div class="text-sm opacity-70">
                {{ army.currentRegion }}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!--characters list-->

  <div class="text-center text-neutral-content text-2xl font-bold my-4">
    Characters
  </div>
  <div
    class="flex justify-end text-center text-neutral-content text-2xl font-bold my-4 mx-4"
  >
    <SearchBar
      :input-list="
        allRoleplayCharacters.map(
          (roleplayCharacter) => roleplayCharacter.character,
        )
      "
      @search="updateFilteredCharactersOnSearch"
    />
  </div>
  <div
    class="mx-4 mb-2 flex flex-row justify-end text-sm text-secondary overflow-auto max-h-64 scrollbar scrollbar-thumb-red-500 scrollbar-track-red-100"
  >
    <table
      class="table table-pin-rows table-zebra min-w-full divide-y divide-gray-200 relative"
    >
      <!-- head -->
      <thead>
        <tr class="bg-base-200">
          <th class="text-accent">IGN & Faction</th>
          <th class="text-accent">Name & Title</th>
          <th class="text-accent">Current Region</th>
          <th class="text-accent"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-base-100 hover:bg-base-300"
          v-for="roleplayCharacter in filteredCharacters"
          :key="roleplayCharacter.character.ign"
        >
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img :src="roleplayCharacter.avatar" alt="Avatar" />
                </div>
              </div>
              <div>
                <div class="font-bold">
                  {{ roleplayCharacter.character.ign }}
                </div>
                <div class="text-sm opacity-70">
                  {{ roleplayCharacter.character.faction }}
                </div>
              </div>
            </div>
          </td>
          <td>
            {{ roleplayCharacter.character.rpChar.name }}
            <br />
            <span class="badge badge-ghost badge-sm">{{
              roleplayCharacter.character.rpChar.title
            }}</span>
          </td>
          <th>
            <p class="font-medium">
              Region {{ roleplayCharacter.character.rpChar.currentRegion }}
            </p>
          </th>
          <th>
            <button
              class="btn"
              onclick="rpCharDetailsModal.showModal()"
              @click="sendInfoToModal(roleplayCharacter.character)"
            >
              Details
            </button>
          </th>
        </tr>
      </tbody>
    </table>
    <RoleplayCharacterDetailsModal
      :selectedCharacter="selectedCharacter.character"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Army } from "@/ts/types/Army";

import { ArmyApiClient } from "@/ts/ApiService/ArmyApiClient";
import SearchBar from "@/components/SearchBar.vue";

import { RoleplayCharacter } from "@/ts/types/RoleplayCharacter";
import RoleplayCharacterDetailsModal from "@/components/modals/RoleplayCharacterDetailsModal.vue";
import { RpCharApiClient } from "@/ts/ApiService/RpCharApiClient";

const allArmies = ref<Army[]>([]);
const filtredArmies = ref<Army[]>([]);
function updateFilteredArmyOnSearch(searchResults: Army[]) {
  if (searchResults.length === 0) {
    filtredArmies.value = allArmies.value;
    return;
  }
  filtredArmies.value = allArmies.value.filter((army) =>
    searchResults.includes(army),
  );
}
ArmyApiClient.loadArmies().then((armies: Army[]) => {
  // Get only armies in the faction
  const factionArmies = armies.filter(
    (army) => army.nameOfFaction === props.faction,
  );
  allArmies.value = [...factionArmies];
  filtredArmies.value = [...factionArmies];
});

const props = defineProps({
  faction: {
    type: String,
    required: true,
  },
});

const allRoleplayCharacters = ref<
  { avatar: string; character: RoleplayCharacter }[]
>([]);
const filteredCharacters = ref<
  { avatar: string; character: RoleplayCharacter }[]
>([]);
const selectedCharacter = ref<{ avatar: string; character: RoleplayCharacter }>(
  {
    avatar: "",
    character: {
      discordId: "",
      ign: "",
      faction: "",
      rpChar: {
        name: "",
        title: "",
        gear: "",
        pvp: false,
        currentRegion: "",
        boundTo: "",
        injured: false,
        isHealing: false,
        startedHeal: "",
        healEnds: "",
        rank: "",
      },
    },
  },
);

function sendInfoToModal(roleplayCharacter: RoleplayCharacter) {
  selectedCharacter.value.character = roleplayCharacter;
}

function updateFilteredCharactersOnSearch(searchResults: RoleplayCharacter[]) {
  if (searchResults.length === 0) {
    filteredCharacters.value = allRoleplayCharacters.value;
    return;
  }
  filteredCharacters.value = allRoleplayCharacters.value.filter((rpchar) =>
    searchResults.includes(rpchar.character),
  );
}

RpCharApiClient.loadAllRpChars().then((data: RoleplayCharacter[]) => {
  // Get only characters in the faction
  const rpChars = data.filter((rpchar) => rpchar.faction === props.faction);

  for (let i = 0; i < rpChars.length; i++) {
    allRoleplayCharacters.value.push({
      avatar: `https://mc-heads.net/avatar/${rpChars[i].ign}/36`,
      character: rpChars[i],
    });
  }
  filteredCharacters.value = allRoleplayCharacters.value;
});
</script>
