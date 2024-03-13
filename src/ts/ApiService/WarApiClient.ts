import axios from "axios";
import { ApiClient } from "@/ts/ApiService/ApiClient";
import { usePlayerStore } from "@/stores/playerStores";
import { useFactionsStore, useWarsStore } from "@/stores/generalInfoStores";
import { War } from "@/ts/types/War";

export class WarApiClient extends ApiClient {
  public static async declareWarToFaction(
    defendingFactionName: string,
    nameOfWar: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      // If player does not have enough privileges, do not send the request
      if (!useFactionsStore().isPlayerFactionLeader) {
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
        });
    });
  }

  public static async loadWars(): Promise<War[]> {
    const warsStore = useWarsStore();
    return new Promise((resolve) => {
      if (warsStore.wars.length > 0) {
        resolve(warsStore.wars);
        return;
      }
      axios
        .get(this.getBaseUrl() + "/wars", {
          params: {
            size: 100,
          },
        })
        .then((response) => {
          response.data.content.forEach((war: War) => {
            warsStore.wars.push(war);
          });
          resolve(warsStore.wars);
        });
    });
  }

  /**
   * Forcefully ends the war. Only staff can do this.
   * @param nameOfWar
   * @param executorDiscordId
   */
  public static async forceEndWar(
    nameOfWar: string,
    executorDiscordId: string,
  ): Promise<void> {
    return new Promise((resolve) => {
      // Send the request
      axios
        .delete(this.getBaseUrl() + "/wars/end/force", {
          params: {
            executorDiscordId: executorDiscordId,
            warName: nameOfWar,
          },
        })
        .then(() => {
          resolve();
        });
    });
  }

  public static async declareBattle(
    battleName: string,
    attackingArmyName: string,
    defendingTargetName: string,
    isFieldBattle: boolean,
  ): Promise<void> {
    return new Promise((resolve) => {
      // Send the request
      // If the battle is a field battle, we only send the army name, otherwise we send the claimbuild name
      axios
        .post(this.getBaseUrl() + "/battles", {
          executorDiscordId: usePlayerStore().discordId,
          battleName: battleName,
          attackingArmyName: attackingArmyName,
          defendingArmyName: isFieldBattle ? defendingTargetName : null,
          isFieldBattle: isFieldBattle,
          claimBuildName: isFieldBattle ? null : defendingTargetName,
        })
        .then(() => {
          resolve();
        });
    });
  }
}
