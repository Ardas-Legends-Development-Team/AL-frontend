<template>
  <div
    class="card m-4 basis-1/5"
    :style="{
      'background-image':
        'url(https://media.discordapp.net/attachments/1068863871772790865/1068869765587816548/VernonRoche__CA9.io_lord_of_the_rings_painting_of_huge_dwarven__487c0555-83b6-471a-a82d-1c79b7a23853.png?width=400&height=400)',
    }"
  >
    <div class="card-body">
      <h3>Region Name</h3>
      Region information
    </div>
    <div class="collapse">
      <input type="checkbox" class="peer" />
      <div
        class="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
      >
        Show claimbuilds
      </div>
      <div
        class="collapse-content flex flex-row flex-wrap bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
      >
        <div
          v-for="(claimbuild, index) in claimbuilds"
          :key="index"
          class="badge badge-primary"
        >
          {{ claimbuild.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  claimbuilds: {
    required: true,
  },
  region: {
    required: true,
  },
});
</script>
