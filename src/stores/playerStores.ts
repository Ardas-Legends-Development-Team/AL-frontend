import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export const usePlayerStore = defineStore("PlayerStore", () => {
  const discordId = ref("");

  const faction = ref("");
  const ign = ref("");
  const isStaff = ref(false);
  const roles: Ref<string[]> = ref([]);

  return {
    discordId,
    faction,
    ign,
    isStaff,
    roles,
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
