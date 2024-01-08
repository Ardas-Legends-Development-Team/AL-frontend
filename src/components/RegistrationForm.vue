<template>
  <div class="background mx-auto min-h-screen max-w-screen-xl py-16">
    <div class="mx-auto max-w-lg rounded bg-base-200">
      <h1 class="py-4 text-center text-2xl font-bold text-primary sm:text-3xl">
        Register yourself
      </h1>

      <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
        Before you can start using the website, you need to register yourself in
        the roleplay system.
      </p>

      <form action="" class="mb-0 mt-6 space-y-4 rounded-lg p-8 shadow-2xl">
        <p class="text-lg font-medium">Please provide us your information</p>

        <div>
          <label for="email" class="text-sm font-medium"
            >Minecraft username (IGN)</label
          >

          <div class="relative mt-1">
            <input
              type="text"
              id="ign"
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter your IGN"
              v-model="ign"
            />
          </div>
        </div>

        <div>
          <label for="faction" class="text-sm font-medium">Faction</label>

          <div class="relative mt-1">
            <input
              type="text"
              id="faction"
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter your faction"
              v-model="faction"
            />
          </div>
        </div>

        <div v-if="error" class="text-error">{{ errMsg }}</div>

        <button
          @click="register()"
          type="button"
          class="btn btn-primary w-full px-5 py-3"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PlayerApiClient } from "@/ts/ApiService/PlayerApiClient";

const props = defineProps({
  discordId: {
    type: String,
    required: true,
  },
});

const ign = ref("");
const faction = ref("");
const error = ref(false);
const errMsg = ref("");

function register() {
  PlayerApiClient.registerPlayer(props.discordId, ign.value, faction.value)
    .then(() => window.location.reload())
    .catch((err) => {
      error.value = true;
      errMsg.value = err.response.data.message;
    });
}
</script>

<style scoped>
.background {
  background-image: url("https://ateettea.sirv.com/Background%20and%20layout/Screenshot%202023-03-06%20111013.png");
  background-size: cover;
}
</style>
