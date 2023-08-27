import { defineStore } from "pinia";
import { ref } from "vue";
import { FactionApiClient } from "@/ts/ApiService/FactionApiClient";
import { Faction } from "@/ts/types/Faction";

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
  const isFactionLeader = ref(false);

  function isLeader() {
    const playerFaction = ref<Faction>();
    FactionApiClient.loadFactions().then((factions: Faction[]) => {
      // Get the faction corresponding to the factionName prop
      playerFaction.value = factions.find(
        (faction) => faction.nameOfFaction === usePlayerStore().faction,
      )!;
    });
    isFactionLeader.value = true;
  }

  isLeader();
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
    isFactionLeader,
  };
});
