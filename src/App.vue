<template>
  <div v-if="isLoggedIn === true">
    <header>
      <HorizontalNavbar />
      <VerticalNavbar />
    </header>
    <div class="relative min-h-screen flex flex-col">
      <main class="min-h-full z-0 mx-60 bg-base-300 flex-grow">
        <router-view />
      </main>
      <FooterBar />
    </div>
  </div>
  <RegistrationForm
    v-else-if="isRegistered === false"
    :discord-id="userToken"
  />
</template>

<script setup lang="ts">
import AuthenticationClient from "@/ts/authenticationClient";
import FooterBar from "@/components/navbars/FooterBar.vue";
import HorizontalNavbar from "@/components/navbars/HorizontalNavbar.vue";
import VerticalNavbar from "@/components/navbars/VerticalNavbar.vue";
import { ref } from "vue";
import axios from "axios";
import RegistrationForm from "@/components/RegistrationForm.vue";

const serverId = "668590304487800832";
const isLoggedIn = ref(false);
const isRegistered = ref(true);
const userToken = ref("");
const client = new AuthenticationClient(
  "1066660773520212000",
  "_d7qVfGsQrBtU8racyHvZf88QcXCGu9_"
);
client.setScopes(["identify", "guilds"]);
client.setRedirect("http://localhost:6942");
const authUrl =
  "https://discord.com/api/oauth2/authorize?client_id=1066660773520212000&redirect_uri=http%3A%2F%2Flocalhost%3A6942&response_type=code&scope=identify%20guilds";
const serverInviteUrl = "https://discord.gg/nFzkCj6Su7";

function redirectToAuthUrl() {
  window.location.href = authUrl;
}

function getCodeFromUrl(): string {
  const query = window.location.href.split("?");
  if (query.length < 2) return "";
  return query[1].split("=")[1];
}

function loginUser(code: string) {
  return new Promise((resolve) => {
    if (!code) redirectToAuthUrl();
    client.getToken(code).then((token) => {
      userToken.value = token.access_token;
      resolve(token);
    });
  });
}

function verifyIfUserInServer(token: any) {
  client.getUserGuilds(token).then((guilds) => {
    if (guilds.find((guild: any) => guild.id === serverId)) {
      return;
    }
    window.location.href = serverInviteUrl;
  });
}

function verifyIfUserRegistered(token: any) {
  return new Promise((resolve, reject) => {
    client.getUser(token).then((user) => {
      axios
        .get(`http://localhost:8080/api/player/discordid/${userToken.value}`)
        .then((res) => {
          isRegistered.value = true;
          isLoggedIn.value = true;
          resolve(true);
        })
        .catch((err) => {
          reject(false);
        });
    });
  });
}

function getUserId(token: any) {
  client.getUser(token).then((user) => {
    return user.id;
  });
}

function getUsername(token: any) {
  client.getUser(token).then((user) => {
    console.log(user.username);
  });
}

loginUser(getCodeFromUrl()).then((token) => {
  getUsername(token);
  verifyIfUserInServer(token);
  verifyIfUserRegistered(token).catch(() => (isRegistered.value = false));
});
</script>
