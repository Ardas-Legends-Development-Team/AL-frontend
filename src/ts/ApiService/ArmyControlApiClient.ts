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
        .post(
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
        .post(
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
}
