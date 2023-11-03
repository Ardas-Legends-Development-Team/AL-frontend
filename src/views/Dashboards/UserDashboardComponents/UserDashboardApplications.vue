<template>
  <div v-if="apps.length > 0">
    <h2 class="mb-1 text-3xl text-neutral-content font-bold ml-16 mt-8 pb-4">
      Character Information
    </h2>
    <div
      v-for="app in apps"
      :key="app.id"
      class="flex flex-row flex-wrap justify-center items-center"
    >
      <UserDashboardApplicationCard
        :vote-count="app.voteCount"
        :application-type="getApplicationType(app)"
        :applied-at="app.appliedAt"
        :name="getApplicationName(app)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ClaimbuildApplication,
  getApplicationName,
  getApplicationType,
  RoleplayApplication,
} from "@/ts/types/Application";
import UserDashboardApplicationCard from "@/views/Dashboards/UserDashboardComponents/UserDashboardApplicationCard.vue";

defineProps<{
  apps: Array<RoleplayApplication | ClaimbuildApplication>;
}>();
</script>
