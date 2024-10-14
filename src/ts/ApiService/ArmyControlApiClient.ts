import { ApiClient } from "@/ts/ApiService/ApiClient";
import axios from "axios";
import { usePlayerStore } from "@/stores/playerStores";
import { Unit } from "@/ts/types/Unit";

export class ArmyControlApiClient extends ApiClient {
  public static async createArmy(
    armyName: string,
    armyType: string,
    claimbuildName: string,
    units: Unit[],
  ): Promise<string> {
    return new Promise((resolve) => {
      axios
        .post(
          this.getBaseUrl() + "/army/create-army",
          {
            executorDiscordId: usePlayerStore().discordId,
            name: armyName,
            armyType: armyType,
            claimBuildName: claimbuildName,
            units: units,
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

  public static async disbandArmy(armyName: string): Promise<string> {
    return new Promise((resolve) => {
      axios
        .delete(this.getBaseUrl() + "/army/disband", {
          params: {
            executorDiscordId: usePlayerStore().discordId,
            armyName: armyName,
          },
        })
        .then((response) => {
          resolve(response.data.name);
        });
    });
  }

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

  public static async unstationArmy(armyName: string): Promise<string> {
    return new Promise((resolve) => {
      axios
        .patch(
          this.getBaseUrl() + "/army/unstation",
          {
            executorDiscordId: usePlayerStore().discordId,
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
