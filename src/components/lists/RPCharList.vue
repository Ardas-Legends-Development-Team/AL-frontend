<template>
  <div class="overflow-x-auto">
    <table
      class="table table-zebra min-w-full divide-y divide-gray-200 relative"
    >
      <!-- head -->
      <thead>
        <tr>
          <th>IGN & Faction</th>
          <th>Name & Title</th>
          <th>Gear</th>
          <th>Current Region</th>
          <th>Injured</th>
          <th>Is Healing</th>
          <th>Started Heal</th>
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
          <td>
            GEAR {{ roleplayCharacter.rpChar.gear }}
            <br />
            <span class="badge badge-ghost badge-sm"
              >PVP {{ roleplayCharacter.rpChar.pvp }}</span
            >
          </td>
          <th>
            <p class="font-medium">
              CURRENT REGION {{ roleplayCharacter.rpChar.currentRegion }}
            </p>
            <span class="badge badge-ghost badge-sm"
              >Bound To {{ roleplayCharacter.rpChar.boundTo }}</span
            >
          </th>
          <th>
            <p class="font-normal">
              Injured: {{ roleplayCharacter.rpChar.injured }}
            </p>
          </th>
          <th>
            <p class="font-normal">
              Is Healing: {{ roleplayCharacter.rpChar.isHealing }}
            </p>
          </th>
          <th>
            Started Heal: {{ roleplayCharacter.rpChar.startedHeal }}
            <br />
            <span class="badge badge-ghost badge-sm"
              >Heal Ends: {{ roleplayCharacter.rpChar.healEnds }}</span
            >
          </th>
        </tr>
      </tbody>
      <!-- foot -->
      <tfoot>
        <tr>
          <th>IGN & Faction</th>
          <th>Name & Title</th>
          <th>Gear</th>
          <th>Current Region</th>
          <th>Injured</th>
          <th>Is Healing</th>
          <th>Started Heal</th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { RoleplayCharacter } from "@/ts/types/RoleplayCharacter";

const roleplayCharacters = ref<RoleplayCharacter[]>([]);

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

getMockData().then((data: any) => {
  roleplayCharacters.value = data;
});
</script>
