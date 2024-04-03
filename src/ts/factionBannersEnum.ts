/*eslint-disable*/
export enum FactionBannersEnum {
  ANGMAR = "/images/banners/Angmar_Banner.png",
  ERED_LUIN = "/images/banners/Blue_Mountains_Banner.png",
  BREE = "/images/banners/Bree-land_Banner-0.webp",
  DALE = "/images/banners/Dale_Banner.png",
  DOL_AMROTH = "/images/banners/Dol_Amroth_Banner.png",
  DOL_GULDUR = "/images/banners/Dol_Guldur_Banner.png",
  DORWINION = "/images/banners/Dorwinion_Banner.png",
  DUNLAND = "/images/banners/Dunland_Banner.png",
  DURINS_FOLK = "/images/banners/Dwarf_Banner.png",
  RHUDEL = "/images/banners/Easterling_Banner.png",
  LOTHLORIEN = "/images/banners/Galadhrim_Banner.png",
  GONDOR = "/images/banners/Gondor_Banner.png",
  GULF_OF_HARAD = "/images/banners/Gulf_of_Harad_Banner.png",
  GUNDABAD = "/images/banners/Gundabad_Banner.png",
  HALF_TROLLS = "/images/banners/Half-troll_Banner.png",
  LINDON = "/images/banners/High_Elf_Banner.png",
  HOBBITS = "/images/banners/Hobbit_Banner.png",
  MORDOR = "/images/banners/Mordor_Banner.png",
  MORWAITH = "/images/banners/Morwaith_Banner.png",
  HARNENNOR = "/images/banners/Near_Harad_Banner.png",
  RANGERS_OF_THE_NORTH = "/images/banners/Ranger_Banner.png",
  RIVENDELL = "/images/banners/Rivendell_Banner.webp",
  ROHAN = "/images/banners/Rohan_Banner.png",
  NOMADS = "/images/banners/Southron_Nomads_Banner.png",
  TAURETHRIM = "/images/banners/Taurethrim_Banner.png",
  UMBAR = "/images/banners/Umbar_Banner.png",
  ISENGARD = "/images/banners/Uruk_Banner.png",
  WANDERER = "/images/banners/Wanderer_Banner.png",
  WOODLAND_REALM = "/images/banners/Wood-Elf_Banner.png",
  SOUTHRON_COAST = "/images/banners/Near_Harad_Banner.png",
}

export function factionNameToBanner(faction: string): string {
  // Remove accents from letters
  let factionFormatted = faction
    .replace(new RegExp(/[òóôõö]/g), "o")
    .replace(new RegExp(/[ùúûü]/g), "u");
  // Replace spaces, dashes and apostrophes with underscores
  factionFormatted = factionFormatted
    .toUpperCase()
    .replace(/[-| ]/g, "_")
    .replace(/['"`]/g, "");
  return FactionBannersEnum[
    factionFormatted as keyof typeof FactionBannersEnum
  ];
}

export function factionNamesToBannerMap(names: string[]): Map<string, string> {
  const factionsUnique = names.filter((faction, pos) => {
    return names.indexOf(faction) === pos;
  });
  const returnedMap = new Map<string, string>();
  factionsUnique.forEach((faction) => {
    returnedMap.set(faction, factionNameToBanner(faction));
  });

  return returnedMap;
}
