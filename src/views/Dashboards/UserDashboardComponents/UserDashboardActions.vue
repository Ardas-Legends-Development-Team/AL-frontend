<template>
  <h2 class="mb-1 ml-16 pb-4 text-3xl font-bold text-neutral-content">
    Actions
  </h2>
  <div class="bg-base-100 p-4 text-center text-neutral-content">
    <div class="grid grid-cols-5 justify-items-center gap-3">
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
import { getArmyBoundToPlayer } from "@/ts/utilities";
import { usePlayerStore } from "@/stores/playerStores";

const shownCards: any = ref({});

async function populateShownCards(rank: string): Promise<void> {
  // If rank is different from member add all rank-specific actions, and then we add the member actions
  if (rank !== "member") {
    shownCards.value.rankMove =
      rankCardData[rank as keyof typeof rankCardData].move;
    shownCards.value.rankBind =
      rankCardData[rank as keyof typeof rankCardData].bind;
    shownCards.value.rankUnbind =
      rankCardData[rank as keyof typeof rankCardData].unbind;
    shownCards.value.rankStation =
      rankCardData[rank as keyof typeof rankCardData].station;
    shownCards.value.rankUnstation =
      rankCardData[rank as keyof typeof rankCardData].unstation;
    shownCards.value.createArmy =
      rankCardData[rank as keyof typeof rankCardData].createArmy;
    shownCards.value.disband =
      rankCardData[rank as keyof typeof rankCardData].disband;
  }
  // Add all member actions concerning the player himself. Do not add mutually exclusive actions
  // Such as bind/unbind and station/unstation (they are mutually exclusive in the UI)
  shownCards.value.memberMove = rankCardData.member.move;
  // If the player is not bound to an army, we only show the bind action and not unbind/station/unstation
  const armyBoundToPlayer = await getArmyBoundToPlayer(
    usePlayerStore().discordId,
  );
  if (armyBoundToPlayer) {
    shownCards.value.memberUnbind = rankCardData.member.unbind;
    // TODO: exclude the station/unstation actions if the player is already stationed when we get info from API
    shownCards.value.memberStation = rankCardData.member.station;
    shownCards.value.memberUnstation = rankCardData.member.unstation;
  } else {
    shownCards.value.memberBind = rankCardData.member.bind;
  }
}

FactionApiClient.loadFactions().then(() => {
  // TODO: Uncomment this
  //const rank = useFactionsStore().isPlayerFactionLeader ? "Leader" : "Member";
  const rank = "Leader";
  populateShownCards(rank.toLowerCase());
});
</script>
