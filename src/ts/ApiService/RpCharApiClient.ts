import { useRpCharStore } from "@/stores/rpcharStores";
import { RoleplayCharacter } from "../types/RoleplayCharacter";
import { ApiClient } from "./ApiClient";
import axios from "axios";
import { usePlayerStore } from "@/stores/playerStores";

export class RpCharApiClient extends ApiClient {
  public static loadAllRpChars(): Promise<RoleplayCharacter[]> {
    const rpCharStore = useRpCharStore();
    const requestKey = "loadAllRpChars";

    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey)!;
    }

    const request = new Promise<RoleplayCharacter[]>((resolve) => {
      if (rpCharStore.allRpChars.length > 0) {
        resolve(rpCharStore.allRpChars);
        return;
      }

      axios
        .get(this.getBaseUrl() + "/rpchars?size=1000")
        .then((response) => {
          response.data.content.forEach((rpChar: any) => {
            const mappedChar: RoleplayCharacter = {
              discordId: rpChar.ownerId,
              faction: rpChar.ownerFaction,
              ign: rpChar.ownerIgn,
              rpChar: {
                boundTo: rpChar.boundTo,
                stationedAt: rpChar.stationedAt,
                currentRegion: rpChar.currentRegion,
                gear: rpChar.gear,
                healEnds: rpChar.healEnds,
                injured: rpChar.injured,
                isHealing: rpChar.isHealing,
                name: rpChar.name,
                pvp: rpChar.pvp,
                startedHeal: rpChar.startedHeal,
                title: rpChar.title,
                // TODO: Add correct rank when it's implemented in the API
                rank: "Member",
              },
            };
            rpCharStore.allRpChars.push(mappedChar);
          });
          resolve(rpCharStore.allRpChars);
        })
        .finally(() => {
          this.pendingRequests.delete(requestKey);
        });
    });

    this.pendingRequests.set(requestKey, request);
    return request;
  }

  public static loadRpCharsByNames(
    names: string[],
  ): Promise<RoleplayCharacter[]> {
    const rpCharStore = useRpCharStore();
    const requestKey = "loadRpCharsByNames";

    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey)!;
    }

    const request = new Promise<RoleplayCharacter[]>((resolve) => {
      // Prepare arrays to hold characters that are already loaded and those to be fetched
      const alreadyLoadedChars: RoleplayCharacter[] = [];
      const charactersToFetch: string[] = [];

      // Check which characters are already loaded and which need to be fetched
      names.forEach((name) => {
        // Iterate through the objects in the store and check if the name matches
        // If it does, add it to the already loaded characters
        // If we already loaded all characters, we don't need to fetch them again
        let foundCharacter: RoleplayCharacter | undefined;
        if (rpCharStore.allRpChars.length > 0) {
          foundCharacter = rpCharStore.allRpChars.find(
            (character) => character.rpChar.name === name,
          );
        } else {
          foundCharacter = rpCharStore.loadedSpecificRpChars.find(
            (character) => character.rpChar.name === name,
          );
        }
        if (foundCharacter) {
          alreadyLoadedChars.push(foundCharacter);
        } else {
          // If not already loaded, add to charactersToFetch array
          charactersToFetch.push(name);
        }
      });

      // If charactersToFetch array is not empty, we fetch those characters
      if (charactersToFetch.length > 0) {
        const nameParams = charactersToFetch.join(`&name=`);

        // Send a GET request to fetch characters by name
        axios
          .get(this.getBaseUrl() + `/rpchars/name?name=${nameParams}`)
          .then((response) => {
            response.data.forEach((rpChar: any) => {
              const mappedChar: RoleplayCharacter = {
                discordId: rpChar.ownerId,
                faction: rpChar.ownerFaction,
                ign: rpChar.ownerIgn,
                rpChar: {
                  boundTo: rpChar.boundTo,
                  stationedAt: rpChar.stationedAt,
                  currentRegion: rpChar.currentRegion,
                  gear: rpChar.gear,
                  healEnds: rpChar.healEnds,
                  injured: rpChar.injured,
                  isHealing: rpChar.isHealing,
                  name: rpChar.name,
                  pvp: rpChar.pvp,
                  startedHeal: rpChar.startedHeal,
                  title: rpChar.title,
                  // TODO: Add correct rank when it's implemented in the API
                  rank: "Member",
                },
              };
              rpCharStore.loadedSpecificRpChars.push(mappedChar);
              alreadyLoadedChars.push(mappedChar);
            });

            resolve(alreadyLoadedChars);
            return;
          })
          .finally(() => {
            this.pendingRequests.delete(requestKey);
          });
      } else {
        // If no characters need to be fetched, resolve the promise with already loaded characters
        resolve(alreadyLoadedChars);
        return;
      }
    });

    this.pendingRequests.set(requestKey, request);
    return request;
  }

  public static async stationCharacter(
    claimbuildName: string,
    characterName: string,
  ): Promise<string> {
    return new Promise((resolve) => {
      axios
        .patch(
          this.getBaseUrl() + "/rpchars/station",
          {
            executorDiscordId: usePlayerStore().discordId,
            claimbuildName: claimbuildName,
            characterName: characterName,
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

  public static async unstationCharacter(
    characterName: string,
  ): Promise<string> {
    return new Promise((resolve) => {
      axios
        .patch(
          this.getBaseUrl() + "/rpchars/unstation",
          {
            executorDiscordId: usePlayerStore().discordId,
            characterName: characterName,
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
