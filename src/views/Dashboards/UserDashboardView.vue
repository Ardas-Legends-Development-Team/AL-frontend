<template>
  <UserDashboardTopSection />
  <UserDashboardCharacterBasicInfo />
  <UserDashboardUpperCards />
  <UserDashboardMainContent />
</template>

<script setup lang="ts">
import UserDashboardTopSection from "@/components/dashboards/user_dashboard/UserDashboardTopSection.vue";
import UserDashboardCharacterBasicInfo from "@/components/dashboards/user_dashboard/UserDashboardCharacterBasicInfo.vue";
import UserDashboardUpperCards from "@/components/dashboards/user_dashboard/UserDashboardUpperCards.vue";
import UserDashboardMainContent from "@/components/dashboards/user_dashboard/UserDashboardMainContent.vue";
</script>
