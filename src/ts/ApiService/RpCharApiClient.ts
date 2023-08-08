import { useRpCharStore } from "@/stores/rpcharStores";
import { RoleplayCharacter } from "../types/RoleplayCharacter";
import { ApiClient } from "./ApiClient";
import axios from "axios";

export class RpCharApiClient extends ApiClient {
  public static loadAllRpChars(): Promise<RoleplayCharacter[]> {
    const rpCharStore = useRpCharStore();
    return new Promise((resolve) => {
      if (rpCharStore.rpChars.length > 0) {
        resolve(rpCharStore.rpChars);
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
          rpCharStore.rpChars.push(mappedChar);
        });
        resolve(rpCharStore.rpChars);
      });
    });
  }

  public static loadRpCharsByNames(
    names: string[],
  ): Promise<RoleplayCharacter[]> {
    const rpCharStore = useRpCharStore();
    return new Promise((resolve) => {
      const loadedCharNames: string[] = rpCharStore.rpChars.map(
        (rp) => rp.rpChar.name,
      );
      const alreadyLoadedChars: RoleplayCharacter[] = [];
      const charsToFetch: string[] = [];

      names.forEach((name) => {
        const index = loadedCharNames.indexOf(name);
        if (index !== -1) {
          alreadyLoadedChars.push(
            rpCharStore.rpChars.at(index) as RoleplayCharacter,
          );
        } else charsToFetch.push(name);
      });

      if (charsToFetch.length > 0) {
        const nameParams = charsToFetch.join(`&name=`);
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
              rpCharStore.rpChars.push(mappedChar);
              alreadyLoadedChars.push(mappedChar);
            });

            resolve(alreadyLoadedChars);
            return;
          });
      } else {
        resolve(alreadyLoadedChars);
        return;
      }
    });
  }
}
