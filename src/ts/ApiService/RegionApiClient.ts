import axios from "axios";
import { useRegionIdStore, useRegionStore } from "@/stores/regionStores";
import { Region } from "@/ts/types/Region";
import { ApiClient } from "@/ts/ApiService/ApiClient";

export class RegionApiClient extends ApiClient {
  public static async loadRegionIds(): Promise<string[]> {
    const regionIdStore = useRegionIdStore();
    const requestKey = "loadRegionIds";

    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey);
    }

    const request = new Promise<string[]>((resolve) => {
      if (regionIdStore.regionIds.length > 0) {
        resolve(regionIdStore.regionIds);
        return;
      }

      axios
        .get(this.getBaseUrl() + "/region/all")
        .then((response) => {
          regionIdStore.regionIds = response.data.map(
            (region: { id: string }) => region.id,
          );
          resolve(regionIdStore.regionIds);
        })
        .finally(() => {
          this.pendingRequests.delete(requestKey);
        });
    });

    this.pendingRequests.set(requestKey, request);
    return request;
  }

  public static async loadRegions(): Promise<Region[]> {
    const regionStore = useRegionStore();
    const requestKey = "loadRegions";

    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey);
    }

    const request = new Promise<Region[]>((resolve) => {
      if (regionStore.regions.length > 0) {
        resolve(regionStore.regions);
        return;
      }
      axios
        .get(this.getBaseUrl() + "/region/all/detailed")
        .then((response) => {
          regionStore.regions = response.data;
          resolve(regionStore.regions);
        })
        .finally(() => {
          this.pendingRequests.delete(requestKey);
        });
    });

    this.pendingRequests.set(requestKey, request);
    return request;
  }
}
