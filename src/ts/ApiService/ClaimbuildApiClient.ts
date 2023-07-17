import axios from "axios";
import {
  useClaimbuildStore,
  useClaimbuildTypeStore,
  useProductionSiteTypeStore,
  useSpecialBuildingStore,
} from "@/stores/buildStores";
import { ProductionSite } from "@/ts/types/ProductionSite";
import { ApiClient } from "@/ts/ApiService/ApiClient";
import { ClaimBuild } from "../types/ClaimBuild";

export class ClaimbuildApiClient extends ApiClient {
  public static async loadClaimbuildTypes(): Promise<string[]> {
    const claimbuildTypesStore = useClaimbuildTypeStore();
    return new Promise((resolve) => {
      if (claimbuildTypesStore.claimbuildTypes.length > 0) {
        resolve(claimbuildTypesStore.claimbuildTypes);
        return;
      }
      axios.get(this.getBaseUrl() + "/claimbuild/types").then((response) => {
        claimbuildTypesStore.claimbuildTypes = response.data;
        resolve(claimbuildTypesStore.claimbuildTypes);
      });
    });
  }

  public static async loadProductionSiteTypes(): Promise<ProductionSite[]> {
    const productionSiteTypeStore = useProductionSiteTypeStore();
    return new Promise((resolve) => {
      if (productionSiteTypeStore.productionSiteTypes.length > 0) {
        resolve(productionSiteTypeStore.productionSiteTypes);
        return;
      }
      axios.get(this.getBaseUrl() + "/productionsite/all").then((response) => {
        productionSiteTypeStore.productionSiteTypes = response.data;
        resolve(productionSiteTypeStore.productionSiteTypes);
      });
    });
  }

  public static async loadSpecialBuildingTypes(): Promise<string[]> {
    const specialBuildingStore = useSpecialBuildingStore();
    return new Promise((resolve) => {
      if (specialBuildingStore.specialBuildings.length > 0) {
        resolve(specialBuildingStore.specialBuildings);
        return;
      }
      axios
        .get(this.getBaseUrl() + "/claimbuild/specialbuildings")
        .then((response) => {
          specialBuildingStore.specialBuildings = response.data;
          resolve(specialBuildingStore.specialBuildings);
        });
    });
  }

  public static async loadClaimbuildsByNames(
    names: string[]
  ): Promise<ClaimBuild[]> {
    const claimbuildStore = useClaimbuildStore();
    return new Promise((resolve) => {
      const cbNames: string[] = claimbuildStore.claimbuilds.map(
        (cb) => cb.name
      );
      const alreadyLoadedCbs: ClaimBuild[] = [];
      const cbsToFetch: string[] = [];

      // Loop through cbs to see which are not loaded yet
      names.forEach((name) => {
        const index = cbNames.indexOf(name);
        if (index !== -1) {
          // Typecast here should be fine because I check if the cb is in the array before
          alreadyLoadedCbs.push(
            claimbuildStore.claimbuilds.at(index) as ClaimBuild
          );
        } else cbsToFetch.push(name);
      });

      if (cbsToFetch.length > 0) {
        const nameParams = cbsToFetch.join(`&name=`);
        axios
          .get(this.getBaseUrl() + `/claimbuild/name?name=${nameParams}`)
          .then((response) => {
            response.data.forEach((cb: ClaimBuild) => {
              claimbuildStore.claimbuilds.push(cb);
              alreadyLoadedCbs.push(cb);
            });

            resolve(alreadyLoadedCbs);
            return;
          });
      } else {
        resolve(alreadyLoadedCbs);
        return;
      }
    });
  }
}
