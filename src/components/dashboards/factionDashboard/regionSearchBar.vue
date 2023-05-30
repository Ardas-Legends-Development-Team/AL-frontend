<template>
  <div class="form-control">
    <div class="input-group">
      <input
        type="text"
        placeholder="Search…"
        class="input input-bordered"
        v-model="searchText"
      />
      <button class="btn btn-square">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Region } from "@/ts/types/Region";

const props = defineProps({
  regions: {
    type: Array<Region>,
    required: true,
  },
});
const emit = defineEmits(["search"]);
const searchText = ref("");

// Watch for changes to the search text and emit the search results
watch(searchText, () => {
  const searchResults: Region[] = props.regions.filter((item) => {
    if (item.regionId.toLowerCase().includes(searchText.value.toLowerCase())) {
      return item;
    }
  });
  emit("search", searchResults);
});
</script>
