import axios from "axios";
import { useRegionIdStore, useRegionStore } from "@/stores/regionStores";
import { Region } from "@/ts/types/Region";
import { ApiClient } from "@/ts/ApiService/ApiClient";

export class RegionApiClient extends ApiClient {
  public static async loadRegionIds(): Promise<string[]> {
    const regionIdStore = useRegionIdStore();
    return new Promise((resolve) => {
      if (regionIdStore.regionIds.length > 0) {
        resolve(regionIdStore.regionIds);
        return;
      }
      axios.get("http://localhost:8080/api/region/all").then((response) => {
        regionIdStore.regionIds = response.data;
        resolve(regionIdStore.regionIds);
      });
    });
  }

  public static async loadRegions(): Promise<Region[]> {
    const regionStore = useRegionStore();
    return new Promise((resolve) => {
      if (regionStore.regions.length > 0) {
        resolve(regionStore.regions);
        return;
      }
      axios
        .get("http://localhost:8080/api/region/all/detailed")
        .then((response) => {
          regionStore.regions = response.data;
          resolve(regionStore.regions);
        });
    });
  }
}
