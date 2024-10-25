export type Claimbuild = {
  id: number;
  name: string;
  region: string;
  claimBuildType: string;
  faction: string;
  armiesStationedCount: number;
  siege: string;
  houses: string;
  coordinates: {
    x: number;
    y: number;
    z: number;
  };
  traders: string;
  builtBy: {
    discordId: string;
    ign: string;
    faction: string;
  }[];
  specialBuildings: string[];
  productionSites: ProductionSiteTransfer[];
  stationedArmies: {
    id: number;
    name: string;
    armyType: string;
    faction: string;
    currentRegion: number;
    boundTo: string;
  }[];
  createdArmies: {
    id: number;
    name: string;
    armyType: string;
    faction: string;
    currentRegion: number;
    boundTo: string;
  }[];
  freeArmiesRemaining: number;
  createdArmyCount: number;
  freeCompaniesRemaining: number;
  createdCompaniesCount: number;
  atMaxArmies: number;
  atMaxCompanies: number;
};

export type ProductionSite = {
  type: string;
  resource: string;
};

export type ProductionSiteTransfer = {
  amount: number;
  productionSite: ProductionSite;
};

export type ArmyTransfer = {
  id: number;
  name: string;
  armyType: string;
  faction: string;
  currentRegion: number;
  boundTo: string;
};

export type ProductionSiteWithCount = {
  type: string;
  resource: string;
  count: number;
};
