import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlayerStore = defineStore("PlayerStore", () => {
  const discordId = ref("");
  const faction = ref("");
  const ign = ref("");
  const isStaff = ref(false);

  return {
    discordId,
    faction,
    ign,
    isStaff,
  };
});

export const useCharacterStore = defineStore("CharacterStore", () => {
  const boundTo = ref("Not bound to entity");
  const currentRegion = ref("0");
  const gear = ref("No gear");
  const healEnds = ref("Some another date");
  const injured = ref(false);
  const isHealing = ref(false);
  const name = ref("No character name");
  const pvp = ref(false);
  const rank = ref("Member");
  const startedHeal = ref("Some date");
  const title = ref("No title");

  return {
    boundTo,
    currentRegion,
    gear,
    healEnds,
    injured,
    isHealing,
    name,
    pvp,
    rank,
    startedHeal,
    title,
  };
});
