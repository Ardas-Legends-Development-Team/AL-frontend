<template>
  <div class="flex flex-row flex-wrap">
    <FactionDashboardRegionCollapseCard
      v-for="(region, index) in regions"
      :key="index"
      :region="region"
      :claimbuilds="testClaimbuilds[index]"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { Region } from "@/ts/types/Region";

defineProps({
  faction: {
    type: String,
    required: true,
  },
});

const testClaimbuilds = ref([
  [
    {
      name: "test",
      faction: "test",
      type: "test",
    },
    {
      name: "test2",
      faction: "test2",
      type: "test2",
    },
    {
      name: "test5",
      faction: "test",
      type: "test",
    },
    {
      name: "test6",
      faction: "test2",
      type: "test2",
    },
  ],
  [
    {
      name: "test3",
      faction: "test3",
      type: "test3",
    },
  ],
]);

const regions = ref<Region[]>([]);

async function getMockData(): Promise<Region[]> {
  const params = {
    count: 10,
    key: "6100d750",
  };
  return new Promise((resolve, reject) => {
    axios
      .get("https://api.mockaroo.com/api/ce561150", {
        params,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

getMockData().then((data: any) => {
  regions.value = data;
});
</script>
