<template>
  <div>
    <label for="shops" class="sr-only"
      >What Production Sites are Present?</label
    >

    <div class="join">
      <select class="select select-bordered join-item">
        <option disabled selected>Production Site</option>
        <option>Building 1</option>
        <option>Farm</option>
        <option>Mine</option>
      </select>
      <div class="relative">
        <input
          required
          type="text"
          class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
          placeholder="Resource (e.g. Wood)"
          v-model="currentProductionSite.resource"
        />
      </div>
      <div class="relative">
        <input
          type="number"
          maxlength="25"
          class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
          placeholder="Amount"
          v-model="currentProductionSite.count"
        />
      </div>
      <div class="indicator">
        <button class="btn join-item">Add</button>
      </div>
    </div>
  </div>
  <div>
    <label for="shops" class="sr-only"
      >What Special Buildings are Present?</label
    >

    <div class="join">
      <div class="relative">
        <input
          type="number"
          maxlength="25"
          class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
          placeholder="Z"
          v-model="coordinate.z"
        />
      </div>
      <select class="select select-bordered join-item">
        <option disabled selected>Production Site</option>
        <option>Building 1</option>
        <option>Farm</option>
        <option>Mine</option>
      </select>
      <div class="indicator">
        <button class="btn join-item">Add</button>
      </div>
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
      Submit Application
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useClaimbuildsFormStore } from "@/stores/formStores";
import { ProductionSiteWithCount } from "@/ts/types/ProductionSite";
import { ApiClient } from "@/ts/ApiClient";

const emit = defineEmits(["nextStep", "previousStep"]);
const formData = useClaimbuildsFormStore();
const availableProductionSites = ref<string[]>([]);
const availableSpecialBuildings = ref<string[]>([]);
const productionSites = ref<ProductionSiteWithCount[]>(
  formData.productionSites
);
const currentProductionSite = ref<ProductionSiteWithCount>({
  type: "",
  count: 0,
  resource: "",
});
const specialBuildings = ref<string[]>(formData.specialBuildings);
const isFormFilled = computed(() => {
  return productionSites.value.length > 0;
});

function addProductionSite(count: number, type: string, resource: string) {
  productionSites.value.push({
    type: type,
    count: count,
    resource: resource,
  });
}

function addSpecialBuilding(type: string) {
  specialBuildings.value.push(type);
}

function nextStep() {
  emit("nextStep", {
    step: 3,
    productionSites: productionSites.value,
    specialBuildings: specialBuildings.value,
  });
}

function previousStep() {
  emit("previousStep");
}

ApiClient.loadProductionSiteTypes().then((sites: string[]) => {
  availableProductionSites.value = sites;
});

ApiClient.loadSpecialBuildingTypes().then((buildings) => {
  availableSpecialBuildings.value = buildings;
});
</script>
