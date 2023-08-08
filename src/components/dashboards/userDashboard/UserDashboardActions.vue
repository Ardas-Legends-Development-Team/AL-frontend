<template>
  <div class="text-center text-neutral-content bg-base-100 w-1/3 p-4">
    <h2 class="mb-1 text-3xl text-accent font-bold pb-4">Actions</h2>
    <div class="grid grid-cols-3 justify-items-center gap-3">
      <UserDashboardActionCard
        v-for="(data, index) in shownCards"
        :key="index"
        :text="data.text"
        :source-good="data.source"
        :alt-good="data.alt"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserDashboardActionCard from "@/components/dashboards/userDashboard/UserDashboardActionCard.vue";
import { PlayerApiClient } from "@/ts/ApiService/PlayerApiClient";
import { CharacterInfo } from "@/ts/types/CharacterInfo";
import { commonCardData, rankCardData } from "@/ts/userDashboardActionCardData";
import { ref } from "vue";

const shownCards: any = ref({});

function populateShownCards(rank: string): void {
  shownCards.value.move = rankCardData[rank as keyof typeof rankCardData].move;
  shownCards.value.bind = commonCardData.bind;
}

PlayerApiClient.loadCharacterInfo().then((data: CharacterInfo) => {
  populateShownCards(data.rank);
});
</script>
