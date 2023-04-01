import { defineStore } from "pinia";
import { ref } from "vue";

export const useFactionsStore = defineStore("FactionsStore", () => {
  const factions = ref<string[]>([]);

  return {
    factions,
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
