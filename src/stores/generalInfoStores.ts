import { defineStore } from "pinia";
import { ref } from "vue";
import { Faction } from "@/ts/types/Faction";
import { War } from "@/ts/types/War";

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
      claimbuildTypes,
    };
  },
);

export const useWarsStore = defineStore("WarsStore", () => {
  const wars = ref<War[]>([]);

  return {
    wars,
  };
});
