<template>
  <div>
    <label for="charname" class="sr-only"
      >Why do you want to be this character?</label
    >
    <div class="relative">
      <textarea
        class="textarea textarea-bordered textarea-lg w-full max-w-xs"
        placeholder="Why do you want to be this character?"
        v-model="characterReason"
      ></textarea>
    </div>
  </div>
  <div>
    <label for="ign" class="sr-only">Character Title</label>

    <div class="relative">
      <label class="label">
        <span class="label-text text-secondary">
          Optional, must contain either the faction name OR be incredibly clear
          as to what faction you are in.
        </span>
      </label>
      <input
        type="text"
        maxlength="25"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="Character Title"
        v-model="characterTitle"
      />
    </div>
  </div>
  <div class="input-group">
    <select class="select select-bordered w-full" v-model="factionName">
      <option disabled selected>Your faction</option>
      <option v-for="(faction, index) in factions" :key="index">
        {{ faction }}
      </option>
    </select>
  </div>
  <div class="btn-group grid grid-cols-2">
    <button class="btn btn-outline" @click="previousStep()">
      Previous page
    </button>
    <button
      :disabled="!isFormFilled"
      class="btn btn-outline"
      @click="nextStep()"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoleplayCharacterFormStore } from "@/stores/formStores";
import { FactionApiClient } from "@/ts/ApiService/FactionApiClient";
import { useFactionsStore } from "@/stores/generalInfoStores";

const emit = defineEmits(["nextStep", "previousStep"]);
const formData = useRoleplayCharacterFormStore();
const factions = ref<String[]>(useFactionsStore().factionNames);
const characterTitle = ref<string>(formData.characterTitle);
const factionName = ref<string>(formData.factionName);
const characterReason = ref<string>(formData.characterReason);
const isFormFilled = computed(() => {
  return (
    factions.value &&
    characterReason.value &&
    factionName.value !== "Your faction"
  );
});

function nextStep() {
  emit("nextStep", {
    step: 2,
    characterTitle: characterTitle.value,
    factionName: factionName.value,
    characterReason: characterReason.value,
  });
}

function previousStep() {
  emit("previousStep");
}

FactionApiClient.loadFactionNames().then((factionNames: string[]) => {
  factions.value = factionNames;
});
</script>
