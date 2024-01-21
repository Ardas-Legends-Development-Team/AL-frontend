import { isFactionEvil } from "@/ts/utilities";

export enum ClaimbuildTypeImageEnum {
  // eslint-disable-next-line no-unused-vars
  GOOD_HAMLET = "https://ateettea.sirv.com/Claimbuild%20modal/good%20hamlet.png",
  // eslint-disable-next-line no-unused-vars
  GOOD_VILLAGE = "https://ateettea.sirv.com/Claimbuild%20modal/good%20village.jpg",
  // eslint-disable-next-line no-unused-vars
  GOOD_TOWN = "https://ateettea.sirv.com/Claimbuild%20modal/good%20town.png",
  // eslint-disable-next-line no-unused-vars
  GOOD_CAPITAL = "https://ateettea.sirv.com/Claimbuild%20modal/good%20capital.jpg",
  // eslint-disable-next-line no-unused-vars
  EVIL_HAMLET = "https://ateettea.sirv.com/Claimbuild%20modal/evil%20hamlet.png",
  // eslint-disable-next-line no-unused-vars
  EVIL_VILLAGE = "https://ateettea.sirv.com/Claimbuild%20modal/evil%20village.png",
  // eslint-disable-next-line no-unused-vars
  EVIL_TOWN = "https://ateettea.sirv.com/Claimbuild%20modal/evil%20town.png",
  // eslint-disable-next-line no-unused-vars
  EVIL_CAPITAL = "https://ateettea.sirv.com/Claimbuild%20modal/evil%20capital.png",
  // eslint-disable-next-line no-unused-vars
  GOOD_KEEP = "https://ateettea.sirv.com/Claimbuild%20modal/good%20keep.jpg",
  // eslint-disable-next-line no-unused-vars
  GOOD_CASTLE = "https://ateettea.sirv.com/Claimbuild%20modal/good%20castle.png",
  // eslint-disable-next-line no-unused-vars
  GOOD_STRONGHOLD = "https://ateettea.sirv.com/Claimbuild%20modal/good%20stronghold.png",
  // eslint-disable-next-line no-unused-vars
  EVIL_KEEP = "https://ateettea.sirv.com/Claimbuild%20modal/evil%20keep.jpg",
  // eslint-disable-next-line no-unused-vars
  EVIL_CASTLE = "https://ateettea.sirv.com/Claimbuild%20modal/evil%20castle.png",
  // eslint-disable-next-line no-unused-vars
  EVIL_STRONGHOLD = "https://ateettea.sirv.com/Claimbuild%20modal/evil%20stronghold.png",
  // eslint-disable-next-line no-unused-vars
  GOOD_CAMP = "https://ateettea.sirv.com/Claimbuild%20modal/camp.jpg",
  // eslint-disable-next-line no-unused-vars
  EVIL_CAMP = "https://ateettea.sirv.com/Claimbuild%20modal/camp.jpg",
}

export function getClaimbuildTypeImage(
  claimbuildType: string,
  factionName: string,
): string {
  const lowercaseClaimbuildType = claimbuildType.toLowerCase();
  const isEvil = isFactionEvil(factionName);
  switch (lowercaseClaimbuildType) {
    case "hamlet":
      return isEvil
        ? ClaimbuildTypeImageEnum.EVIL_HAMLET
        : ClaimbuildTypeImageEnum.GOOD_HAMLET;
    case "village":
      return isEvil
        ? ClaimbuildTypeImageEnum.EVIL_VILLAGE
        : ClaimbuildTypeImageEnum.GOOD_VILLAGE;
    case "town":
      return isEvil
        ? ClaimbuildTypeImageEnum.EVIL_TOWN
        : ClaimbuildTypeImageEnum.GOOD_TOWN;
    case "capital":
      return isEvil
        ? ClaimbuildTypeImageEnum.EVIL_CAPITAL
        : ClaimbuildTypeImageEnum.GOOD_CAPITAL;
    case "keep":
      return isEvil
        ? ClaimbuildTypeImageEnum.EVIL_KEEP
        : ClaimbuildTypeImageEnum.GOOD_KEEP;
    case "castle":
      return isEvil
        ? ClaimbuildTypeImageEnum.EVIL_CASTLE
        : ClaimbuildTypeImageEnum.GOOD_CASTLE;
    case "stronghold":
      return isEvil
        ? ClaimbuildTypeImageEnum.EVIL_STRONGHOLD
        : ClaimbuildTypeImageEnum.GOOD_STRONGHOLD;
    case "camp":
      return isEvil
        ? ClaimbuildTypeImageEnum.EVIL_CAMP
        : ClaimbuildTypeImageEnum.GOOD_CAMP;
    default:
      return "";
  }
}

export function getClaimbuildTypeImageAlt(
  claimbuildType: string,
  factionName: string,
): string {
  const lowercaseClaimbuildType = claimbuildType.toLowerCase();
  const isEvil = isFactionEvil(factionName);
  switch (lowercaseClaimbuildType) {
    case "hamlet":
      return isEvil ? "Evil Hamlet" : "Good Hamlet";
    case "village":
      return isEvil ? "Evil Village" : "Good Village";
    case "town":
      return isEvil ? "Evil Town" : "Good Town";
    case "capital":
      return isEvil ? "Evil Capital" : "Good Capital";
    case "keep":
      return isEvil ? "Evil Keep" : "Good Keep";
    case "castle":
      return isEvil ? "Evil Castle" : "Good Castle";
    case "stronghold":
      return isEvil ? "Evil Stronghold" : "Good Stronghold";
    case "camp":
      return "Camp";
    default:
      return "";
  }
}
