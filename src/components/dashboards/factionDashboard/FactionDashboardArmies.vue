<template>
  <div class="text-center text-neutral-content text-2xl font-bold my-4">
    Armies
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
          v-for="army in allArmies"
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
  <div class="text-center text-neutral-content text-2xl font-bold my-4">
    Charaters
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
          <th class="text-accent">Name</th>
          <th class="text-accent">Type</th>
          <th class="text-accent">Current Region</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-base-100 hover:bg-base-300"
          v-for="army in allArmies"
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
</template>

<script setup lang="ts">
/*TODO
  - Add the army search bar
  - Add the character table
  - Add the character search bar
  - Add real data to the table

 */
import { ref } from "vue";
import { Army } from "@/ts/types/Army";

import { ArmyApiClient } from "@/ts/ApiService/ArmyApiClient";

const allArmies = ref<Army[]>([]);

ArmyApiClient.loadArmies().then((data: Army[]) => {
  allArmies.value = [...data];
});

defineProps({
  faction: {
    type: String,
    required: true,
  },
});
</script>
