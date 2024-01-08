<template>
  <div class="modal" :class="isOpen ? 'modal-open' : ''">
    <div class="modal-box">
      <label
        class="btn btn-primary btn-m btn-circle btn-outline absolute right-2 top-2"
        @click="closeModal"
        >✕</label
      >
      <h3 class="font-bold text-lg">{{ description }}</h3>
      <div class="flex flex-col w-full mt-4">
        <div v-for="(input, index) in shownInputs" :key="index">
          <h3 class="text-secondary text-lg font-bold mt-4">
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
              class="select select-bordered w-full my-2"
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
});

const emit = defineEmits(["close", "submit"]);
const isConfirming = ref(false);

function closeModal() {
  emit("close");
}

const shownInputs = ref<PlayerActionInput[]>([]);

function askForConfirmation(): void {
  // Check if an input is empty, if yes then show an error message
  for (const input of shownInputs.value) {
    if (input.selectedOption === "") {
      ErrorHandler.throwError("Please fill in all the inputs");
      return;
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
