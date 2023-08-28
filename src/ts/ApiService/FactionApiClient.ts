import axios from "axios";
import { useFactionsStore } from "@/stores/generalInfoStores";
import { Faction } from "@/ts/types/Faction";
import { ApiClient } from "@/ts/ApiService/ApiClient";
import { useCharacterStore, usePlayerStore } from "@/stores/playerStores";
import { ErrorHandler } from "@/ts/ErrorHandler";

export class FactionApiClient extends ApiClient {
  public static async loadFactions(): Promise<Faction[]> {
    const factionsStore = useFactionsStore();
    return new Promise((resolve) => {
      if (factionsStore.factions.length > 0) {
        resolve(factionsStore.factions);
        return;
      }
      axios
        .get(this.getBaseUrl() + "/faction", {
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
        .get(this.getBaseUrl() + "/faction", {
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

  public static async declareWarToFaction(
    defendingFactionName: string,
    nameOfWar: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      // If player does not have enough privileges, do not send the request
      if (!useCharacterStore().isFactionLeader) {
        reject("You are not a faction leader");
      }
      // Send the request
      axios
        .post(this.getBaseUrl() + "/wars/declare", {
          executorDiscordId: usePlayerStore().discordId,
          defendingFactionName: defendingFactionName,
          nameOfWar: nameOfWar,
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          ErrorHandler.throwError(error.response.data.message);
        });
    });
  }
}
