<template>Faction dashboard</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const faction = useRoute().params.factionName;
</script>
