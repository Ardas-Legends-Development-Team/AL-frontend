<template>
  <footer class="footer p-10 bg-base-200 text-neutral-content">
    <div>
      <img
        class="h-32 rounded-lg"
        src="https://media.discordapp.net/attachments/1069933973448441928/1069933976912924712/ardaslegendsbanner.png?width=400&height=200"
        alt="ardas legends banner"
      />
    </div>
    <div>
      <span class="footer-title">The server</span>
      <a class="link link-hover">About us</a>
      <a class="link link-hover">Contact</a>
    </div>
    <div>
      <span class="footer-title">Legal</span>
      <a class="link link-hover">Terms of use</a>
      <a class="link link-hover">Privacy policy</a>
      <a class="link link-hover">Cookie policy</a>
    </div>
    <div>
      <span class="footer-title">Social</span>
      <div class="grid grid-flow-col gap-4">
        <a href="https://discord.gg/nFzkCj6Su7" target="_blank">
          <DiscordIcon />
        </a>
        <a href="https://www.instagram.com/ardas.legends/" target="_blank">
          <InstagramIcon />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import DiscordIcon from "@/components/icons/DiscordIcon.vue";
import InstagramIcon from "@/components/icons/InstagramIcon.vue";
</script>
