<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row">
      <LazyLoadedImage
        :inside-classes="'max-w-sm rounded-lg shadow-2xl'"
        :evil-alt="'black orc fortress on top of fiery mountain'"
        :good-alt="'arnor castle on top of a steep hill'"
        :evil-src="'https://ateettea.sirv.com/Applications/Claimbuild/ed85e66e-3c8d-4868-a4fc-d5b42fe59a4a.jpg'"
        :good-src="'https://ateettea.sirv.com/Applications/Claimbuild/cdfd83ee-4dfa-4499-be2b-7cefce156353.jpg'"
        :padding-limiter-class="'h-64'"
      />
      <div>
        <h1 class="text-5xl font-bold">Claimbuild Submitted!</h1>
        <p class="py-6">
          We will now evaluate your claimbuild's application. Please hang on
          tight while we review it. This can take multiple days, so please be
          patient. We will let you know if anything needs to be modified.
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
