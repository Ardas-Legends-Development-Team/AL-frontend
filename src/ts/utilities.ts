import { PlayerApiClient } from "@/ts/ApiService/PlayerApiClient";
import { ArmyApiClient } from "@/ts/ApiService/ArmyApiClient";
import { Army } from "@/ts/types/Army";
import { RpCharApiClient } from "@/ts/ApiService/RpCharApiClient";

/**
 *  For a given faction name, returns true if the faction is evil.
 * @param factionName
 */
export function isFactionEvil(factionName: string): boolean {
  // Remove accents from letters
  let factionFormatted = factionName
    .replace(new RegExp(/[òóôõö]/g), "o")
    .replace(new RegExp(/[ùúûü]/g), "u");
  // Replace spaces, dashes and apostrophes with underscores
  factionFormatted = factionFormatted
    .toUpperCase()
    .replace(/[-| ]/g, "_")
    .replace(/['"`]/g, "");
  // Check if the string is inside the array of evil factions
  const factions = [
    "ANGMAR",
    "DOL_GULDUR",
    "DUNLAND",
    "GUNDABAD",
    "ISENGARD",
    "MORDOR",
    "RHUDEL",
    "GULF_OF_HARAD",
    "HALF_TROLLS",
    "UMBAR",
    "MORWAITH",
    "HARNENNOR",
    "NOMADS",
    "SOUTHRON_COAST",
  ];
  return factions.includes(factionFormatted);
}

export function formatDateArrayToString(dateArray: number[]): string {
  return `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`;
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function getArmyBoundToPlayer(discordId: string): string {
  PlayerApiClient.loadCharacterInfo(discordId).then((characterInfo) => {
    return characterInfo.boundTo;
  });
  return "Error";
}

export function getPlayerBoundToArmy(armyName: string): string {
  ArmyApiClient.loadArmies().then((armies) => {
    const army = armies.find((army: Army) => army.nameOfArmy === armyName);
    return army?.boundTo;
  });
  return "Error";
}

export function getDiscordIdFromCharacterName(characterName: string): string {
  RpCharApiClient.loadRpCharsByNames([characterName]).then((characters) => {
    const character = characters.find(
      (character) => character.rpChar.name === characterName,
    );
    return character?.discordId;
  });
  return "Error";
}
