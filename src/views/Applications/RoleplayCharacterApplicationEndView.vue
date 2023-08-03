<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row">
      <LazyLoadedImage
        :inside-classes="'max-w-sm rounded-lg shadow-2xl'"
        :evil-alt="'heavily armoured Nazgul watching over Mordor on top a cliff'"
        :good-alt="'dwarves having a drink inside a tavern near candles'"
        :evil-src="'https://ateettea.sirv.com/Applications/Roleplay/Screenshot%202023-03-06%20112547.png'"
        :good-src="'https://ateettea.sirv.com/Applications/Roleplay/Dark-Eyes-Open_portrait_of_Aragon_Legolas_and_Gimli_enjoying_yu_30dd9010-e5c4-4d7d-a938-d22a83cb70b6.png'"
        :is-evil="isFactionEvil(usePlayerStore().faction)"
      />
      <img
        alt="elf army with general"
        src="https://cdn.discordapp.com/attachments/1068863871772790865/1068869733966942258/VernonRoche__CA9.io_lord_of_the_rings_painting_of_an_elven_army_a48b17a6-23f0-4f03-8af6-07282d3b1aa1.png"
        class="max-w-sm rounded-lg shadow-2xl"
      />
      <div>
        <h1 class="text-5xl font-bold">Character Submitted!</h1>
        <p class="py-6">
          We will now evaluate your roleplay character's application. Please
          hang on tight while we review it. This can take multiple days, so
          please be patient. We will let you know if anything needs to be
          modified.
        </p>
        <router-link to="/home">
          <button class="btn">Back to Home</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isFactionEvil } from "@/ts/utilities";
import { usePlayerStore } from "@/stores/playerStores";
import LazyLoadedImage from "@/components/images/LazyLoadedImage.vue";
</script>
