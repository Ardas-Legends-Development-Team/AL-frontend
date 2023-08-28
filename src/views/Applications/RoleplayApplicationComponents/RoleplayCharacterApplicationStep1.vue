<template>
  <div>
    <label for="charname" class="sr-only">Character Name</label>
    <div class="relative">
      <input
        type="text"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="Character name"
        v-model="characterName"
      />
    </div>
  </div>
  <div class="input-group">
    <select class="select select-bordered w-full" v-model="pvpPreference">
      <option disabled>Your in-game preference</option>
      <option>PvP</option>
      <option>PvE</option>
    </select>
  </div>
  <button
    :disabled="!isFormFilled"
    class="btn btn-outline w-full"
    @click="nextStep()"
  >
    Next
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoleplayCharacterFormStore } from "@/stores/formStores";

// previousStep event is not used in this component, but in the next 2 steps
const emit = defineEmits(["nextStep", "previousStep"]);
const formData = useRoleplayCharacterFormStore();
const characterName = ref<string>(formData.characterName);
const pvpPreference = ref<string>(formData.pvpPreference);

const isFormFilled = computed(() => {
  return (
    characterName.value && pvpPreference.value !== "Your in-game preference"
  );
});

function nextStep() {
  emit("nextStep", {
    step: 1,
    characterName: characterName.value,
    pvpPreference: pvpPreference.value,
  });
}
</script>
