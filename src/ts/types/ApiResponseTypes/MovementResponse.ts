export type MovementResponse = {
  id: number;
  rpChar: {
    name: string;
    title: string;
    gear: string;
    pvp: boolean;
    currentRegion: string;
    boundTo: string;
    injured: boolean;
    isHealing: boolean;
    startedHeal: string;
    healEnds: string;
  };
  army: {
    id: number;
    name: string;
    armyType: string;
    faction: string;
    currentRegion: string;
    boundTo: string;
  };
  isCharMovement: boolean;
  path: {
    region: string;
    baseCost: number;
    actualCost: number;
  }[];
  startTime: string;
  endTime: string;
  isCurrentlyActive: boolean;
  hoursUntilComplete: number;
  hoursAlreadyMoved: number;
  hoursUntilNextRegion: number;
};
