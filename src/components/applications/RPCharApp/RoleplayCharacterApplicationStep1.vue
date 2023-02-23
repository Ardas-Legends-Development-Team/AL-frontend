<template>
  <div>
    <label for="ign" class="sr-only">In-game name</label>

    <div class="relative">
      <input
        type="text"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="In-game name"
        v-model="ign"
      />
    </div>
  </div>
  <div>
    <label for="charname" class="sr-only">Character Name</label>
    <div class="relative">
      <input
        type="text"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="Character name"
        v-model="charName"
      />
    </div>
  </div>
  <div class="input-group">
    <select class="select select-bordered w-full" v-model="preference">
      <option disabled selected>Your in-game preference</option>
      <option>PvP</option>
      <option>PvE</option>
    </select>
  </div>
  <button class="btn btn-outline w-full" @click="nextStep()">Next</button>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["nextStep", "previousStep"]);
const ign = ref<string>("");
const charName = ref<string>("");
const preference = ref<string>("Your in-game preference");

function nextStep() {
  emit("nextStep", {
    step: 1,
    ign: ign.value,
    charName: charName.value,
    preference: preference.value,
  });
}

function previousStep() {
  emit("previousStep");
}
</script>
