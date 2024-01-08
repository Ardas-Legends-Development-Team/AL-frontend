<template>
  <div class="modal">
    <div class="modal-box max-w-2xl">
      <label
        for="charactersInRegionModal"
        class="btn-m btn btn-circle btn-primary absolute right-2 top-2"
        >✕</label
      >
      <h3 class="text-lg font-bold">Characters in region {{ regionId }}</h3>
      <div class="mt-4 flex w-full flex-col items-stretch space-y-3">
        <div
          v-for="rpchar in characters"
          :key="rpchar.ign"
          class="card rounded-box grid h-full flex-grow basis-2 place-items-center bg-base-300"
        >
          <div
            class="flex w-full items-center justify-between space-x-10 pb-1 pl-10 pr-10 pt-1"
          >
            <div class="avatar">
              <div class="mask mask-squircle h-12 w-12">
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
    </div>
  </div>
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
