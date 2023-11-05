<template>
  <div class="stats stats-vertical">
    <div class="stat">
      <div class="stat-title">Leader</div>
      <div class="stat-value">{{ factionLeader }}</div>
    </div>

    <div class="stat">
      <div class="stat-title">Players</div>
      <div class="stat-value">{{ playerCount }}</div>
    </div>

    <div class="stat">
      <div class="stat-title">Armies</div>
      <div class="stat-value">{{ armyCount }}</div>
    </div>

    <div class="stat">
      <div class="stat-title">Regions</div>
      <div class="stat-value">{{ regionCount }}</div>
    </div>

    <div class="stat">
      <div class="stat-title">Claimbuilds</div>
      <div class="stat-value">{{ claimbuildCount }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  playerCount: {
    type: Number,
    required: true,
  },
  armyCount: {
    type: Number,
    required: true,
  },
  claimbuildCount: {
    type: Number,
    required: true,
  },
  regionCount: {
    type: Number,
    required: true,
  },
  factionLeader: {
    type: String,
    required: true,
  },
});
</script>
