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
