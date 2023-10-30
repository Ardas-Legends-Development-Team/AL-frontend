<template>
  <div v-if="apps.length > 0">
    <h2 class="mb-1 text-3xl text-neutral-content font-bold ml-16 mt-8 pb-4">
      Character Information
    </h2>
    <div class="flex flex-row flex-wrap justify-evenly my-8">
      <div class="flex flex-col justify-center items-center">
        <div
          v-for="app in apps"
          :key="app.id"
          class="badge badge-outline badge-primary"
        >
          {{ app.application.ign }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ApplicationApiClient } from "@/ts/ApiService/ApplicationApiClient";
import { ref } from "vue";

const apps = ref<any>([]);

// TODO: get only active applications concerning the current user
// TODO: have a better display for each app as well as their status
ApplicationApiClient.getAllApplications().then((data) => {
  apps.value = data;
  console.log(apps);
});
</script>
