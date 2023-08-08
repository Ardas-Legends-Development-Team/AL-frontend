<template>
  <dialog id="charactersInRegionModal" class="modal">
    <form method="dialog" class="modal-box">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
      <h3 class="font-bold text-lg">Characters in region {{ regionId }}</h3>
      <div class="flex flex-col items-stretch space-y-3 w-full mt-4">
        <div
          v-for="rpchar in characters"
          :key="rpchar.ign"
          class="grid basis-2 flex-grow h-full card bg-base-300 rounded-box place-items-center"
        >
          <div
            class="flex items-center w-full justify-between pt-1 pb-1 pl-10 pr-10 space-x-10"
          >
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img
                  :src="`https://mc-heads.net/avatar/${rpchar.ign}/36`"
                  alt="Avatar"
                />
              </div>
            </div>
            <div class="flex flex-auto">
              <div class="w-full">
                <div class="font-bold">
                  {{ rpchar.rpChar.name }} - {{ rpchar.rpChar.title }}
                </div>
                <div class="flex justify-start space-x-3">
                  <div class="text-sm opacity-50">{{ rpchar.ign }}</div>
                  <div class="text-sm opacity-50">{{ rpchar.faction }}</div>
                  <div
                    v-if="rpchar.rpChar.injured"
                    class="text-sm text-red-500"
                  >
                    injured
                  </div>
                </div>
                <div v-if="rpchar.rpChar.boundTo" class="text-sm opacity-50">
                  Bound to: {{ rpchar.rpChar.boundTo }}
                </div>
                <div
                  v-if="rpchar.rpChar.isHealing"
                  class="text-sm text-green-500"
                >
                  Currently healing until {{ rpchar.rpChar.healEnds }}
                </div>
              </div>
            </div>
            <img
              :src="bannerMap.get(rpchar.faction)"
              alt="faction banner"
              class="w-8"
            />
          </div>
        </div>
      </div>
    </form>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { RoleplayCharacter } from "@/ts/types/RoleplayCharacter";

defineProps({
  characters: {
    type: Object as () => Array<RoleplayCharacter>,
    required: true,
  },
  bannerMap: {
    type: Map<string, string>,
    required: true,
  },
  regionId: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
