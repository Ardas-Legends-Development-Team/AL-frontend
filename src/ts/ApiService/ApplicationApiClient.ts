import axios from "axios";
import { usePlayerStore } from "@/stores/playerStores";
import { ApiClient } from "@/ts/ApiService/ApiClient";
import {
  ClaimbuildApplication,
  getApplicationType,
  RoleplayApplication,
} from "@/ts/types/Application";
import { formatDateArrayToString } from "@/ts/utilities";

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

  public static async getPlayerActiveApplications(): Promise<
    Array<RoleplayApplication | ClaimbuildApplication>
  > {
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
              const apps: Array<RoleplayApplication | ClaimbuildApplication> =
                rpApps.concat(cbApps);
              // Get only the apps for the current player
              const filteredApps: (
                | RoleplayApplication
                | ClaimbuildApplication
              )[] = [];
              apps.forEach(
                (app: RoleplayApplication | ClaimbuildApplication) => {
                  // In order to check if the application is from the current player, we need to
                  // get the application type first, to know which field to check
                  const type = getApplicationType(app);
                  if (type === "claimbuild") {
                    // cast to claimbuild application
                    if (
                      (app as ClaimbuildApplication).application.ign ===
                      usePlayerStore().ign
                    ) {
                      filteredApps.push(app);
                    }
                  } else if (type === "roleplay") {
                    // cast to roleplay application
                    if (
                      (app as RoleplayApplication).playerIgn ===
                      usePlayerStore().ign
                    ) {
                      filteredApps.push(app);
                    }
                  }
                },
              );
              // call formatDateArrayToString on each application's appliedAt
              filteredApps.forEach((app: any) => {
                app.appliedAt = formatDateArrayToString(app.appliedAt);
              });
              resolve(filteredApps);
            });
        });
    });
  }
}
