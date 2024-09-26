<template>
  <div v-if="isLoggedIn === true">
    <header>
      <TopNavbar v-if="loadedUser" />
      <VerticalNavbar v-if="loadedUser" />
      <UserDashboardFactionOverview
        v-if="loadedUser && $route.path === '/user_dashboard'"
      />
    </header>
    <div class="relative flex min-h-screen flex-col">
      <main class="z-0 mx-60 min-h-full flex-grow bg-base-300">
        <router-view v-if="loadedUser" />
        <BackToTopButton />
      </main>
      <FooterBar />
    </div>
    <ErrorAlert v-if="hasError" @click="useErrorStore().hasError = false" />
    <AlertMessage
      v-if="hasAlert"
      @click="
        useAlertStore().hasAlert = false;
        useAlertStore().hasSuccessAlert = false;
      "
    />
  </div>
  <RegistrationForm
    v-else-if="shouldShowRegistrationForm === true"
    :discord-id="discordId"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import AuthenticationClient from "@/ts/ApiService/AuthenticationClient";
import { useCookie } from "vue-cookie-next";
import { PlayerApiClient } from "@/ts/ApiService/PlayerApiClient";
import TopNavbar from "@/components/navbars/TopNavbar.vue";
import VerticalNavbar from "@/components/navbars/VerticalNavbar.vue";
import FooterBar from "@/components/navbars/FooterBar.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
import {
  useAlertStore,
  useAuthStore,
  useConfigStore,
  useErrorStore,
} from "@/stores/systemStores";
import ErrorAlert from "@/components/ErrorAlert.vue";
import UserDashboardFactionOverview from "@/views/Dashboards/UserDashboardComponents/UserDashboardFactionOverview.vue";
import BackToTopButton from "@/components/BackToTopButton.vue";
import AlertMessage from "@/components/AlertMessage.vue";
import { AuthenticationResponse } from "@/ts/types/ApiResponseTypes/AuthenticationResponse";

// Set a watcher on the store's error boolean. If it's true then show up the error message
const hasError = ref(useErrorStore().hasError);
const hasAlert = ref(
  useAlertStore().hasAlert || useAlertStore().hasSuccessAlert,
);
watch(
  () => useErrorStore().hasError,
  (newValue) => {
    hasError.value = newValue;
  },
);

watch(
  () => useAlertStore().hasAlert || useAlertStore().hasSuccessAlert,
  (newValue) => {
    hasAlert.value = newValue;
  },
);

const isLoggedIn = ref(false);
const shouldShowRegistrationForm = ref(true);
const discordId = ref("");
const authenticationClient = new AuthenticationClient();

const cookies = useCookie();

const authUrl = useConfigStore().authUrl;

const loadedUser = ref(false);

function redirectToAuthUrl() {
  window.location.href = authUrl;
}

function getCodeFromUrl(): string {
  const query = window.location.href.split("?");
  if (query.length < 2) return "";
  return query[1].split("=")[1];
}

function setCookie(cookieId: string, value: string, expirationTime: number) {
  cookies.setCookie(cookieId, value, {
    expire: expirationTime + "s",
  });
}

function getCookie(cookieId: string) {
  if (cookies.isCookieAvailable(cookieId)) {
    return cookies.getCookie(cookieId);
  }
  return undefined;
}

function loginUser(code: string): Promise<AuthenticationResponse> {
  return new Promise((resolve) => {
    if (!code) redirectToAuthUrl();
    authenticationClient
      .getToken(code)
      .then((response: AuthenticationResponse) => {
        resolve(response);
      });
  });
}

if (getCookie("jwt")) {
  useAuthStore().jwt = getCookie("jwt");
  isLoggedIn.value = true;
  shouldShowRegistrationForm.value = false;
  PlayerApiClient.loadPlayerInfo(getCookie("discord_id")).then(() => {
    loadedUser.value = true;
  });
} else {
  loginUser(getCodeFromUrl())
    .then((authenticationResponse: AuthenticationResponse) => {
      setCookie(
        "jwt",
        authenticationResponse.jwt,
        authenticationResponse.expirationTime,
      );
      setCookie(
        "discord_id",
        authenticationResponse.discordId,
        authenticationResponse.expirationTime,
      );
      useAuthStore().jwt = authenticationResponse.jwt;
      discordId.value = authenticationResponse.discordId;
      PlayerApiClient.loadPlayerInfo(authenticationResponse.discordId).then(
        () => {
          shouldShowRegistrationForm.value = false;
          isLoggedIn.value = true;
          loadedUser.value = true;
        },
      );
    })
    .catch(() => {
      shouldShowRegistrationForm.value = true;
    });
}
</script>
