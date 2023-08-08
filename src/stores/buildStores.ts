import { defineStore } from "pinia";
import { ref } from "vue";
import { ProductionSite } from "@/ts/types/ProductionSite";
import { ClaimBuild } from "@/ts/types/ClaimBuild";

export const useSpecialBuildingStore = defineStore(
  "SpecialBuildingStore",
  () => {
    const specialBuildings = ref<string[]>([]);

    return {
      specialBuildings,
    };
  },
);

export const useProductionSiteTypeStore = defineStore(
  "ProductionSiteTypeStore",
  () => {
    const productionSiteTypes = ref<ProductionSite[]>([]);

    return {
      productionSiteTypes,
    };
  },
);

export const useClaimbuildTypeStore = defineStore("ClaimbuildTypeStore", () => {
  const claimbuildTypes = ref<string[]>([]);

  return {
    claimbuildTypes,
  };
});

export const useClaimbuildStore = defineStore("ClaimbuildStore", () => {
  const claimbuilds = ref<ClaimBuild[]>([]);

  return {
    claimbuilds: claimbuilds,
  };
});
