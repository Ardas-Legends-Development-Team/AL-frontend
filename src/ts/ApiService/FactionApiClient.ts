import axios from "axios";
import { useFactionsStore } from "@/stores/generalInfoStores";
import { Faction } from "@/ts/types/Faction";
import { ApiClient } from "@/ts/ApiService/ApiClient";
import { usePlayerStore } from "@/stores/playerStores";

export class FactionApiClient extends ApiClient {
  public static async loadFactions(): Promise<Faction[]> {
    const factionsStore = useFactionsStore();
    return new Promise((resolve) => {
      if (factionsStore.factions.length > 0) {
        resolve(factionsStore.factions);
        return;
      }
      this.loadFactionsDataIntoStore().then(() => {
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
      this.loadFactionsDataIntoStore().then(() => {
        resolve(factionsStore.factionNames.sort());
      });
    });
  }

  public static async loadFactionLeaders(): Promise<string[]> {
    const factionsStore = useFactionsStore();
    return new Promise((resolve) => {
      if (factionsStore.factions.length > 0) {
        resolve(factionsStore.factionLeaders);
        return;
      }
      this.loadFactionsDataIntoStore().then(() => {
        resolve(factionsStore.factionLeaders);
      });
    });
  }

  public static async loadPlayerFaction(): Promise<Faction> {
    const factionsStore = useFactionsStore();
    return new Promise((resolve) => {
      if (factionsStore.factions.length > 0) {
        resolve(factionsStore.playerFaction);
        return;
      }
      this.loadFactionsDataIntoStore().then(() => {
        resolve(factionsStore.playerFaction);
      });
    });
  }

  private static async loadFactionsDataIntoStore(): Promise<void> {
    const factionsStore = useFactionsStore();
    const requestKey = "loadFactionsDataIntoStore";

    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey);
    }

    const request = new Promise<void>((resolve) => {
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
            factionsStore.factionLeaders.push(faction.leaderIgn);

            if (faction.nameOfFaction === usePlayerStore().faction) {
              factionsStore.playerFaction = faction;
              // Check if the player is leader of the faction
              if (faction.leaderIgn === usePlayerStore().ign) {
                factionsStore.isPlayerFactionLeader = true;
              }
            }
          });
          resolve();
        })
        .finally(() => {
          this.pendingRequests.delete(requestKey);
        });
    });

    this.pendingRequests.set(requestKey, request);
    return request;
  }
}
