<template>
  <div class="bg-base-100/30 my-4 rounded-2xl mx-4">
    <UserDashboardTitles :number-of-apps="apps.length" />
  </div>
  <div class="bg-base-100/30 my-4 rounded-2xl mx-4">
    <UserDashboardActions />
  </div>
  <div class="bg-base-100/30 my-4 rounded-2xl mx-4">
    <UserDashboardCharacterInfo />
  </div>
  <div class="bg-base-100/30 my-4 rounded-2xl mx-4">
    <UserDashboardApplications :apps="apps" />
  </div>
</template>

<script setup lang="ts">
import UserDashboardTitles from "@/views/Dashboards/UserDashboardComponents/UserDashboardTitles.vue";
import UserDashboardCharacterInfo from "@/views/Dashboards/UserDashboardComponents/UserDashboardCharacterInfo.vue";
import UserDashboardActions from "@/views/Dashboards/UserDashboardComponents/UserDashboardActions.vue";
import UserDashboardApplications from "@/views/Dashboards/UserDashboardComponents/UserDashboardApplications.vue";
import { ref } from "vue";
import { ApplicationApiClient } from "@/ts/ApiService/ApplicationApiClient";

const apps = ref<any[]>([]);

// TODO: get only active applications concerning the current user
// TODO: have a better display for each app as well as their status
ApplicationApiClient.getAllActiveApplications().then((data) => {
  apps.value = data;
  console.log(apps.value);
});
</script>
