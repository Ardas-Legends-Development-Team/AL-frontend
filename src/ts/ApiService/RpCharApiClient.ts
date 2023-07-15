import { useRpCharStore } from "@/stores/rpcharStores";
import { RoleplayCharacter } from "../types/RoleplayCharacter";
import { ApiClient } from "./ApiClient"
import axios from "axios";

export class RpCharApiClient extends ApiClient {


    public static loadAllRpChars(): Promise<RoleplayCharacter[]> {
        const rpCharStore = useRpCharStore();
        return new Promise((resolve) => {
            if(rpCharStore.rpChars.length > 0) {
                resolve(rpCharStore.rpChars);
                return;
            }

            axios
              .get(this.getBaseUrl() + "/rpchars?size=100")
              .then((response) => {
                console.log(response.data);
                
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
                            title: rpChar.title
                        }
                    };
                    rpCharStore.rpChars.push(mappedChar)
                });;
                resolve(rpCharStore.rpChars);
              })
        })
    }
}