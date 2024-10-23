import { RoleplayCharacter } from "@/ts/types/RoleplayCharacter";
import { ref } from "vue";

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
