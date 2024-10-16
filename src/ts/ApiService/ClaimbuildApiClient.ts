import axios from "axios";
import {
  useClaimbuildStore,
  useClaimbuildTypeStore,
  useProductionSiteTypeStore,
  useSpecialBuildingStore,
} from "@/stores/buildStores";
import { Claimbuild, ProductionSite } from "@/ts/types/Claimbuild";
import { ApiClient } from "@/ts/ApiService/ApiClient";

export class ClaimbuildApiClient extends ApiClient {
  public static async loadClaimbuildTypes(): Promise<string[]> {
    const claimbuildTypesStore = useClaimbuildTypeStore();
    const requestKey = "loadClaimbuildTypes";

    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey);
    }

    const request = new Promise<string[]>((resolve) => {
      if (claimbuildTypesStore.claimbuildTypes.length > 0) {
        resolve(claimbuildTypesStore.claimbuildTypes);
        return;
      }

      axios
        .get(this.getBaseUrl() + "/claimbuild/types")
        .then((response) => {
          claimbuildTypesStore.claimbuildTypes = response.data;
          resolve(claimbuildTypesStore.claimbuildTypes);
        })
        .finally(() => {
          this.pendingRequests.delete(requestKey);
        });
    });

    this.pendingRequests.set(requestKey, request);
    return request;
  }

  public static async loadProductionSiteTypes(): Promise<ProductionSite[]> {
    const productionSiteTypeStore = useProductionSiteTypeStore();
    const requestKey = "loadProductionSiteTypes";

    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey);
    }

    const request = new Promise<ProductionSite[]>((resolve) => {
      if (productionSiteTypeStore.productionSiteTypes.length > 0) {
        resolve(productionSiteTypeStore.productionSiteTypes);
        return;
      }

      axios
        .get(this.getBaseUrl() + "/productionsite/all")
        .then((response) => {
          productionSiteTypeStore.productionSiteTypes = response.data;
          resolve(productionSiteTypeStore.productionSiteTypes);
        })
        .finally(() => {
          this.pendingRequests.delete(requestKey);
        });
    });

    this.pendingRequests.set(requestKey, request);
    return request;
  }

  public static async loadSpecialBuildingTypes(): Promise<string[]> {
    const specialBuildingStore = useSpecialBuildingStore();
    const requestKey = "loadSpecialBuildingTypes";

    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey);
    }

    const request = new Promise<string[]>((resolve) => {
      if (specialBuildingStore.specialBuildings.length > 0) {
        resolve(specialBuildingStore.specialBuildings);
        return;
      }

      axios
        .get(this.getBaseUrl() + "/claimbuild/specialbuildings")
        .then((response) => {
          specialBuildingStore.specialBuildings = response.data;
          resolve(specialBuildingStore.specialBuildings);
        })
        .finally(() => {
          this.pendingRequests.delete(requestKey);
        });
    });

    this.pendingRequests.set(requestKey, request);
    return request;
  }

  // TODO: connect to store
  public static async loadAllClaimbuilds(): Promise<Claimbuild[]> {
    const requestKey = "loadAllClaimbuilds";

    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey);
    }

    const request = new Promise<Claimbuild[]>((resolve) => {
      axios
        .get(this.getBaseUrl() + "/claimbuild?size=1000")
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

  public static async loadClaimbuildsByNames(
    names: string[],
  ): Promise<Claimbuild[]> {
    // Retrieve the claimbuild store
    const claimbuildStore = useClaimbuildStore();
    const requestKey = "loadClaimbuildsByNames";

    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey);
    }

    const request = new Promise<Claimbuild[]>((resolve) => {
      // Prepare arrays to hold claimbuilds that are already loaded and those to be fetched
      const alreadyLoadedCbs: Claimbuild[] = [];
      const cbsToFetch: string[] = [];

      // Check which claimbuilds are already loaded and which need to be fetched
      names.forEach((name) => {
        // Iterate through the objects in the store and check if the name matches
        // If it does, add it to the already loaded claimbuilds
        // If we already loaded all claimbuilds, we don't need to fetch them again
        let foundCb: Claimbuild | undefined;
        if (claimbuildStore.allClaimbuilds.length > 0) {
          foundCb = claimbuildStore.allClaimbuilds.find(
            (cb) => cb.name === name,
          );
        } else {
          foundCb = claimbuildStore.specificLoadedClaimbuilds.find(
            (cb) => cb.name === name,
          );
        }
        if (foundCb) {
          alreadyLoadedCbs.push(foundCb);
        } else {
          // If not already loaded, add to cbsToFetch array
          cbsToFetch.push(name);
        }
      });

      // If cbsToFetch array is not empty, we fetch those claimbuilds
      if (cbsToFetch.length > 0) {
        const nameParams = cbsToFetch
          .map((cb) => cb.replace("&", "%26"))
          .join(`&name=`);

        // Send a GET request to fetch claimbuilds by name
        axios
          .get(this.getBaseUrl() + `/claimbuild/name?name=${nameParams}`)
          .then((response) => {
            // Add the fetched claimbuilds to the loaded claimbuilds and to the already loaded array
            response.data.forEach((cb: Claimbuild) => {
              claimbuildStore.specificLoadedClaimbuilds.push(cb);
              alreadyLoadedCbs.push(cb);
            });

            // Resolve the promise with the already loaded claimbuilds
            resolve(alreadyLoadedCbs);
            return;
          })
          .finally(() => {
            this.pendingRequests.delete(requestKey);
          });
      } else {
        // If no claimbuilds need to be fetched, resolve the promise with already loaded claimbuilds
        resolve(alreadyLoadedCbs);
        return;
      }
    });

    this.pendingRequests.set(requestKey, request);
    return request;
  }

  // TODO: connect to store
  public static async loadClaimbuildsByFaction(
    factionName: string,
  ): Promise<Claimbuild[]> {
    const requestKey = "loadClaimbuildsByFaction";

    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey);
    }

    const request = new Promise<Claimbuild[]>((resolve) => {
      axios
        .get(this.getBaseUrl() + `/claimbuild/faction?faction=${factionName}`)
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
