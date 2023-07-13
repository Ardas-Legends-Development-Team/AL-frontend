/*eslint-disable*/
export enum FactionBannersEnum {
  ANGMAR = "https://cdn.discordapp.com/attachments/1021694169846140959/1021694225689100288/Angmar_Banner.PNG.png",
  ERED_LUIN = "https://cdn.discordapp.com/attachments/1021694169846140959/1021694308799229973/Blue_Mountains_Banner.PNG.png",
  BREE = "https://cdn.discordapp.com/attachments/1021694169846140959/1092095227684212858/Bree-land_Banner-0.webp",
  DALE = "https://cdn.discordapp.com/attachments/1021694169846140959/1021694547836813312/Dale_Banner.PNG.png",
  DOL_AMROTH = "https://cdn.discordapp.com/attachments/1021694169846140959/1021694648114221088/Dol_Amroth_Banner.PNG.png",
  DOL_GULDUR = "https://cdn.discordapp.com/attachments/1021694169846140959/1021694718075228160/Dol_Guldur_Banner.PNG.png",
  DORWINION = "https://cdn.discordapp.com/attachments/1021694169846140959/1021694778141835304/Dorwinion_Banner.PNG.png",
  DUNLAND = "https://cdn.discordapp.com/attachments/1021694169846140959/1021694814003146764/Dunland_Banner.PNG.png",
  DURINS_FOLK = "https://cdn.discordapp.com/attachments/1021694169846140959/1021700601844875294/Dwarf_Banner.PNG.png",
  RHUDEL = "https://cdn.discordapp.com/attachments/1021694169846140959/1021700693318438932/Easterling_Banner.png",
  LOTHLORIEN = "https://cdn.discordapp.com/attachments/1021694169846140959/1021700718375215104/Galadhrim_Banner.PNG.png",
  GONDOR = "https://cdn.discordapp.com/attachments/1021694169846140959/1021700747718574120/Gondor_Banner.PNG.png",
  GULF_OF_HARAD = "https://cdn.discordapp.com/attachments/1021694169846140959/1021700850814566430/Gulf_of_Harad_Banner.PNG.png",
  GUNDABAD = "https://cdn.discordapp.com/attachments/1021694169846140959/1021700866023112754/Gundabad_Banner.PNG.png",
  HALF_TROLLS = "https://cdn.discordapp.com/attachments/1021694169846140959/1021700896909967380/Half-troll_Banner.PNG.png",
  LINDON = "https://cdn.discordapp.com/attachments/1021694169846140959/1021700936923623484/High_Elf_Banner.PNG.png",
  HOBBITS = "https://cdn.discordapp.com/attachments/1021694169846140959/1021700944385277972/Hobbit_Banner.PNG.png",
  MORDOR = "https://cdn.discordapp.com/attachments/1021694169846140959/1021700959694508142/Mordor_Banner.PNG.png",
  MORWAITH = "https://cdn.discordapp.com/attachments/1021694169846140959/1021701061452513350/Moredain_Banner.PNG.png",
  HARNENNOR = "https://cdn.discordapp.com/attachments/1021694169846140959/1021701068893196338/Near_Harad_Banner.PNG.png",
  RANGERS_OF_THE_NORTH = "https://cdn.discordapp.com/attachments/1021694169846140959/1021701100476309544/Ranger_Banner.PNG.png",
  RIVENDELL = "https://media.discordapp.net/attachments/1021694169846140959/1092095438158577835/Rivendell_Banner.webp",
  ROHAN = "https://cdn.discordapp.com/attachments/1021694169846140959/1021701256814809130/Rohan_Banner.PNG.png",
  NOMADS = "https://cdn.discordapp.com/attachments/1021694169846140959/1021701339182538812/Southron_Nomads_Banner.PNG_1.png",
  TAURETHRIM = "https://media.discordapp.net/attachments/1021694169846140959/1021701993787576320/Tauredain_Banner.PNG.png",
  UMBAR = "https://cdn.discordapp.com/attachments/1021694169846140959/1021702356359970887/Umbar_Banner.PNG.png",
  ISENGARD = "https://cdn.discordapp.com/attachments/1021694169846140959/1021702402518290462/Uruk_Banner.PNG.png",
  WANDERER = "https://cdn.discordapp.com/attachments/1021694169846140959/1021702509275926598/Wanderer_Banner.png",
  WOODLAND_REALM = "https://cdn.discordapp.com/attachments/1021694169846140959/1021702534731137096/Wood-Elf_Banner.PNG.png",
  SOUTHRON_COAST = "https://cdn.discordapp.com/attachments/1021694169846140959/1021701068893196338/Near_Harad_Banner.PNG.png",
}

export function factionNameToBanner(faction: string): string {
  // Remove accents from letters
  let factionFormatted = faction
    .replace(new RegExp(/[òóôõö]/g), "o")
    .replace(new RegExp(/[ùúûü]/g), "u");
  // Replace spaces, dashes and apostrophes with underscores
  factionFormatted = factionFormatted.toUpperCase().replace(/[-| ]/g, "_").replace(/['"`]/g, "");
  return FactionBannersEnum[factionFormatted as keyof typeof FactionBannersEnum];
}
