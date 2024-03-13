import { PlayerApiClient } from "@/ts/ApiService/PlayerApiClient";
import { ArmyApiClient } from "@/ts/ApiService/ArmyApiClient";
import { Army } from "@/ts/types/Army";
import { RpCharApiClient } from "@/ts/ApiService/RpCharApiClient";
import { War } from "@/ts/types/War";
import { WarApiClient } from "@/ts/ApiService/WarApiClient";

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

export async function getArmyBoundToPlayer(discordId: string): Promise<string> {
  const characterInfo = await PlayerApiClient.loadCharacterInfo(discordId);
  return characterInfo.boundTo;
}

export async function getPlayerBoundToArmy(armyName: string): Promise<string> {
  const armies = await ArmyApiClient.loadArmies();
  const army = armies.find((army: Army) => army.nameOfArmy === armyName);
  if (!army) {
    return "";
  }
  return army.boundTo;
}

export async function getDiscordIdFromCharacterName(
  characterName: string,
): Promise<string> {
  // TODO: for the love of god optimize this from the API side because there's too much overhead
  const characters = await RpCharApiClient.loadRpCharsByNames([characterName]);
  const discordId = await PlayerApiClient.loadPlayerInfoFromIgn(
    characters[0].ign,
  );
  return discordId.discordId;
}

export function formatDateString(dateString: string): string {
  const splitString = dateString.split("T");
  const date = splitString[0];
  const time = splitString[1].split(".")[0];
  return date + " " + time;
}

export async function getEnemiesOfFaction(
  factionName: string,
): Promise<string[]> {
  const wars = await WarApiClient.loadWars();

  // Get all wars where the faction is involved and save the camp (defender or attacker)
  let enemies: string[] = [];
  wars.forEach((war: War) => {
    if (war.agressors.includes(factionName)) {
      enemies = [...war.defenders];
    } else if (war.defenders.includes(factionName)) {
      enemies = [...war.agressors];
    }
  });
  return new Promise((resolve) => {
    resolve(enemies);
  });
}
