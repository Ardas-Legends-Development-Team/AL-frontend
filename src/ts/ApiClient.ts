import axios from "axios";
import { useFactionsStore, usePlayerStore } from "@/stores/generalInfoStores";

export default class ApiClient {
  static registerPlayer(discordId: string, ign: string, faction: string): void {
    console.log(
      "Registering player " + ign,
      " with faction " + faction,
      " and discord id " + discordId
    );
    axios
      .post("http://localhost:8080/api/player", {
        discordID: discordId,
        ign: ign,
        faction: faction,
      })
      .then(() => console.log("Registered player" + ign))
      .catch((reason) => {
        console.log(reason);
      });
  }

  static loadFactions(): void {
    const factionsStore = useFactionsStore();
    if (factionsStore.factions.length > 0) return;
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
      });
  }

  static async loadPlayerInfo(discordId: string): Promise<void> {
    console.log("Loading player info for " + discordId);
    const playerStore = usePlayerStore();
    if (playerStore.discordId !== "") return;
    await axios
      .get("http://localhost:8080/api/player", {
        params: {
          discordID: discordId,
        },
      })
      .then((response) => {
        playerStore.ign = response.data.ign;
        playerStore.faction = response.data.faction;
        playerStore.discordId = response.data.discordID;
      });
  }
}
