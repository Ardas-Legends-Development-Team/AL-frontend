<template>
  <div class="input-group">
    <select class="select select-bordered w-full" v-model="type">
      <option disabled selected>Claimbuild Type</option>
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
      <p class="text-gray-500">Large</p>

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
  formData.houses
);
const isFormFilled = computed(() => {
  return (
    type.value !== "Claimbuild Type" &&
    (houses.value.small > 0 ||
      houses.value.medium > 0 ||
      houses.value.large > 0)
  );
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
