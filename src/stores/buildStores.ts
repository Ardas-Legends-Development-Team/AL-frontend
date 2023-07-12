import { defineStore } from "pinia";
import { ref } from "vue";
import { ProductionSite } from "@/ts/types/ProductionSite";

export const useSpecialBuildingStore = defineStore(
  "SpecialBuildingStore",
  () => {
    const specialBuildings = ref<string[]>([]);

    return {
      specialBuildings,
    };
  }
);

export const useProductionSiteTypeStore = defineStore(
  "ProductionSiteTypeStore",
  () => {
    const productionSiteTypes = ref<ProductionSite[]>([]);

    return {
      productionSiteTypes,
    };
  }
);

export const useClaimbuildTypeStore = defineStore("ClaimbuildTypeStore", () => {
  const claimbuildTypes = ref<string[]>([]);

  return {
    claimbuildTypes,
  };
});
