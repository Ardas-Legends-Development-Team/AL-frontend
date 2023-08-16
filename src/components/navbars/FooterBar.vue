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
      <a
        href="https://donatebot.io/checkout/668590304487800832"
        target="_blank"
        class="link link-hover"
        >Donate</a
      >
    </div>
    <div>
      <span class="footer-title">Useful Links</span>
      <a
        href="https://ardas-legends-development-team.github.io/ardas-legends-bot-guide/"
        target="_blank"
        class="link link-hover"
        >Bot guide</a
      >
      <a
        href="https://docs.google.com/document/d/1XqMzhv3kFzISpDWdPIEqG4nQRZzGpzCP/edit#heading=h.451kvydu733g"
        target="_blank"
        class="link link-hover"
        >War guide</a
      >
      <a
        href="https://docs.google.com/document/d/1X6clF1TZcom64_XC1mcd6ZwnAULrzV8h/edit?rtpof=true"
        target="_blank"
        class="link link-hover"
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
    <div class="top-4 right-4">
      <a class="btn btn-primary inline-block mask mask-circle" href="#">
        <span class="sr-only">Back to top</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-5"
          viewBox="0 0 20 5"
          fill="#fffff"
        >
          <path
            fill-rule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </div>
  </footer>
</template>

<script>
import { defineComponent } from "vue";
import DiscordIcon from "@/components/images/DiscordIcon.vue";
import InstagramIcon from "@/components/images/InstagramIcon.vue";

export default defineComponent({
  components: { InstagramIcon, DiscordIcon },
});
</script>
