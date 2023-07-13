import { defineStore } from "pinia";
import { ref } from "vue";

export const useErrorStore = defineStore("ErrorStore", () => {
  const errorMessage = ref<string>("");
  const hasError = ref<boolean>(false);

  return {
    errorMessage,
    hasError,
  };
});
