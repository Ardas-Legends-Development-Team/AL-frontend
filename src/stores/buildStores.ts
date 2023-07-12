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

export const useClaimbuildTypeStore = defineStore("ClaimbuildTypeStore", () => {
  const claimbuildTypes = ref<string[]>([]);

  return {
    claimbuildTypes,
  };
});
