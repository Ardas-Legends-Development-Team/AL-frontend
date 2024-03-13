<template>
  <div class="modal" :class="isOpen ? 'modal-open' : ''">
    <div class="modal-box">
      <label
        class="btn-m btn btn-circle btn-primary btn-outline absolute right-2 top-2"
        @click="closeModal"
        >✕</label
      >
      <h3 class="text-lg font-bold">Create army description</h3>
      <div class="mt-4 flex w-full flex-col">
        <h3 class="mt-4 text-lg font-bold text-secondary">Army Name</h3>
        <input
          class="input input-bordered my-2"
          placeholder="Army name"
          v-model="armyName"
        />
        <h3 class="mt-4 text-lg font-bold text-secondary">Army Type</h3>
        <select class="select select-bordered my-2 w-full" v-model="armyType">
          <option disabled selected>Army Type</option>
          <option
            v-for="(armyType, index) in availableArmyTypes"
            :key="index"
            :disabled="armyType === 'Army Type'"
          >
            {{ armyType }}
          </option>
        </select>
        <h3 class="mt-4 text-lg font-bold text-secondary">Claimbuild Name</h3>
        <select
          class="select select-bordered my-2 w-full"
          v-model="claimbuildName"
        >
          <option disabled selected>Claimbuilds</option>
          <option
            v-for="(claimbuild, index) in availableClaimbuilds"
            :key="index"
            :disabled="claimbuild === 'Claimbuilds'"
          >
            {{ claimbuild }}
          </option>
        </select>
        <h3 class="mt-4 text-lg font-bold text-secondary">Units</h3>
        <div class="flex w-full flex-row flex-wrap">
          <select
            class="flex-3 select select-bordered grow"
            v-model="selectedUnit.unitType"
          >
            <option disabled selected>Unit Type</option>
            <option
              v-for="(type, index) in availableUnitTypes"
              :key="index"
              @select="selectUnitType(type.name)"
            >
              {{ type.name }}
            </option>
          </select>
          <div class="form-control min-w-[30%] grow-0">
            <input
              type="number"
              placeholder="Amount"
              class="input input-bordered w-full"
              v-model="selectedUnit.count"
            />
          </div>
          <div class="indicator justify-self-center">
            <button class="btn join-item" @click="addUnitToArmy">
              Add
              <span class="badge badge-primary badge-outline mx-1">+</span>
            </button>
          </div>
          <div class="flex flex-row flex-wrap">
            <div v-for="(unit, index) in units" :key="index">
              <span class="badge badge-outline mx-1"
                >{{ unit.count }} {{ unit.unitType }}
              </span>

              <span
                class="badge badge-primary badge-outline mr-2"
                @click="removeUnitFromArmy(index)"
                >-</span
              >
            </div>
          </div>
        </div>
      </div>
      <button
        v-if="!isConfirming"
        class="btn btn-primary btn-outline mt-4"
        @click="askForConfirmation"
      >
        Submit
      </button>
      <button
        v-else
        class="btn btn-error btn-outline mt-4"
        @click="submitAction"
      >
        Are you sure ?
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { UnitType } from "@/ts/types/UnitType";
import { ClaimbuildApiClient } from "@/ts/ApiService/ClaimbuildApiClient";
import { Claimbuild } from "@/ts/types/Claimbuild";
import { usePlayerStore } from "@/stores/playerStores";
import { ArmyControlApiClient } from "@/ts/ApiService/ArmyControlApiClient";
import { AlertHandler } from "@/ts/AlertHandler";
import { ArmyApiClient } from "@/ts/ApiService/ArmyApiClient";
import { Unit } from "@/ts/types/Unit";

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const armyName = ref("");
const armyType = ref("");
const claimbuildName = ref("");
const units = ref<Unit[]>([]);

// The currently selected unit when creating the army composition
const selectedUnit = ref<Unit>({
  unitType: {
    name: "",
    tokenCost: 0,
    isMounted: false,
    usableBy: [],
  },
  count: 0,
});

const availableArmyTypes = ref<string[]>(["Army", "Trade Company"]);
const availableClaimbuilds = ref<string[]>([]);
const availableUnitTypes = ref<UnitType[]>([]);

const emit = defineEmits(["close"]);
const isConfirming = ref(false);

function addUnitToArmy() {
  units.value.push({
    unitType: selectedUnit.value.unitType,
    count: selectedUnit.value.count,
  });
  selectedUnit.value.unitType = {
    name: "",
    tokenCost: 0,
    isMounted: false,
    usableBy: [],
  };
  selectedUnit.value.count = 0;
}

function removeUnitFromArmy(index: number) {
  units.value.splice(index, 1);
}

function selectUnitType(unitTypeName: string) {
  const selectedUnitType = availableUnitTypes.value.find(
    (unitType) => unitType.name === unitTypeName,
  );
  if (selectedUnitType) {
    selectedUnit.value.unitType = selectedUnitType;
  }
}

function closeModal() {
  emit("close");
}

async function askForConfirmation(): Promise<void> {
  isConfirming.value = true;
}

async function submitAction(): Promise<void> {
  // Correctly format army type
  const formattedArmyType =
    armyType.value === "Army" ? "ARMY" : "TRADE_COMPANY";
  await ArmyControlApiClient.createArmy(
    armyName.value,
    formattedArmyType,
    claimbuildName.value,
    units.value,
  );

  AlertHandler.showSuccessAlert("Army created successfully");
  closeModal();
}

ClaimbuildApiClient.loadAllClaimbuilds().then((claimbuilds: Claimbuild[]) => {
  // Get only claimbuilds of the player's faction
  const playerFaction = usePlayerStore().faction;
  claimbuilds = claimbuilds.filter(
    (claimbuild) => claimbuild.faction === playerFaction,
  );
  // Get only claimbuilds that can produce armies (castle, stronghold, town and capital)
  claimbuilds = claimbuilds.filter(
    (claimbuild) =>
      claimbuild.claimBuildType === "Castle" ||
      claimbuild.claimBuildType === "Stronghold" ||
      claimbuild.claimBuildType === "Town" ||
      claimbuild.claimBuildType === "Capital",
  );

  // Get only the claimbuild names and append to availableClaimbuilds
  availableClaimbuilds.value.push(
    ...claimbuilds.map((claimbuild) => claimbuild.name),
  );
});

ArmyApiClient.getAllAvailableUnitTypes().then((unitTypes: UnitType[]) => {
  availableUnitTypes.value = [...unitTypes];
});
</script>
