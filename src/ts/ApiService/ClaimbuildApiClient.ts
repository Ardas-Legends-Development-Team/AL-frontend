import axios from "axios";
import {
  useClaimbuildTypeStore,
  useProductionSiteTypeStore,
  useSpecialBuildingStore,
} from "@/stores/buildStores";
import { ProductionSite } from "@/ts/types/ProductionSite";
import { ApiClient } from "@/ts/ApiService/ApiClient";

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
      // TODO: Change this to the correct endpoint
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
}
