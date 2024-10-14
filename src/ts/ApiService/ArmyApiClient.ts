import axios from "axios";
import { Army } from "@/ts/types/Army";
import { ApiClient } from "@/ts/ApiService/ApiClient";
import { UnitType } from "@/ts/types/UnitType";
import { usePlayerStore } from "@/stores/playerStores";

// TODO: Connect them to the store
export class ArmyApiClient extends ApiClient {
  public static async loadArmies(): Promise<Army[]> {
    const requestKey = "loadArmies";

    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey);
    }

    const request = new Promise<Army[]>((resolve) => {
      axios
        .get(this.getBaseUrl() + "/army?size=1000")
        .then((response) => {
          resolve(response.data.content);
        })
        .finally(() => {
          this.pendingRequests.delete(requestKey);
        });
    });

    this.pendingRequests.set(requestKey, request);
    return request;
  }

  public static async getAllAvailableUnitTypes(): Promise<UnitType[]> {
    const requestKey = "getAllAvailableUnitTypes";

    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey);
    }

    const request = new Promise<UnitType[]>((resolve) => {
      axios
        .get(this.getBaseUrl() + "/unittypes", {
          params: {
            faction: [usePlayerStore().faction],
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .finally(() => {
          this.pendingRequests.delete(requestKey);
        });
    });

    this.pendingRequests.set(requestKey, request);
    return request;
  }
}
