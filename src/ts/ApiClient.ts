import axios from "axios";
import { useFactionsStore, usePlayerStore } from "@/stores/generalInfoStores";
import { PlayerInfo } from "@/ts/types/PlayerInfo";

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
      if (factionsStore.factions.length > 0) resolve(factionsStore.factions);
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

  static async loadPlayerInfo(discordId: string): Promise<PlayerInfo> {
    console.log("Loading player info for " + discordId);
    const playerStore = usePlayerStore();
    return new Promise((resolve) => {
      if (playerStore.discordId !== "") resolve(playerStore);
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
          playerStore.isStaff = true;
          console.log("Loaded player info from server", playerStore);
          resolve(playerStore);
        });
    });
  }

  static async loadClaimbuildTypes(): Promise<string[]> {
    return ["Something here"];
  }
}
