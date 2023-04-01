import { defineStore } from "pinia";
import { ref } from "vue";

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

export const useCharacterStore = defineStore("CharacterStore", () => {
  const name = ref("");
  const title = ref("");
  const gear = ref("");
  const pvp = ref(false);
  const currentRegion = ref("");
  const boundTo = ref("");
  const injured = ref(false);
  const isHealing = ref(false);
  const startedHeal = ref("");
  const healEnds = ref("");

  return {
    name,
    title,
    gear,
    pvp,
    currentRegion,
    boundTo,
    injured,
    isHealing,
    startedHeal,
    healEnds,
  };
});
