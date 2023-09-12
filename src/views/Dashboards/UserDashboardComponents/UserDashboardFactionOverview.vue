<template>
  <div class="absolute z-10 right-0">
    <div
      @click="openSidebar(false)"
      class="flex items-center justify-center rounded-r-md bg-gray-800 text-gray-300 ml-0 cursor-pointer absolute inset-0 mt-10 m-auto w-8 h-8"
      id="sidebar-toggle"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-chevron-right"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <polyline points="9 6 15 12 9 18" />
      </svg>
    </div>
    <div
      id="sidebar"
      class="overflow-y-scroll lg:overflow-y-auto fixed lg:sticky h-screen lg:h-auto z-40 top-0 bg-base-200 pt-10 w-60"
    >
      <div class="px-8">
        <div class="flex items-center justify-between">
          <div class="w-32">
            <router-link to="/home">
              <a class="btn normal-case text-primary">Home</a>
            </router-link>
          </div>
          <div
            @click="openSidebar(true)"
            class="text-gray-700 ml-8 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-chevron-left"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <polyline points="15 6 9 12 15 18"></polyline>
            </svg>
          </div>
        </div>
        <UserButtonList />
        <StaffButtonList />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import UserButtonList from "@/components/navbars/UserButtonList.vue";
import StaffButtonList from "@/components/navbars/StaffButtonList.vue";

function openSidebar(flag: boolean) {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  flag ? sidebar!.classList.add("hidden") : sidebar!.classList.remove("hidden");
  flag
    ? sidebarToggle!.classList.remove("hidden")
    : sidebarToggle!.classList.add("hidden");
}
</script>
