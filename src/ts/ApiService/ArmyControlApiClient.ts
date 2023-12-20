import { ApiClient } from "@/ts/ApiService/ApiClient";
import axios from "axios";
import { usePlayerStore } from "@/stores/playerStores";

export class ArmyControlApiClient extends ApiClient {
  public static async bindArmy(
    bindTargetDiscordId: string,
    armyName: string,
  ): Promise<string> {
    return new Promise((resolve) => {
      axios
        .patch(
          this.getBaseUrl() + "/army/bind",
          {
            executorDiscordId: usePlayerStore().discordId,
            targetDiscordId: bindTargetDiscordId,
            armyName: armyName,
          },
          {
            headers: {},
          },
        )
        .then((response) => {
          resolve(response.data.name);
        });
    });
  }

  public static async unbindArmy(
    bindTargetDiscordId: string,
    armyName: string,
  ): Promise<string> {
    return new Promise((resolve) => {
      axios
        .patch(
          this.getBaseUrl() + "/army/unbind",
          {
            executorDiscordId: usePlayerStore().discordId,
            targetDiscordId: bindTargetDiscordId,
            armyName: armyName,
          },
          {
            headers: {},
          },
        )
        .then((response) => {
          resolve(response.data.name);
        });
    });
  }

  public static async stationArmy(
    claimbuildName: string,
    armyName: string,
  ): Promise<string> {
    return new Promise((resolve) => {
      axios
        .patch(
          this.getBaseUrl() + "/army/station",
          {
            executorDiscordId: usePlayerStore().discordId,
            claimbuildName: claimbuildName,
            armyName: armyName,
          },
          {
            headers: {},
          },
        )
        .then((response) => {
          resolve(response.data.name);
        });
    });
  }

  public static async unstationArmy(
    claimbuildName: string,
    armyName: string,
  ): Promise<string> {
    return new Promise((resolve) => {
      axios
        .patch(
          this.getBaseUrl() + "/army/unstation",
          {
            executorDiscordId: usePlayerStore().discordId,
            claimbuildName: claimbuildName,
            armyName: armyName,
          },
          {
            headers: {},
          },
        )
        .then((response) => {
          resolve(response.data.name);
        });
    });
  }
}
