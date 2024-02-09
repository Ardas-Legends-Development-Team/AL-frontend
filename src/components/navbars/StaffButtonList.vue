<template>
  <div v-if="isStaff">
    <router-link to="/staff_area">
      <div
        class="btn btn-outline mt-20 flex items-center justify-between text-gray-400"
      >
        <h4 class="font-semibold uppercase">Staff Area</h4>
      </div>
    </router-link>
    <ul class="my-10 flex flex-wrap">
      <li class="mb-6 flex w-1/2 justify-start">
        <router-link to="/staff_area/applications_review">
          <a
            class="flex h-20 w-20 flex-col items-center justify-center rounded-md bg-gray-700 p-4 text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-layout-kanban"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <line x1="4" y1="4" x2="10" y2="4"></line>
              <line x1="14" y1="4" x2="20" y2="4"></line>
              <rect x="4" y="8" width="6" height="12" rx="2"></rect>
              <rect x="14" y="8" width="6" height="6" rx="2"></rect>
            </svg>
            <p class="mt-1 text-xs font-semibold uppercase text-primary">
              Apps
            </p>
          </a>
        </router-link>
      </li>
      <li class="mb-6 flex w-1/2 justify-start">
        <router-link to="/staff_area/wars">
          <a
            class="flex h-20 w-20 flex-col items-center justify-center rounded-md bg-gray-700 p-4 text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-star"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <path
                d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
              ></path>
            </svg>
            <p class="mt-1 text-xs font-semibold uppercase text-primary">
              Wars
            </p>
          </a>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PlayerApiClient } from "@/ts/ApiService/PlayerApiClient";

const isStaff = ref(false);

PlayerApiClient.loadPlayerInfo().then((player) => {
  isStaff.value = player.isStaff;
});
</script>
