export type RoleplayCharacter = {
  discordId: string;
  ign: string;
  faction: string;
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
};
