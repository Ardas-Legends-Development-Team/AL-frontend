import axios from "axios";
import { useFactionsStore } from "@/stores/generalInfoStores";
import { useCharacterStore, usePlayerStore } from "@/stores/playerStores";
import { PlayerInfo } from "@/ts/types/PlayerInfo";
import { CharacterInfo } from "@/ts/types/CharacterInfo";
import { useRegionIdStore, useRegionStore } from "@/stores/regionStores";
import { Region } from "@/ts/types/Region";
import { Faction } from "@/ts/types/Faction";
import { useSpecialBuildingStore } from "@/stores/buildStores";
import { ErrorHandler } from "@/ts/ErrorHandler";

export class ApiClient {
  public static registerPlayer(
    discordId: string,
    ign: string,
    faction: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:8080/api/player", {
          discordID: discordId,
          faction: faction,
          ign: ign,
        })
        .then(() => resolve(true))
        .catch((err) => {
          reject(err);
        });
    });
  }

  public static async loadFactions(): Promise<Faction[]> {
    const factionsStore = useFactionsStore();
    return new Promise((resolve) => {
      if (factionsStore.factions.length > 0) {
        resolve(factionsStore.factions);
        return;
      }
      axios
        .get("http://localhost:8080/api/faction", {
          params: {
            size: 100,
          },
        })
        .then((response) => {
          response.data.content.forEach((faction: Faction) => {
            factionsStore.factions.push(faction);
            factionsStore.factionNames.push(faction.nameOfFaction);
          });
          resolve(factionsStore.factions);
        });
    });
  }

  public static async loadFactionNames(): Promise<string[]> {
    const factionsStore = useFactionsStore();
    return new Promise((resolve) => {
      if (factionsStore.factionNames.length > 0) {
        resolve(factionsStore.factionNames);
        return;
      }
      axios
        .get("http://localhost:8080/api/faction", {
          params: {
            size: 100,
          },
        })
        .then((response) => {
          response.data.content.forEach((faction: Faction) => {
            factionsStore.factions.push(faction);
            factionsStore.factionNames.push(faction.nameOfFaction);
          });
          resolve(factionsStore.factionNames);
        });
    });
  }

  public static async loadPlayerInfo(discordId?: string): Promise<PlayerInfo> {
    if (discordId !== undefined) {
      return new Promise((resolve) => {
        this.loadPlayerCharacterInfoFromAPI(discordId).then(() => {
          resolve(usePlayerStore());
        });
      });
    }
    return usePlayerStore();
  }

  public static async loadCharacterInfo(
    discordId?: string
  ): Promise<CharacterInfo> {
    if (discordId !== undefined) {
      return new Promise((resolve) => {
        this.loadPlayerCharacterInfoFromAPI(discordId).then(() => {
          resolve(useCharacterStore());
        });
      });
    }
    return useCharacterStore();
  }

  public static async loadClaimbuildTypes(): Promise<string[]> {
    return ["Something here", "Hamlet"];
  }

  /**
   * Loads player and then character info from the API and stores it in the player store and
   * character store. If the player info is already loaded, it will not load it again.
   * @param discordId
   */
  private static async loadPlayerCharacterInfoFromAPI(
    discordId: string
  ): Promise<boolean> {
    const playerStore = usePlayerStore();
    return new Promise((resolve) => {
      if (playerStore.discordId !== "") {
        resolve(true);
        return;
      }
      axios
        .get("http://localhost:8080/api/player/discordid/" + discordId)
        .then((response) => {
          const data = response.data;
          playerStore.ign = data.ign;
          playerStore.faction = data.faction;
          playerStore.discordId = data.discordId;
          playerStore.isStaff = data.isStaff;
          // Load character info
          if (data.rpChar !== null) {
            const characterStore = useCharacterStore();
            characterStore.name = data.rpChar.name;
            characterStore.title = data.rpChar.title;
            characterStore.gear = data.rpChar.gear;
            characterStore.pvp = data.rpChar.pvp;
            characterStore.currentRegion = data.rpChar.currentRegion;
            characterStore.boundTo = data.rpChar.boundTo;
            characterStore.injured = data.rpChar.injured;
            characterStore.isHealing = data.rpChar.isHealing;
            characterStore.startedHeal = data.rpChar.startedHeal;
            characterStore.healEnds = data.rpChar.healEnds;
          }
          resolve(true);
          return;
        });
    });
  }

  public static async loadRegionIds(): Promise<string[]> {
    const regionIdStore = useRegionIdStore();
    return new Promise((resolve) => {
      if (regionIdStore.regionIds.length > 0) {
        resolve(regionIdStore.regionIds);
        return;
      }
      axios.get("http://localhost:8080/api/region/all").then((response) => {
        response.data.forEach((regionId: string) => {
          regionIdStore.regionIds.push(regionId);
        });
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
          response.data.forEach((region: Region) => {
            regionStore.regions.push(region);
          });
          resolve(regionStore.regions);
        });
    });
  }

  public static async createRoleplayApplication(
    applicationData: any
  ): Promise<string> {
    return new Promise((resolve) => {
      axios
        .post(
          "http://localhost:8080/api/applications/roleplay",
          {
            discordId: usePlayerStore().discordId,
            factionName: applicationData.factionName,
            characterName: applicationData.characterName,
            characterTitle: applicationData.characterTitle,
            characterReason: applicationData.characterReason,
            gear: applicationData.gear,
            pvpPreference: applicationData.pvpPreference,
            linkToLore: applicationData.linkToLore,
          },
          {
            headers: {},
          }
        )
        .then(() => {
          resolve("Application created");
        })
        .catch(() => {
          ErrorHandler.throwError("You did not correctly fill the form.");
        });
    });
  }

  public static async createClaimbuildApplication(
    applicationData: any
  ): Promise<string> {
    return new Promise((resolve) => {
      axios
        .post(
          "http://localhost:8080/api/applications/claimbuild",
          {
            discordId: usePlayerStore().discordId,
            claimbuildName: applicationData.claimbuildName,
            regionId: applicationData.regionId,
            type: applicationData.type,
            factionNameOwnedBy: usePlayerStore().faction,
            coordinate: applicationData.coordinate,
            productionSites: applicationData.productionSites,
            specialBuildings: applicationData.specialBuildings,
            traders: applicationData.traders,
            siege: applicationData.siege,
            houses: applicationData.houses,
            builtBy: applicationData.builtBy,
          },
          {
            headers: {},
          }
        )
        .then(() => {
          resolve("Application created");
        });
    });
  }

  public static async loadProductionSiteTypes(): Promise<string[]> {
    return ["Farm", "Mine"];
  }

  public static async loadSpecialBuildingTypes(): Promise<string[]> {
    const specialBuildingStore = useSpecialBuildingStore();
    return new Promise((resolve) => {
      if (specialBuildingStore.specialBuildings.length > 0) {
        resolve(specialBuildingStore.specialBuildings);
        return;
      }
      axios
        .get("http://localhost:8080/api/claimbuild/specialbuildings")
        .then((response) => {
          response.data.forEach((specialBuilding: string) => {
            specialBuildingStore.specialBuildings.push(specialBuilding);
          });
          resolve(specialBuildingStore.specialBuildings);
        });
    });
  }
}
