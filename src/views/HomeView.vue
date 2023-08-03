<template>
  <!-- Ignore the below line's error, it works perfectly -->
  <div
    id="home-hero"
    class="hero min-h-screen"
    :style="{
      'background-image': getBackgroundImage(),
    }"
  >
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">Welcome Adventurer</h1>
        <p class="mb-5">
          This is Arda's Legends official website. Here you can find all the
          information you need to know about the server and its community.
        </p>
        <router-link to="/lists">
          <button class="btn btn-primary">Get Started</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isFactionEvil } from "@/ts/utilities";
import { usePlayerStore } from "@/stores/playerStores";

const getBackgroundImage = () => {
  if (isFactionEvil(usePlayerStore().faction)) {
    return "url(https://ateettea.sirv.com/Background%20and%20layout/chv87b39axfa1.png)";
  } else {
    return "url(https://ateettea.sirv.com/Background%20and%20layout/3952fd46-57f6-4705-8db5-92a9d3bd7f34.jpg)";
  }
};
</script>
