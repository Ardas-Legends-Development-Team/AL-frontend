<template>
  <div v-if="isLoggedIn === true">
    <TestNavbar />
  </div>

  <div v-if="isLoggedIn === true">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import AuthenticationClient from "@/ts/authenticationClient";
import { ref } from "vue";
import TestNavbar from "@/components/TestNavbar.vue";

const serverId = "668590304487800832";
const isLoggedIn = ref(false);
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
      resolve(token);
    });
  });
}

function verifyIfUserInServer(token: any) {
  client.getUserGuilds(token).then((guilds) => {
    if (guilds.find((guild: any) => guild.id === serverId)) {
      isLoggedIn.value = true;
      return;
    }
    window.location.href = serverInviteUrl;
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
});
</script>
