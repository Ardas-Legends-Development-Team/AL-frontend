<template>
  <div class="mx-3" v-if="isStaff">
    <div class="my-4 flex flex-row justify-center">
      <h2 class="text-3xl font-bold text-secondary">Submit Battle Results</h2>
    </div>
    <div class="mt-4 flex w-full flex-col">
      <label class="form-control my-2 w-full max-w-xs">
        <span class="label-text">Battle ID</span>
        <input
          type="text"
          placeholder="Battle ID"
          class="input input-bordered w-full max-w-xs"
          v-model="battleId"
        />
      </label>
      <label class="form-control my-2 w-full max-w-xs">
        <span class="label-text">Winning faction</span>
        <input
          type="text"
          placeholder="Winning faction"
          class="input input-bordered w-full max-w-xs"
          v-model="winningFaction"
        />
      </label>

      <!-- Surviving Units -->
      <h2 class="my-4 text-lg font-bold">Surviving Units</h2>
      <label class="form-control my-2 w-full max-w-xs">
        <span class="label-text">Army name</span>
        <input
          type="text"
          placeholder="Army name"
          class="input input-bordered w-full max-w-xs"
          v-model="currentArmy.armyName"
        />
      </label>
      <div class="divider" />
      <label class="form-control my-2 w-full max-w-xs">
        <span class="label-text">Unit name</span>
        <input
          type="text"
          placeholder="Unit name"
          class="input input-bordered w-full max-w-xs"
          v-model="currentUnit.unitName"
        />
      </label>
      <label class="form-control my-2 w-full max-w-xs">
        <span class="label-text">Amount of survivors</span>
        <input
          type="text"
          placeholder="Army name"
          class="input input-bordered w-full max-w-xs"
          v-model="currentUnit.count"
        />
      </label>
      <button class="btn join-item" @click="addUnitToArmy">
        Add Unit
        <span class="badge badge-primary badge-outline mx-1">+</span>
      </button>
      <div class="flex flex-row flex-wrap">
        <div v-for="(unit, index) in currentArmy.survivingUnits" :key="index">
          <span class="badge badge-outline mx-1"
            >{{ unit.count }} {{ unit.unitType.name }}
          </span>
          <span
            class="badge badge-primary badge-outline mr-2"
            @click="removeUnitFromArmy(index)"
            >-</span
          >
        </div>
      </div>
      <div class="divider" />

      <div class="indicator justify-self-center">
        <button class="btn join-item" @click="addArmyToSurvivors">
          Add Army
          <span class="badge badge-primary badge-outline mx-1">+</span>
        </button>
      </div>
      <div class="my-4 flex flex-row flex-wrap">
        <div v-for="(army, index) in survivingUnits" :key="index">
          <span class="badge badge-outline mx-1">{{ army.armyName }} </span>

          <span
            class="badge badge-primary badge-outline mr-2"
            @click="removeArmyFromSurvivors(index)"
            >-</span
          >
        </div>
      </div>

      <!-- Killed Players -->
      <h2 class="my-4 text-lg font-bold">Killed Players</h2>
      <label class="form-control my-2 w-full max-w-xs">
        <span class="label-text">Victim Discord ID</span>
        <input
          type="text"
          placeholder="Victim Discord ID"
          class="input input-bordered w-full max-w-xs"
          v-model="currentKilledPlayer.discordId"
        />
      </label>
      <label class="form-control my-2 w-full max-w-xs">
        <span class="label-text">Killer Discord ID</span>
        <input
          type="text"
          placeholder="Killer Discord ID"
          class="input input-bordered w-full max-w-xs"
          v-model="currentKilledPlayer.slainByPlayer"
        />
      </label>
      <label class="form-control my-2 w-full max-w-xs">
        <span class="label-text">Slain by Weapon</span>
        <input
          type="text"
          placeholder="Killer's weapon"
          class="input input-bordered w-full max-w-xs"
          v-model="currentKilledPlayer.slainByWeapon"
        />
      </label>
      <label class="form-control my-2 w-full max-w-xs">
        <span class="label-text">Optional cause of death</span>
        <input
          type="text"
          placeholder="Army name"
          class="input input-bordered w-full max-w-xs"
          v-model="currentKilledPlayer.optionalCause"
        />
      </label>
      <button class="btn join-item" @click="addKilledPlayer">
        Add Player
        <span class="badge badge-primary badge-outline mx-1">+</span>
      </button>
      <div class="my-4 flex flex-row flex-wrap">
        <div v-for="(player, index) in playersKilled" :key="index">
          <span class="badge badge-outline mx-1">{{ player.discordId }} </span>
          <span
            class="badge badge-primary badge-outline mr-2"
            @click="removeKilledPlayer(index)"
            >-</span
          >
        </div>
      </div>
      <button
        v-if="!isConfirming"
        class="btn btn-secondary my-4"
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
import { AlertHandler } from "@/ts/AlertHandler";
import { Unit } from "@/ts/types/Unit";
import { ArmyApiClient } from "@/ts/ApiService/ArmyApiClient";
import { UnitType } from "@/ts/types/UnitType";
import { ErrorHandler } from "@/ts/ErrorHandler";
import { PlayerApiClient } from "@/ts/ApiService/PlayerApiClient";
// TODO: convert it into a view rather than a modal

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const isStaff = ref(false);

const availableUnitTypes = ref<UnitType[]>([]);

const battleId = ref("");
const winningFaction = ref("");
const survivingUnits = ref<{ armyName: string; survivingUnits: Unit[] }[]>([]);
const playersKilled = ref<
  {
    discordId: string;
    slainByPlayer: string; // Discord ID of slayer
    slainByWeapon: string;
    optionalCause: string;
  }[]
>([]);

const currentArmy = ref<{ armyName: string; survivingUnits: Unit[] }>({
  armyName: "",
  survivingUnits: [],
});

const currentUnit = ref<{ count: number; unitName: string }>({
  count: 0,
  unitName: "",
});

const currentKilledPlayer = ref<{
  discordId: string;
  slainByPlayer: string; // Discord ID of slayer
  slainByWeapon: string;
  optionalCause: string;
}>({
  discordId: "",
  slainByPlayer: "",
  slainByWeapon: "",
  optionalCause: "",
});

const emit = defineEmits(["close"]);
const isConfirming = ref(false);

// TODO: if unit already exists merge with previous
function addUnitToArmy() {
  const unitName = currentUnit.value.unitName.toLowerCase();
  // Find the unit type from the available unit types via the unit name
  const unitType = availableUnitTypes.value.find(
    (unitType) => unitType.name.toLowerCase() === unitName,
  );
  if (!unitType) {
    ErrorHandler.throwError("Unit type not found");
    return;
  }
  currentArmy.value.survivingUnits.push({
    unitType: unitType,
    count: currentUnit.value.count,
  });
  currentUnit.value = { count: 0, unitName: "" };
}

function removeUnitFromArmy(index: number) {
  currentArmy.value.survivingUnits.splice(index, 1);
}

function addArmyToSurvivors() {
  survivingUnits.value.push({
    armyName: currentArmy.value.armyName,
    survivingUnits: currentArmy.value.survivingUnits,
  });
  currentArmy.value = { armyName: "", survivingUnits: [] };
}

function removeArmyFromSurvivors(index: number) {
  survivingUnits.value.splice(index, 1);
}

function addKilledPlayer() {
  playersKilled.value.push(currentKilledPlayer.value);
  currentKilledPlayer.value = {
    discordId: "",
    slainByPlayer: "",
    slainByWeapon: "",
    optionalCause: "",
  };
}

function removeKilledPlayer(index: number) {
  playersKilled.value.splice(index, 1);
}

function closeModal() {
  emit("close");
}

async function askForConfirmation(): Promise<void> {
  isConfirming.value = true;
}

async function submitAction(): Promise<void> {
  // API CALL HERE

  AlertHandler.showSuccessAlert("Battle logged successfully");
  closeModal();
}

PlayerApiClient.loadPlayerInfo().then((player) => {
  isStaff.value = player.isStaff;
});

ArmyApiClient.getAllAvailableUnitTypes().then((unitTypes) => {
  availableUnitTypes.value = unitTypes;
});
</script>
