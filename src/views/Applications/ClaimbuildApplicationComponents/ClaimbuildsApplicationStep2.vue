<template>
  <div class="input-group">
    <select class="select select-bordered w-full" v-model="type">
      <option disabled selected>Claimbuild type</option>
      <option v-for="(type, index) in claimbuildTypes" :key="index">
        {{ type }}
      </option>
    </select>
  </div>
  <p class="mt-4 text-gray-500">Houses in the claimbuild</p>
  <div class="flex w-full">
    <div class="relative">
      <p class="text-gray-500">Small</p>
      <input
        type="number"
        maxlength="25"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="Small houses"
        v-model="houses.small"
      />
    </div>
    <div class="divider divider-horizontal"></div>
    <div class="relative">
      <p class="text-gray-500">Large</p>

      <input
        type="number"
        maxlength="25"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="Large houses"
        v-model="houses.medium"
      />
    </div>
    <div class="divider divider-horizontal"></div>
    <div class="relative">
      <p class="text-gray-500">Mansion</p>

      <input
        type="number"
        maxlength="25"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="Mansions"
        v-model="houses.large"
      />
    </div>
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
import { useClaimbuildsFormStore } from "@/stores/formStores";
import { ClaimbuildApiClient } from "@/ts/ApiService/ClaimbuildApiClient";

const emit = defineEmits(["nextStep", "previousStep"]);
const formData = useClaimbuildsFormStore();
const claimbuildTypes = ref<String[]>([]);
const type = ref<string>(formData.type);
const houses = ref<{ small: number; medium: number; large: number }>(
  formData.houses,
);
const isFormFilled = computed(() => {
  return (
    type.value !== "Claimbuild type" &&
    houses.value.small >= minimumSmallHouses.value &&
    houses.value.medium >= minimumLargeHouses.value &&
    houses.value.large >= minimumMansions.value
  );
});
const minimumSmallHouses = computed(() => {
  switch (type.value) {
    case "Hamlet":
    case "Stronghold":
      return 4;
    case "Village":
      return 8;
    case "Town":
      return 16;
    case "Capital":
      return 24;
    default:
      return 0;
  }
});
const minimumLargeHouses = computed(() => {
  switch (type.value) {
    case "Town":
      return 4;
    case "Capital":
      return 8;
    default:
      return 0;
  }
});
const minimumMansions = computed(() => {
  switch (type.value) {
    case "Capital":
      return 2;
    default:
      return 0;
  }
});

function nextStep() {
  emit("nextStep", {
    step: 2,
    type: type.value,
    houses: houses.value,
  });
}

function previousStep() {
  emit("previousStep");
}

ClaimbuildApiClient.loadClaimbuildTypes().then((types: string[]) => {
  claimbuildTypes.value = types;
});
</script>
