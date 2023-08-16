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
import { ClaimBuild } from "@/ts/types/ClaimBuild";
import { Region } from "@/ts/types/Region";
import { RoleplayCharacter } from "@/ts/types/RoleplayCharacter";
import { Army } from "@/ts/types/Army";

const props = defineProps({
  inputList: {
    type: [
      Array<string>,
      Object as () => Array<ClaimBuild>,
      Object as () => Array<Region>,
      Object as () => Array<RoleplayCharacter>,
      Object as () => Array<Army>,
    ],
    required: true,
  },
});
const emit = defineEmits(["search"]);
const searchText = ref("");

// Watch for changes to the search text and emit the search results
watch(searchText, () => {
  emit("search", getSearchResults(searchText.value, props.inputList));
});

function getSearchResults(
  searchText: string,
  dataList: string[] | ClaimBuild[] | Region[] | RoleplayCharacter[] | Army[],
) {
  if (searchText === "" || dataList.length === 0) {
    return dataList;
  }
  if (typeof dataList[0] === "string") {
    return searchString(searchText, dataList as string[]);
  } else if (typeof dataList[0] === "object") {
    return searchCustomType(
      searchText,
      dataList as ClaimBuild[] | Region[] | RoleplayCharacter[] | Army[],
    );
  }
}

function searchString(searchText: string, dataList: string[]): string[] {
  const searchResults: string[] = [];
  for (let i = 0; i < dataList.length; i++) {
    if (
      typeof dataList[i] === "string" &&
      dataList[i].toLowerCase().includes(searchText.toLowerCase())
    ) {
      searchResults.push(dataList[i]);
    }
  }
  return searchResults;
}

function searchCustomType(
  searchText: string,
  dataList: ClaimBuild[] | Region[] | RoleplayCharacter[] | Army[],
) {
  const searchResults = [];
  // Iterate through the list of objects
  // Then for each object iterate through it's fields
  for (let i = 0; i < dataList.length; i++) {
    for (const value of Object.values(dataList[i])) {
      if (
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
      ) {
        searchResults.push(dataList[i]);
        break;
      }
      // If it's of type object then iterate through the object's fields
      if (typeof value === "object") {
        for (const innerValue of Object.values(value)) {
          if (
            typeof innerValue === "string" &&
            innerValue.toLowerCase().includes(searchText.toLowerCase())
          ) {
            searchResults.push(dataList[i]);
            break;
          }
        }
      }
    }
  }
  return searchResults;
}
</script>
