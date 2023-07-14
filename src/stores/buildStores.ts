import { ProductionSite } from "@/ts/types/ProductionSite";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSpecialBuildingStore = defineStore(
  "SpecialBuildingStore",
  () => {
    const specialBuildings = ref<string[]>([]);

    return {
      specialBuildings,
    };
  }
);

export const useProductionSiteStore = defineStore(
  "ProductionSiteStore",
  () => {
    const productionSites = ref<ProductionSite[]>([]);

    return {
      productionSites,
    };
  }
);
