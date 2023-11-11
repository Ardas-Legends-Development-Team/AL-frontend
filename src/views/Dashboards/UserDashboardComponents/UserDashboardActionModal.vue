<template>
  <div class="modal" :class="isOpen ? 'modal-open' : ''">
    <div class="modal-box">
      <label
        class="btn btn-primary btn-m btn-circle absolute right-2 top-2"
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
          />
          <div v-else-if="input.type === 'dropdown'">
            <select
              class="select select-bordered w-full my-2"
              v-model="input.selectedOption"
            >
              <option
                v-for="(element, index) in input.dropdownList"
                :key="index"
                :disabled="element === 'Characters' || element === 'Armies'"
              >
                {{ element }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: ask for confirmation after submitting every action
import { RpCharApiClient } from "@/ts/ApiService/RpCharApiClient";
import { RoleplayCharacter } from "@/ts/types/RoleplayCharacter";
import { FactionApiClient } from "@/ts/ApiService/FactionApiClient";
import { Faction } from "@/ts/types/Faction";
import { ArmyApiClient } from "@/ts/ApiService/ArmyApiClient";
import { Army } from "@/ts/types/Army";
import { ref } from "vue";

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
    }>,
    required: true,
  },
});

const emit = defineEmits(["close"]);

function closeModal() {
  emit("close");
}

const shownInputs = ref<
  {
    type: string;
    placeholder: string;
    selectedOption: string;
    dropdownList: string[];
  }[]
>([]);

function populateInputs() {
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
              default:
                break;
            }
          }
          shownInputs.value.push({
            type: input.type,
            placeholder: input.placeholder,
            selectedOption: "",
            dropdownList: [...dropdownList],
          });
        },
      );
    } else {
      shownInputs.value.push({
        type: input.type,
        placeholder: input.placeholder,
        selectedOption: "",
        dropdownList: [],
      });
    }
  }
}

populateInputs();
</script>
