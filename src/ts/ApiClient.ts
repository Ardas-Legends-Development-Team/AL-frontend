import axios from "axios";
import { useFactionsStore } from "@/stores/generalInfoStores";
import { useCharacterStore, usePlayerStore } from "@/stores/playerStores";
import { PlayerInfo } from "@/ts/types/PlayerInfo";
import { CharacterInfo } from "@/ts/types/CharacterInfo";

export default class ApiClient {
  static registerPlayer(
    discordId: string,
    ign: string,
    faction: string
  ): Promise<boolean> {
    console.log(
      "Registering player " + ign,
      " with faction " + faction,
      " and discord id " + discordId
    );
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:8080/api/player", {
          discordID: discordId,
          ign: ign,
          faction: faction,
        })
        .then(() => resolve(true))
        .catch((reason) => {
          console.error(reason);
          reject(false);
        });
    });
  }

  static async loadFactions(): Promise<string[]> {
    const factionsStore = useFactionsStore();
    return new Promise((resolve) => {
      if (factionsStore.factions.length > 0) {
        console.log("Factions already loaded");
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
          response.data.content.forEach((faction: any) => {
            factionsStore.factions.push(faction.nameOfFaction);
          });
          resolve(factionsStore.factions);
        });
    });
  }

  static async loadPlayerInfo(discordId?: string): Promise<PlayerInfo> {
    if (discordId !== undefined) {
      return new Promise((resolve) => {
        this.loadPlayerCharacterInfoFromAPI(discordId).then(() => {
          resolve(usePlayerStore());
        });
      });
    }
    return usePlayerStore();
  }

  static async loadCharacterInfo(discordId?: string): Promise<CharacterInfo> {
    if (discordId !== undefined) {
      return new Promise((resolve) => {
        this.loadPlayerCharacterInfoFromAPI(discordId).then(() => {
          resolve(useCharacterStore());
        });
      });
    }
    return useCharacterStore();
  }

  static async loadClaimbuildTypes(): Promise<string[]> {
    return ["Something here"];
  }

  /**
   * Loads player and then character info from the API and stores it in the player store and
   * character store. If the player info is already loaded, it will not load it again.
   * @param discordId
   */
  private static async loadPlayerCharacterInfoFromAPI(
    discordId: string
  ): Promise<boolean> {
    console.log("Loading player info for " + discordId);
    const playerStore = usePlayerStore();
    return new Promise((resolve) => {
      if (playerStore.discordId !== "") {
        console.log("Player info already loaded");
        resolve(true);
        return;
      }
      console.log("Loading player info from server");
      axios
        .get("http://localhost:8080/api/player/discordid/" + discordId)
        .then((response) => {
          const data = response.data;
          playerStore.ign = data.ign;
          playerStore.faction = data.faction;
          playerStore.discordId = data.discordId;
          // TODO: Replace with proper staff check
          //playerStore.isStaff = data.isStaff;
          playerStore.isStaff = false;
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
          console.log("Loaded player info from server", playerStore);
          resolve(true);
          return;
        });
    });
  }
}
