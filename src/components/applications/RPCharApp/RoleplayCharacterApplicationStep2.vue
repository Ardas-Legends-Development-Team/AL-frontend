<template>
  <div>
    <label for="charname" class="sr-only"
      >Why do you want to be this character?</label
    >
    <div class="relative">
      <textarea
        class="textarea textarea-bordered textarea-lg w-full max-w-xs"
        placeholder="Why do you want to be this character?"
        v-model="reason"
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
        v-model="title"
      />
    </div>
  </div>
  <div class="input-group">
    <select class="select select-bordered w-full" v-model="faction">
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
import { useRoleplayCharacterFormStore } from "@/stores/formStores";
import ApiClient from "@/ts/ApiClient";

const emit = defineEmits(["nextStep", "previousStep"]);
const formData = useRoleplayCharacterFormStore();
const factions = ref<String[]>([]);
const title = ref<string>(formData.title);
const reason = ref<string>(formData.reason);
const faction = ref<string>(formData.faction);
const isFormFilled = computed(() => {
  return factions.value && reason.value && faction.value !== "Your faction";
});

function nextStep() {
  emit("nextStep", {
    step: 2,
    title: title.value,
    reason: reason.value,
    faction: faction.value,
  });
}

function previousStep() {
  emit("previousStep");
}

ApiClient.loadFactions().then((factionList) => {
  factions.value = factionList;
});
</script>
