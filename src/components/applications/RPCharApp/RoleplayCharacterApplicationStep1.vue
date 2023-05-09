<template>
  <div>
    <label for="ign" class="sr-only">In-game name</label>

    <div class="relative">
      <input
        required
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
  <button
    :disabled="!isFormFilled"
    class="btn btn-outline w-full"
    @click="nextStep()"
  >
    Next
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoleplayCharacterFormStore } from "@/stores/formStores";

// previousStep event is not used in this component, but in the next 2 steps
const emit = defineEmits(["nextStep", "previousStep"]);
const formData = useRoleplayCharacterFormStore();
const ign = ref<string>(formData.ign);
const charName = ref<string>(formData.charName);
const preference = ref<string>(formData.preference);

const isFormFilled = computed(() => {
  return (
    ign.value &&
    charName.value &&
    preference.value !== "Your in-game preference"
  );
});

function nextStep() {
  emit("nextStep", {
    step: 1,
    ign: ign.value,
    charName: charName.value,
    preference: preference.value,
  });
}
</script>
