import { RoleplayCharacter } from "@/ts/types/RoleplayCharacter";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useRpCharStore = defineStore("RpCharStore", () => {
  const allRpChars = ref<RoleplayCharacter[]>([]);
  const loadedSpecificRpChars = ref<RoleplayCharacter[]>([]);

  return {
    allRpChars: allRpChars,
    loadedSpecificRpChars: loadedSpecificRpChars,
  };
});
