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
  const isStaff = ref(false);

  return {
    ign,
    faction,
    discordId,
    isStaff,
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
