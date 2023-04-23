<template>
  <div v-if="isStaff">
    <p>Applications Review</p>
  </div>
</template>

<script setup lang="ts">
import ApiClient from "@/ts/ApiClient";

const isStaff = ref(false);

ApiClient.loadPlayerInfo().then((player) => {
  isStaff.value = player.isStaff;
});
</script>
