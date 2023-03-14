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

  <div class="input-group">
    <select class="select select-bordered w-full" v-model="faction">
      <option disabled selected>Your faction</option>
      <option v-for="faction in factions" :key="faction">
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
      class="btn btn-outline w-full"
      @click="nextStep()"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useClaimbuildsFormStore } from "@/stores/formStores";
import ApiClient from "@/ts/ApiClient";
import { useFactionsStore } from "@/stores/generalInfoStores";
// previousStep event is not used in this component, but in the next 2 steps
const emit = defineEmits(["nextStep", "previousStep"]);
const formData = useClaimbuildsFormStore();
const factions = ref<String[]>([]);
const ign = ref<string>(formData.ign);
const faction = ref<string>(formData.faction);
const isFormFilled = computed(() => {
  return faction.value && ign.value && faction.value !== "Your faction";
});

function nextStep() {
  emit("nextStep", {
    step: 1,
    ign: ign.value,
    faction: faction.value,
  });
}

function previousStep() {
  emit("previousStep");
}

ApiClient.loadFactions();
factions.value = useFactionsStore().factions;
</script>
