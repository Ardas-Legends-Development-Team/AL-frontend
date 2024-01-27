import { ApiClient } from "@/ts/ApiService/ApiClient";
import axios from "axios";
import { usePlayerStore } from "@/stores/playerStores";
import { MovementResponse } from "@/ts/types/ApiResponseTypes/MovementResponse";

export class MovementApiClient extends ApiClient {
  public static async moveCharacter(
    destinationRegionId: string,
  ): Promise<MovementResponse> {
    return new Promise((resolve) => {
      axios
        .post(
          this.getBaseUrl() + "/movement/move-char",
          {
            discordId: usePlayerStore().discordId,
            toRegion: destinationRegionId,
          },
          {
            headers: {},
          },
        )
        .then((response) => {
          resolve(response.data);
        });
    });
  }

  public static async moveArmyOrCompany(
    destinationRegionId: string,
    armyName: string,
  ): Promise<MovementResponse> {
    return new Promise((resolve) => {
      axios
        .post(
          this.getBaseUrl() + "/movement/move-army-or-company",
          {
            executorDiscordId: usePlayerStore().discordId,
            armyName: armyName,
            toRegion: destinationRegionId,
          },
          {
            headers: {},
          },
        )
        .then((response) => {
          resolve(response.data);
        });
    });
  }

  public static async cancelCharacterMovement(
    targetDiscordId: string,
  ): Promise<MovementResponse> {
    return new Promise((resolve) => {
      axios
        .patch(
          this.getBaseUrl() + "/movement/cancel-char-move",
          {
            discordId: targetDiscordId,
          },
          {
            headers: {},
          },
        )
        .then((response) => {
          resolve(response.data);
        });
    });
  }

  public static async calculateCharacterPath(
    discordId: string,
    destinationRegionId: string,
  ): Promise<MovementResponse> {
    return new Promise((resolve) => {
      axios
        .get(this.getBaseUrl() + "/movement/calculate/char", {
          params: {
            discordId: discordId,
            toRegion: destinationRegionId,
          },
        })
        .then((response) => {
          resolve(response.data);
        });
    });
  }

  public static async calculateArmyPath(
    discordId: string,
    armyName: string,
    destinationRegionId: string,
  ): Promise<MovementResponse> {
    return new Promise((resolve) => {
      axios
        .get(this.getBaseUrl() + "/movement/calculate/army", {
          params: {
            discordId: discordId,
            armyName: armyName,
            toRegion: destinationRegionId,
          },
        })
        .then((response) => {
          resolve(response.data);
        });
    });
  }
}
