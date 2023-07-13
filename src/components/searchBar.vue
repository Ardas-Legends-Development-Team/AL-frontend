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
import { ref, watch } from "vue";

const props = defineProps({
  inputList: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["search"]);
const searchText = ref("");

// Watch for changes to the search text and emit the search results
watch(searchText, () => {
  emit("search", getSearchResults(searchText.value, props.inputList));
});

function getSearchResults(searchText: String, dataList: any[]) {
  // Iterate through the list of objects
  // Then for each object iterate through it's fields
  // If the field is a string and contains the search text, add the object to the search results
  const searchResults: any[] = [];
  for (let i = 0; i < dataList.length; i++) {
    for (const value of Object.values(dataList[i])) {
      if (
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
      ) {
        searchResults.push(dataList[i]);
        break;
      }
    }
  }
  return searchResults;
}
</script>
