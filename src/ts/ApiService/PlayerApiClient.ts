import axios from "axios";
import { useCharacterStore, usePlayerStore } from "@/stores/playerStores";
import { PlayerInfo } from "@/ts/types/PlayerInfo";
import { CharacterInfo } from "@/ts/types/RoleplayCharacter";
import { ApiClient } from "@/ts/ApiService/ApiClient";
import { PlayerRpCharResponse } from "@/ts/types/ApiResponseTypes/PlayerRpCharResponse";

export class PlayerApiClient extends ApiClient {
  public static registerPlayer(
    discordId: string,
    ign: string,
    faction: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      axios
        .post(this.getBaseUrl() + "/player", {
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
    discordId?: string,
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

  /**
   * Loads player and then character info from the API and stores it in the player store and
   * character store. If the player info is already loaded, it will not load it again.
   * @param discordId
   */
  private static async loadPlayerCharacterInfoFromAPI(
    discordId: string,
  ): Promise<boolean> {
    const playerStore = usePlayerStore();
    return new Promise((resolve) => {
      if (playerStore.discordId !== "") {
        resolve(true);
        return;
      }
      axios
        .get(this.getBaseUrl() + "/player/discordid/" + discordId)
        .then((response) => {
          console.log(response.data);
          const data: PlayerRpCharResponse = response.data;
          playerStore.ign = data.ign;
          playerStore.faction = data.faction;
          playerStore.discordId = data.discordId;
          playerStore.roles = data.roles;
          playerStore.isStaff = data.roles.includes("ROLE_STAFF");
          // Load character info
          if (data.rpChar !== null) {
            const characterStore = useCharacterStore();
            characterStore.name = data.rpChar.name;
            characterStore.title = data.rpChar.title;
            characterStore.gear = data.rpChar.gear;
            characterStore.pvp = data.rpChar.pvp;
            characterStore.currentRegion = data.rpChar.currentRegion;
            characterStore.boundTo =
              data.rpChar.boundTo === null
                ? "Not bound to entity"
                : data.rpChar.boundTo;
            characterStore.stationedAt =
              data.rpChar.stationedAt === null
                ? "Not stationed at entity"
                : data.rpChar.stationedAt;
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

  /**
   * Used when searching for a player by their IGN
   * @param ign
   */
  public static async loadPlayerInfoFromIgn(ign: string): Promise<PlayerInfo> {
    return new Promise((resolve) => {
      axios.get(this.getBaseUrl() + "/player/ign/" + ign).then((response) => {
        const data = response.data;
        const playerInfo: PlayerInfo = {
          ign: data.ign,
          faction: data.faction,
          discordId: data.discordId,
          isStaff: data.isStaff,
        };
        resolve(playerInfo);
      });
    });
  }
}
