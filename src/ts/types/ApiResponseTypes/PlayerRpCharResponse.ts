import { RpCharResponse } from "@/ts/types/ApiResponseTypes/RpCharResponse";

export type PlayerRpCharResponse = {
  discordId: string;
  faction: string;
  ign: string;
  rpChar: RpCharResponse;
  roles: string[];
};
