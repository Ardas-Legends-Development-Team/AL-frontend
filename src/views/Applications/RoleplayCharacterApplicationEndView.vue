<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row">
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
          <button class="btn btn">Back to Home</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
