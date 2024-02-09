export type War = {
  id: number;
  name: string;
  agressors: string[];
  defenders: string[];
  initialAttacker: string;
  initialDefender: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
};
