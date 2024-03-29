<template>
  <div>
    <p class="mt-4 text-gray-500">What Production Sites are Present?</p>

    <div class="flex w-full flex-row flex-wrap">
      <select
        class="flex-3 select select-bordered grow"
        v-model="selectedProductionSite.type"
      >
        <option disabled selected>Production Site</option>
        <option
          v-for="(type, index) in availableProductionSiteTypes"
          :key="index"
        >
          {{ type }}
        </option>
      </select>
      <select
        class="join-item select select-bordered flex-1 grow"
        v-model="selectedProductionSite.resource"
      >
        <option disabled selected>Resource</option>
        <option
          v-for="(resource, index) in selectedProductionSiteAvailableResources"
          :key="index"
        >
          {{ resource }}
        </option>
      </select>
      <div class="form-control min-w-[30%] grow-0">
        <input
          type="number"
          placeholder="Amount"
          class="input input-bordered w-full"
          v-model="selectedProductionSite.count"
        />
      </div>
      <div class="indicator">
        <button class="btn join-item" @click="addProductionSite">
          Add
          <span class="badge badge-primary badge-outline mx-1">+</span>
        </button>
      </div>
    </div>
  </div>
  <div class="flex flex-row flex-wrap">
    <div v-for="(productionSite, index) in productionSites" :key="index">
      <span class="badge badge-outline mx-1"
        >{{ productionSite.count }} {{ productionSite.type }} producing
        {{ productionSite.resource }}</span
      >

      <span
        class="badge badge-primary badge-outline mr-2"
        @click="removeProductionSite(index)"
        >-</span
      >
    </div>
  </div>

  <p class="mt-4 text-gray-500">What Special Buildings are Present?</p>

  <div>
    <div class="flex flex-row flex-wrap">
      <select
        class="select select-bordered grow"
        v-model="selectedSpecialBuilding"
      >
        <option disabled selected>Special Building</option>
        <option
          v-for="(building, index) in availableSpecialBuildings"
          :key="index"
        >
          {{ building }}
        </option>
      </select>
      <div class="indicator">
        <button class="btn join-item" @click="addSpecialBuilding">
          Add
          <span class="badge badge-primary badge-outline mx-1">+</span>
        </button>
      </div>
    </div>
  </div>
  <div class="flex flex-row flex-wrap">
    <div v-for="(specialBuilding, index) in specialBuildings" :key="index">
      <span class="badge badge-outline mx-1">{{ specialBuilding }}</span>

      <span
        class="badge badge-primary badge-outline mr-2"
        @click="removeSpecialBuilding(index)"
        >-</span
      >
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
import { ProductionSite, ProductionSiteWithCount } from "@/ts/types/Claimbuild";
import { ClaimbuildApiClient } from "@/ts/ApiService/ClaimbuildApiClient";

const emit = defineEmits(["nextStep", "previousStep"]);
const formData = useClaimbuildsFormStore();
const availableProductionSites = ref<ProductionSite[]>([]);
const availableProductionSiteTypes = ref<string[]>([]);
const availableSpecialBuildings = ref<string[]>([]);
const productionSites = ref<ProductionSiteWithCount[]>(
  formData.productionSites,
);
const selectedProductionSite = ref<ProductionSiteWithCount>({
  type: "Production Site",
  count: 0,
  resource: "Resource",
});
const specialBuildings = ref<string[]>(formData.specialBuildings);
const selectedSpecialBuilding = ref<string>("Special Building");
const isFormFilled = computed(() => {
  return productionSites.value.length > 0;
});

// Add a computed property to get the resources for the selected production site
// This is used to filter the resources in the dropdown
const selectedProductionSiteAvailableResources = computed(() => {
  return availableProductionSites.value
    .filter((building) => building.type === selectedProductionSite.value.type)
    .map((building) => building.resource);
});

function addProductionSite() {
  if (
    selectedProductionSite.value.type === "Production Site" ||
    selectedProductionSite.value.resource === "Resource" ||
    selectedProductionSite.value.count === 0
  ) {
    return;
  }
  // Verify that the selected production site already exists, if yes then add the count
  const existingProductionSite = productionSites.value.find(
    (site) =>
      site.type === selectedProductionSite.value.type &&
      site.resource === selectedProductionSite.value.resource,
  );
  if (existingProductionSite) {
    existingProductionSite.count += selectedProductionSite.value.count;
    selectedProductionSite.value = {
      type: "Production Site",
      count: 0,
      resource: "Resource",
    };
    return;
  }
  productionSites.value.push(selectedProductionSite.value);
  selectedProductionSite.value = {
    type: "Production Site",
    count: 0,
    resource: "Resource",
  };
}

function removeProductionSite(index: number) {
  productionSites.value.splice(index, 1);
}

function addSpecialBuilding() {
  if (selectedSpecialBuilding.value === "Special Building") {
    return;
  }
  specialBuildings.value.push(selectedSpecialBuilding.value);
  selectedSpecialBuilding.value = "Special Building";
}

function removeSpecialBuilding(index: number) {
  specialBuildings.value.splice(index, 1);
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

Promise.all([
  ClaimbuildApiClient.loadProductionSiteTypes(),
  ClaimbuildApiClient.loadSpecialBuildingTypes(),
]).then(([sites, buildings]) => {
  //Filters the result, so it only contains every production site type once
  availableProductionSites.value = sites;
  const allTypesNotFiltered = sites.map((site) => site.type);
  availableProductionSiteTypes.value = allTypesNotFiltered.filter(
    (item, pos) => {
      return allTypesNotFiltered.indexOf(item) === pos;
    },
  );
  availableSpecialBuildings.value = buildings;
});
</script>
