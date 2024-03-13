<template>
  <div v-if="isStaff">
    <BattleSubmit />
    <div class="mb-4 mt-16 flex flex-row justify-center" v-if="wars.length > 0">
      <h2 class="text-3xl font-bold text-secondary">Ongoing Wars</h2>
    </div>
    <div class="flex flex-col justify-center">
      <div
        v-for="(war, index) in wars"
        :key="index"
        class="mx-16 my-2 flex flex-row items-center justify-center rounded-lg bg-base-200"
      >
        <WarBlock :war="war" :key="war.id" />
        <button class="btn btn-error btn-outline" @click="endWar(war.name)">
          End War
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PlayerApiClient } from "@/ts/ApiService/PlayerApiClient";
import { WarApiClient } from "@/ts/ApiService/WarApiClient";
import { War } from "@/ts/types/War";
import WarBlock from "@/views/Staff/StaffWars/WarBlock.vue";
import { usePlayerStore } from "@/stores/playerStores";
import BattleSubmit from "@/views/Staff/StaffWars/BattleSubmit.vue";

const isStaff = ref(false);
const wars = ref<War[]>([]);

function endWar(nameOfWar: string) {
  WarApiClient.forceEndWar(nameOfWar, usePlayerStore().discordId).then(() => {
    // Remove war from wars array
    for (let i = 0; i < wars.value.length; i++) {
      if (wars.value[i].name === nameOfWar) {
        wars.value.splice(i, 1);
        break;
      }
    }
  });
}

PlayerApiClient.loadPlayerInfo().then((player: { isStaff: boolean }) => {
  isStaff.value = player.isStaff;
  // If player is staff then load wars
  if (isStaff.value) {
    WarApiClient.loadWars().then((loadedWars) => {
      // Get only ongoing wars
      for (let i = 0; i < loadedWars.length; i++) {
        if (loadedWars[i].isActive) wars.value.push(loadedWars[i]);
      }
    });
  }
});
</script>
