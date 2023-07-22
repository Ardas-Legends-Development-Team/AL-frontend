<template>
  <div v-if="isStaff">
    <p>Applications Review</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PlayerApiClient } from "@/ts/ApiService/PlayerApiClient";

const isStaff = ref(false);

PlayerApiClient.loadPlayerInfo().then((player: { isStaff: boolean }) => {
  isStaff.value = player.isStaff;
});
</script>
