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
