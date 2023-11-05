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

const shownCards: any = ref({});

function populateShownCards(rank: string): void {
  // If rank is different from member add all rank-specific actions, and then we add the member actions
  if (rank !== "member") {
    shownCards.value.rankMove =
      rankCardData[rank as keyof typeof rankCardData].move;
    shownCards.value.rankBind =
      rankCardData[rank as keyof typeof rankCardData].bind;
    shownCards.value.rankUnbind =
      rankCardData[rank as keyof typeof rankCardData].unbind;
  }
  shownCards.value.memberMove = rankCardData.member.move;
  shownCards.value.memberBind = rankCardData.member.bind;
  shownCards.value.memberUnbind = rankCardData.member.unbind;
}

FactionApiClient.loadFactions().then(() => {
  // TODO: Uncomment this
  //const rank = useFactionsStore().isPlayerFactionLeader ? "Leader" : "Member";
  const rank = "Leader";
  populateShownCards(rank.toLowerCase());
});
</script>
