<template>
  <h2 class="mb-1 text-3xl text-neutral-content font-bold ml-16 pb-4">
    Actions
  </h2>
  <div class="text-center text-neutral-content bg-base-100 p-4">
    <div class="grid grid-cols-3 justify-items-center gap-3">
      <UserDashboardActionCard
        v-for="(data, index) in shownCards"
        :key="index"
        :text="data.text"
        :source-good="data.sourceGood"
        :alt-good="data.altGood"
        :source-evil="data.sourceEvil"
        :alt-evil="data.altEvil"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserDashboardActionCard from "@/views/Dashboards/UserDashboardComponents/UserDashboardActionCard.vue";
import { PlayerApiClient } from "@/ts/ApiService/PlayerApiClient";
import { CharacterInfo } from "@/ts/types/RoleplayCharacter";
import {
  commonCardData,
  rankCardData,
} from "@/assets/userDashboardActionCardData.json";
import { ref } from "vue";

const shownCards: any = ref({});

function populateShownCards(rank: string): void {
  shownCards.value.move = rankCardData[rank as keyof typeof rankCardData].move;
  shownCards.value.bind = commonCardData.bind;
  shownCards.value.unbind = commonCardData.unbind;
}

PlayerApiClient.loadCharacterInfo().then((data: CharacterInfo) => {
  populateShownCards(data.rank.toLowerCase());
});
</script>
