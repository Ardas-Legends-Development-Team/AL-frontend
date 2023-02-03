<template>
  <TestNavbar />

  <router-view />
  <button class="btn btn-wide btn-primary" @click="redirectToAuthUrl">
    Login
  </button>
</template>

<script setup lang="ts">
import TestNavbar from "@/components/TestNavbar.vue";
import AuthenticationClient from "@/ts/authenticationClient";

const client = new AuthenticationClient(
  "1066660773520212000",
  "_d7qVfGsQrBtU8racyHvZf88QcXCGu9_"
);
const authUrl =
  "https://discord.com/api/oauth2/authorize?client_id=1066660773520212000&redirect_uri=http%3A%2F%2Flocalhost%3A6942&response_type=code&scope=identify%20guilds";

loginUser(getCodeFromUrl());

function redirectToAuthUrl() {
  window.location.href = authUrl;
}

function getCodeFromUrl(): string {
  const query = window.location.href.split("?");
  if (query.length < 2) return "";
  return query[1].split("=")[1];
}

function loginUser(code: string) {
  if (!code) redirectToAuthUrl();
  console.log(code);
  client.getToken(code).then((token) => {
    console.log(token);
    return client.getUser(token);
  });
}
</script>
