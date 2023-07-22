<template>
  <!-- Ignore this error, it's just a background image -->
  <div
    class="hero min-h-screen"
    :style="{
      'background-image':
        'url(https://media.discordapp.net/attachments/1068863871772790865/1070856117468528701/Finch_Hobbets_first_day_at_a_new_tech_job_carrying_a_laptop_wit_53f1e452-113c-42cd-b65c-03abdf0c505b.png?width=671&height=671)',
    }"
  >
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">Oops</h1>
        <p class="mb-5">This page does not exist</p>
        <router-link to="/home" class="btn btn-primary">Back home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
