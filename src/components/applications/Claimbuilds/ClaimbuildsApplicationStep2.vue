<template>
  <div>
    <label for="claimbuildType" class="sr-only">Claimbuild Type</label>
    <div class="relative">
      <input
        type="text"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="Claimbuild Type"
        v-model="type"
      />
    </div>
  </div>

  <div class="flex w-full">
    <div class="relative">
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
      <input
        type="number"
        maxlength="25"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="Medium houses"
        v-model="houses.medium"
      />
    </div>
    <div class="divider divider-horizontal"></div>
    <div class="relative">
      <input
        type="number"
        maxlength="25"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="Large houses"
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
import { ApiClient } from "@/ts/ApiClient";

const emit = defineEmits(["nextStep", "previousStep"]);
const formData = useClaimbuildsFormStore();
const claimbuildTypes = ref<String[]>([]);
const type = ref<string>(formData.type);
const houses = ref<{ small: number; medium: number; large: number }>(
  formData.houses
);
const isFormFilled = computed(() => {
  return type.value;
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

ApiClient.loadClaimbuildTypes().then((types: string[]) => {
  claimbuildTypes.value = types;
});
</script>
