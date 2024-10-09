<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row">
      <LazyLoadedImage
        :inside-classes="'max-w-sm rounded-lg shadow-2xl'"
        :evil-alt="'heavily armoured Nazgul watching over Mordor on top a cliff'"
        :good-alt="'dwarves having a drink inside a tavern near candles'"
        :evil-src="'https://ateettea.sirv.com/Applications/Roleplay/Screenshot%202023-03-06%20112547.png'"
        :good-src="'https://ateettea.sirv.com/Applications/Roleplay/Dark-Eyes-Open_portrait_of_Aragon_Legolas_and_Gimli_enjoying_yu_30dd9010-e5c4-4d7d-a938-d22a83cb70b6.png'"
        :padding-limiter-class="'h-64'"
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
import LazyLoadedImage from "@/components/images/LazyLoadedImage.vue";
</script>
