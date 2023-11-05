import { defineStore } from "pinia";
import { ref } from "vue";
import { Claimbuild, ProductionSite } from "@/ts/types/Claimbuild";

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
  const allClaimbuilds = ref<Claimbuild[]>([]);
  // Those are claimbuilds that we load through getClaimbuildsByNames
  const specificLoadedClaimbuilds = ref<Claimbuild[]>([]);

  return {
    allClaimbuilds: allClaimbuilds,
    specificLoadedClaimbuilds: specificLoadedClaimbuilds,
  };
});
