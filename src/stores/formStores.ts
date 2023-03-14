import { defineStore } from "pinia";
import { ref } from "vue";

export const useRoleplayCharacterFormStore = defineStore(
  "roleplayCharacterFormStore",
  () => {
    const ign = ref("");
    const charName = ref("");
    const preference = ref("Your in-game preference");
    const title = ref("");
    const reason = ref("");
    const faction = ref("Your faction");
    const gear = ref("");
    const summary = ref("");

    return {
      ign,
      charName,
      preference,
      title,
      reason,
      faction,
      gear,
      summary,
    };
  }
);
export const useClaimbuildsFormStore = defineStore(
  "ClaimbuildsFormStore",
  () => {
    const ign = ref("");
    const faction = ref("Your faction");
    const region = ref("");
    const buildType = ref("Type of build");
    const buildName = ref("");
    const buildCoordinatesX = ref();
    const buildCoordinatesY = ref();
    const buildCoordinatesZ = ref();
    const shops = ref("");
    const extraInfo = ref("");

    return {
      ign,
      faction,
      region,
      buildType,
      buildName,
      buildCoordinatesX,
      buildCoordinatesY,
      buildCoordinatesZ,
      shops,
      extraInfo,
    };
  }
);
