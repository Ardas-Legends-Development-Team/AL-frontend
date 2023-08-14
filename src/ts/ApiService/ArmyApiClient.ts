import axios from "axios";

import { Army } from "@/ts/types/Army";
import { ApiClient } from "@/ts/ApiService/ApiClient";

export class ArmyApiClient extends ApiClient {
  public static async loadArmies(): Promise<Army[]> {
    return new Promise((resolve) => {
      axios.get(this.getBaseUrl() + "/army?size=100").then((response) => {
        const armies: Army[] = [];
        armies.push(
          {
            id: 1,
            nameOfArmy: "First Brigade",
            armyType: "Infantry",
            nameOfFaction: "Faction A",
            currentRegion: "North",
          },
          {
            id: 2,
            nameOfArmy: "Second Squadron",
            armyType: "Air Force",
            nameOfFaction: "Faction B",
            currentRegion: "East",
          },
          {
            id: 3,
            nameOfArmy: "Third Division",
            armyType: "Cavalry",
            nameOfFaction: "Faction C",
            currentRegion: "West",
          },
          {
            id: 4,
            nameOfArmy: "Fourth Battalion",
            armyType: "Artillery",
            nameOfFaction: "Faction D",
            currentRegion: "South",
          },
          {
            id: 5,
            nameOfArmy: "Fifth Fleet",
            armyType: "Navy",
            nameOfFaction: "Faction E",
            currentRegion: "Central",
          },
          {
            id: 6,
            nameOfArmy: "Sixth Armada",
            armyType: "Navy",
            nameOfFaction: "Faction F",
            currentRegion: "Northern Sea",
          },
          {
            id: 7,
            nameOfArmy: "Seventh Brigade",
            armyType: "Infantry",
            nameOfFaction: "Faction G",
            currentRegion: "Mountain Region",
          },
          {
            id: 8,
            nameOfArmy: "Eighth Squadron",
            armyType: "Air Force",
            nameOfFaction: "Faction H",
            currentRegion: "Desert Region",
          },
          {
            id: 9,
            nameOfArmy: "Ninth Division",
            armyType: "Mechanized",
            nameOfFaction: "Faction I",
            currentRegion: "Suburb Area",
          },
          {
            id: 10,
            nameOfArmy: "Tenth Battalion",
            armyType: "Artillery",
            nameOfFaction: "Faction J",
            currentRegion: "Rural Zone",
          },
          {
            id: 11,
            nameOfArmy: "Eleventh Fleet",
            armyType: "Navy",
            nameOfFaction: "Faction K",
            currentRegion: "Southern Sea",
          },
          {
            id: 12,
            nameOfArmy: "Twelfth Brigade",
            armyType: "Infantry",
            nameOfFaction: "Faction L",
            currentRegion: "Urban Region",
          },
          {
            id: 13,
            nameOfArmy: "Thirteenth Squadron",
            armyType: "Air Force",
            nameOfFaction: "Faction M",
            currentRegion: "Island Region",
          },
          {
            id: 14,
            nameOfArmy: "Fourteenth Division",
            armyType: "Cavalry",
            nameOfFaction: "Faction N",
            currentRegion: "Forest Area",
          },
          {
            id: 15,
            nameOfArmy: "Fifteenth Battalion",
            armyType: "Artillery",
            nameOfFaction: "Faction O",
            currentRegion: "Lake Region",
          },
        );
        //resolve(response.data.content);
        resolve(armies);
      });
    });
  }
}
