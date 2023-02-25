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
    <select class="select select-bordered w-full" v-model="buildFaction">
      <option disabled selected>Your faction</option>
      <option v-for="faction in factions" :key="faction">
        {{ faction }}
      </option>
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
import { useClaimbuildsFormStore } from "@/stores/formStores";
import axios from "axios";
// previousStep event is not used in this component, but in the next 2 steps
const emit = defineEmits(["nextStep", "previousStep"]);
const formData = useClaimbuildsFormStore();
const factions = ref<String[]>([]);
const ign = ref<string>(formData.ign);
const buildFaction = ref<string>(formData.buildFaction);
const isFormFilled = computed(() => {
  return (
    buildFaction.value && ign.value && buildFaction.value !== "Your faction"
  );
});

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

function nextStep() {
  emit("nextStep", {
    step: 1,
    ign: ign.value,
    buildFaction: buildFaction.value,
  });
}

loadFactions();
</script>
