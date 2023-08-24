import { useRpCharStore } from "@/stores/rpcharStores";
import { RoleplayCharacter } from "../types/RoleplayCharacter";
import { ApiClient } from "./ApiClient";
import axios from "axios";

export class RpCharApiClient extends ApiClient {
  public static loadAllRpChars(): Promise<RoleplayCharacter[]> {
    const rpCharStore = useRpCharStore();
    return new Promise((resolve) => {
      if (rpCharStore.allRpChars.length > 0) {
        resolve(rpCharStore.allRpChars);
        return;
      }

      axios.get(this.getBaseUrl() + "/rpchars?size=100").then((response) => {
        response.data.content.forEach((rpChar: any) => {
          const mappedChar: RoleplayCharacter = {
            discordId: rpChar.ownerId,
            faction: rpChar.ownerFaction,
            ign: rpChar.ownerIgn,
            rpChar: {
              boundTo: rpChar.boundTo,
              currentRegion: rpChar.currentRegion,
              gear: rpChar.gear,
              healEnds: rpChar.healEnds,
              injured: rpChar.injured,
              isHealing: rpChar.isHealing,
              name: rpChar.name,
              pvp: rpChar.pvp,
              startedHeal: rpChar.startedHeal,
              title: rpChar.title,
            },
          };
          rpCharStore.allRpChars.push(mappedChar);
        });
        resolve(rpCharStore.allRpChars);
      });
    });
  }

  public static loadRpCharsByNames(
    names: string[],
  ): Promise<RoleplayCharacter[]> {
    const rpCharStore = useRpCharStore();
    return new Promise((resolve) => {
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
                  currentRegion: rpChar.currentRegion,
                  gear: rpChar.gear,
                  healEnds: rpChar.healEnds,
                  injured: rpChar.injured,
                  isHealing: rpChar.isHealing,
                  name: rpChar.name,
                  pvp: rpChar.pvp,
                  startedHeal: rpChar.startedHeal,
                  title: rpChar.title,
                },
              };
              rpCharStore.loadedSpecificRpChars.push(mappedChar);
              alreadyLoadedChars.push(mappedChar);
            });

            resolve(alreadyLoadedChars);
            return;
          });
      } else {
        // If no characters need to be fetched, resolve the promise with already loaded characters
        resolve(alreadyLoadedChars);
        return;
      }
    });
  }
}
