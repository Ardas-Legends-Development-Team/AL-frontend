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

function setJwtCookie(token: string) {
  cookies.setCookie("access_token", token);
}

function setDiscordIdCookie(discordId: string) {
  cookies.setCookie("discord_id", discordId);
}

function getJwtCookie() {
  if (cookies.isCookieAvailable("access_token")) {
    return cookies.getCookie("access_token");
  }
  return undefined;
}

function getDiscordIdCookie() {
  if (cookies.isCookieAvailable("discord_id")) {
    return cookies.getCookie("discord_id");
  }
  return undefined;
}

function loginUser(code: string): Promise<AuthenticationResponse> {
  return new Promise((resolve) => {
    // if (getAccessTokenCookie()) {
    //   userToken.value = getAccessTokenCookie().access_token;
    //   resolve(getAccessTokenCookie());
    //   return;
    // }
    if (!code) redirectToAuthUrl();
    authenticationClient
      .getToken(code)
      .then((response: AuthenticationResponse) => {
        // setAccessTokenCookie(token);
        // userToken.value = token.access_token;
        resolve(response);
      });
  });
}

// function verifyIfUserInServer(token: any) {
//   authenticationClient.getUserGuilds(token).then((guilds) => {
//     if (guilds.find((guild: any) => guild.id === serverId)) {
//       return;
//     }
//     window.location.href = serverInviteUrl;
//   });
// }
//
// function verifyIfUserRegistered(token: any) {
//   return new Promise<string>((resolve, reject) => {
//     authenticationClient.getUser(token).then((user) => {
//       discordId.value = user.id;
//       axios
//         .get(`${ApiClient.getBaseUrl()}/player/discordid/${user.id}`)
//         .then(() => {
//           isLoggedIn.value = true;
//           shouldShowRegistrationForm.value = false;
//           resolve(user.id);
//         })
//         .catch(() => {
//           reject("User not registered");
//         });
//     });
//   });
// }

if (getJwtCookie()) {
  useAuthStore().jwt = getJwtCookie();
  isLoggedIn.value = true;
  PlayerApiClient.loadPlayerInfo(getDiscordIdCookie()).then(() => {
    loadedUser.value = true;
  });
} else {
  loginUser(getCodeFromUrl())
    .then((authenticationResponse: AuthenticationResponse) => {
      //verifyIfUserInServer(token);
      //verifyIfUserRegistered(token)
      //.then((discordId) => {
      setJwtCookie(authenticationResponse.jwt);
      setDiscordIdCookie(authenticationResponse.discordId);
      useAuthStore().jwt = authenticationResponse.jwt;
      PlayerApiClient.loadPlayerInfo(authenticationResponse.discordId).then(
        () => {
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
