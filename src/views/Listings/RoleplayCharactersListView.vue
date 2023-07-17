<template>
  <table class="table table-zebra min-w-full divide-y divide-gray-200 relative">
    <!-- head -->
    <thead>
      <tr>
        <th class="sticky top-0">IGN & Faction</th>
        <th class="sticky top-0">Name & Title</th>
        <th class="sticky top-0">Current Region</th>
        <th class="sticky top-0"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="hover"
        v-for="(roleplayCharacter, index) in roleplayCharacters"
        :key="roleplayCharacter.ign"
      >
        <td>
          <div class="flex items-center space-x-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img :src="avatars[index]" alt="Avatar" />
              </div>
            </div>
            <div>
              <div class="font-bold">{{ roleplayCharacter.ign }}</div>
              <div class="text-sm opacity-70">
                {{ roleplayCharacter.faction }}
              </div>
            </div>
          </div>
        </td>
        <td>
          {{ roleplayCharacter.rpChar.name }}
          <br />
          <span class="badge badge-ghost badge-sm">{{
            roleplayCharacter.rpChar.title
          }}</span>
        </td>
        <th>
          <p class="font-medium">
            Region {{ roleplayCharacter.rpChar.currentRegion }}
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
  <RoleplayCharacterDetailsModal :selectedCharacter="selectedCharacter" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RoleplayCharacter } from "@/ts/types/RoleplayCharacter";
import RoleplayCharacterDetailsModal from "@/components/lists/RoleplayCharacterDetailsModal.vue";
import { RpCharApiClient } from "@/ts/ApiService/RpCharApiClient";

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
const avatars = ref<string[]>([]);

function sendInfoToModal(roleplayCharacter: RoleplayCharacter) {
  selectedCharacter.value = roleplayCharacter;
}

RpCharApiClient.loadAllRpChars().then((data: any) => {
  roleplayCharacters.value = data;
  for (let i = 0; i < data.length; i++) {
    avatars.value.push(`https://mc-heads.net/avatar/${data[i].ign}/36`);
  }
  // TODO: Remove those when we have test data
  avatars.value[2] = `https://mc-heads.net/avatar/VernonRoche/36`;
  avatars.value[5] = `https://mc-heads.net/avatar/VernonRoche/36`;
});
</script>
