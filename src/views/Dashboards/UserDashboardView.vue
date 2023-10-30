<template>
  <div class="bg-base-100/30 my-4 rounded-2xl mx-4">
    <UserDashboardTitles />
  </div>
  <div class="bg-base-100/30 my-4 rounded-2xl mx-4">
    <UserDashboardActions />
  </div>
  <div class="bg-base-100/30 my-4 rounded-2xl mx-4">
    <UserDashboardCharacterInfo />
  </div>
  <div class="bg-base-100/30 my-4 rounded-2xl mx-4">
    <UserDashboardApplications />
  </div>
</template>

<script setup lang="ts">
import UserDashboardTitles from "@/views/Dashboards/UserDashboardComponents/UserDashboardTitles.vue";
import UserDashboardCharacterInfo from "@/views/Dashboards/UserDashboardComponents/UserDashboardCharacterInfo.vue";
import UserDashboardActions from "@/views/Dashboards/UserDashboardComponents/UserDashboardActions.vue";
import UserDashboardApplications from "@/views/Dashboards/UserDashboardComponents/UserDashboardApplications.vue";
</script>
