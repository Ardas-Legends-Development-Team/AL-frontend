<template>
  <div v-if="isStaff">
    <router-link to="/staff_area">
      <div
        class="flex items-center justify-between text-gray-400 mt-20 btn bt-ghost"
      >
        <h4 class="uppercase font-semibold">Staff Area</h4>
      </div>
    </router-link>
    <ul class="my-10 flex flex-wrap">
      <li class="w-1/2 flex justify-start mb-6">
        <router-link to="/staff_area/applications_review">
          <a
            class="bg-gray-700 rounded-md text-gray-300 flex flex-col justify-center items-center w-20 h-20 p-4"
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
            <p class="mt-1 uppercase font-semibold text-xs text-primary">
              Apps
            </p>
          </a>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {ApiClient} from "@/ts/ApiClient";

const isStaff = ref(false);

ApiClient.loadPlayerInfo().then((player) => {
  isStaff.value = player.isStaff;
});
</script>
