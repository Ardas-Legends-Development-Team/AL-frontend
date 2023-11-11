import { defineStore } from "pinia";
import { ref } from "vue";
import config from "@/config.json";

export const useErrorStore = defineStore("ErrorStore", () => {
  const errorMessage = ref<string>("");
  const hasError = ref<boolean>(false);

  return {
    errorMessage,
    hasError,
  };
});

export const useAlertStore = defineStore("AlertStore", () => {
  const alertMessage = ref<string>("");
  const hasAlert = ref<boolean>(false);
  const successAlertMessage = ref<string>("");
  const hasSuccessAlert = ref<boolean>(false);

  return {
    alertMessage,
    hasAlert,
    successAlertMessage,
    hasSuccessAlert,
  };
});

export const useConfigStore = defineStore("ConfigStore", () => {
  const deployMode = ref<string>(import.meta.env.MODE);
  // Change this depending on if it's production or dev server
  const redirectUrl = ref<string>(
    deployMode.value === "production"
      ? config["discord-redirect-url"]["production"]
      : config["discord-redirect-url"]["development"],
  );
  const authUrl = ref<string>(
    deployMode.value === "production"
      ? config["discord-auth-url"]["production"]
      : config["discord-auth-url"]["development"],
  );

  return {
    authUrl,
    deployMode,
    redirectUrl,
  };
});
