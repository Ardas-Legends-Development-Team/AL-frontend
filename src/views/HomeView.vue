<template>
  <!-- Ignore the below line's error, it works perfectly -->
  <div
    id="home-hero"
    class="hero min-h-screen"
    :style="{
      'background-image':
        'url(https://media.discordapp.net/attachments/1068863871772790865/1068869765587816548/VernonRoche__CA9.io_lord_of_the_rings_painting_of_huge_dwarven__487c0555-83b6-471a-a82d-1c79b7a23853.png?width=671&height=671)',
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

<script setup lang="ts"></script>
