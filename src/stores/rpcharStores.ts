import { RoleplayCharacter } from "@/ts/types/RoleplayCharacter";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useRpCharStore = defineStore("RpCharStore", () => {
  const rpChars = ref<RoleplayCharacter[]>([]);

  return {
    rpChars,
  };
});
