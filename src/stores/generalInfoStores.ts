import { defineStore } from "pinia";
import { ref } from "vue";
import { Faction } from "@/ts/types/Faction";

export const useFactionsStore = defineStore("FactionsStore", () => {
  const factions = ref<Faction[]>([]);
  const factionNames = ref<string[]>([]);

  return {
    factions,
    factionNames,
  };
});

export const useClaimbuildTypesStore = defineStore(
  "ClaimbuildTypesStore",
  () => {
    const claimbuildTypes = ref<string[]>([]);

    return {
      claimbuildTypes: claimbuildTypes,
    };
  }
);
