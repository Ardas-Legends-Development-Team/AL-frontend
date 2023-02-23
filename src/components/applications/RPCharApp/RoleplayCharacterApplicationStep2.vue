<template>
  <div>
    <label for="ign" class="sr-only">Character Title</label>

    <div class="relative">
      <input
        type="text"
        maxlength="25"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="Character Title"
      />
    </div>
  </div>
  <div>
    <label for="charname" class="sr-only"
      >Why do you want to be this character?</label
    >
    <div class="relative">
      <textarea
        class="textarea textarea-bordered textarea-lg w-full max-w-xs"
        placeholder="Why do you want to be this character?"
      ></textarea>
    </div>
  </div>
  <div class="input-group">
    <select class="select select-bordered w-full">
      <option disabled selected>Your faction</option>
      <option v-for="faction in factions" :key="faction">
        {{ faction }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

const factions = ref<String[]>([]);

function loadFactions() {
  axios
    .get("http://localhost:8080/api/faction", {
      params: {
        size: 100,
      },
    })
    .then((response) => {
      response.data.content.forEach((faction: any) => {
        factions.value.push(faction.nameOfFaction);
      });
    });
}

loadFactions();
</script>
