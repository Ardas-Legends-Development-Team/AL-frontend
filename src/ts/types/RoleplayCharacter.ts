export type RoleplayCharacter = {
  discordId: string;
  ign: string;
  faction: string;
  rpChar: CharacterInfo;
};

export type CharacterInfo = {
  name: string;
  title: string;
  rank: string;
  gear: string;
  pvp: boolean;
  currentRegion: string;
  boundTo: string;
  stationedAt: string;
  injured: boolean;
  isHealing: boolean;
  startedHeal: string;
  healEnds: string;
};
