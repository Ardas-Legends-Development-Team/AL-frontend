<template>
  <div class="mx-10 grid grid-cols-2 grid-rows-2">
    <div v-if="selectedClaimbuild.houses != 'none'">
      <span class="text-accent">Houses: </span>
      <span>{{ selectedClaimbuild.houses }}</span>
    </div>
    <div>
      <span class="text-accent">Built by: </span>
      <span>{{ builders }}</span>
    </div>
    <div v-if="selectedClaimbuild.traders != 'none'">
      <span class="text-accent">Traders: </span>
      <span>{{ selectedClaimbuild.traders }}</span>
    </div>
    <div v-if="selectedClaimbuild.siege != 'none'">
      <span class="text-accent">Siege equipment: </span>
      <span>{{ selectedClaimbuild.siege }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Claimbuild } from "@/ts/types/Claimbuild";
import { computed } from "vue";

const props = defineProps({
  selectedClaimbuild: {
    type: Object as () => Claimbuild,
    required: true,
  },
});

// Get the ign from each builder and merge them into a string as a computed property
const builders = computed(() => {
  return props.selectedClaimbuild?.builtBy
    .map((builder) => builder.ign)
    .join(", ");
});
</script>
