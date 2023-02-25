<template>
  <div>
    <label for="ign" class="sr-only">In-game name</label>

    <div class="relative">
      <input
        type="text"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="In-game name"
      />
    </div>
  </div>
  <div>
    <label for="charname" class="sr-only">Character Name</label>
    <div class="relative">
      <input
        type="text"
        class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
        placeholder="Character name"
      />
    </div>
  </div>
  <div class="input-group">
    <select class="select select-bordered w-full">
      <option disabled selected>Your in-game preference</option>
      <option>PvP</option>
      <option>PvE</option>
    </select>
  </div>
</template>

<script setup lang="ts"></script>
