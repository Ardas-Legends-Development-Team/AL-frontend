<template>
  <div
    class="navbar bg-center"
    :style="{
      'background-image': getBackgroundImage().image,
      'background-size': getBackgroundImage().shouldCover ? 'cover' : '',
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
    return {
      image:
        "url(https://ateettea.sirv.com/joseangel_ancient_wood_library_gothic_window_electric_light_blu_432e8ba1-8606-45d5-8d0d-7739eaa978c3.png)",
      shouldCover: true,
    };
  } else {
    return {
      image:
        "url(https://ateettea.sirv.com/SusansArt900_fantasy_magical_adult_forest_495096f0-7705-46a0-bad1-73829878d2d2.png)",
      shouldCover: true,
    };
  }
};
</script>
