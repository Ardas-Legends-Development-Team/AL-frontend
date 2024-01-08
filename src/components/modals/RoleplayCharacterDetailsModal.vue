<template>
  <input type="checkbox" id="rpCharDetailsModal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <label
        for="rpCharDetailsModal"
        class="btn-m btn btn-circle btn-primary absolute right-2 top-2"
        >✕</label
      >
      <h3 class="text-lg font-bold">{{ props.selectedCharacter.ign }}</h3>
      <div class="mt-4 flex w-full flex-col">
        <div
          v-if="props.selectedCharacter!.rpChar.pvp"
          class="card rounded-box grid h-20 flex-grow place-items-center bg-base-300"
        >
          <p class="font-medium">PvP Enabled</p>
        </div>
        <div v-if="props.selectedCharacter!.rpChar.pvp" class="divider"></div>
        <div
          v-if="props.selectedCharacter!.rpChar.boundTo"
          class="card rounded-box grid h-20 flex-grow place-items-center bg-base-300"
        >
          <p class="font-medium">
            Bound To: {{ props.selectedCharacter.rpChar.boundTo }}
          </p>
        </div>
        <div
          v-if="props.selectedCharacter!.rpChar.boundTo"
          class="divider"
        ></div>
        <div
          class="card rounded-box grid h-20 flex-grow place-items-center bg-base-300"
        >
          <p class="font-medium">
            Gear: {{ props.selectedCharacter.rpChar.gear }}
          </p>
        </div>
        <div
          v-if="props.selectedCharacter!.rpChar.injured"
          class="divider"
        ></div>
        <div
          v-if="props.selectedCharacter!.rpChar.injured"
          class="card rounded-box grid h-20 flex-grow place-items-center bg-base-300"
        >
          <p class="font-medium">Character is injured</p>
        </div>
        <div
          v-if="props.selectedCharacter!.rpChar.isHealing"
          class="divider"
        ></div>
        <div
          v-if="props.selectedCharacter?.rpChar.isHealing"
          class="card rounded-box grid h-20 flex-grow place-items-center bg-base-300"
        >
          <div>
            <p class="font-bold">
              Started Heal: {{ props.selectedCharacter.rpChar.startedHeal }}
            </p>
            <span class="badge badge-ghost"
              >Heal Ends: {{ selectedCharacter.rpChar.healEnds }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RoleplayCharacter } from "@/ts/types/RoleplayCharacter";

const props = defineProps({
  selectedCharacter: {
    type: Object as () => RoleplayCharacter,
    required: true,
  },
});
</script>
