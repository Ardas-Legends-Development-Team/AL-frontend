<template>
  <table
    class="table table-pin-rows table-zebra relative min-w-full divide-y divide-gray-200"
  >
    <!-- head -->
    <thead>
      <tr class="bg-base-200">
        <th class="text-accent">IGN & Faction</th>
        <th class="text-accent">Name & Title</th>
        <th class="text-accent">Current Region</th>
        <th>
          <SearchBar
            :input-list="
              allRoleplayCharacters.map(
                (roleplayCharacter) => roleplayCharacter.character,
              )
            "
            @search="updateFilteredCharactersOnSearch"
          />
        </th>
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
              <div class="mask mask-squircle h-12 w-12">
                <img :src="roleplayCharacter.avatar" alt="Avatar" />
              </div>
            </div>
            <div>
              <div class="font-bold">{{ roleplayCharacter.character.ign }}</div>
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
          <label
            for="rpCharDetailsModal"
            class="btn"
            @click="sendInfoToModal(roleplayCharacter.character)"
            >Details</label
          >
        </th>
      </tr>
    </tbody>
  </table>
  <RoleplayCharacterDetailsModal
    :selectedCharacter="selectedCharacter.character"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RoleplayCharacter } from "@/ts/types/RoleplayCharacter";
import RoleplayCharacterDetailsModal from "@/components/modals/RoleplayCharacterDetailsModal.vue";
import { RpCharApiClient } from "@/ts/ApiService/RpCharApiClient";
import SearchBar from "@/components/SearchBar.vue";

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
  for (let i = 0; i < data.length; i++) {
    allRoleplayCharacters.value.push({
      avatar: `https://mc-heads.net/avatar/${data[i].ign}/36`,
      character: data[i],
    });
  }
  filteredCharacters.value = allRoleplayCharacters.value;
});
</script>
