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
import axios from "axios";
import { useCookie } from "vue-cookie-next";
import { PlayerApiClient } from "@/ts/ApiService/PlayerApiClient";
import TopNavbar from "@/components/navbars/TopNavbar.vue";
import VerticalNavbar from "@/components/navbars/VerticalNavbar.vue";
import FooterBar from "@/components/navbars/FooterBar.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
import {
  useAlertStore,
  useConfigStore,
  useErrorStore,
} from "@/stores/systemStores";
import ErrorAlert from "@/components/ErrorAlert.vue";
import { ApiClient } from "@/ts/ApiService/ApiClient";
import UserDashboardFactionOverview from "@/views/Dashboards/UserDashboardComponents/UserDashboardFactionOverview.vue";
import BackToTopButton from "@/components/BackToTopButton.vue";
import AlertMessage from "@/components/AlertMessage.vue";
import { o } from "vitest/dist/types-198fd1d9";
import { AuthClient } from "./ts/ApiService/AuthClient";

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

const authTokenCookieKey = "ardaslegends_auth_token"
const serverId = "668590304487800832";
const isLoggedIn = ref(false);
const shouldShowRegistrationForm = ref(false);
const userToken = ref("");
const discordId = ref("");
const authToken = ref("")
const authenticationClient = new AuthenticationClient(
  "1066660773520212000",
  "_d7qVfGsQrBtU8racyHvZf88QcXCGu9_",
);

const authClient = new AuthClient();

const cookies = useCookie();

const redirectUrl = useConfigStore().redirectUrl;
const authUrl = useConfigStore().authUrl;

authenticationClient.setScopes(["identify", "guilds"]);
authenticationClient.setRedirect(redirectUrl);

const serverInviteUrl = "https://discord.gg/nFzkCj6Su7";

const loadedUser = ref(false);

function setAuthTokenCookie(token: any) {
  cookies.setCookie(authTokenCookieKey, token);
}

function getAuthTokenCookie() {
  if (cookies.isCookieAvailable(authTokenCookieKey)) {
    return cookies.getCookie(authTokenCookieKey);
  }
  return undefined;
}


authToken.value = getAuthTokenCookie();
console.log(authToken.value);
// If there is no auth token found in the cookies then start the discord oauth process
if(!authToken.value) {
  const authCode = getCodeFromUrl()
  console.log("code: " + authCode)
  if(authCode === "") {
    redirectToAuthUrl()
  }
  else {
    console.log("codeWorked: " + authCode)

    console.log("JS UrlEncoded: " + new URLSearchParams({
          authCode,
        }).toString());

    console.log("authUrl " + authUrl)
    const authTokenFromBackend = authClient.authorize(authCode, redirectUrl)
  }
}


function redirectToAuthUrl() {
  window.location.href = authUrl;
}





function getCodeFromUrl(): string {
  const query = window.location.href.split("?");
  if (query.length < 2) return "";
  return query[1].split("=")[1];
}

/* 
function setAccessTokenCookie(token: any) {
  cookies.setCookie("ardaslegends_auth_token", token);
}

function getAccessTokenCookie() {
  if (cookies.isCookieAvailable("access_token")) {
    return cookies.getCookie("access_token");
  }
  return undefined;
}
*/
// function loginUser(code: string) {
//   return new Promise((resolve) => {
//     if (getAccessTokenCookie()) {
//       userToken.value = getAccessTokenCookie().access_token;
//       resolve(getAccessTokenCookie());
//       return;
//     }

//     if (!code) redirectToAuthUrl();

//     authenticationClient.getToken(code).then((token) => {
//       setAccessTokenCookie(token);
//       userToken.value = token.access_token;
//       resolve(token);
//     });

//   });
// }

// function verifyIfUserInServer(token: any) {
//   authenticationClient.getUserGuilds(token).then((guilds) => {
//     if (guilds.find((guild: any) => guild.id === serverId)) {
//       return;
//     }
//     window.location.href = serverInviteUrl;
//   });
// }

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

// If the user is in production mode, then we need to check if the user is logged in
// and if he is registered in the server
//if (useConfigStore().deployMode === "development") {
//  loginUser(getCodeFromUrl()).then((token) => {
//    verifyIfUserInServer(token);
//    verifyIfUserRegistered(token)
//      .then((discordId) => {
//        PlayerApiClient.loadPlayerInfo(discordId).then(() => {
//          loadedUser.value = true;
//        });
//      })
//      .catch(() => {
//        shouldShowRegistrationForm.value = true;
//      });
//  });
//} else {
//  isLoggedIn.value = true;
//  shouldShowRegistrationForm.value = false;
//  PlayerApiClient.loadPlayerInfo("253505646190657537").then(() => {
//    loadedUser.value = true;
//  });
//}
</script>
