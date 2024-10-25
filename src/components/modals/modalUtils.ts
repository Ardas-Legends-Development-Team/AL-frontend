import { RoleplayCharacter } from "@/ts/types/RoleplayCharacter";
import { ref } from "vue";
import { ArmyTransfer, ProductionSiteTransfer } from "@/ts/types/Claimbuild";

export function useCharacterModal() {
  const allRoleplayCharacters = ref<
    { avatar: string; character: RoleplayCharacter }[]
  >([]);
  const filteredCharacters = ref<
    { avatar: string; character: RoleplayCharacter }[]
  >([]);
  const selectedCharacter = ref<{
    avatar: string;
    character: RoleplayCharacter;
  }>({
    avatar: "",
    character: {
      discordId: "",
      ign: "",
      faction: "",
      rpChar: {
        name: "",
        title: "",
        gear: "",
        pvp: false,
        currentRegion: "",
        boundTo: "",
        stationedAt: "",
        injured: false,
        isHealing: false,
        startedHeal: "",
        healEnds: "",
        rank: "",
      },
    },
  });
  function sendInfoToModal(roleplayCharacter: RoleplayCharacter) {
    selectedCharacter.value.character = roleplayCharacter;
  }

  function updateFilteredCharactersOnSearch(
    searchResults: RoleplayCharacter[],
  ) {
    if (searchResults.length === 0) {
      filteredCharacters.value = allRoleplayCharacters.value;
      return;
    }
    filteredCharacters.value = allRoleplayCharacters.value.filter((rpchar) =>
      searchResults.includes(rpchar.character),
    );
  }

  function getCharacterHeads(data: RoleplayCharacter[]) {
    for (let i = 0; i < data.length; i++) {
      allRoleplayCharacters.value.push({
        avatar: `https://mc-heads.net/avatar/${data[i].ign}/36`,
        character: data[i],
      });
    }
  }

  return {
    allRoleplayCharacters,
    selectedCharacter,
    filteredCharacters,
    sendInfoToModal,
    updateFilteredCharactersOnSearch,
    getCharacterHeads,
  };
}

export function generateProductionSiteString(
  sites: ProductionSiteTransfer[],
): string[] {
  return sites.map((site) => {
    return `${site.amount} ${site.productionSite.resource} ${site.productionSite.type}`;
  });
}

export function generateArmyStrings(
  armies: ArmyTransfer[],
  isStationed?: boolean,
): string[] {
  return armies.map((army) => {
    return `${isStationed ? army.faction : ""} ${army.armyType}: ${army.name}, ${army.boundTo}`;
  });
}
