import { defineStore } from "pinia";
import { ref } from "vue";

export const useRoleplayCharacterFormStore = defineStore(
  "roleplayCharacterFormStore",
  () => {
    const characterName = ref("");
    const factionName = ref("Your faction");
    const gear = ref("");
    const pvpPreference = ref(false);
    const linkToLore = ref("");
    const characterTitle = ref("");
    const characterReason = ref("");

    return {
      characterName,
      factionName,
      gear,
      pvpPreference,
      linkToLore,
      characterTitle,
      characterReason,
    };
  }
);
export const useClaimbuildsFormStore = defineStore(
  "ClaimbuildsFormStore",
  () => {
    const buildCoordinatesX = ref();
    const buildCoordinatesY = ref();
    const buildCoordinatesZ = ref();
    const buildName = ref("");
    const buildType = ref("Type of build");
    const extraInfo = ref("");
    const faction = ref("Your faction");
    const ign = ref("");
    const region = ref("");
    const shops = ref("");

    return {
      buildCoordinatesX,
      buildCoordinatesY,
      buildCoordinatesZ,
      buildName,
      buildType,
      extraInfo,
      faction,
      ign,
      region,
      shops,
    };
  }
);
