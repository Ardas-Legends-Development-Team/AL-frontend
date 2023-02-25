<template>
  <table class="table table-zebra min-w-full divide-y divide-gray-200 relative">
    <!-- head -->
    <thead>
      <tr>
        <th class="sticky top-0">IGN & Faction</th>
        <th class="sticky top-0">Name & Title</th>
        <th class="sticky top-0">Current Region</th>
        <th class="sticky top-0">Character Details</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="hover"
        v-for="roleplayCharacter in roleplayCharacters"
        :key="roleplayCharacter.ign"
      >
        <td>
          <div class="flex items-center space-x-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img
                  :src="`https://mc-heads.net/avatar/${roleplayCharacter.ign}/36`"
                  alt="Avatar"
                />
              </div>
            </div>
            <div>
              <div class="font-bold">IGN {{ roleplayCharacter.ign }}</div>
              <div class="text-sm opacity-70">
                Faction {{ roleplayCharacter.faction }}
              </div>
            </div>
          </div>
        </td>
        <td>
          RPNAME {{ roleplayCharacter.rpChar.name }}
          <br />
          <span class="badge badge-ghost badge-sm"
            >TITLE {{ roleplayCharacter.rpChar.title }}</span
          >
        </td>
        <th>
          <p class="font-medium">
            CURRENT REGION {{ roleplayCharacter.rpChar.currentRegion }}
          </p>
        </th>
        <th>
          <label
            for="rpCharDetailsModal"
            class="btn"
            @click="sendInfoToModal(roleplayCharacter)"
            >Details</label
          >
        </th>
      </tr>
    </tbody>
  </table>
  <RoleplayCharacterDetailsModal
    id="roleplayCharacterDetails"
    :selectedCharacter="selectedCharacter"
  />
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { RoleplayCharacter } from "@/ts/types/RoleplayCharacter";
import RoleplayCharacterDetailsModal from "@/components/lists/RoleplayCharacterDetailsModal.vue";

const roleplayCharacters = ref<RoleplayCharacter[]>([]);
const selectedCharacter = ref<RoleplayCharacter>({
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
  },
});

async function getMockData(): Promise<RoleplayCharacter[]> {
  const params = {
    count: 10,
    key: "6100d750",
  };
  return new Promise((resolve, reject) => {
    axios
      .get("https://api.mockaroo.com/api/e6750ad0", { params })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function sendInfoToModal(roleplayCharacter: RoleplayCharacter) {
  selectedCharacter.value = roleplayCharacter;
}

getMockData().then((data: any) => {
  roleplayCharacters.value = data;
});
</script>
