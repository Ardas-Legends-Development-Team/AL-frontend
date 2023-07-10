import { defineStore } from "pinia";
import { ref } from "vue";
import { Region } from "@/ts/types/Region";

export const useRegionIdStore = defineStore("RegionIdStore", () => {
  const regionIds = ref<string[]>([]);

  return {
    regionIds,
  };
});

export const useRegionStore = defineStore("RegionStore", () => {
  const regions = ref<Region[]>([]);

  return {
    regions,
  };
});
