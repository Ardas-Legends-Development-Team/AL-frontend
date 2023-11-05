import axios from "axios";

import { Army } from "@/ts/types/Army";
import { ApiClient } from "@/ts/ApiService/ApiClient";

export class ArmyApiClient extends ApiClient {
  public static async loadArmies(): Promise<Army[]> {
    return new Promise((resolve) => {
      axios.get(this.getBaseUrl() + "/army?size=100").then((response) => {
        resolve(response.data.content);
      });
    });
  }
}
