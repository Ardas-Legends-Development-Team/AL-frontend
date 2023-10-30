import axios from "axios";
import { usePlayerStore } from "@/stores/playerStores";
import { ApiClient } from "@/ts/ApiService/ApiClient";

export class ApplicationApiClient extends ApiClient {
  public static async createRoleplayApplication(
    applicationData: any,
  ): Promise<string> {
    return new Promise((resolve) => {
      axios
        .post(
          this.getBaseUrl() + "/applications/roleplay",
          {
            discordId: usePlayerStore().discordId,
            factionName: applicationData.factionName,
            characterName: applicationData.characterName,
            characterTitle: applicationData.characterTitle,
            characterReason: applicationData.characterReason,
            gear: applicationData.gear,
            pvpPreference:
              applicationData.pvpPreference.toLowerCase() === "pvp",
            linkToLore: applicationData.linkToLore,
          },
          {
            headers: {},
          },
        )
        .then(() => {
          resolve("Application created");
        });
    });
  }

  public static async createClaimbuildApplication(
    applicationData: any,
  ): Promise<string> {
    return new Promise((resolve) => {
      const convertedHouses = `${applicationData.houses.small}x small, ${applicationData.houses.medium}x large, ${applicationData.houses.large}x mansion`;

      axios
        .post(
          this.getBaseUrl() + "/applications/claimbuild",
          {
            applicant: { discordId: usePlayerStore().discordId },
            claimbuildName: applicationData.claimbuildName,
            regionId: applicationData.regionId,
            type: applicationData.type,
            factionNameOwnedBy: usePlayerStore().faction,
            coordinate: applicationData.coordinate,
            productionSites: applicationData.productionSites,
            specialBuildings: applicationData.specialBuildings,
            traders: applicationData.traders,
            siege: applicationData.siege,
            houses: convertedHouses,
            builtBy: applicationData.builtBy,
          },
          {
            headers: {},
          },
        )
        .then(() => {
          resolve("Application created");
        });
    });
  }

  public static async getAllApplications(): Promise<any> {
    return new Promise((resolve) => {
      axios
        .get(this.getBaseUrl() + "/applications/roleplay/active?size=1000", {
          headers: {},
        })
        .then((response) => {
          const rpApps = response.data.content;

          axios
            .get(
              this.getBaseUrl() + "/applications/claimbuild/active?size=1000",
              {
                headers: {},
              },
            )
            .then((response) => {
              const cbApps = response.data.content;
              resolve(rpApps.concat(cbApps));
            });
        });
    });
  }
}
