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
  const name = ref("No character name");
  const title = ref("No title");
  const rank = ref("Member");
  const gear = ref("No gear");
  const pvp = ref(false);
  const currentRegion = ref("0");
  const boundTo = ref("Not bound to entity");
  const injured = ref(false);
  const isHealing = ref(false);
  const startedHeal = ref("Some date");
  const healEnds = ref("Some another date");

  return {
    name,
    title,
    rank,
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
