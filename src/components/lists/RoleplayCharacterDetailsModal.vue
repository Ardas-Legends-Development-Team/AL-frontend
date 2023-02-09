<template>
  <div class="modal">
    <div class="modal-box">
      <a href="#" class="btn btn-sm btn-circle absolute right-2 top-2">✕</a>
      <h3 class="font-bold text-lg">{{ props.selectedCharacter.ign }}</h3>
      <div class="flex flex-col w-full mt-4">
        <div
          v-if="props.selectedCharacter.rpChar.pvp"
          class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center"
        >
          <p class="font-medium">PvP Enabled</p>
        </div>
        <div v-if="props.selectedCharacter.rpChar.pvp" class="divider"></div>
        <div
          class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center"
        >
          <p class="font-medium">
            Bound To: {{ props.selectedCharacter.rpChar.boundTo }}
          </p>
        </div>
        <div class="divider"></div>
        <div
          class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center"
        >
          <p class="font-medium">
            Gear: {{ props.selectedCharacter.rpChar.gear }}
          </p>
        </div>
        <div
          v-if="props.selectedCharacter.rpChar.isHealing"
          class="divider"
        ></div>
        <div
          v-if="props.selectedCharacter.rpChar.isHealing"
          class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center"
        >
          <div>
            <p class="font-bold">
              Started Heal: {{ props.selectedCharacter.rpChar.startedHeal }}
            </p>
            <span class="badge badge-ghost badge"
              >Heal Ends: {{ selectedCharacter.rpChar.healEnds }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { RoleplayCharacter } from "@/ts/types/RoleplayCharacter";

console.log("RoleplayCharacterDetailsModal loaded");
const props = defineProps({
  selectedCharacter: {
    type: Object as () => RoleplayCharacter,
    required: true,
  },
});
console.log(props.selectedCharacter);
</script>
