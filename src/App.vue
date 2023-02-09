<script setup lang="ts">
import TestNavbar from "@/components/navbars/HorizontalNavbar.vue";
import VerticalNavbar from "@/components/navbars/VerticalNavbar.vue";
import FooterBar from "@/components/navbars/FooterBar.vue";
</script>

<template>
  <header>
    <TestNavbar />
    <VerticalNavbar />
  </header>
  <div class="relative min-h-screen flex flex-col">
    <main class="min-h-full z-0 mx-60 bg-base-300 flex-grow">
      <router-view />
    </main>
    <FooterBar />
  </div>
</template>
