<template>
  <footer class="footer bg-base-200 p-10 text-neutral-content">
    <div>
      <img
        class="h-32 rounded-lg"
        src="https://media.discordapp.net/attachments/1069933973448441928/1069933976912924712/ardaslegendsbanner.png?width=400&height=200"
        alt="ardas legends banner"
      />
    </div>
    <div>
      <span class="footer-title">The server</span>
      <a class="link-hover link">About us</a>
      <a class="link-hover link">Contact</a>
      <a
        href="https://donatebot.io/checkout/668590304487800832"
        target="_blank"
        class="link-hover link"
        >Donate</a
      >
    </div>
    <div>
      <span class="footer-title">Useful Links</span>
      <a
        href="https://ardas-legends-development-team.github.io/ardas-legends-bot-guide/"
        target="_blank"
        class="link-hover link"
        >Bot guide</a
      >
      <a
        href="https://docs.google.com/document/d/1XqMzhv3kFzISpDWdPIEqG4nQRZzGpzCP/edit#heading=h.451kvydu733g"
        target="_blank"
        class="link-hover link"
        >War guide</a
      >
      <a
        href="https://docs.google.com/document/d/1X6clF1TZcom64_XC1mcd6ZwnAULrzV8h/edit?rtpof=true"
        target="_blank"
        class="link-hover link"
        >Builder's bible</a
      >
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
import DiscordIcon from "@/components/images/DiscordIcon.vue";
import InstagramIcon from "@/components/images/InstagramIcon.vue";
</script>
