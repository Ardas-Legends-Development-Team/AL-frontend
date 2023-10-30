<template>
  <div v-if="isLoggedIn === true">
    <header>
      <TopNavbar v-if="loadedUser" />
      <VerticalNavbar v-if="loadedUser" />
      <UserDashboardFactionOverview
        v-if="loadedUser && $route.path === '/user_dashboard'"
      />
    </header>
    <div class="relative min-h-screen flex flex-col">
      <main class="min-h-full z-0 mx-60 bg-base-300 flex-grow">
        <router-view v-if="loadedUser" />
        <BackToTopButton />
      </main>
      <FooterBar />
    </div>
    <ErrorAlert v-if="hasError" @click="useErrorStore().hasError = false" />
  </div>
  <RegistrationForm
    v-else-if="shouldShowRegistrationForm === true"
    :discord-id="discordId"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import AuthenticationClient from "@/ts/ApiService/AuthenticationClient";
import axios from "axios";
import { useCookie } from "vue-cookie-next";
import { PlayerApiClient } from "@/ts/ApiService/PlayerApiClient";
import TopNavbar from "@/components/navbars/TopNavbar.vue";
import VerticalNavbar from "@/components/navbars/VerticalNavbar.vue";
import FooterBar from "@/components/navbars/FooterBar.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
import { useConfigStore, useErrorStore } from "@/stores/systemStores";
import ErrorAlert from "@/components/ErrorAlert.vue";
import { ApiClient } from "@/ts/ApiService/ApiClient";
import UserDashboardFactionOverview from "@/views/Dashboards/UserDashboardComponents/UserDashboardFactionOverview.vue";
import BackToTopButton from "@/components/BackToTopButton.vue";

// Set a watcher on the store's error boolean. If it's true then show up the error message
const hasError = ref(useErrorStore().hasError);
watch(
  () => useErrorStore().hasError,
  (newValue) => {
    console.log("Setting error val");
    console.log(newValue);

    hasError.value = newValue;
  },
);

const serverId = "668590304487800832";
const isLoggedIn = ref(false);
const shouldShowRegistrationForm = ref(false);
const userToken = ref("");
const discordId = ref("");
const authenticationClient = new AuthenticationClient(
  "1066660773520212000",
  "_d7qVfGsQrBtU8racyHvZf88QcXCGu9_",
);

const cookies = useCookie();

const redirectUrl = useConfigStore().redirectUrl;
const authUrl = useConfigStore().authUrl;

authenticationClient.setScopes(["identify", "guilds"]);
authenticationClient.setRedirect(redirectUrl);

const serverInviteUrl = "https://discord.gg/nFzkCj6Su7";

const loadedUser = ref(false);

function redirectToAuthUrl() {
  window.location.href = authUrl;
}

function getCodeFromUrl(): string {
  const query = window.location.href.split("?");
  if (query.length < 2) return "";
  return query[1].split("=")[1];
}

function setAccessTokenCookie(token: any) {
  cookies.setCookie("access_token", token);
}

function getAccessTokenCookie() {
  if (cookies.isCookieAvailable("access_token")) {
    return cookies.getCookie("access_token");
  }
  return undefined;
}

function loginUser(code: string) {
  return new Promise((resolve) => {
    if (getAccessTokenCookie()) {
      userToken.value = getAccessTokenCookie().access_token;
      resolve(getAccessTokenCookie());
      return;
    }
    if (!code) redirectToAuthUrl();
    authenticationClient.getToken(code).then((token) => {
      setAccessTokenCookie(token);
      userToken.value = token.access_token;
      resolve(token);
    });
  });
}

function verifyIfUserInServer(token: any) {
  authenticationClient.getUserGuilds(token).then((guilds) => {
    if (guilds.find((guild: any) => guild.id === serverId)) {
      return;
    }
    window.location.href = serverInviteUrl;
  });
}

function verifyIfUserRegistered(token: any) {
  return new Promise<string>((resolve, reject) => {
    authenticationClient.getUser(token).then((user) => {
      discordId.value = user.id;
      axios
        .get(`${ApiClient.getBaseUrl()}/player/discordid/${user.id}`)
        .then(() => {
          isLoggedIn.value = true;
          shouldShowRegistrationForm.value = false;
          resolve(user.id);
        })
        .catch(() => {
          reject("User not registered");
        });
    });
  });
}

// If the user is in production mode, then we need to check if the user is logged in
// and if he is registered in the server
if (useConfigStore().deployMode === "production") {
  loginUser(getCodeFromUrl()).then((token) => {
    verifyIfUserInServer(token);
    verifyIfUserRegistered(token)
      .then((discordId) => {
        PlayerApiClient.loadPlayerInfo(discordId).then(() => {
          loadedUser.value = true;
        });
      })
      .catch(() => {
        shouldShowRegistrationForm.value = true;
      });
  });
} else {
  isLoggedIn.value = true;
  shouldShowRegistrationForm.value = false;
  PlayerApiClient.loadPlayerInfo("253505646190657537").then(() => {
    loadedUser.value = true;
  });
}
</script>
