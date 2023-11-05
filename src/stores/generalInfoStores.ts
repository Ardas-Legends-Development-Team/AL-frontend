import { defineStore } from "pinia";
import { ref } from "vue";
import { Faction } from "@/ts/types/Faction";

export const useFactionsStore = defineStore("FactionsStore", () => {
  const factions = ref<Faction[]>([]);
  const factionNames = ref<string[]>([]);
  const factionLeaders = ref<string[]>([]);
  const playerFaction = ref<Faction>({
    id: 0,
    nameOfFaction: "",
    countOfArmies: 0,
    countOfClaimbuilds: 0,
    countOfClaimedRegions: 0,
    countOfPlayers: 0,
    homeRegion: "",
    leaderIgn: "",
  });
  const isPlayerFactionLeader = ref<boolean>(false);

  return {
    factions,
    factionNames,
    factionLeaders,
    playerFaction,
    isPlayerFactionLeader,
  };
});

export const useClaimbuildTypesStore = defineStore(
  "ClaimbuildTypesStore",
  () => {
    const claimbuildTypes = ref<string[]>([]);

    return {
      claimbuildTypes: claimbuildTypes,
    };
  },
);
