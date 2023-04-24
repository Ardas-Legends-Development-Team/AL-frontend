<template>
  <div v-if="isStaff">
    <p>Staff area</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ApiClient from "@/ts/ApiClient";

const isStaff = ref(false);

ApiClient.loadPlayerInfo().then((player) => {
  isStaff.value = player.isStaff;
});
</script>
