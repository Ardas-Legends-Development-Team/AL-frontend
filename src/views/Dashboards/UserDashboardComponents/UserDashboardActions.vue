<template>
  <h2 class="mb-1 text-3xl text-neutral-content font-bold ml-16 pb-4">
    Actions
  </h2>
  <div class="text-center text-neutral-content bg-base-100 p-4">
    <div class="grid grid-cols-3 justify-items-center gap-3">
      <UserDashboardActionCard
        v-for="(cardData, index) in shownCards"
        :key="index"
        :title="cardData.title"
        :source-good="cardData.sourceGood"
        :alt-good="cardData.altGood"
        :source-evil="cardData.sourceEvil"
        :alt-evil="cardData.altEvil"
        :description="cardData.description"
        :action-inputs="cardData.actionInputs"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserDashboardActionCard from "@/views/Dashboards/UserDashboardComponents/UserDashboardActionCard.vue";
import { rankCardData } from "@/assets/userDashboardActionCardData.json";
import { ref } from "vue";
import { FactionApiClient } from "@/ts/ApiService/FactionApiClient";
import { useFactionsStore } from "@/stores/generalInfoStores";

const shownCards: any = ref({});

function populateShownCards(rank: string): void {
  shownCards.value.move = rankCardData[rank as keyof typeof rankCardData].move;
  shownCards.value.bind = rankCardData[rank as keyof typeof rankCardData].bind;
  shownCards.value.unbind =
    rankCardData[rank as keyof typeof rankCardData].unbind;
}

FactionApiClient.loadFactions().then(() => {
  const rank = useFactionsStore().isPlayerFactionLeader ? "Leader" : "Member";
  populateShownCards(rank.toLowerCase());
});
</script>
