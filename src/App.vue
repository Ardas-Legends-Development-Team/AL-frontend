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
  <main class="relative min-h-screen py-12 z-0 mx-60 bg-base-300">
    <router-view />
  </main>
  <FooterBar />
</template>
