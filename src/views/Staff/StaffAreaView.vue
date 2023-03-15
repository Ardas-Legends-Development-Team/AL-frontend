<template>
  <div v-if="isStaff">
    <p>Staff area</p>
  </div>
</template>

<script setup lang="ts">
import ApiClient from "@/ts/ApiClient";
import { ref } from "vue";

const isStaff = ref(false);

ApiClient.loadPlayerInfo().then((player) => {
  isStaff.value = player.isStaff;
});
</script>
