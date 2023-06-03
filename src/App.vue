<template>
  <div v-if="isLoggedIn === true">
    <header>
      <TopNavbar v-if="loadedUser" />
      <VerticalNavbar v-if="loadedUser" />
    </header>
    <div class="relative min-h-screen flex flex-col">
      <main class="min-h-full z-0 mx-60 bg-base-300 flex-grow">
        <router-view v-if="loadedUser" />
      </main>
      <FooterBar />
    </div>
  </div>
  <RegistrationForm
    v-else-if="shouldShowRegistrationForm === true"
    :discord-id="discordId"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import AuthenticationClient from "@/ts/AuthenticationClient";
import axios from "axios";
import { useCookie } from "vue-cookie-next";
import { ApiClient } from "@/ts/ApiClient";
import { PlayerInfo } from "@/ts/types/PlayerInfo";
import { discordAuthUrl, discordRedirectUrl } from "@/config.json";
import TopNavbar from "@/components/navbars/TopNavbar.vue";
import VerticalNavbar from "@/components/navbars/VerticalNavbar.vue";
import FooterBar from "@/components/navbars/FooterBar.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";

const serverId = "668590304487800832";
const isLoggedIn = ref(false);
const shouldShowRegistrationForm = ref(false);
const userToken = ref("");
const discordId = ref("");
const authenticationClient = new AuthenticationClient(
  "1066660773520212000",
  "_d7qVfGsQrBtU8racyHvZf88QcXCGu9_"
);

const cookies = useCookie();

//Change this depending on if it's production or dev server
//const redirectUrl = discordRedirectUrl.dev;
const redirectUrl = discordRedirectUrl.dev;
// const authUrl = discordAuthUrl.dev;
const authUrl = discordAuthUrl.dev;

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
  console.log("Set cookie:" + cookies.getCookie("access_token"));
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
      console.log("Access token:");
      console.log(getAccessTokenCookie());
      resolve(getAccessTokenCookie());
      return;
    }
    if (!code) redirectToAuthUrl();
    authenticationClient.getToken(code).then((token) => {
      setAccessTokenCookie(token);
      userToken.value = token.access_token;
      console.log("Token:", token);
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
        .get(`http://localhost:8080/api/player/discordid/${user.id}`)
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

loginUser(getCodeFromUrl()).then((token) => {
  verifyIfUserInServer(token);
  verifyIfUserRegistered(token)
    .then((discordId) => {
      ApiClient.loadPlayerInfo(discordId).then((playerInfo: PlayerInfo) => {
        console.log(
          "Player Info: ",
          playerInfo.discordId,
          playerInfo.ign,
          playerInfo.faction,
          playerInfo.isStaff
        );
        loadedUser.value = true;
      });
    })
    .catch(() => {
      shouldShowRegistrationForm.value = true;
    });
});
</script>
