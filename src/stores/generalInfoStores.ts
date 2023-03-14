import { defineStore } from "pinia";
import { ref } from "vue";

export const useFactionsStore = defineStore("FactionsStore", () => {
  const factions = ref<string[]>([]);

  return {
    factions,
  };
});
export const usePlayerStore = defineStore("PlayerStore", () => {
  const ign = ref("");
  const faction = ref("");
  const discordId = ref("");

  return {
    ign,
    faction,
    discordId,
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
