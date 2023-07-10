export type Region = {
  rowId: number;
  id: string;
  name: string;
  regionType: string;
  claimedBy: string[];
  neighbours: string[];
  claimbuilds: string[];
  characters: string[];
};
