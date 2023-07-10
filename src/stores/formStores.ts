import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { ProductionSiteWithCount } from "@/ts/types/ProductionSite";

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
export const useClaimbuildsFormStore = defineStore("ClaimbuildsFormStore", {
  state: () => {
    const applicant = ref({ discordId: "" });
    const claimbuildName = ref("");
    const regionId = ref("");
    const type = ref("Claimbuild type");
    const factionNameOwnedBy = ref("Your faction");
    const coordinate = ref({ x: 0, y: 0, z: 0 });
    const productionSites: Ref<ProductionSiteWithCount[]> = ref([]);
    const specialBuildings: Ref<string[]> = ref([]);
    const traders = ref("");
    const siege = ref("");
    const houses: Ref<{ small: number; medium: number; large: number }> = ref({
      small: 0,
      medium: 0,
      large: 0,
    });
    const builtBy: Ref<string[]> = ref([]);

    return {
      applicant,
      claimbuildName,
      regionId,
      type,
      factionNameOwnedBy,
      coordinate,
      productionSites,
      specialBuildings,
      traders,
      siege,
      houses,
      builtBy,
    };
  },
  actions: {
    hasWorkshop(): boolean {
      return this.specialBuildings.some(
        (building) => building.toLowerCase() === "workshop"
      );
    },
  },
});
