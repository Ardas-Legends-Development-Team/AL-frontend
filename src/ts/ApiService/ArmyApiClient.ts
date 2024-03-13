import axios from "axios";

import { Army } from "@/ts/types/Army";
import { ApiClient } from "@/ts/ApiService/ApiClient";
import { UnitType } from "@/ts/types/UnitType";

export class ArmyApiClient extends ApiClient {
  public static async loadArmies(): Promise<Army[]> {
    // TODO: connect to store
    return new Promise((resolve) => {
      axios.get(this.getBaseUrl() + "/army?size=1000").then((response) => {
        resolve(response.data.content);
      });
    });
  }

  public static async getAllAvailableUnitTypes(): Promise<UnitType[]> {
    // TODO: connect to store
    return new Promise((resolve) => {
      axios.get(this.getBaseUrl() + "/unittypes").then((response) => {
        resolve(response.data.content);
      });
    });
  }
}
