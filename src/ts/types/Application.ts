import { ProductionSite } from "@/ts/types/Claimbuild";

export type RoleplayApplication = {
  id: number;
  playerIgn: string;
  factionName: string;
  characterName: string;
  characterTitle: string;
  characterReason: string;
  gear: string;
  linkToLore: string;
  appliedAt: string;
  acceptedBy: Applicant[];
  voteCount: number;
};

export type ClaimbuildApplication = {
  id: number;
  application: Applicant;
  name: string;
  faction: string;
  region: string;
  type: string;
  coordinate: Coordinate;
  productionSites: ProductionSite[];
  specialBuildings: string[];
  traders: string;
  siege: string;
  houses: string;
  builtBy: Applicant[];
  appliedAt: string;
  acceptedBy: Applicant[];
  voteCount: number;
};

export function getApplicationType(
  application: RoleplayApplication | ClaimbuildApplication,
): string {
  if ("characterName" in application) {
    return "roleplay";
  } else {
    return "claimbuild";
  }
}

// Depending on if the application is a claimbuild or character application, we need to display the
// claimbuild name or character name
export function getApplicationName(
  app: RoleplayApplication | ClaimbuildApplication,
) {
  const type = getApplicationType(app);
  if (type === "claimbuild") {
    // cast to claimbuild application
    return (app as ClaimbuildApplication).name;
  } else {
    // cast to roleplay application
    return (app as RoleplayApplication).characterName;
  }
}

type Coordinate = {
  x: number;
  y: number;
  z: number;
};

type Applicant = {
  discordId: string;
  ign: string;
  faction: string;
};
