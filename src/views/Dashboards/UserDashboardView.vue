<template>
  <div class="mx-4 my-4 rounded-2xl bg-base-100/30">
    <UserDashboardTitles :number-of-apps="apps.length" />
  </div>
  <div class="mx-4 my-4 rounded-2xl bg-base-100/30">
    <UserDashboardActions />
  </div>
  <div class="mx-4 my-4 rounded-2xl bg-base-100/30">
    <UserDashboardCharacterInfo />
  </div>
  <div class="mx-4 my-4 rounded-2xl bg-base-100/30">
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
import {
  ClaimbuildApplication,
  RoleplayApplication,
} from "@/ts/types/Application";

const apps = ref<Array<RoleplayApplication | ClaimbuildApplication>>([]);

ApplicationApiClient.getPlayerActiveApplications().then((data) => {
  apps.value = data;
});
</script>
