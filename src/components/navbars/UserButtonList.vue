<template>
  <ul class="my-10 flex flex-wrap">
    <li class="w-1/2 flex justify-start mb-6">
      <router-link to="/lists">
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
          <p class="mt-1 uppercase font-semibold text-xs text-primary">Lists</p>
        </a>
      </router-link>
    </li>
    <li class="w-1/2 flex justify-end mb-6">
      <router-link to="/applications">
        <a
          href="javascript:void(0)"
          class="bg-gray-700 rounded-md text-gray-300 flex flex-col justify-center items-center w-20 h-20 p-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-inbox"
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
            <rect x="4" y="4" width="16" height="16" rx="2"></rect>
            <path d="M4 13h3l3 3h4l3 -3h3"></path>
          </svg>
          <p class="mt-1 uppercase font-semibold text-xs text-primary">Apps</p>
        </a>
      </router-link>
    </li>
    <li class="w-1/2 flex justify-start mb-6">
      <router-link to="/lists/factions">
        <a
          href="javascript:void(0)"
          class="bg-gray-700 rounded-md text-gray-300 flex flex-col justify-center items-center w-20 h-20 p-4"
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
          <p class="mt-1 uppercase font-semibold text-xs text-primary">
            Factions
          </p>
        </a>
      </router-link>
    </li>
    <li class="w-1/2 flex justify-end mb-6">
      <a
        href="javascript:void(0)"
        class="rounded-md bg-transparent text-gray-600 flex flex-col justify-center items-center w-20 h-20 p-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-calendar-event"
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
          <rect x="4" y="5" width="16" height="16" rx="2"></rect>
          <line x1="16" y1="3" x2="16" y2="7"></line>
          <line x1="8" y1="3" x2="8" y2="7"></line>
          <line x1="4" y1="11" x2="20" y2="11"></line>
          <rect x="8" y="15" width="2" height="2"></rect>
        </svg>
        <p class="mt-1 uppercase font-semibold text-xs">Coming soon</p>
      </a>
    </li>
    <li class="w-1/2 flex justify-start">
      <a
        href="javascript:void(0)"
        class="rounded-md bg-transparent text-gray-600 flex flex-col justify-center items-center w-20 h-20 p-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-notebook"
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
            d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18"
          ></path>
          <line x1="13" y1="8" x2="15" y2="8"></line>
          <line x1="13" y1="12" x2="15" y2="12"></line>
        </svg>
        <p class="mt-1 uppercase font-semibold text-xs">Coming soon</p>
      </a>
    </li>
    <li class="w-1/2 flex justify-end">
      <a
        href="javascript:void(0)"
        class="rounded-md bg-transparent text-gray-600 flex flex-col justify-center items-center w-20 h-20 p-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-stack"
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
          <polyline points="12 4 4 8 12 12 20 8 12 4"></polyline>
          <polyline points="4 12 12 16 20 12"></polyline>
          <polyline points="4 16 12 20 20 16"></polyline>
        </svg>
        <p class="mt-1 uppercase font-semibold text-xs">Coming soon</p>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts"></script>
