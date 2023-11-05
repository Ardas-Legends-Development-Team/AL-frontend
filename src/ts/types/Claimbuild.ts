export type Claimbuild = {
  id: number;
  name: string;
  region: string;
  claimBuildType: string;
  faction: string;
  armiesStationedCount: number;
};

export type ProductionSite = {
  type: string;
  resource: string;
};

export type ProductionSiteWithCount = {
  type: string;
  resource: string;
  count: number;
};
