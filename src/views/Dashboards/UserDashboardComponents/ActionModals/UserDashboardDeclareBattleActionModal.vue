<template>
  <div class="modal" :class="isOpen ? 'modal-open' : ''">
    <div class="modal-box">
      <label
        class="btn-m btn btn-circle btn-primary btn-outline absolute right-2 top-2"
        @click="closeModal"
        >✕</label
      >
      <h3 class="text-lg font-bold">Declare battle description</h3>
      <div class="mt-4 flex w-full flex-col">
        <h3 class="mt-4 text-lg font-bold text-secondary">Battle Name</h3>
        <input
          class="input input-bordered my-2"
          placeholder="Battle name"
          v-model="battleName"
        />
        <h3 class="mt-4 text-lg font-bold text-secondary">
          Is it a siege battle?
        </h3>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Yes</span>
            <input
              type="radio"
              name="radio-10"
              class="radio checked:bg-red-500"
              @click="updateTargetList"
            />
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">No</span>
            <input
              type="radio"
              name="radio-10"
              class="radio checked:bg-blue-500"
              checked
              @click="updateTargetList"
            />
          </label>
        </div>
        <h3 class="mt-4 text-lg font-bold text-secondary">Battle target</h3>
        <select class="select select-bordered my-2 w-full" v-model="targetName">
          <option disabled selected>
            {{ isFieldBattle ? "Armies" : "Claimbuilds" }}
          </option>
          <option
            v-for="(target, index) in availableTargets"
            :key="index"
            :disabled="target === 'Claimbuilds' || target === 'Armies'"
          >
            {{ target }}
          </option>
        </select>
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
import { ClaimbuildApiClient } from "@/ts/ApiService/ClaimbuildApiClient";
import { usePlayerStore } from "@/stores/playerStores";
import { AlertHandler } from "@/ts/AlertHandler";
import { getArmyBoundToPlayer, getEnemiesOfFaction } from "@/ts/utilities";
import { ArmyApiClient } from "@/ts/ApiService/ArmyApiClient";
import { WarApiClient } from "@/ts/ApiService/WarApiClient";

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const battleName = ref("");
const isFieldBattle = ref(true);
const targetName = ref("");

const availableTargets = ref<string[]>([]);

const emit = defineEmits(["close"]);
const isConfirming = ref(false);

function closeModal() {
  emit("close");
}

async function askForConfirmation(): Promise<void> {
  isConfirming.value = true;
}

async function updateTargetList() {
  // We switch the previous value of isFieldBattle due to the radio button
  isFieldBattle.value = !isFieldBattle.value;

  // Get the factions with which the player faction is at war with and get their names
  const enemiesOfFaction = await getEnemiesOfFaction(usePlayerStore().faction);

  // Depending on if it is a field battle or not, we fetch armies or claimbuilds to define the possible targets
  if (isFieldBattle.value) {
    // Fetch all armies
    const armies = await ArmyApiClient.loadArmies();

    // Get armies belonging to the enemy factions
    const enemyArmies = [];
    for (const army of armies) {
      if (enemiesOfFaction.includes(army.nameOfFaction)) {
        enemyArmies.push(army);
      }
    }
    availableTargets.value = enemyArmies.map((army) => army.nameOfArmy);
  } else {
    // Fetch all claimbuilds
    const claimbuilds = await ClaimbuildApiClient.loadAllClaimbuilds();

    // Get claimbuilds belonging to the enemy factions
    const enemyClaimbuilds = [];
    for (const claimbuild of claimbuilds) {
      if (enemiesOfFaction.includes(claimbuild.faction)) {
        enemyClaimbuilds.push(claimbuild);
      }
    }

    availableTargets.value = enemyClaimbuilds.map(
      (claimbuild) => claimbuild.name,
    );
  }
}

async function submitAction(): Promise<void> {
  // Fetch the army of the player
  const playerArmy = await getArmyBoundToPlayer(usePlayerStore().faction);
  // Declare the battle
  WarApiClient.declareBattle(
    battleName.value,
    playerArmy,
    targetName.value,
    isFieldBattle.value,
  ).then(() => {
    AlertHandler.showSuccessAlert("Battle declared successfully");
  });
  closeModal();
}
</script>
