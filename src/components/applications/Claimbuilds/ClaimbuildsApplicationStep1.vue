<template>
  <div>
    <label for="builtBy" class="sr-only">The builder names</label>

    <div class="relative">
      <input
        required
        type="text"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="The builder names"
        v-model="builtBy"
      />
    </div>
  </div>

  <div class="input-group">
    <select class="select select-bordered w-full" v-model="regionId">
      <option disabled selected>Region ID</option>
      <option v-for="(id, index) in regionIds" :key="index">
        {{ id.id }}
      </option>
    </select>
  </div>

  <div>
    <label for="claimbuildName" class="sr-only">The claimbuild name</label>

    <div class="relative">
      <input
        required
        type="text"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="Claimbuild name"
        v-model="claimbuildName"
      />
    </div>
  </div>

  <p class="mt-4 text-gray-500">Coordinates (XYZ)</p>
  <div class="flex w-full">
    <div class="relative">
      <input
        type="number"
        maxlength="25"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="X"
        v-model="coordinate.x"
      />
    </div>
    <div class="divider divider-horizontal"></div>
    <div class="relative">
      <input
        type="number"
        maxlength="25"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="Y"
        v-model="coordinate.y"
      />
    </div>
    <div class="divider divider-horizontal"></div>
    <div class="relative">
      <input
        type="number"
        maxlength="25"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="Z"
        v-model="coordinate.z"
      />
    </div>
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
import { RegionApiClient } from "@/ts/ApiService/RegionApiClient";
// previousStep event is not used in this component, but in the next steps
const emit = defineEmits(["nextStep", "previousStep"]);
const formData = useClaimbuildsFormStore();
const regionIds = ref<{ id: string }[]>([]);
const builtBy = ref<string>(formData.builtBy.join(", "));
const regionId = ref<string>("Region ID");
const coordinate = ref<{ x: number; y: number; z: number }>(
  formData.coordinate
);
const claimbuildName = ref<string>(formData.claimbuildName);
const isFormFilled = computed(() => {
  return (
    regionId.value &&
    builtBy.value &&
    regionId.value !== "Region ID" &&
    builtBy.value !== "In-game name" &&
    (coordinate.value.x !== 0 ||
      coordinate.value.y !== 0 ||
      coordinate.value.z !== 0) &&
    claimbuildName.value !== "Claimbuild name"
  );
});

function nextStep() {
  emit("nextStep", {
    step: 1,
    builtBy: builtBy.value,
    regionId: regionId.value,
    coordinate: coordinate.value,
    claimbuildName: claimbuildName.value,
  });
}

function previousStep() {
  emit("previousStep");
}

RegionApiClient.loadRegionIds().then((ids: string[]) => {
  regionIds.value = ids;
});
</script>
