<template>
  <div class="modal" :class="isOpen ? 'modal-open' : ''">
    <div class="modal-box">
      <label
        class="btn-m btn btn-circle btn-primary btn-outline absolute right-2 top-2"
        @click="closeModal"
        >✕</label
      >
      <h3 class="text-lg font-bold">{{ description }}</h3>
      <div class="mt-4 flex w-full flex-col">
        <div v-for="(input, index) in shownInputs" :key="index">
          <h3 class="mt-4 text-lg font-bold text-secondary">
            {{ input.placeholder }}
          </h3>
          <input
            v-if="input.type === 'text'"
            class="input input-bordered my-2"
            :type="input.type"
            :placeholder="input.placeholder"
            v-model="input.selectedOption"
          />
          <div v-else-if="input.type === 'dropdown'">
            <select
              class="select select-bordered my-2 w-full"
              v-model="input.selectedOption"
            >
              <option
                v-for="(element, index) in input.dropdownList"
                :key="index"
                :disabled="
                  element === 'Characters' ||
                  element === 'Armies' ||
                  element === 'Claimbuilds'
                "
              >
                {{ element }}
              </option>
            </select>
          </div>
        </div>
        <!-- If we need a confirmation and it's a movement action, then show the path used -->
        <div v-if="isConfirming">
          <h3 class="mt-4 text-xl font-bold text-error">
            Movement confirmation
          </h3>
          <p>Time of arrival: {{ movementTimeOfArrival }}</p>
          <p>Time taken: {{ movementHoursUntilComplete }} hours</p>
          <p>Path: {{ movementPath }}</p>
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
  </div>
</template>

<script setup lang="ts">
import { RpCharApiClient } from "@/ts/ApiService/RpCharApiClient";
import { RoleplayCharacter } from "@/ts/types/RoleplayCharacter";
import { FactionApiClient } from "@/ts/ApiService/FactionApiClient";
import { Faction } from "@/ts/types/Faction";
import { ArmyApiClient } from "@/ts/ApiService/ArmyApiClient";
import { Army } from "@/ts/types/Army";
import { ref } from "vue";
import { ErrorHandler } from "@/ts/ErrorHandler";
import { PlayerActionInput } from "@/ts/types/PlayerActionInput";
import { ClaimbuildApiClient } from "@/ts/ApiService/ClaimbuildApiClient";
import { Claimbuild } from "@/ts/types/Claimbuild";
import { getArmyBoundToPlayer } from "@/ts/utilities";
import { usePlayerStore } from "@/stores/playerStores";
import { MovementApiClient } from "@/ts/ApiService/MovementApiClient";
import { MovementResponse } from "@/ts/types/ApiResponseTypes/MovementResponse";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actionInputs: {
    type: Object as () => Array<{
      type: string;
      placeholder: string;
      chooseFrom: string[];
      representedData: string;
    }>,
    required: true,
  },
  actionType: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close", "submit"]);
const isConfirming = ref(false);

function closeModal() {
  emit("close");
}

const shownInputs = ref<PlayerActionInput[]>([]);

const movementTimeOfArrival = ref("");
const movementHoursUntilComplete = ref(0);
const movementPath = ref<String>("");

async function askForConfirmation(): Promise<void> {
  // Check if an input is empty, if yes then show an error message
  for (const input of shownInputs.value) {
    if (input.selectedOption === "") {
      ErrorHandler.throwError("Please fill in all the inputs");
      return;
    }
  }
  // Now check the action type, if it's a movement action, we need to fetch if the character is bound to an army and calculate the path
  if (props.actionType?.toLowerCase().includes("move")) {
    // Fetch the selected region from the inputs
    let selectedRegion = "";
    for (const input of shownInputs.value) {
      if (input.representedData === "toRegion") {
        selectedRegion = input.selectedOption;
      }
    }

    // Check if it's a normal move or a leader move
    if (props.actionType?.toLowerCase().includes("leader")) {
      // Fetch the army we selected from the inputs and calculate the path
      for (const input of shownInputs.value) {
        if (input.representedData === "armyName") {
          const movement = await MovementApiClient.calculateArmyPath(
            usePlayerStore().discordId,
            input.selectedOption,
            selectedRegion,
          );
          movementTimeOfArrival.value = movement.endTime;
          movementHoursUntilComplete.value = movement.hoursUntilComplete;
          // We need to convert the path to an array of strings
          movementPath.value += movement.path
            .map((path) => path.region)
            .join(" -> ");
        }
      }
    } else {
      // Get if the character is bound to an army, if yes then cut the duration by half
      const armyName = await getArmyBoundToPlayer(usePlayerStore().discordId);
      let movement: MovementResponse;
      if (armyName !== null) {
        movement = await MovementApiClient.calculateArmyPath(
          usePlayerStore().discordId,
          armyName,
          selectedRegion,
        );
      } else {
        movement = await MovementApiClient.calculateCharacterPath(
          usePlayerStore().discordId,
          selectedRegion,
        );
      }
      movementTimeOfArrival.value = new Date(movement.endTime).toLocaleString();
      movementHoursUntilComplete.value = movement.hoursUntilComplete;
      // We need to convert the path to an array of strings
      console.log(movement.path);
      movementPath.value += movement.path
        .map((path) => path.region)
        .join(" -> ");
    }
  }
  isConfirming.value = true;
}

function submitAction(): void {
  emit("submit", shownInputs.value);
}

function populateInputs(): void {
  for (const input of props.actionInputs) {
    if (input.type === "dropdown") {
      // For each dropdown choice, we need to get the list of characters or armies or anything else specified
      const dropdownList: string[] = [];
      FactionApiClient.loadPlayerFaction().then(
        async (playerFaction: Faction) => {
          for (const option of input.chooseFrom) {
            switch (option) {
              case "characters":
                // Get only characters of the faction
                await RpCharApiClient.loadAllRpChars().then(
                  (characters: RoleplayCharacter[]) => {
                    // Add an element to the list which will be disabled in the dropdown
                    if (characters.length > 0) dropdownList.push("Characters");
                    for (const character of characters) {
                      if (character.faction === playerFaction.nameOfFaction) {
                        dropdownList.push(character.rpChar.name);
                      }
                    }
                  },
                );
                break;
              case "armies":
                // Get only armies of the faction
                await ArmyApiClient.loadArmies().then((armies: Army[]) => {
                  // Add an element to the list which will be disabled in the dropdown
                  if (armies.length > 0) dropdownList.push("Armies");
                  for (const army of armies) {
                    if (army.nameOfFaction === playerFaction.nameOfFaction) {
                      dropdownList.push(army.nameOfArmy);
                    }
                  }
                });
                break;
              case "claimbuilds":
                // Get only claimbuilds of the faction
                await ClaimbuildApiClient.loadAllClaimbuilds().then(
                  (claimBuilds: Claimbuild[]) => {
                    // Add an element to the list which will be disabled in the dropdown
                    if (claimBuilds.length > 0)
                      dropdownList.push("Claimbuilds");
                    for (const claimBuild of claimBuilds) {
                      if (claimBuild.faction === playerFaction.nameOfFaction) {
                        dropdownList.push(claimBuild.name);
                      }
                    }
                  },
                );
                break;
              default:
                break;
            }
          }
          shownInputs.value.push({
            type: input.type,
            placeholder: input.placeholder,
            selectedOption: "",
            dropdownList: [...dropdownList],
            representedData: input.representedData,
          });
        },
      );
    } else {
      shownInputs.value.push({
        type: input.type,
        placeholder: input.placeholder,
        selectedOption: "",
        dropdownList: [],
        representedData: input.representedData,
      });
    }
  }
}

populateInputs();
</script>
