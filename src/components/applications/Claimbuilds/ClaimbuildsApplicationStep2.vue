<template>
  <div>
    <label for="region" class="sr-only">Region</label>
    <div class="relative">
      <input
        type="text"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="Region"
        v-model="region"
      />
    </div>
  </div>

  <div class="input-group">
    <select class="select select-bordered w-full" v-model="buildType">
      <option disabled selected>Type of build</option>
      <option v-for="faction in factions" :key="faction">
        {{ faction }}
      </option>
    </select>
  </div>

  <div>
    <label for="ign" class="sr-only">Name of build</label>

    <div class="relative">
      <input
        type="text"
        maxlength="25"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="Name of build"
        v-model="buildName"
      />
    </div>
  </div>

  <div class="flex w-full">
    <div class="relative">
      <input
        type="number"
        maxlength="25"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="X"
        v-model="buildCoordinatesX"
      />
    </div>
    <div class="divider divider-horizontal"></div>
    <div class="relative">
      <input
        type="number"
        maxlength="25"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="Y"
        v-model="buildCoordinatesY"
      />
    </div>
    <div class="divider divider-horizontal"></div>
    <div class="relative">
      <input
        type="number"
        maxlength="25"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="Z"
        v-model="buildCoordinatesZ"
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
import ApiClient from "@/ts/ApiClient";
import { useFactionsStore } from "@/stores/generalInfoStores";

const emit = defineEmits(["nextStep", "previousStep"]);
const apiClient = new ApiClient();
const formData = useClaimbuildsFormStore();
const factions = ref<String[]>([]);
const region = ref<string>(formData.region);
const buildName = ref<string>(formData.buildName);
const buildType = ref<string>(formData.buildType);
const buildCoordinatesX = ref<number>(formData.buildCoordinatesX);
const buildCoordinatesY = ref<number>(formData.buildCoordinatesY);
const buildCoordinatesZ = ref<number>(formData.buildCoordinatesZ);
const isFormFilled = computed(() => {
  return (
    region.value &&
    buildName.value &&
    buildType.value !== "Type of build" &&
    buildCoordinatesX.value &&
    buildCoordinatesY.value &&
    buildCoordinatesZ.value
  );
});

function nextStep() {
  emit("nextStep", {
    step: 2,
    region: region.value,
    buildName: buildName.value,
    buildType: buildType.value,
    buildCoordinatesX: buildCoordinatesX.value,
    buildCoordinatesY: buildCoordinatesY.value,
    buildCoordinatesZ: buildCoordinatesZ.value,
  });
}

function previousStep() {
  emit("previousStep");
}

apiClient.loadFactions();
factions.value = useFactionsStore().factions;
</script>
