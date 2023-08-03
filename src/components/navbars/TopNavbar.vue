<template>
  <div
    class="navbar bg-center"
    :style="{
      'background-image': getBackgroundImage(),
    }"
  >
    <div class="navbar-start"></div>
    <div class="navbar-center">
      <a>
        <router-link to="/home">
          <img
            class="object-contain btn btn-glass"
            src="https://media.discordapp.net/attachments/1069933973448441928/1069933976912924712/ardaslegendsbanner.png?width=600&height=300"
            alt="ardas legends banner"
          />
        </router-link>
      </a>
    </div>
    <div class="navbar-end">
      <router-link to="/user_dashboard">
        <button class="btn btn-outline">User Dashboard</button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isFactionEvil } from "@/ts/utilities";
import { usePlayerStore } from "@/stores/playerStores";

const getBackgroundImage = () => {
  if (isFactionEvil(usePlayerStore().faction)) {
    return "url(https://ateettea.sirv.com/SusansArt900_fantasy_magical_adult_forest_495096f0-7705-46a0-bad1-73829878d2d2.png)";
  } else {
    return "url(https://ateettea.sirv.com/SusansArt900_fantasy_magical_adult_forest_495096f0-7705-46a0-bad1-73829878d2d2.png)";
  }
};
</script>
