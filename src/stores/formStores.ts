import { defineStore } from "pinia";
import { ref } from "vue";

export const useRoleplayCharacterFormStore = defineStore(
  "roleplayCharacterFormStore",
  () => {
    const charName = ref("");
    const faction = ref("Your faction");
    const gear = ref("");
    const ign = ref("");
    const preference = ref("Your in-game preference");
    const reason = ref("");
    const summary = ref("");
    const title = ref("");

    return {
      charName,
      faction,
      gear,
      ign,
      preference,
      reason,
      summary,
      title,
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
